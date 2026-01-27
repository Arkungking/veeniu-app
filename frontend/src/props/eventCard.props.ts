export interface EventCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  price: number;
  totalSeats: number;
  availableSeats: number | null;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
