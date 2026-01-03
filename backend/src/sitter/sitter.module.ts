import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SitterController } from './sitter.controller';
import { SitterService } from './sitter.service';

@Module({
  imports: [PrismaModule],
  controllers: [SitterController],
  providers: [SitterService],
})
export class SitterModule {}
