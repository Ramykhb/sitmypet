import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

    const payload = {
      sub: user.id,
      roles: user.roles,
    };

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

    const payload = {
      sub: user.id,
      roles: user.roles,
    };

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

  private async hashToken(token: string) {
    return bcrypt.hash(token, 10);
  }

  private async compareToken(token: string, hash: string) {
    return bcrypt.compare(token, hash);
  }
}
