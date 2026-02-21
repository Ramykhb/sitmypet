import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { R2Service } from '../storage/r2.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly r2Service: R2Service,
  ) {}

  @Post()
  async createPost(
    @Req() req: { user: { sub: string } },
    @Body() dto: CreatePostDto,
  ) {
    return await this.postsService.create(req.user.sub, dto);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPostImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
      throw new BadRequestException('Invalid file type');
    }

    const uploaded = await this.r2Service.upload(
      file.buffer,
      file.originalname,
      file.mimetype,
      'uploads/posts',
    );

    return { imageUrl: uploaded.url };
  }

  @Get()
  async getMyPosts(@Req() req: { user: { sub: string } }) {
    return await this.postsService.findMyPosts(req.user.sub);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: { user: { sub: string } }) {
    const userId = req.user.sub;
    return await this.postsService.findOne(id, userId);
  }
}
