export class SitterProfileDto {
  id: string;
  name: string;
  location: string;
  services: string[];
  pricePerHour: number;
  profileImageUrl?: string;
  rating: number; // Average rating from reviews
  reviewCount: number;
  bio?: string;
  isVerified: boolean; // Whether the sitter is verified
}

export class ExploreResponseDto {
  sitters: SitterProfileDto[];
  total: number; // Total count of sitters matching the query
  page: number;
  limit: number;
  totalPages: number;
}
