import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId?: string) {
    const bookings = await this.prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        service: {
          select: {
            id: true,
            name: true,
          },
        },
        owner: {
          select: {
            id: true,
            firstname: true,
            profileImageUrl: true,
          },
        },
        sitter: {
          select: {
            id: true,
            firstname: true,
            profileImageUrl: true,
          },
        },
        pet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return bookings.map((booking) => ({
      id: booking.id,
      ownerName: booking.owner.firstname,
      petName: booking.pet.name,
      ownerImageURL: booking.owner.profileImageUrl,
      service: {
        id: booking.service.id,
        name: booking.service.name,
      },
      location: booking.location,
      time: booking.scheduledTime,
      isOwner: userId ? booking.ownerId === userId : false,
      isSitter: userId ? booking.sitterId === userId : false,
    }));
  }

  async findOne(id: string, userId?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        service: {
          select: {
            id: true,
            name: true,
          },
        },
        owner: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            profileImageUrl: true,
          },
        },
        sitter: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            profileImageUrl: true,
          },
        },
        pet: true,
        review: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return {
      ...booking,
      isOwner: userId ? booking.ownerId === userId : false,
      isSitter: userId ? booking.sitterId === userId : false,
    };
  }
}
