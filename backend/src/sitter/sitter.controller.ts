import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExploreQueryDto } from './dto/explore-query.dto';
import { SitterService } from './sitter.service';

@UseGuards(JwtAuthGuard)
@Controller('sitter')
export class SitterController {
  constructor(private readonly sitterService: SitterService) { }

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

  @Get('explore')
  async explore(
    @Query() query: ExploreQueryDto,
    @Req()
    req: {
      user: {
        sub: string;
      };
    },
  ) {
    const userId = req.user.sub;
    return this.sitterService.explore(query, userId);
  }

  @Post('posts/:id/toggle-save')
  async toggleSavePost(
    @Param('id') postId: string,
    @Req() req: { user: { sub: string } },
  ) {
    const userId = req.user.sub;
    return this.sitterService.toggleSavedPost(userId, postId);
  }

  @Get('saved-posts')
  async getSavedPosts(@Req() req: { user: { sub: string } }) {
    const userId = req.user.sub;
    return this.sitterService.getSavedPosts(userId);
  }
}
