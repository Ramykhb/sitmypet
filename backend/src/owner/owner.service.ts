import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OwnerHomeFeedDto } from './dto/owner-home.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomeFeed(userId: string): Promise<OwnerHomeFeedDto> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookings = await this.prisma.booking.findMany({
      where: {
        ownerId: userId,
        scheduledTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        sitter: true,
        pet: true,
        service: true,
      },
      orderBy: {
        scheduledTime: 'asc',
      },
    });

    const todaysBookings = bookings.map((booking) => ({
      id: booking.id,
      sitterName: `${booking.sitter.firstname} ${booking.sitter.lastname}`,
      sitterImageURL: booking.sitter.profileImageUrl ?? undefined,
      service: {
        id: booking.service.id,
        name: booking.service.name,
      },
      status: booking.status,
      location: booking.location,
      time: booking.scheduledTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    const completedBookings = await this.prisma.booking.findMany({
      where: {
        ownerId: userId,
        status: 'COMPLETED',
      },
      include: {
        sitter: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const uniqueSitters = new Map();
    for (const booking of completedBookings) {
      if (!uniqueSitters.has(booking.sitterId) && uniqueSitters.size < 10) {
        uniqueSitters.set(booking.sitterId, {
          id: booking.sitter.id,
          sitterName: `${booking.sitter.firstname} ${booking.sitter.lastname}`,
          sitterImageUrl: booking.sitter.profileImageUrl ?? undefined,
          location: booking.location,
          lastBookingDate: booking.scheduledTime,
        });
      }
    }
    const recentSitters = Array.from(uniqueSitters.values());
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { location: true },
    });

    const locationName = profile?.location?.name;

    type PostWithRelations = Prisma.PostGetPayload<{
      include: {
        service: true;
        owner: {
          include: {
            bookingsAsOwner: {
              include: {
                review: true;
              };
            };
          };
        };
        savedBy: true;
      };
    }>;

    let posts: PostWithRelations[] = [];
    let nearbySitters: any[] | null = null;

    if (locationName) {
      posts = await this.prisma.post.findMany({
        where: {
          status: 'OPEN',
          location: {
            contains: locationName,
            mode: 'insensitive',
          },
        },
        include: {
          service: true,
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

      nearbySitters = posts.map((post) => {
        const reviews = post.owner.bookingsAsOwner
          .map((booking) => booking.review)
          .filter((review) => review !== null);

        const reviewCount = reviews.length;
        const rating =
          reviewCount > 0
            ? reviews.reduce((sum, review) => sum + (review?.rating || 0), 0) /
              reviewCount
            : 0;

        return {
          id: post.id,
          title: post.title,
          location: post.location,
          service: {
            id: post.service.id,
            name: post.service.name,
          },
          duration: post.duration,
          rating: Number(rating.toFixed(1)),
          reviewCount: reviewCount,
          imageUrl: post.imageUrl ?? undefined,
          isSaved: post.savedBy.length > 0,
        };
      });
    }

    return {
      todaysBookings,
      recentSitters,
      nearbySitters,
    };
  }
}
