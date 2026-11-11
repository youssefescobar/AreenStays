"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { MascotFace } from "./mascot-face";
import type { FabVariant, MascotMood } from "./mascot";
import type { MascotTip } from "./use-mascot-tip";

const COPY = {
  en: {
    open: "Open chat with Reen",
    close: "Close chat",
    title: "Chat with Reen",
    online: "Online now",
    staff: "With the hotel team",
    hi: "Hi, I'm Reen",
    ask: "How can I help with your stay?",
    dismiss: "Hide",
    name: "Reen",
    chips: [
      { label: "Rooms", send: "Tell me about your rooms" },
      { label: "Offers", send: "What offers do you have today?" },
      { label: "Book a stay", send: "I'd like to book a stay" },
    ],
  },
  ar: {
    open: "افتح الدردشة مع رين",
    close: "إغلاق الدردشة",
    title: "الدردشة مع رين",
    online: "متصلة الآن",
    staff: "مع فريق الفندق",
    hi: "أهلاً، أنا رين",
    ask: "كيف أساعدك في إقامتك؟",
    dismiss: "إخفاء",
    name: "رين",
    chips: [
      { label: "الغرف", send: "أخبريني عن الغرف" },
      { label: "العروض", send: "ما هي عروض اليوم؟" },
      { label: "حجز إقامة", send: "أرغب في حجز إقامة" },
    ],
  },
} as const;

type Props = {
  variant: FabVariant;
  locale: Locale;
  mood: MascotMood;
  tip: MascotTip;
  isOpen: boolean;
  isLoading: boolean;
  mode: "ai" | "staff";
  onToggle: () => void;
  onQuick: (text: string) => void;
  onHover: (hover: boolean) => void;
};

/** The closed-chat launcher. One component, several looks (see FAB_VARIANTS). */
export function ReenLauncher({ variant, locale, mood, tip, isOpen, isLoading, mode, onToggle, onQuick, onHover }: Props) {
  const t = COPY[locale];
  const isRtl = locale === "ar";
  const [cardHidden, setCardHidden] = useState(false);

  /* Tall looks hand over to the compact ring while the panel is open; the card also once dismissed. */
  const tall = variant === "card" || variant === "portrait" || variant === "blob";
  const look: FabVariant = (tall && isOpen) || (variant === "card" && cardHidden) ? "ring" : variant;
  /* Pill and card carry their own text, so they skip the floating bubble. */
  const showBubble = tip && look !== "pill" && look !== "card";

  const btn = {
    type: "button" as const,
    onClick: onToggle,
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && onHover(true),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && onHover(false),
    "aria-label": isOpen ? t.close : t.open,
    "aria-expanded": isOpen,
    "data-mood": mood,
  };
  const state = cn(isOpen && "is-open", isLoading && "is-thinking");

  const status = <span className={cn("reen-fab__status", mode === "staff" && "is-staff")} aria-hidden />;
  const close = (
    <span className="reen-fab__close" aria-hidden>
      <X size={13} strokeWidth={2.75} />
    </span>
  );
  const face = (
    <>
      <span className="reen-fab__ring" aria-hidden />
      <span className="reen-fab__face" aria-hidden>
        <span className="reen-fab__body">
          <MascotFace mood={mood} live className="reen-fab__photo" sizes="64px" priority />
        </span>
      </span>
    </>
  );
  const figure = (
    <span className="reen-fig" aria-hidden>
      <MascotFace mood={mood} live cutout className="reen-fig__img" sizes="140px" priority />
    </span>
  );

  return (
    <div
      data-variant={look}
      className={cn(
        "reen-fab-row fixed z-[80] flex items-center end-4 sm:end-6",
        "bottom-[max(0.875rem,env(safe-area-inset-bottom))] sm:bottom-6 max-lg:bottom-[calc(4.75rem+env(safe-area-inset-bottom))]",
      )}
    >
      <span className="reen-fab relative inline-grid place-items-center">
        {showBubble && (
          <span
            key={tip.text}
            role="status"
            aria-live="polite"
            lang={locale}
            dir={isRtl ? "rtl" : "ltr"}
            className={cn("reen-fab__tip", tip.kind === "hello" && "is-hello")}
          >
            {tip.kind !== "hello" && <span className="reen-fab__tip-name">{t.name}</span>}
            {tip.text}
          </span>
        )}

        {look === "ring" && (
          <button {...btn} className={cn("reen-fab__btn", state)}>
            {face}
            {status}
            {close}
          </button>
        )}

        {/* Frameless: Reen rises from the screen edge */}
        {look === "peek" && (
          <button {...btn} className={cn("reen-peek", state)}>
            <span className="reen-peek__clip">{figure}</span>
            <span className="reen-peek__chat" aria-hidden>
              {isOpen ? <X size={14} strokeWidth={2.75} /> : <MessageCircle size={14} strokeWidth={2.5} />}
            </span>
          </button>
        )}

        {/* Expanded pill with a live line of text */}
        {look === "pill" && (
          <button {...btn} dir={isRtl ? "rtl" : "ltr"} className={cn("reen-pill", state)}>
            <span className="reen-pill__text">
              <span className="reen-pill__title">{t.title}</span>
              <span className="reen-pill__sub" key={tip?.text ?? "online"}>
                <i className={cn("reen-pill__dot", mode === "staff" && "is-staff")} />
                {mode === "staff" ? t.staff : tip && tip.kind !== "hello" ? tip.text : t.online}
              </span>
            </span>
            <span className="reen-pill__face">
              {face}
              {close}
            </span>
          </button>
        )}

        {/* Starter card with quick questions */}
        {look === "card" && (
          <div className="reen-card" dir={isRtl ? "rtl" : "ltr"}>
            <button type="button" className="reen-card__x" aria-label={t.dismiss} onClick={() => setCardHidden(true)}>
              <X size={12} strokeWidth={2.75} />
            </button>
            <button {...btn} className="reen-card__main">
              <span className="reen-card__fig">{figure}</span>
              <span className="reen-card__text">
                <span className="reen-card__hi">
                  {t.hi}
                  <i className="reen-pill__dot" />
                </span>
                <span className="reen-card__ask">{t.ask}</span>
              </span>
            </button>
            <div className="reen-card__chips">
              {t.chips.map((c) => (
                <button key={c.label} type="button" className="reen-card__chip" onClick={() => onQuick(c.send)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Portrait frame with a name plate */}
        {look === "portrait" && (
          <button {...btn} className={cn("reen-portrait", state)}>
            <span className="reen-portrait__frame">{figure}</span>
            <span className="reen-portrait__plate" dir={isRtl ? "rtl" : "ltr"}>
              <i className={cn("reen-pill__dot", mode === "staff" && "is-staff")} />
              {t.name}
            </span>
            {close}
          </button>
        )}

        {/* Morphing blob with Reen popping out of it */}
        {look === "blob" && (
          <button {...btn} className={cn("reen-blob", state)}>
            <span className="reen-blob__bg" aria-hidden />
            <span className="reen-blob__pop">{figure}</span>
            {status}
            {close}
          </button>
        )}
      </span>
    </div>
  );
}
