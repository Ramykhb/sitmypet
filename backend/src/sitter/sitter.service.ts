import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExploreQueryDto, SortBy } from './dto/explore-query.dto';
import { ExploreResponseDto, SitterProfileDto } from './dto/explore-response.dto';
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
      roles: {
        has: 'SITTER',
      },
      sitterProfile: {
        isNot: null,
      },
    };

    if (search) {
      where.OR = [
        { firstname: { contains: search, mode: 'insensitive' } },
        { lastname: { contains: search, mode: 'insensitive' } },
        {
          sitterProfile: {
            location: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    if (services) {
      where.sitterProfile = {
        ...where.sitterProfile,
        services: {
          some: {
            serviceType: { contains: services, mode: 'insensitive' },
          },
        },
      };
    }

    const total = await this.prisma.user.count({ where });
    const totalPages = Math.ceil(total / limit);

    const skip = (page - 1) * limit;
    
    const allMatchingSitterIds = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        createdAt: true,
        sitterProfile: {
          select: {
            services: {
              select: {
                price: true,
              },
            },
          },
        },
        bookingsAsSitter: {
          select: {
            review: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
    });

    let sortedSitterIds = allMatchingSitterIds.map((user) => {
      const profile = user.sitterProfile!;
      const serviceOfferings = profile.services;

      const prices = serviceOfferings.map((s) => Number(s.price));
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

      const reviews = user.bookingsAsSitter
        .map((b) => b.review)
        .filter((r) => r !== null);
      const totalRating = reviews.reduce((acc, r) => acc + (r?.rating || 0), 0);
      const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;

      return {
        id: user.id,
        pricePerHour: minPrice,
        rating: avgRating,
        createdAt: user.createdAt,
      };
    });

    if (sortBy === SortBy.PRICE_LOW_TO_HIGH) {
      sortedSitterIds.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortBy === SortBy.PRICE_HIGH_TO_LOW) {
      sortedSitterIds.sort((a, b) => b.pricePerHour - a.pricePerHour);
    } else if (sortBy === SortBy.RATING_HIGH_TO_LOW) {
      sortedSitterIds.sort((a, b) => b.rating - a.rating);
    } else {
      sortedSitterIds.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    }

    const paginatedIds = sortedSitterIds
      .slice(skip, skip + limit)
      .map((s) => s.id);

    let sitters: SitterProfileDto[] = [];
    if (paginatedIds.length > 0) {
      const users = await this.prisma.user.findMany({
        where: { id: { in: paginatedIds } },
        include: {
          sitterProfile: {
            include: {
              services: true,
            },
          },
          bookingsAsSitter: {
            include: {
              review: true,
            },
          },
        },
      });

      const userMap = new Map(users.map((u) => [u.id, u]));

      sitters = paginatedIds
        .map((id) => {
          const user = userMap.get(id);
          if (!user) return null;

          const profile = user.sitterProfile!;
          const serviceOfferings = profile.services;
          const prices = serviceOfferings.map((s) => Number(s.price));
          const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

          const reviews = user.bookingsAsSitter
            .map((b) => b.review)
            .filter((r) => r !== null);
          const sumRating = reviews.reduce(
            (acc, r) => acc + (r?.rating || 0),
            0,
          );
          const avgRating =
            reviews.length > 0 ? sumRating / reviews.length : 0;

          return {
            id: user.id,
            name: `${user.firstname} ${user.lastname}`,
            location: profile.location,
            services: serviceOfferings.map((s) => s.serviceType),
            pricePerHour: minPrice,
            profileImageUrl: user.profileImageUrl ?? undefined,
            rating: Number(avgRating.toFixed(1)),
            reviewCount: reviews.length,
            bio: profile.bio ?? undefined,
            isVerified: user.emailVerified,
          } as SitterProfileDto;
        })
        .filter((s): s is SitterProfileDto => s !== null);
    }

    return {
      sitters,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
