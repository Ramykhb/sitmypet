import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnerService } from './owner.service';

@UseGuards(JwtAuthGuard)
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

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
    return this.ownerService.getHomeFeed(userId);
  }
}
