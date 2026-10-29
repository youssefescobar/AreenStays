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
  /** Photo paths under /public, e.g. "/photos/rooms/deluxe-1.jpg". Empty = branded placeholder. */
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
    slug: "deluxe-room",
    name: { en: "Deluxe Room", ar: "غرفة ديلوكس" },
    summary: { en: "A calm, bright room for one or two.", ar: "غرفة هادئة ومشرقة لشخص أو شخصين." },
    description: {
      en: "Soft navy and sand tones, a king or twin beds, and a work desk by the window. Ideal for short business trips and couples.",
      ar: "ألوان كحلية ورملية هادئة، وسرير كبير أو سريران منفصلان، ومكتب عمل بجوار النافذة. مثالية لرحلات العمل القصيرة والأزواج.",
    },
    size: 32,
    guests: 2,
    bed: { en: "King or twin", ar: "سرير كبير أو سريران" },
    view: { en: "City view", ar: "إطلالة على المدينة" },
    price: 450,
    amenities: common,
    images: [stock.room1, stock.bath, stock.room4, stock.lobby, stock.room6],
  },
  {
    slug: "executive-suite",
    name: { en: "Executive Suite", ar: "جناح تنفيذي" },
    summary: { en: "Separate lounge, space to work and host.", ar: "صالة منفصلة ومساحة للعمل والاستقبال." },
    description: {
      en: "A bedroom with a king bed and a separate majlis-style lounge for meetings or family evenings, plus a larger bathroom with a bathtub.",
      ar: "غرفة نوم بسرير كبير وصالة منفصلة بطابع المجلس للاجتماعات أو السهرات العائلية، مع حمام أوسع وحوض استحمام.",
    },
    size: 55,
    guests: 3,
    bed: { en: "King + sofa bed", ar: "سرير كبير + كنبة سرير" },
    view: { en: "City view", ar: "إطلالة على المدينة" },
    price: 780,
    amenities: [...common, { en: "Separate lounge", ar: "صالة منفصلة" }, { en: "Bathtub", ar: "حوض استحمام" }],
    images: [stock.room2, stock.room7, stock.bath2, stock.room5, stock.lobby2],
  },
  {
    slug: "family-suite",
    name: { en: "Family Suite", ar: "جناح عائلي" },
    summary: { en: "Two bedrooms for the whole family.", ar: "غرفتا نوم لكل العائلة." },
    description: {
      en: "Two connected bedrooms around a shared living room, so families stay together with room to rest. Kids stay free.",
      ar: "غرفتا نوم متصلتان حول صالة مشتركة، لتبقى العائلة معاً مع مساحة للراحة. إقامة الأطفال مجانية.",
    },
    size: 70,
    guests: 5,
    bed: { en: "1 king + 2 single", ar: "سرير كبير + سريران فرديان" },
    view: { en: "City view", ar: "إطلالة على المدينة" },
    price: 950,
    amenities: [...common, { en: "Two bedrooms", ar: "غرفتا نوم" }, { en: "Living room", ar: "صالة معيشة" }],
    images: [stock.room3, stock.bedroom, stock.bedroom2, stock.bath, stock.room8],
  },
  {
    slug: "royal-suite",
    name: { en: "Areen Royal Suite", ar: "جناح أرين الملكي" },
    summary: { en: "Our largest suite, with a private majlis.", ar: "أكبر أجنحتنا مع مجلس خاص." },
    description: {
      en: "A master bedroom, private majlis and dining area, finished in the crystal and gold of the Areen identity. For special occasions and VIP guests.",
      ar: "غرفة نوم رئيسية ومجلس خاص وركن طعام، بلمسات الكريستال والذهب من هوية أرين. للمناسبات الخاصة وكبار الضيوف.",
    },
    size: 110,
    guests: 4,
    bed: { en: "King", ar: "سرير كبير" },
    view: { en: "Panoramic city view", ar: "إطلالة بانورامية على المدينة" },
    price: 1800,
    amenities: [
      ...common,
      { en: "Private majlis", ar: "مجلس خاص" },
      { en: "Dining area", ar: "ركن طعام" },
      { en: "Butler on request", ar: "خدمة خاصة عند الطلب" },
    ],
    images: [stock.room7, stock.room5, stock.bath2, stock.restaurant3, stock.room2],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
