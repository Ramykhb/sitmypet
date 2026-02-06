import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getAllBookings(@Req() req) {
    return this.bookingsService.findAll(req.user?.id);
  }

  //   @Get(':id')
  //   getBooking(@Param('id') id: string, @Req() req) {
  //     return this.bookingsService.findOne(id, req.user?.id);
  //   }
}
