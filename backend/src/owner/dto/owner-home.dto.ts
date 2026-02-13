import { BookingStatus } from '@prisma/client';

export class TodaysBookingDto {
  id: string;
  status: BookingStatus;
  sitterName: string;
  sitterImageURL?: string;
  service: {
    id: string;
    name: string;
  };
  location: string;
  time: string;
}

export class SitterHistoryDto {
  id: string;
  sitterName: string;
  sitterImageUrl?: string;
  location: string;
  lastBookingDate: Date;
}

export class NearbySittersDto {
  id: string;
  title: string;
  location: string;
  service: {
    id: string;
    name: string;
  };
  duration: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  isSaved: boolean;
}

export class OwnerHomeFeedDto {
  todaysBookings: TodaysBookingDto[];
  recentSitters: SitterHistoryDto[];
  nearbySitters: NearbySittersDto[] | null;
}
