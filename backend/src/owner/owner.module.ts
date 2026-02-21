import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
