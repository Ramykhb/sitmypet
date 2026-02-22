import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'P1001') {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        message: 'Database unavailable',
      });
    }

    return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      message: 'Service temporarily unavailable',
    });
  }
}
