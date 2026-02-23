import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (
      exception instanceof Prisma.PrismaClientKnownRequestError &&
      exception.code === 'P1001'
    ) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        message: 'Database unavailable',
      });
    }

    return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      message: 'Service temporarily unavailable',
    });
  }
}
