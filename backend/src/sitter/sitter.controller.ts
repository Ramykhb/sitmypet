import {
  Controller,
  ForbiddenException,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SitterService } from './sitter.service';

@UseGuards(JwtAuthGuard)
@Controller('sitter')
export class SitterController {
  constructor(private readonly sitterService: SitterService) {}

  @Get('home')
  async getHome(
    @Req()
    req: {
      user: {
        sub: string;
        roles: Role[];
        activeRole?: Role;
      };
    },
  ) {
    const currentRole = req.user.activeRole || req.user.roles[0];
    if (currentRole !== Role.SITTER) {
      throw new ForbiddenException('Access denied: SITTER role required');
    }

    const userId = req.user.sub;
    return this.sitterService.getHomeFeed(userId);
  }
}
