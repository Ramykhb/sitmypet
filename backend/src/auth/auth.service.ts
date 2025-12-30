import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_DAYS = 30;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.createUser({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      passwordHash,
    });

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.roles as Role[],
    );

    await this.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
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

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email);
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

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.roles as Role[],
    );

    await this.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
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
      throw new ForbiddenException('User not found');
    }

    if (!user.roles.includes(role)) {
      throw new ForbiddenException('Role not owned by user');
    }

    const payload = {
      sub: user.id,
      roles: user.roles,
      activeRole: role,
    };

    console.log('JWT payload:', payload);

    return {
      accessToken: this.jwtService.sign(payload),
      activeRole: role,
    };
  }

  async refresh(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findByIdWithRefreshToken(payload.sub);

    if (!user || !user.refreshTokenHash || !user.refreshTokenExp || !user.refreshTokenJti) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (user.refreshTokenExp < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // Verify the jti matches (prevents token reuse)
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

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(user.id, user.roles as Role[], user.activeRole as Role | undefined);

    await this.saveRefreshToken(user.id, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string) {
    await this.usersService.clearRefreshToken(userId);
    return { message: 'Logged out successfully' };
  }

  private async hashToken(token: string) {
    return bcrypt.hash(token, 10);
  }

  private async compareToken(token: string, hash: string) {
    return bcrypt.compare(token, hash);
  }

  private async generateTokens(
    userId: string,
    roles: Role[],
    activeRole?: Role,
  ) {
    const payload = {
      sub: userId,
      roles,
      ...(activeRole && { activeRole }),
    };

    const accessToken = this.jwtService.sign(payload);

    // Add jti (JWT ID) to make each refresh token unique
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

    // Extract jti from the token
    const payload = this.jwtService.decode(refreshToken) as any;
    const jti = payload.jti;

    await this.usersService.updateRefreshToken(
      userId,
      refreshTokenHash,
      jti,
      refreshTokenExp,
    );
  }
}
