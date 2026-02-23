import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async apply(postId: string, sitterId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existing = await this.prisma.application.findFirst({
      where: {
        postId,
        sitterId,
      },
    });

    if (existing) {
      throw new BadRequestException('Already applied to this job');
    }

    return this.prisma.application.create({
      data: {
        postId,
        sitterId,
        status: 'PENDING',
        updatedAt: new Date(),
      },
      select: {
        id: true,
        postId: true,
        sitterId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async withdraw(postId: string, sitterId: string) {
    const application = await this.prisma.application.findFirst({
      where: {
        postId,
        sitterId,
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    await this.prisma.application.delete({
      where: { id: application.id },
    });

    return { success: true };
  }

  async getApplicationsByPostId(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.ownerId !== userId) {
      throw new BadRequestException(
        'You do not have permission to view these applications',
      );
    }

    return this.prisma.application.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        sitter: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            profileImageUrl: true,
            profile: {
              select: {
                location: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
