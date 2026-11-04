import type { T } from "@/lib/i18n";

export type BedKind = "king" | "twin";

export type FloorRoom = {
  number: number;
  bed: BedKind;
};

export type Floor = {
  level: number;
  rooms: FloorRoom[];
};

/** Physical inventory from the hotel floor chart. Exact numbers are confirmed at booking. */
export const floors: Floor[] = [
  {
    level: 7,
    rooms: [
      { number: 701, bed: "twin" },
      { number: 702, bed: "king" },
      { number: 703, bed: "king" },
      { number: 704, bed: "twin" },
    ],
  },
  {
    level: 6,
    rooms: [
      { number: 601, bed: "twin" },
      { number: 602, bed: "king" },
      { number: 603, bed: "king" },
      { number: 604, bed: "twin" },
      { number: 605, bed: "twin" },
      { number: 606, bed: "king" },
      { number: 607, bed: "king" },
      { number: 608, bed: "twin" },
    ],
  },
  {
    level: 5,
    rooms: [
      { number: 501, bed: "twin" },
      { number: 502, bed: "king" },
      { number: 503, bed: "king" },
      { number: 504, bed: "twin" },
      { number: 505, bed: "twin" },
      { number: 506, bed: "king" },
      { number: 507, bed: "king" },
      { number: 508, bed: "twin" },
    ],
  },
  {
    level: 4,
    rooms: [
      { number: 401, bed: "king" },
      { number: 402, bed: "king" },
      { number: 403, bed: "king" },
      { number: 404, bed: "king" },
      { number: 405, bed: "king" },
      { number: 406, bed: "king" },
      { number: 407, bed: "king" },
      { number: 408, bed: "king" },
    ],
  },
  {
    level: 3,
    rooms: [
      { number: 301, bed: "king" },
      { number: 302, bed: "king" },
      { number: 303, bed: "king" },
      { number: 304, bed: "king" },
      { number: 305, bed: "king" },
      { number: 306, bed: "king" },
      { number: 307, bed: "king" },
      { number: 308, bed: "king" },
    ],
  },
  {
    level: 2,
    rooms: [
      { number: 201, bed: "king" },
      { number: 202, bed: "king" },
      { number: 203, bed: "king" },
      { number: 204, bed: "king" },
      { number: 205, bed: "king" },
      { number: 206, bed: "king" },
    ],
  },
  {
    level: 1,
    rooms: [
      { number: 101, bed: "king" },
      { number: 102, bed: "king" },
    ],
  },
];

export const floorNote: T = {
  en: "Room numbers show our layout. Your exact room is confirmed when we reply on WhatsApp.",
  ar: "أرقام الغرف توضح توزيعنا. يتم تأكيد غرفتك عند ردنا على واتساب.",
};

export const bedLabels: Record<BedKind, T> = {
  king: { en: "King bed", ar: "سرير كبير" },
  twin: { en: "2 twin beds", ar: "سريران منفصلان" },
};

export const floorLabel = (level: number, locale: keyof T): string =>
  locale === "ar" ? `الطابق ${level}` : `Floor ${level}`;

export const bedToSlug: Record<BedKind, string> = {
  king: "king-room",
  twin: "twin-room",
};

export const slugToBed: Record<string, BedKind> = {
  "king-room": "king",
  "twin-room": "twin",
};

/** All physical rooms flattened from the floor chart. */
export const allRooms: FloorRoom[] = floors.flatMap((f) => f.rooms);

/** Inventory totals per bookable room-type slug, derived from the floor chart. */
export const inventoryBySlug: Record<string, number> = allRooms.reduce(
  (acc, room) => {
    const slug = bedToSlug[room.bed];
    acc[slug] = (acc[slug] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

export const roomsForSlug = (slug: string): FloorRoom[] => {
  const bed = slugToBed[slug];
  if (!bed) return [];
  return allRooms.filter((r) => r.bed === bed).sort((a, b) => a.number - b.number);
};

