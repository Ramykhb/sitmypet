import {
  Controller,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('apply/:postId')
  async apply(
    @Param('postId') postId: string,
    @Req() req: { user: { sub: string } },
  ) {
    return this.applicationsService.apply(postId, req.user.sub);
  }

  @Delete('withdraw/:postId')
  async withdraw(
    @Param('postId') postId: string,
    @Req() req: { user: { sub: string } },
  ) {
    return this.applicationsService.withdraw(postId, req.user.sub);
  }
}
