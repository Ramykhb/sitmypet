import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role?: Role;
  }) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.createUser({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: passwordHash,
      roles: [data.role ?? Role.OWNER],
    });

    const payload = { sub: user.id, roles: user.roles };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.usersService.findByEmailWithPassword(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, roles: user.roles };

    return {
      accessToken: this.jwtService.sign(payload),
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
}
