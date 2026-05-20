export interface Service {
  id: string;
  nameAr: string;
  price: number;
  durationMinutes: number;
}

export interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  date: string;
  timeSlot: string;
  services: Service[];
  additionalNotes?: string;
  totalCost: number;
  createdAt: number;
}

export interface ShopStatus {
  isOpen: boolean;
  lastUpdated: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  bookingId?: string;
}
