import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  breed?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
