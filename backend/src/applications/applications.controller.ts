import {
  Controller,
  Post,
  Delete,
  Get,
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

  @Get(':postId')
  async getApplicationsByPostId(
    @Param('postId') postId: string,
    @Req() req: { user: { sub: string } },
  ) {
    return this.applicationsService.getApplicationsByPostId(
      postId,
      req.user.sub,
    );
  }

  @Post(':id/accept')
  async acceptApplication(
    @Param('id') applicationId: string,
    @Req() req: { user: { sub: string } },
  ) {
    return this.applicationsService.acceptApplication(
      applicationId,
      req.user.sub,
    );
  }

  @Post(':id/reject')
  async rejectApplication(
    @Param('id') applicationId: string,
    @Req() req: { user: { sub: string } },
  ) {
    return this.applicationsService.rejectApplication(
      applicationId,
      req.user.sub,
    );
  }
}
