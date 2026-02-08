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
}
