export interface OrganizerData {
  id: string;
  name: string;
}

export interface EventData {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  startDate: string;
  price: number;
  organizer: OrganizerData;
}

export interface TransactionData {
  finalAmount: number;
}

export interface TicketData {
  id: string;
  name: string;
  price: number;
  stock: number;
  event: EventData;
  transaction: TransactionData;
}
