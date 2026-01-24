import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { LocationsModule } from './locations/locations.module';
import { PrismaModule } from './prisma/prisma.module';
import { SitterModule } from './sitter/sitter.module';
import { UsersModule } from './users/users.module';
import { OcrModule } from './ocr/ocr.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ContactModule,
    LocationsModule,
    SitterModule,
    OcrModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
