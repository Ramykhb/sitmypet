export class TodaysBookingDto {
  id: string;
  ownerName: string;
  petName: string;
  ownerImageURL?: string;
  serviceType: string;
  location: string;
  time: string;
}

export class ClientHistoryDto {
  id: string;
  ownerName: string;
  ownerImageUrl?: string;
}

export class NearbyPostDto {
  id: string;
  title: string;
  location: string;
  serviceType: string;
  duration: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  isSaved: boolean;
}

export class SitterHomeFeedDto {
  todaysBookings: TodaysBookingDto[];
  recentClients: ClientHistoryDto[];
  nearbyPosts: NearbyPostDto[];
}
