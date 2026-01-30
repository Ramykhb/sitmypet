import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string, userId?: string) {
    const job = await this.prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        ownerId: true,
        title: true,
        location: true,
        serviceType: true,
        duration: true,
        imageUrl: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        price: true,
        description: true,
        petId: true,
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
          : false,
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

    return {
      ...job,
      isSaved: job.savedBy ? job.savedBy.length > 0 : false,
      owner: {
        ...ownerData,
        clientRating,
        reviewsCount: reviews.length,
      },
      savedBy: undefined,
    };
  }
}
