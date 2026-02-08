import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string, userId?: string) {
    const job = await this.prisma.post.findUnique({
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
            profileImageUrl: true,
            emailVerified: true,
            bookingsAsOwner: {
              select: {
                review: {
                  select: {
                    rating: true,
                  },
                },
              },
            },
          },
        },
        pet: true,
        savedBy: userId
          ? {
              where: {
                userId: userId,
              },
            }
          : undefined,
        applications: userId
          ? {
              where: { sitterId: userId },
              select: { id: true },
            }
          : undefined,
      },
    });

    if (!job) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const reviews = job.owner.bookingsAsOwner
      .map((b) => b.review)
      .filter((r) => r !== null);

    const clientRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    const { bookingsAsOwner: __, ...ownerData } = job.owner;
    void __;

    const isApplied = userId
      ? job.applications
        ? job.applications.length > 0
        : false
      : false;

    return {
      ...job,
      service: {
        id: job.service.id,
        name: job.service.name,
      },
      isSaved: job.savedBy ? job.savedBy.length > 0 : false,
      isApplied,
      owner: {
        ...ownerData,
        clientRating,
        reviewsCount: reviews.length,
      },
      savedBy: undefined,
      applications: undefined,
    };
  }
}
