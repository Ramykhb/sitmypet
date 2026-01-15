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
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  @Get('me')
  async me(@Req() req: { user: { sub: string } }) {
    return this.usersService.getMe(req.user.sub);
  }

  @Post('me/profile-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `profile-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadProfileImage(
    @Req() req: { user: { sub: string } },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
      throw new BadRequestException('Invalid file type');
    }
    const imageUrl = `/uploads/${file.filename}`;
    return this.usersService.updateProfileImage(req.user.sub, imageUrl);
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/ids',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `id-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadIdDocument(
    @Req() req: { user: { sub: string } },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (
      !file.mimetype.match(
        /^image\/(jpg|jpeg|png|heic|heif)$|^application\/pdf$/,
      )
    ) {
      throw new BadRequestException('Invalid file type. Supported types: JPG, JPEG, PNG, HEIC, PDF');
    }
    const documentUrl = `/uploads/ids/${file.filename}`;
    return this.usersService.updateIdDocument(req.user.sub, documentUrl);
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
}
