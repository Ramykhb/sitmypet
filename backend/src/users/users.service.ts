import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const userSelect = {
  id: true,
  firstname: true,
  lastname: true,
  email: true,
  roles: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    firstname: string;
    lastname: string;
    email: string;
    passwordHash: string;
    roles?: Role[];
  }) {
    const exists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) {
      throw new ConflictException('Email already in use');
    }

    return this.prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        passwordHash: data.passwordHash,
        roles: data.roles ?? [Role.OWNER],
      },
      select: userSelect,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: userSelect,
    });
  }

  async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }

  async addRole(userId: string, role: Role) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.roles.includes(role)) {
      return user;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: [...user.roles, role],
      },
      select: userSelect,
    });
  }

  async updateProfile(
    userId: string,
    data: { firstname?: string; lastname?: string },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: userSelect,
    });
  }

  async removeRole(userId: string, role: Role) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: user.roles.filter((r) => r !== role),
      },
      select: userSelect,
    });
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        roles: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateRefreshToken(
    userId: string,
    refreshTokenHash: string,
    refreshTokenJti: string,
    refreshTokenExp: Date,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshTokenHash,
        refreshTokenJti,
        refreshTokenExp,
      },
    });
  }

  async clearRefreshToken(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshTokenHash: null,
        refreshTokenJti: null,
        refreshTokenExp: null,
      },
    });
  }

  async findByIdWithRefreshToken(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        roles: true,
        activeRole: true,
        refreshTokenHash: true,
        refreshTokenJti: true,
        refreshTokenExp: true,
      },
    });
  }

  async saveEmailOtp(
    userId: string,
    otpHash: string,
    expiresAt: Date,
    lastSentAt: Date,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        emailOtpHash: otpHash,
        emailOtpExpires: expiresAt,
        emailOtpAttempts: 0,
        emailOtpLastSentAt: lastSentAt,
      },
    });
  }

  async incrementOtpAttempts(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        emailOtpAttempts: {
          increment: 1,
        },
      },
    });
  }

  async verifyEmail(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
        emailOtpHash: null,
        emailOtpExpires: null,
        emailOtpAttempts: 0,
        emailOtpLastSentAt: null,
      },
    });
  }

  async findByEmailWithOtp(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        emailOtpHash: true,
        emailOtpExpires: true,
        emailOtpAttempts: true,
        emailOtpLastSentAt: true,
      },
    });
  }

  async savePasswordResetOtp(
    userId: string,
    otpHash: string,
    expiresAt: Date,
    lastSentAt: Date,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetOtpHash: otpHash,
        passwordResetOtpExpires: expiresAt,
        passwordResetOtpAttempts: 0,
        passwordResetOtpLastSentAt: lastSentAt,
      },
    });
  }

  async findByEmailWithPasswordResetOtp(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordResetOtpHash: true,
        passwordResetOtpExpires: true,
        passwordResetOtpAttempts: true,
        passwordResetOtpLastSentAt: true,
      },
    });
  }

  async incrementPasswordResetOtpAttempts(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetOtpAttempts: {
          increment: 1,
        },
      },
    });
  }

  async resetPassword(userId: string, newPasswordHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        emailVerified: true,
        passwordResetOtpHash: null,
        passwordResetOtpExpires: null,
        passwordResetOtpAttempts: 0,
        passwordResetOtpLastSentAt: null,
        refreshTokenHash: null,
        refreshTokenJti: null,
        refreshTokenExp: null,
      },
    });
  }
}
