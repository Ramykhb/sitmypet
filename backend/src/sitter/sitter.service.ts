import { Injectable, NotFoundException } from '@nestjs/common';
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

  async explore(query: ExploreQueryDto, userId: string): Promise<ExploreResponseDto> {
    const {
      search,
      services,
      location,
      sortBy,
      minRating,
      page = 1,
      limit = 20,
    } = query;

    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    const sitterLocation = profile?.location || '';
    
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

    const requests = await this.prisma.request.findMany({
      where,
      include: {
        owner: {
          include: {
            bookingsAsOwner: {
              where: { status: 'COMPLETED' },
              include: { review: true },
            },
          },
        },
        savedBy: {
          where: { userId },
        },
      },
    });

    let processedRequests = requests.map((req) => {
      const reviews = req.owner.bookingsAsOwner
        .map((b) => b.review)
        .filter((r) => r !== null);
      
      const totalRating = reviews.reduce((sum, r) => sum + (r?.rating || 0), 0);
      const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
      const reviewCount = reviews.length;

      const isNear = sitterLocation && req.location.toLowerCase().includes(sitterLocation.toLowerCase());

      return {
        ...req,
        avgRating,
        reviewCount,
        isNear,
      };
    });

    if (minRating !== undefined) {
      processedRequests = processedRequests.filter((r) => r.avgRating >= minRating);
    }
    if (sortBy === SortBy.HIGHEST_RATED || sortBy === SortBy.RATING_HIGH_TO_LOW) {
      processedRequests.sort((a, b) => b.avgRating - a.avgRating);
    } else if (sortBy === SortBy.MOST_REVIEWS) {
      processedRequests.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === SortBy.LOWEST_PRICE || sortBy === SortBy.PRICE_LOW_TO_HIGH) {
      processedRequests.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === SortBy.HIGHEST_PRICE || sortBy === SortBy.PRICE_HIGH_TO_LOW) {
      processedRequests.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === SortBy.NEAREST_FIRST) {
      processedRequests.sort((a, b) => {
        if (a.isNear && !b.isNear) return -1;
        if (!a.isNear && b.isNear) return 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    } else {
      processedRequests.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    const total = processedRequests.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedRequests = processedRequests.slice(start, end);

    const requestDtos = paginatedRequests.map((req) => ({
      id: req.id,
      ownerName: `${req.owner.firstname} ${req.owner.lastname}`,
      imageUrl: req.imageUrl ?? undefined,
      title: req.title,
      location: req.location,
      serviceType: req.serviceType,
      duration: req.duration,
      createdAt: req.createdAt,
      price: req.price ? Number(req.price) : undefined,
      rating: Number(req.avgRating.toFixed(1)),
      reviewCount: req.reviewCount,
      isSaved: req.savedBy.length > 0,
    }));

    return {
      requests: requestDtos,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async toggleSavedPost(userId: string, requestId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Post not found');
    }

    const existingSave = await this.prisma.savedRequest.findUnique({
      where: {
        userId_requestId: {
          userId,
          requestId,
        },
      },
    });

    if (existingSave) {
      await this.prisma.savedRequest.delete({
        where: { id: existingSave.id },
      });
      return { saved: false };
    } else {
      await this.prisma.savedRequest.create({
        data: {
          userId,
          requestId,
        },
      });
      return { saved: true };
    }
  }

  async getSavedPosts(userId: string) {
    const savedRequests = await this.prisma.savedRequest.findMany({
      where: { userId },
      include: {
        request: {
          include: {
            owner: {
              include: {
                bookingsAsOwner: {
                  where: { status: 'COMPLETED' },
                  include: { review: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      requests: savedRequests.map((sr) => {
        const req = sr.request;
        const reviews = req.owner.bookingsAsOwner
          .map((b) => b.review)
          .filter((r) => r !== null);
        
        const totalRating = reviews.reduce((sum, r) => sum + (r?.rating || 0), 0);
        const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        const reviewCount = reviews.length;

        return {
          id: req.id,
          title: req.title,
          location: req.location,
          serviceType: req.serviceType,
          duration: req.duration,
          imageUrl: req.imageUrl ?? undefined,
          ownerName: `${req.owner.firstname} ${req.owner.lastname}`,
          price: req.price ? Number(req.price) : undefined,
          rating: Number(avgRating.toFixed(1)),
          reviewCount: reviewCount,
          isSaved: true,
          createdAt: req.createdAt,
        };
      }),
    };
  }
}
