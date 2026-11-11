import { rooms } from "@/content/rooms";

// Room catalog for the AI concierge backend (it shows room cards and prices booking requests from this).
export const dynamic = "force-static";

export function GET() {
  return Response.json({ rooms: rooms.map(({ images: _images, description: _description, ...room }) => room) });
}
