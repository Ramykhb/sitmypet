import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExploreQueryDto, SortBy } from './dto/explore-query.dto';
import { ExploreResponseDto } from './dto/explore-response.dto';
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
    }));

    const completedBookings = await this.prisma.booking.findMany({
      where: {
        sitterId: userId,
        status: 'COMPLETED',
      },
      include: {
        owner: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const uniqueOwners = new Map();
    for (const booking of completedBookings) {
      if (!uniqueOwners.has(booking.ownerId) && uniqueOwners.size < 10) {
        uniqueOwners.set(booking.ownerId, {
          id: booking.owner.id,
          ownerName: `${booking.owner.firstname} ${booking.owner.lastname}`,
          ownerImageUrl: booking.owner.profileImageUrl ?? undefined,
        });
      }
    }
    const recentClients = Array.from(uniqueOwners.values());

    const requests = await this.prisma.request.findMany({
      where: {
        status: 'OPEN',
      },
      include: {
        owner: {
          include: {
            bookingsAsOwner: {
              where: {
                status: 'COMPLETED',
              },
              include: {
                review: true,
              },
            },
          },
        },
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

    const nearbyRequests = requests.map((request) => {
      const reviews = request.owner.bookingsAsOwner
        .map((booking) => booking.review)
        .filter((review) => review !== null);

      const reviewCount = reviews.length;
      const rating =
        reviewCount > 0
          ? reviews.reduce((sum, review) => sum + (review?.rating || 0), 0) /
            reviewCount
          : 0;

      return {
        id: request.id,
        title: request.title,
        location: request.location,
        serviceType: request.serviceType,
        duration: request.duration,
        rating: Number(rating.toFixed(1)),
        reviewCount: reviewCount,
        imageUrl: request.imageUrl ?? undefined,
        isSaved: request.savedBy.length > 0,
      };
    });

    return {
      todaysBookings,
      recentClients,
      nearbyRequests,
    };
  }

  async explore(query: ExploreQueryDto): Promise<ExploreResponseDto> {
    const {
      search,
      services,
      location,
      sortBy,
      page = 1,
      limit = 20,
    } = query;

    const where: any = {
      status: 'OPEN',
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        {
          owner: {
            OR: [
              { firstname: { contains: search, mode: 'insensitive' } },
              { lastname: { contains: search, mode: 'insensitive' } },
            ],
          },
        },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (services) {
      where.serviceType = { contains: services, mode: 'insensitive' };
    }

    const total = await this.prisma.request.count({ where });
    const totalPages = Math.ceil(total / limit);

    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: 'desc' };

    if (sortBy === SortBy.PRICE_LOW_TO_HIGH || sortBy === SortBy.PRICE_HIGH_TO_LOW) {
    } else if (sortBy === SortBy.RATING_HIGH_TO_LOW) {
    } else {
       orderBy = { createdAt: 'desc' };
    }

    const requests = await this.prisma.request.findMany({
      where,
      include: {
        owner: true,
      },
      orderBy,
      skip,
      take: limit,
    });

    const requestDtos = requests.map((req) => ({
      id: req.id,
      ownerName: `${req.owner.firstname} ${req.owner.lastname}`,
      ownerImageUrl: req.owner.profileImageUrl ?? undefined,
      title: req.title,
      location: req.location,
      serviceType: req.serviceType,
      duration: req.duration,
      createdAt: req.createdAt,
    }));

    return {
      requests: requestDtos,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
