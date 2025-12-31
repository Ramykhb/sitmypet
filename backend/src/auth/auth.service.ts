import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const REFRESH_TOKEN_DAYS = 30;
const EMAIL_OTP_EXPIRY_MINUTES = 10;
const EMAIL_OTP_COOLDOWN_SECONDS = 60;
const EMAIL_OTP_MAX_ATTEMPTS = 5;
const PASSWORD_RESET_OTP_EXPIRY_MINUTES = 10;
const PASSWORD_RESET_OTP_COOLDOWN_SECONDS = 60;
const PASSWORD_RESET_OTP_MAX_ATTEMPTS = 5;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const email = this.emailToLowerCase(dto.email);
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.createUser({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email,
      passwordHash,
    });

    const otp = this.generateOtp();

    await this.saveEmailOtp(user.id, otp);
    await this.emailService.sendOtp(user.email, otp);

    return {
      requiresEmailVerification: true,
      message:
        'Registration successful. Please check your email for the verification code.',
    };
  }

  async login(dto: LoginDto): Promise<
    | {
        requiresEmailVerification: true;
        message: string;
        email: string;
      }
    | {
        accessToken: string;
        refreshToken: string;
        user: {
          id: string;
          firstname: string;
          lastname: string;
          email: string;
          roles: Role[];
          createdAt: Date;
        };
      }
  > {
    const email = this.emailToLowerCase(dto.email);
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.emailVerified) {
      return {
        requiresEmailVerification: true,
        message: 'Please verify your email before logging in',
        email: user.email,
      };
    }

    const tokens = this.generateTokens(user.id, user.roles);

    void this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: user.roles,
        createdAt: user.createdAt,
      },
    };
  }

  async switchRole(userId: string, role: Role) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.roles.includes(role)) {
      throw new ForbiddenException('Role not owned by user');
    }

    const payload: {
      sub: string;
      roles: Role[];
      activeRole: Role;
    } = {
      sub: user.id,
      roles: user.roles,
      activeRole: role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      activeRole: role,
    };
  }

  async refresh(refreshToken: string) {
    let payload: {
      sub: string;
      jti: string;
      roles: Role[];
      activeRole?: Role;
    };

    try {
      const verified = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }) as unknown;
      payload = verified as typeof payload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findByIdWithRefreshToken(payload.sub);

    if (
      !user ||
      !user.refreshTokenHash ||
      !user.refreshTokenExp ||
      !user.refreshTokenJti
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (user.refreshTokenExp < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    if (payload.jti !== user.refreshTokenJti) {
      throw new UnauthorizedException('Refresh token already used');
    }

    const isTokenValid = await this.compareToken(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = this.generateTokens(
      user.id,
      user.roles,
      user.activeRole ?? undefined,
    );

    void this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(userId: string) {
    await this.usersService.clearRefreshToken(userId);
    return { message: 'Logged out successfully' };
  }

  async verifyEmailOtp(email: string, otp: string) {
    const normalizedEmail = this.emailToLowerCase(email);
    const user = await this.usersService.findByEmailWithOtp(normalizedEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (!user.emailOtpHash || !user.emailOtpExpires) {
      throw new BadRequestException(
        'No verification code found. Please request a new one.',
      );
    }

    if (user.emailOtpExpires < new Date()) {
      throw new BadRequestException(
        'Verification code expired. Please request a new one.',
      );
    }

    if (user.emailOtpAttempts >= EMAIL_OTP_MAX_ATTEMPTS) {
      throw new BadRequestException(
        'Too many attempts. Please request a new code.',
      );
    }

    const isValidOtp = await this.compareToken(otp, user.emailOtpHash);

    if (!isValidOtp) {
      await this.usersService.incrementOtpAttempts(user.id);
      const remaining = EMAIL_OTP_MAX_ATTEMPTS - user.emailOtpAttempts - 1;
      throw new UnauthorizedException(
        `Invalid verification code. ${remaining} attempts remaining.`,
      );
    }

    await this.usersService.verifyEmail(user.id);

    const fullUser =
      await this.usersService.findByEmailWithPassword(normalizedEmail);
    if (!fullUser) {
      throw new NotFoundException('User not found');
    }

    const tokens = this.generateTokens(fullUser.id, fullUser.roles);
    void this.saveRefreshToken(fullUser.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: fullUser.id,
        firstname: fullUser.firstname,
        lastname: fullUser.lastname,
        email: fullUser.email,
        roles: fullUser.roles,
        createdAt: fullUser.createdAt,
      },
    };
  }

  async resendEmailOtp(email: string) {
    const normalizedEmail = this.emailToLowerCase(email);
    const user = await this.usersService.findByEmailWithOtp(normalizedEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (user.emailOtpLastSentAt) {
      const secondsSinceLastSent =
        (new Date().getTime() - user.emailOtpLastSentAt.getTime()) / 1000;
      if (secondsSinceLastSent < EMAIL_OTP_COOLDOWN_SECONDS) {
        const remaining = Math.ceil(
          EMAIL_OTP_COOLDOWN_SECONDS - secondsSinceLastSent,
        );
        throw new BadRequestException(
          `Please wait ${remaining} seconds before requesting a new code.`,
        );
      }
    }

    const otp = this.generateOtp();
    await this.saveEmailOtp(user.id, otp);
    await this.emailService.sendOtp(user.email, otp);

    return { message: 'Verification code sent' };
  }

  async requestPasswordReset(email: string) {
    const normalizedEmail = this.emailToLowerCase(email);
    const user =
      await this.usersService.findByEmailWithPasswordResetOtp(normalizedEmail);

    if (!user) {
      return {
        message:
          'If an account exists with this email, a password reset code has been sent.',
      };
    }

    if (user.passwordResetOtpLastSentAt) {
      const secondsSinceLastSent =
        (new Date().getTime() - user.passwordResetOtpLastSentAt.getTime()) /
        1000;
      if (secondsSinceLastSent < PASSWORD_RESET_OTP_COOLDOWN_SECONDS) {
        const remaining = Math.ceil(
          PASSWORD_RESET_OTP_COOLDOWN_SECONDS - secondsSinceLastSent,
        );
        throw new BadRequestException(
          `Please wait ${remaining} seconds before requesting a new code.`,
        );
      }
    }

    const otp = this.generateOtp();
    await this.savePasswordResetOtp(user.id, otp);
    await this.emailService.sendPasswordResetOtp(user.email, otp);

    return {
      message:
        'If an account exists with this email, a password reset code has been sent.',
    };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const normalizedEmail = this.emailToLowerCase(email);
    const user =
      await this.usersService.findByEmailWithPasswordResetOtp(normalizedEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.passwordResetOtpHash || !user.passwordResetOtpExpires) {
      throw new BadRequestException(
        'No password reset code found. Please request a new one.',
      );
    }

    if (user.passwordResetOtpExpires < new Date()) {
      throw new BadRequestException(
        'Password reset code expired. Please request a new one.',
      );
    }

    if (user.passwordResetOtpAttempts >= PASSWORD_RESET_OTP_MAX_ATTEMPTS) {
      throw new BadRequestException(
        'Too many attempts. Please request a new code.',
      );
    }

    const isValidOtp = await this.compareToken(otp, user.passwordResetOtpHash);

    if (!isValidOtp) {
      await this.usersService.incrementPasswordResetOtpAttempts(user.id);
      const remaining =
        PASSWORD_RESET_OTP_MAX_ATTEMPTS - user.passwordResetOtpAttempts - 1;
      throw new UnauthorizedException(
        `Invalid reset code. ${remaining} attempts remaining.`,
      );
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await this.usersService.resetPassword(user.id, newPasswordHash);

    return {
      message:
        'Password reset successful. Please log in with your new password.',
    };
  }

  private async hashToken(token: string) {
    return bcrypt.hash(token, 10);
  }

  private async compareToken(token: string, hash: string) {
    return bcrypt.compare(token, hash);
  }

  private generateTokens(userId: string, roles: Role[], activeRole?: Role) {
    const payload = {
      sub: userId,
      roles,
      ...(activeRole && { activeRole }),
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshPayload = {
      ...payload,
      jti: `${userId}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: `${REFRESH_TOKEN_DAYS}d`,
    });

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await this.hashToken(refreshToken);
    const refreshTokenExp = new Date();
    refreshTokenExp.setDate(refreshTokenExp.getDate() + REFRESH_TOKEN_DAYS);

    const decoded: unknown = this.jwtService.decode(refreshToken);
    const payload = decoded as {
      jti: string;
      sub: string;
    };

    await this.usersService.updateRefreshToken(
      userId,
      refreshTokenHash,
      payload.jti,
      refreshTokenExp,
    );
  }

  private emailToLowerCase(email: string): string {
    return email.trim().toLowerCase();
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async saveEmailOtp(userId: string, otp: string) {
    const otpHash = await this.hashToken(otp);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + EMAIL_OTP_EXPIRY_MINUTES);
    const lastSentAt = new Date();

    await this.usersService.saveEmailOtp(
      userId,
      otpHash,
      expiresAt,
      lastSentAt,
    );
  }

  private async savePasswordResetOtp(userId: string, otp: string) {
    const otpHash = await this.hashToken(otp);
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + PASSWORD_RESET_OTP_EXPIRY_MINUTES,
    );
    const lastSentAt = new Date();

    await this.usersService.savePasswordResetOtp(
      userId,
      otpHash,
      expiresAt,
      lastSentAt,
    );
  }
}
