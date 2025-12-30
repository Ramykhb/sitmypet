import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../common/enums/role.enum';
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
      throw new BadRequestException('Email already in use');
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
      throw new BadRequestException('User not found');
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
      throw new BadRequestException('User not found');
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
}
