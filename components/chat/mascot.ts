import type { Locale } from "@/lib/i18n";

export type MascotMood = "idle" | "wave" | "think";

export const MASCOT_MOODS: MascotMood[] = ["idle", "wave", "think"];

export const MASCOT_SRC: Record<MascotMood, string> = {
  idle: "/mascot/idle.webp",
  wave: "/mascot/wave.webp",
  think: "/mascot/think.webp",
};

/** Same poses with the background removed, for frameless launchers. */
export const MASCOT_CUT_SRC: Record<MascotMood, string> = {
  idle: "/mascot/cut/idle.webp",
  wave: "/mascot/cut/wave.webp",
  think: "/mascot/cut/think.webp",
};

/** Launcher looks. Preview any of them with ?fab=<name>. */
export const FAB_VARIANTS = ["ring", "peek", "pill", "card", "portrait", "blob"] as const;
export type FabVariant = (typeof FAB_VARIANTS)[number];
export const DEFAULT_FAB_VARIANT: FabVariant = "ring";

/** Priority: thinking > waving (hover or a short reaction) > idle. */
export const reenMood = ({ thinking, hover, flash }: { thinking: boolean; hover: boolean; flash: boolean }): MascotMood =>
  thinking ? "think" : hover || flash ? "wave" : "idle";

export const preloadMascotFaces = () => {
  if (typeof window === "undefined") return;
  for (const src of Object.values(MASCOT_SRC)) new window.Image().src = src;
};

const PATH_HINTS: { match: RegExp; en: string; ar: string }[] = [
  { match: /\/rooms/, en: "Ask about rooms", ar: "عندك سؤال عن الغرف؟" },
  { match: /\/dining/, en: "Ask about dining", ar: "عندك سؤال عن المطاعم؟" },
  { match: /\/offers/, en: "See today's offers", ar: "عروض اليوم بانتظارك" },
  { match: /\/umrah/, en: "Plan your Umrah stay", ar: "نخطط لإقامة عمرتك؟" },
  { match: /\/corporate/, en: "Ask about events", ar: "عندك فعالية أو اجتماع؟" },
  { match: /\/location/, en: "How to find us", ar: "كيف الوصول إلينا؟" },
  { match: /\/gallery/, en: "Tour the hotel", ar: "جولة في الفندق" },
  { match: /#booking/, en: "Need help booking?", ar: "أساعدك في الحجز؟" },
];

export const tipFromPath = (path: string, locale: Locale) =>
  PATH_HINTS.find((h) => h.match.test(path))?.[locale] ?? null;

export const IDLE_TIPS: Record<Locale, string[]> = {
  en: ["Ask me anything", "Need a room tip?", "Book with me", "Umrah stays?", "Where are we?"],
  ar: ["أنا هنا لمساعدتك", "نصيحة لاختيار غرفتك؟", "الحجز معي أسهل", "إقامة عمرة؟", "أين موقعنا؟"],
};

export const HELLO_TIP: Record<Locale, string> = { en: "Hello", ar: "أهلاً" };
