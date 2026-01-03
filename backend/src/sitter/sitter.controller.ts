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
      };
    },
  ) {
    const userId = req.user.sub;
    return this.sitterService.getHomeFeed(userId);
  }
}
