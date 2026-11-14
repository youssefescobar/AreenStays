export type AvailabilityStatus = "available" | "limited" | "full";

export type AvailabilityType = {
  slug: string;
  total: number;
  available: number;
  status: AvailabilityStatus;
};

export type AvailabilityResponse = {
  checkIn: string;
  checkOut: string;
  types: AvailabilityType[];
};

export type CreateBookingRequest = {
  checkIn: string;
  checkOut: string;
  slug: string;
  guests: string;
  locale: string;
  guestName: string;
  phone: string; // E.164, e.g. "+966512345678"
};

export type CreateBookingResponse = {
  id: string;
  slug: string;
  checkIn: string;
  checkOut: string;
  roomNumber: number;
};
