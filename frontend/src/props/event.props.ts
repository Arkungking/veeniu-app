export interface OrganizerProps {
  id: string;
  name: string;
  profilePicture: string | null;
}

export interface TicketProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  eventId: string;
  event: {
    title: string;
  };
}

export interface VoucherProps {
  id: string;
  code: string;
  value: number;
  eventId: string;
  expiresAt: string;
  event: {
    title: string;
  };
}

export interface EventDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  location: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  price: number;
  totalSeats: number;
  availableSeats: number | null;
  organizerId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  deletedAt: string | null;
  organizer: OrganizerProps;
  tickets: TicketProps[];
  vouchers: VoucherProps[];
}
