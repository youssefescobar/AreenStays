import type { T } from "@/lib/i18n";
import { stock } from "./stock";

export type Venue = { slug: string; name: T; type: T; description: T; hours: string; images: string[] };

export const venues: Venue[] = [
  {
    slug: "al-basateen-restaurant",
    name: { en: "Al Basateen Restaurant", ar: "مطعم البساتين" },
    type: { en: "All-day dining · Saudi & international", ar: "طوال اليوم · مأكولات سعودية وعالمية" },
    description: {
      en: "Breakfast buffet with Saudi favourites, à la carte lunch and dinner, and family-style platters to share.",
      ar: "بوفيه فطور بأشهى الأطباق السعودية، وقائمة غداء وعشاء، وأطباق عائلية للمشاركة.",
    },
    hours: "06:30 – 23:00",
    images: [stock.restaurant, stock.restaurant2],
  },
  {
    slug: "crystal-lounge",
    name: { en: "Crystal Lounge", ar: "صالة كريستال" },
    type: { en: "Arabic coffee, tea & desserts", ar: "قهوة عربية وشاي وحلويات" },
    description: {
      en: "Saudi coffee and dates on arrival, specialty coffee, fresh juices and desserts in a quiet lounge.",
      ar: "قهوة سعودية وتمر عند الوصول، وقهوة مختصة، وعصائر طازجة وحلويات في صالة هادئة.",
    },
    hours: "10:00 – 01:00",
    images: [stock.coffee, stock.coffee2],
  },
  {
    slug: "in-room-dining",
    name: { en: "In-room dining", ar: "الطعام في الغرفة" },
    type: { en: "Around the clock", ar: "على مدار الساعة" },
    description: {
      en: "The full menu delivered to your room, day or night, including suhoor during Ramadan.",
      ar: "القائمة الكاملة تصل إلى غرفتك ليلاً أو نهاراً، بما في ذلك السحور في رمضان.",
    },
    hours: "24/7",
    images: [stock.restaurant3],
  },
];
