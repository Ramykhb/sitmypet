import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
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
  constructor(private readonly prisma: PrismaService) { }

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
        roles: data.roles ?? [Role.OWNER, Role.SITTER],
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
    data: { firstname?: string; lastname?: string; email?: string; password?: string },
  ) {
    const { firstname, lastname, email, password } = data;
    const updateData: any = {};

    if (firstname) updateData.firstname = firstname;
    if (lastname) updateData.lastname = lastname;

    if (email) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      const emailExists = await this.prisma.user.findUnique({ where: { email } });
      if (emailExists && emailExists.id !== userId) {
        throw new ConflictException('Email already in use');
      }

      updateData.email = email;
      updateData.emailVerified = false;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
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
        refreshTokenHash: true,
        refreshTokenJti: true,
        refreshTokenExp: true,
      },
    });
  }

  async saveEmailOtp(userId: string, otpHash: string, expiresAt: Date) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        emailOtpHash: otpHash,
        emailOtpExpires: expiresAt,
        emailOtpAttempts: 0,
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
      },
    });
  }

  async savePasswordResetOtp(userId: string, otpHash: string, expiresAt: Date) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetOtpHash: otpHash,
        passwordResetOtpExpires: expiresAt,
        passwordResetOtpAttempts: 0,
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
        refreshTokenHash: null,
        refreshTokenJti: null,
        refreshTokenExp: null,
      },
    });
  }
  async updateProfileImage(userId: string, imageUrl: string) {
    const profile = await this.prisma.profile.upsert({
        where: { userId },
        create: { userId, location: 'Unknown' },
        update: {}
    });

    await this.prisma.profilePicture.upsert({
        where: { profileId: profile.id },
        update: { url: imageUrl },
        create: {
            profileId: profile.id,
            url: imageUrl
        }
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: { profileImageUrl: imageUrl },
      select: userSelect,
    });
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid old password');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
      select: userSelect,
    });
  }

  async deleteAccount(userId: string, passwordVerification: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(passwordVerification, user.passwordHash);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }

    return this.prisma.user.delete({
      where: { id: userId },
      select: userSelect,
    });
  }

  async updateIdDocument(userId: string, documentUrl: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found. Please create a profile first.');
    }

    return this.prisma.document.upsert({
      where: { profileId: profile.id },
      update: { filePath: documentUrl },
      create: {
        profileId: profile.id,
        filePath: documentUrl,
        rawText: '', // Placeholder for manual update
        status: 'UNVERIFIED',
      },
    });
  }
}
