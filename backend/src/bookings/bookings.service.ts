import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId?: string) {
    const bookings = await this.prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        service: true,
        owner: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            profileImageUrl: true,
            emailVerified: true,
          },
        },
        sitter: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            profileImageUrl: true,
            emailVerified: true,
          },
        },
        pet: true,
      },
    });

    return bookings.map((booking) => ({
      ...booking,
      isOwner: userId ? booking.ownerId === userId : false,
      isSitter: userId ? booking.sitterId === userId : false,
    }));
  }

  // in case zedna search bar baaden

  //   async findOne(id: string, userId?: string) {
  //     const booking = await this.prisma.booking.findUnique({
  //       where: { id },
  //       include: {
  //         service: true,
  //         owner: {
  //           select: {
  //             id: true,
  //             firstname: true,
  //             lastname: true,
  //             profileImageUrl: true,
  //             emailVerified: true,
  //           },
  //         },
  //         sitter: {
  //           select: {
  //             id: true,
  //             firstname: true,
  //             lastname: true,
  //             profileImageUrl: true,
  //             emailVerified: true,
  //           },
  //         },
  //         pet: true,
  //         review: true,
  //       },
  //     });

  //     if (!booking) {
  //       throw new NotFoundException(`Booking with ID ${id} not found`);
  //     }

  //     return {
  //       ...booking,
  //       isOwner: userId ? booking.ownerId === userId : false,
  //       isSitter: userId ? booking.sitterId === userId : false,
  //     };
  //   }
}
