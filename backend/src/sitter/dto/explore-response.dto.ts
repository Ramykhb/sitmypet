export class JobRequestDto {
  id: string;
  ownerName: string;
  imageUrl?: string;
  title: string;
  location: string;
  serviceType: string;
  duration: string;
  createdAt: Date;
  price?: number;
  rating: number;
  reviewCount: number;
}

export class ExploreResponseDto {
  requests: JobRequestDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
