import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SitterHomeFeedDto } from './dto/sitter-home.dto';

@Injectable()
export class SitterService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomeFeed(userId: string): Promise<SitterHomeFeedDto> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookings = await this.prisma.booking.findMany({
      where: {
        sitterId: userId,
        scheduledTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        owner: true,
        pet: true,
      },
      orderBy: {
        scheduledTime: 'asc',
      },
    });

    const todaysBookings = bookings.map((booking) => ({
      id: booking.id,
      ownerName: `${booking.owner.firstname} ${booking.owner.lastname}`,
      petName: booking.pet.name,
      ownerImageURL: booking.owner.profileImageUrl ?? undefined,
      serviceType: booking.serviceType,
      location: booking.location,
      time: booking.scheduledTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      hasNotification: booking.hasNotification,
    }));

    const completedBookings = await this.prisma.booking.findMany({
      where: {
        sitterId: userId,
        status: 'COMPLETED',
      },
      include: {
        owner: true,
      },
      distinct: ['ownerId'],
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
    });

    const recentClients = completedBookings.map((booking) => ({
      id: booking.owner.id,
      ownerName: `${booking.owner.firstname} ${booking.owner.lastname}`,
      ownerImageUrl: booking.owner.profileImageUrl ?? undefined,
    }));

    const requests = await this.prisma.request.findMany({
      where: {
        status: 'OPEN',
      },
      include: {
        savedBy: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    const nearbyRequests = requests.map((request) => ({
      id: request.id,
      title: request.title,
      location: request.location,
      serviceType: request.serviceType,
      duration: request.duration,
      rating: undefined,
      reviewCount: undefined,
      imageUrl: request.imageUrl ?? undefined,
      isSaved: request.savedBy.length > 0,
    }));

    return {
      todaysBookings,
      recentClients,
      nearbyRequests,
    };
  }
}
