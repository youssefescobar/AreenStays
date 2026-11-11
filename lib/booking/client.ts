import type { AvailabilityResponse, CreateBookingRequest, CreateBookingResponse } from "./types";

// Same backend as the AI chat, so website and chat bookings share one availability and land in the admin app.
const baseUrl = () =>
  (process.env.NEXT_PUBLIC_BOOKING_API_URL || process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:4000").replace(/\/$/, "");

export const fetchAvailability = async (checkIn: string, checkOut: string): Promise<AvailabilityResponse> => {
  const url = `${baseUrl()}/api/availability?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Availability failed (${res.status})`);
  }
  return res.json() as Promise<AvailabilityResponse>;
};

export const createBooking = async (body: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const url = `${baseUrl()}/api/bookings`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = new Error(`Booking failed (${res.status})`) as Error & { status: number };
    err.status = res.status;
    throw err;
  }
  return res.json() as Promise<CreateBookingResponse>;
};
