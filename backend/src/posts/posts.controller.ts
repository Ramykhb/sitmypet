import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.sub;
    return this.postsService.findOne(id, userId);
  }
}
