export class JobRequestDto {
  id: string;
  ownerName: string;
  ownerImageUrl?: string;
  title: string;
  location: string;
  serviceType: string;
  duration: string; // e.g., "Jan 12 - Jan 14"
  createdAt: Date;
  // Potentially useful fields:
  // description?: string;
  // price?: number;
}

export class ExploreResponseDto {
  requests: JobRequestDto[];
  total: number; // Total count of requests matching the query
  page: number;
  limit: number;
  totalPages: number;
}
