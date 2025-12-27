import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles?: Role[];
  }) {
    const exists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) {
      throw new BadRequestException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        passwordHash,
        roles: data.roles ?? [Role.OWNER],
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
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
    });
  }
}