import type { Room } from "@/content/rooms";

const API = (process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:4000").replace(/\/$/, "");

/**
 * Base nightly prices set by staff in the admin app (Rates). Pages re-check every 5 minutes;
 * if the API is unreachable the price in content/rooms.ts is shown instead.
 */
async function livePrices(): Promise<Record<string, number>> {
  try {
    const res = await fetch(`${API}/api/rates`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    return ((await res.json()) as { prices?: Record<string, number> }).prices ?? {};
  } catch {
    return {};
  }
}

export async function livePrice(room: Pick<Room, "slug" | "price">): Promise<number> {
  return (await livePrices())[room.slug] ?? room.price;
}
