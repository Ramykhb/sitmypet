import { IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortBy {
  PRICE_LOW_TO_HIGH = 'price_low',
  PRICE_HIGH_TO_LOW = 'price_high',
  RATING_HIGH_TO_LOW = 'rating',
}

export class ExploreQueryDto {
  @IsOptional()
  @IsString()
  search?: string; // Search by name, location, or service type

  @IsOptional()
  @IsString()
  services?: string; // Comma-separated services to filter by (e.g., "Pet Walking,Pet Sitting")

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy; // Sort by price or rating

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1; // Pagination page number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20; // Items per page
}
