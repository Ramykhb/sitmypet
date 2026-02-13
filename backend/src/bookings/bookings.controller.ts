import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getAllBookings(@Req() req: Request & { user: { id: string } }) {
    const userId = req.user.id;
    return this.bookingsService.findAll(userId);
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string,
    @Req() req: Request & { user: { sub: string } },
  ) {
    const userId = req.user?.sub;
    return this.bookingsService.findOne(id, userId);
  }
}
