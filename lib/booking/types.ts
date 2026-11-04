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
};

export type CreateBookingResponse = {
  id: string;
  slug: string;
  checkIn: string;
  checkOut: string;
  roomNumber: number;
};

export type StoredBooking = {
  id: string;
  slug: string;
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  guests: string;
  locale: string;
  createdAt: string;
};
