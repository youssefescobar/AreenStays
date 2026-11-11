import { rooms } from "@/content/rooms";
import { roomsForSlug } from "@/content/floors";

// Room catalog for the AI concierge backend: it shows room cards, prices requests, and checks
// availability per physical room number (units) from the floor chart.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    rooms: rooms.map(({ images: _images, description: _description, ...room }) => ({
      ...room,
      units: roomsForSlug(room.slug).map((r) => r.number),
    })),
  });
}
