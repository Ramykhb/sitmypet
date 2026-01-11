import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.location.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
