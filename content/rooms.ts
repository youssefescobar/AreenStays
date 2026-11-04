import type { T } from "@/lib/i18n";
import { stock } from "./stock";

export type Room = {
  slug: string;
  name: T;
  summary: T;
  description: T;
  size: number; // m²
  guests: number;
  bed: T;
  view: T;
  price: number; // SAR, starting rate per night
  amenities: T[];
  /** Photo paths under /public, e.g. "/photos/rooms/king-1.jpg". Empty = branded placeholder. */
  images: string[];
};

const common: T[] = [
  { en: "Free high-speed Wi-Fi", ar: "إنترنت لاسلكي مجاني" },
  { en: "Smart TV", ar: "تلفاز ذكي" },
  { en: "Coffee & tea station", ar: "ركن القهوة والشاي" },
  { en: "Rain shower", ar: "دش مطري" },
  { en: "Prayer mat & Qibla direction", ar: "سجادة صلاة واتجاه القبلة" },
  { en: "24-hour room service", ar: "خدمة الغرف على مدار الساعة" },
];

export const rooms: Room[] = [
  {
    slug: "king-room",
    name: { en: "King Room", ar: "غرفة بسرير كبير" },
    summary: { en: "A calm, bright room with one king bed.", ar: "غرفة هادئة ومشرقة بسرير كبير واحد." },
    description: {
      en: "Soft navy and sand tones, a king bed, and a work desk by the window. Ideal for couples and short business trips.",
      ar: "ألوان كحلية ورملية هادئة، وسرير كبير، ومكتب عمل بجوار النافذة. مثالية للأزواج ورحلات العمل القصيرة.",
    },
    size: 32,
    guests: 2,
    bed: { en: "1 king bed", ar: "سرير كبير واحد" },
    view: { en: "City view", ar: "إطلالة على المدينة" },
    price: 450,
    amenities: common,
    images: [stock.room1, stock.bath, stock.room4, stock.lobby, stock.room6],
  },
  {
    slug: "twin-room",
    name: { en: "Twin Room", ar: "غرفة بسريرين" },
    summary: { en: "Two twin beds for friends or colleagues.", ar: "سريران منفصلان للأصدقاء أو زملاء العمل." },
    description: {
      en: "The same calm finish as our king rooms, with two separate twin beds so each guest has their own space. Ideal for friends, colleagues and Umrah companions.",
      ar: "نفس اللمسة الهادئة لغرف السرير الكبير، مع سريرين منفصلين ليكون لكل ضيف مساحته. مثالية للأصدقاء وزملاء العمل ورفقة العمرة.",
    },
    size: 32,
    guests: 2,
    bed: { en: "2 twin beds", ar: "سريران منفصلان" },
    view: { en: "City view", ar: "إطلالة على المدينة" },
    price: 450,
    amenities: common,
    images: [stock.room6, stock.bedroom2, stock.bath, stock.room5, stock.lobby2],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
