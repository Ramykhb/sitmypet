import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Req() req: { user: { sub: string } },
    @Body() dto: CreatePostDto,
  ) {
    return await this.postsService.create(req.user.sub, dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: { user: { sub: string } }) {
    const userId = req.user.sub;
    return await this.postsService.findOne(id, userId);
  }
}
