import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnerService } from './owner.service';
import { CreatePetDto } from './dto/create-pet.dto';

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

  @Get('pets')
  async getPets(@Req() req: { user: { sub: string } }) {
    return this.ownerService.getPets(req.user.sub);
  }

  @Post('pets')
  async createPet(
    @Req() req: { user: { sub: string } },
    @Body() dto: CreatePetDto,
  ) {
    return this.ownerService.createPet(req.user.sub, dto);
  }
}
