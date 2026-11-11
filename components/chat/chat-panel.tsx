"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { href } from "@/lib/i18n";
import { X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { MascotFace } from "./mascot-face";
import { ChatCards } from "./chat-cards";
import type { ChatMessage as ChatMessageType } from "./use-chat";
import type { MascotMood } from "./mascot";

/* ------------------------------------------------------------------ */
/*  Greeting messages                                                  */
/* ------------------------------------------------------------------ */

const GREETING: Record<Locale, string> = {
  en: "Hello! I'm Reen, your virtual hotel assistant. How can I help you today?",
  ar: "أهلاً! أنا رين، مساعدتك الافتراضية في الفندق. كيف يمكنني مساعدتك؟",
};

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ChatPanelProps {
  locale: Locale;
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onSend: (text: string) => Promise<void>;
  onRetry: () => Promise<void>;
  mode: "ai" | "staff";
  staffName: string | null;
  mood: MascotMood;
  soundOn: boolean;
  onToggleSound: () => void;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ChatPanel({
  locale,
  messages,
  isLoading,
  error,
  onSend,
  onRetry,
  mode,
  staffName,
  mood,
  soundOn,
  onToggleSound,
  onClose,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isRtl = locale === "ar";

  /* Auto-scroll to bottom whenever messages or loading state change */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  /* Escape key closes the panel */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /* Focus trap on mobile: keep focus inside the panel */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    function handleFocusTrap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const focusable = panel!.querySelectorAll<HTMLElement>(
        'button, textarea, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, []);

  /* Build the message list including the static greeting */
  const greetingMsg: ChatMessageType = {
    id: "greeting",
    role: "assistant",
    content: GREETING[locale],
    timestamp: new Date(),
  };
  const allMessages = [greetingMsg, ...messages];

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={isRtl ? "دردشة رين" : "Reen Chat"}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        /* Mobile: full screen. Desktop: panel sits above the FAB like Durri */
        "fixed z-[95] flex flex-col overflow-hidden bg-white shadow-2xl",
        "inset-0 lg:inset-auto",
        "lg:bottom-[calc(1.5rem+4.25rem+1rem)] lg:rounded-[20px]",
        isRtl ? "lg:left-6" : "lg:right-6",
        "lg:h-[min(520px,calc(100svh-11rem))] lg:w-[min(360px,calc(100vw-28px))]",
        "animate-[chatSlideUp_300ms_ease_forwards]",
      )}
    >
      {/* ---- Header ---- */}
      <div className="flex shrink-0 items-center gap-3 bg-navy-deep px-4 py-3">
        <div className={cn("reen-avatar reen-avatar--live h-10 w-10 shrink-0 rounded-full", error && "is-error")}>
          <MascotFace mood={mood} live className="reen-avatar__photo" sizes="40px" />
          <span className={cn("reen-avatar__status", mode === "staff" && "is-staff")} aria-hidden />
        </div>

        <div className="flex-1">
          <p className={cn("text-sm font-semibold text-white", isRtl ? "font-arabic" : "font-sans")}>
            {isRtl ? "رين" : "Reen"}
          </p>
          <p className={cn("text-[11px]", mode === "staff" ? "text-gold" : "text-emerald-400")}>
            {mode === "staff"
              ? isRtl ? "مع فريق الفندق" : "With the hotel team"
              : isLoading ? (isRtl ? "تفكر…" : "Thinking…") : isRtl ? "متصلة الآن" : "Online now"}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? (isRtl ? "كتم صوت الرسائل" : "Mute message sound") : isRtl ? "تشغيل صوت الرسائل" : "Turn message sound on"}
          title={soundOn ? (isRtl ? "كتم الصوت" : "Mute") : isRtl ? "تشغيل الصوت" : "Sound on"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label={isRtl ? "إغلاق" : "Close"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {mode === "staff" && (
        <div className="shrink-0 bg-gold/15 px-4 py-2 text-center text-xs font-medium text-navy" role="status">
          {isRtl
            ? staffName
              ? `أنت الآن تتحدث مع ${staffName} من فريق الفندق`
              : "أنت الآن تتحدث مع فريق الفندق"
            : staffName
              ? `You're now chatting with ${staffName} from the hotel team`
              : "You're now chatting with our hotel team"}
        </div>
      )}

      {/* ---- Messages ---- */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto bg-[#FAF7F2] px-4 py-4"
      >
        {allMessages.map((msg, i) => (
          <div key={msg.id} className="space-y-3">
            <ChatMessage role={msg.role} content={msg.content} timestamp={msg.timestamp} locale={locale} staffName={staffName} />
            {msg.cards?.length ? (
              <ChatCards
                cards={msg.cards}
                locale={locale}
                onSend={(t) => void onSend(t)}
                disabled={isLoading}
                isLatest={i === allMessages.length - 1}
              />
            ) : null}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div className="reen-avatar h-7 w-7 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
              <MascotFace mood="think" className="reen-avatar__photo" sizes="28px" />
            </div>
            <div className="rounded-2xl rounded-es-sm bg-sand px-4 py-3">
              <div className="flex gap-1" aria-label={isRtl ? "رين تكتب..." : "Reen is typing..."}>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mx-auto max-w-[90%] rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
            <button
              type="button"
              onClick={() => void onRetry()}
              className="mt-1 block w-full text-xs font-medium text-red-700 underline"
            >
              {isRtl ? "إعادة المحاولة" : "Retry"}
            </button>
          </div>
        )}
      </div>

      {/* ---- Input ---- */}
      <ChatInput onSend={(t) => void onSend(t)} disabled={isLoading} locale={locale} />
      {/* Consent notice: shown before guests share anything personal */}
      <p className="shrink-0 bg-white px-4 pb-2 text-center text-[10px] text-gray-400">
        {isRtl ? "تتم معالجة الرسائل بالذكاء الاصطناعي ويطّلع عليها فريقنا. " : "Messages are processed by AI and seen by our team. "}
        <Link href={href(locale, "/privacy")} className="underline hover:text-gold">
          {isRtl ? "سياسة الخصوصية" : "Privacy policy"}
        </Link>
      </p>
    </div>
  );
}
