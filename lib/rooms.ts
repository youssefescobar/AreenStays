import type { T } from "@/lib/i18n";

/** A room type as served by the backend's public /api/rooms (edited in the admin app → Rooms). */
export type Room = {
  slug: string;
  name: T;
  summary: T;
  description: T;
  size: number; // m²
  guests: number;
  bed: T;
  view: T;
  price: number; // SAR, live base price per night
  amenities: T[];
  /** Full photo URLs. Empty = branded placeholder. */
  images: string[];
  /** Physical room numbers of this type; floor = Math.floor(number / 100). */
  units: number[];
};

export const API_URL = (process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:4000").replace(/\/$/, "");

/**
 * Pages re-check every 60 seconds. Errors are thrown on purpose: a failed refresh keeps the
 * last good page instead of caching an empty room list.
 */
export async function getRooms(): Promise<Room[]> {
  const res = await fetch(`${API_URL}/api/rooms`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Rooms API returned ${res.status}`);
  return ((await res.json()) as { rooms: Room[] }).rooms;
}

export async function getRoom(slug: string): Promise<Room | undefined> {
  return (await getRooms()).find((r) => r.slug === slug);
}
