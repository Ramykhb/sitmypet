import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  Param,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';
import { R2Service } from '../storage/r2.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { OcrService } from '../ocr/ocr.service';
import { UserReviewDto } from './dto/user-review.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ocrService: OcrService,
    private readonly r2Service: R2Service,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Get('me')
  async me(@Req() req: { user: { sub: string } }) {
    return this.usersService.getMe(req.user.sub);
  }

  @Post('me/profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Req() req: { user: { sub: string } },
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
      'uploads/pfps',
    );

    return this.usersService.updateProfileImage(req.user.sub, uploaded.url);
  }

  @Patch('me')
  async updateProfile(
    @Req() req: { user: { sub: string } },
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.usersService.updateProfile(req.user.sub, dto);

    if (dto.email) {
      await this.authService.resendEmailOtp(dto.email);
    }

    return user;
  }

  @Post('me/id-document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadIdDocument(
    @Req() req: { user: { sub: string } },
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (
      !file.mimetype.match(
        /^image\/(jpg|jpeg|png|heic|heif)$|^application\/pdf$/,
      )
    ) {
      throw new BadRequestException(
        'Invalid file type. Supported types: JPG, JPEG, PNG, HEIC, PDF',
      );
    }

    const res = await this.ocrService.handleUpload(file, req.user.sub);
    return res;
  }

  @Patch('me/password')
  async changePassword(
    @Req() req: { user: { sub: string } },
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      req.user.sub,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @Delete('me')
  async deleteAccount(
    @Req() req: { user: { sub: string } },
    @Body() dto: DeleteAccountDto,
  ) {
    return this.usersService.deleteAccount(req.user.sub, dto.password);
  }

  @Get(':id/profile')
  async getUserProfile(
    @Req() req: { user: { sub: string } },
    @Param('id') targetUserId: string,
  ) {
    return this.usersService.getUserProfile(targetUserId, req.user?.sub);
  }

  @Post(':id/reviews')
  async reviewUser(
    @Req() req: { user: { sub: string } },
    @Param('id') targetUserId: string,
    @Body() dto: UserReviewDto,
  ) {
    return this.usersService.reviewUser(req.user.sub, targetUserId, dto.rating);
  }
}
