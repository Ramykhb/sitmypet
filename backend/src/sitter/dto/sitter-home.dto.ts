import { BookingStatus } from '@prisma/client';

export class TodaysBookingDto {
  id: string;
  status: BookingStatus;
  ownerName: string;
  petName: string;
  ownerImageURL?: string;
  service: {
    id: string;
    name: string;
  };
  location: string;
  time: string;
}

export class ClientHistoryDto {
  id: string;
  ownerName: string;
  ownerImageUrl?: string;
  location: string;
  lastBookingDate: Date;
}

export class NearbyPostDto {
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

export class SitterHomeFeedDto {
  todaysBookings: TodaysBookingDto[];
  recentClients: ClientHistoryDto[];
  nearbyPosts: NearbyPostDto[] | null;
}
