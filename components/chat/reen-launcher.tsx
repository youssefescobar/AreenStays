"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { MascotFace } from "./mascot-face";
import type { MascotMood } from "./mascot";
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
  locale: Locale;
  mood: MascotMood;
  tip: MascotTip;
  isOpen: boolean;
  isLoading: boolean;
  mode: "ai" | "staff";
  unread: number;
  onToggle: () => void;
  onQuick: (text: string) => void;
  onHover: (hover: boolean) => void;
};

const HIDDEN_KEY = "reen-card-hidden";

/** The closed-chat launcher: a starter card with quick questions, or the compact ring once opened or hidden. */
export function ReenLauncher({ locale, mood, tip, isOpen, isLoading, mode, unread, onToggle, onQuick, onHover }: Props) {
  const t = COPY[locale];
  const isRtl = locale === "ar";
  const [cardHidden, setCardHidden] = useState(false);

  /* A hidden card stays hidden for the rest of the visit. */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(HIDDEN_KEY)) setCardHidden(true);
    } catch {
      /* storage blocked */
    }
  }, []);
  const hideCard = () => {
    setCardHidden(true);
    try {
      sessionStorage.setItem(HIDDEN_KEY, "1");
    } catch {
      /* storage blocked */
    }
  };

  /* The card hands over to the compact ring while the panel is open, once hidden, or when replies are waiting. */
  const look = isOpen || cardHidden || unread > 0 ? "ring" : "card";
  /* The card carries its own text, so it skips the floating bubble. */
  const showBubble = tip && look === "ring";

  const btn = {
    type: "button" as const,
    onClick: onToggle,
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && onHover(true),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && onHover(false),
    "aria-label": isOpen ? t.close : t.open + (unread > 0 ? (isRtl ? ` (${unread} رسائل جديدة)` : ` (${unread} new)`) : ""),
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
            {!isOpen && unread > 0 && (
              <span key={unread} className="reen-fab__unread" aria-hidden>
                {unread > 9 ? "9+" : unread}
              </span>
            )}
            {close}
          </button>
        )}

        {/* Starter card with quick questions */}
        {look === "card" && (
          <div className="reen-card" dir={isRtl ? "rtl" : "ltr"}>
            <button type="button" className="reen-card__x" aria-label={t.dismiss} onClick={hideCard}>
              <X size={12} strokeWidth={2.75} />
            </button>
            <button {...btn} className="reen-card__main">
              <span className="reen-card__fig">{figure}</span>
              <span className="reen-card__text">
                <span className="reen-card__hi">
                  {t.hi}
                  <i className="reen-dot" />
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
      </span>
    </div>
  );
}
