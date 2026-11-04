import type { Locale } from "@/lib/i18n";

export type MascotMood = "idle" | "wave" | "think";

export const MASCOT_SRC: Record<MascotMood, string> = {
  idle: "/mascot/idle.webp",
  wave: "/mascot/wave.webp",
  think: "/mascot/think.webp",
};

export const fabMood = (open: boolean, hover: boolean): MascotMood =>
  open ? "think" : hover ? "wave" : "idle";

export const preloadMascotFaces = () => {
  if (typeof window === "undefined") return;
  for (const src of Object.values(MASCOT_SRC)) new window.Image().src = src;
};

const PATH_HINTS: { match: RegExp; en: string; ar: string }[] = [
  { match: /\/rooms/, en: "Ask about rooms", ar: "اسألي عن الغرف" },
  { match: /\/dining/, en: "Ask about dining", ar: "اسألي عن المطاعم" },
  { match: /\/offers/, en: "See today's offers", ar: "اطلعي على العروض" },
  { match: /\/umrah/, en: "Plan your Umrah stay", ar: "خططي إقامة العمرة" },
  { match: /\/corporate/, en: "Ask about events", ar: "اسألي عن الفعاليات" },
  { match: /\/location/, en: "How to find us", ar: "كيف تصلين إلينا" },
  { match: /\/gallery/, en: "Tour the hotel", ar: "جولة في الفندق" },
  { match: /#booking/, en: "Need help booking?", ar: "تحتاجين مساعدة بالحجز؟" },
];

export const tipFromPath = (path: string, locale: Locale) =>
  PATH_HINTS.find((h) => h.match.test(path))?.[locale] ?? null;

export const IDLE_TIPS: Record<Locale, string[]> = {
  en: ["Ask me anything", "Need a room tip?", "Book with me", "Umrah stays?", "Where are we?"],
  ar: ["اسأليني أي شيء", "تحتاجين نصيحة غرفة؟", "احجزي معي", "إقامة عمرة؟", "أين موقعنا؟"],
};

export const HELLO_TIP: Record<Locale, string> = { en: "Hello", ar: "أهلاً" };
