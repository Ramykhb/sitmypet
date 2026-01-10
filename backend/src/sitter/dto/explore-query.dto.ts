import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum SortBy {
  DEFAULT = '',
  PRICE_LOW_TO_HIGH = 'price_low',
  PRICE_HIGH_TO_LOW = 'price_high',
  RATING_HIGH_TO_LOW = 'rating',
  MOST_REVIEWS = 'most_reviews',
  //NEAREST_FIRST = 'nearest_first',
  HIGHEST_RATED = 'highest_rated',
  LOWEST_PRICE = 'lowest_price',
  HIGHEST_PRICE = 'highest_price',
}

export class ExploreQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  services?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minRating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;
}
