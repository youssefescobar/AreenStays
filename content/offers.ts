import type { T } from "@/lib/i18n";

export type Offer = { slug: string; tag: T; title: T; text: T; terms: T };

export const offers: Offer[] = [
  {
    slug: "book-direct",
    tag: { en: "Save 15%", ar: "وفّر ١٥٪" },
    title: { en: "Book Direct & Save", ar: "احجز مباشرة ووفّر" },
    text: {
      en: "Our best available rate, with free breakfast when you book with us directly.",
      ar: "أفضل سعر متاح مع فطور مجاني عند الحجز المباشر معنا.",
    },
    terms: { en: "Subject to availability. Not combinable with other offers.", ar: "حسب التوفر. لا يُجمع مع عروض أخرى." },
  },
  {
    slug: "umrah-package",
    tag: { en: "3 nights", ar: "٣ ليالٍ" },
    title: { en: "Umrah Stay Package", ar: "باقة إقامة العمرة" },
    text: {
      en: "Flexible check-in, airport transfer and a quiet room to rest between visits.",
      ar: "وصول مرن، وتوصيل من المطار، وغرفة هادئة للراحة بين الزيارات.",
    },
    terms: { en: "Minimum 3 nights. Transfers for up to 4 guests.", ar: "الحد الأدنى ٣ ليالٍ. التوصيل لأربعة ضيوف كحد أقصى." },
  },
  {
    slug: "family-weekend",
    tag: { en: "Family", ar: "للعائلة" },
    title: { en: "Weekend in Jeddah", ar: "عطلة نهاية الأسبوع في جدة" },
    text: {
      en: "Kids stay and eat free, plus late check-out on Saturdays.",
      ar: "إقامة ووجبات مجانية للأطفال، مع مغادرة متأخرة يوم السبت.",
    },
    terms: { en: "Children under 12, up to 2 per room.", ar: "للأطفال دون ١٢ عاماً، حتى طفلين لكل غرفة." },
  },
];
