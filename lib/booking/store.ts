/**
 * Temporary in-memory booking store for local/dev.
 * Not shared across Netlify serverless instances — replace with the real backend
 * via NEXT_PUBLIC_BOOKING_API_URL when it lands in this workspace.
 */
import { inventoryBySlug, roomsForSlug } from "@/content/floors";
import { rooms } from "@/content/rooms";
import { isValidStay, nightsOf, rangesOverlap } from "./dates";
import type { AvailabilityResponse, AvailabilityStatus, CreateBookingRequest, CreateBookingResponse, StoredBooking } from "./types";

const globalStore = globalThis as typeof globalThis & { __areenBookings?: StoredBooking[] };

const bookings = (): StoredBooking[] => {
  if (!globalStore.__areenBookings) globalStore.__areenBookings = [];
  return globalStore.__areenBookings;
};

const statusFor = (available: number, total: number): AvailabilityStatus => {
  if (available <= 0) return "full";
  if (available <= Math.max(1, Math.floor(total * 0.2))) return "limited";
  return "available";
};

/** Max units of a slug occupied on any single night in [checkIn, checkOut). */
export const peakOccupancy = (slug: string, checkIn: string, checkOut: string): number => {
  const nights = nightsOf(checkIn, checkOut);
  if (nights.length === 0) return 0;

  let peak = 0;
  for (const night of nights) {
    const nightEnd = (() => {
      const d = new Date(`${night}T12:00:00Z`);
      d.setUTCDate(d.getUTCDate() + 1);
      return d.toISOString().slice(0, 10);
    })();

    const taken = bookings().filter(
      (b) => b.slug === slug && rangesOverlap(b.checkIn, b.checkOut, night, nightEnd),
    ).length;
    if (taken > peak) peak = taken;
  }
  return peak;
};

export const getAvailability = (checkIn: string, checkOut: string): AvailabilityResponse => {
  if (!isValidStay(checkIn, checkOut)) {
    throw new Error("Invalid stay dates");
  }

  const types = rooms.map((room) => {
    const total = inventoryBySlug[room.slug] ?? 0;
    const available = Math.max(0, total - peakOccupancy(room.slug, checkIn, checkOut));
    return {
      slug: room.slug,
      total,
      available,
      status: statusFor(available, total),
    };
  });

  return { checkIn, checkOut, types };
};

const freeRoomNumbers = (slug: string, checkIn: string, checkOut: string): number[] => {
  const taken = new Set(
    bookings()
      .filter((b) => b.slug === slug && rangesOverlap(b.checkIn, b.checkOut, checkIn, checkOut))
      .map((b) => b.roomNumber),
  );
  return roomsForSlug(slug)
    .map((r) => r.number)
    .filter((n) => !taken.has(n));
};

export const createBooking = (input: CreateBookingRequest): CreateBookingResponse => {
  const { checkIn, checkOut, slug, guests, locale } = input;
  if (!isValidStay(checkIn, checkOut)) {
    throw new Error("Invalid stay dates");
  }
  if (!rooms.some((r) => r.slug === slug)) {
    throw new Error("Unknown room type");
  }

  const free = freeRoomNumbers(slug, checkIn, checkOut);
  if (free.length === 0) {
    const err = new Error("Fully booked") as Error & { code: string };
    err.code = "FULL";
    throw err;
  }

  const roomNumber = free[0];
  const booking: StoredBooking = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    slug,
    roomNumber,
    checkIn,
    checkOut,
    guests,
    locale,
    createdAt: new Date().toISOString(),
  };
  bookings().push(booking);

  return {
    id: booking.id,
    slug: booking.slug,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    roomNumber: booking.roomNumber,
  };
};

/** Resolve "any" to the first type that still has inventory for the dates. */
export const pickAnySlug = (checkIn: string, checkOut: string): string | null => {
  const avail = getAvailability(checkIn, checkOut);
  return avail.types.find((t) => t.available > 0)?.slug ?? null;
};
