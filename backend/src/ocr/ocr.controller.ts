import { Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OcrService } from './ocr.service';

@UseGuards(JwtAuthGuard)
@Controller("ocr")
export class OcrController {

  constructor(private ocrService: OcrService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file, @Req() req) {
    return this.ocrService.handleUpload(file, req.user.sub);
  }

  @Get("status")
  async getStatus(@Req() req) {
    return this.ocrService.getVerificationStatus(req.user.sub);
  }

  @Post("confirm")
  async confirm(@Req() req) {
    return this.ocrService.confirmDocument(req.user.sub);
  }
}
