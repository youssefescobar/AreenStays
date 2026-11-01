"use client";

import { useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import type { ChatMessage as ChatMessageType } from "./use-chat";

/* ------------------------------------------------------------------ */
/*  Greeting messages                                                  */
/* ------------------------------------------------------------------ */

const GREETING: Record<Locale, string> = {
  en: "Hello! 👋 I'm Areen, your virtual hotel assistant. How can I help you today?",
  ar: "أهلاً! 👋 أنا أرين، مساعدتك الافتراضية في الفندق. كيف يمكنني مساعدتك؟",
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
  onNewChat: () => Promise<void>;
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
  onNewChat,
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
      aria-label={isRtl ? "دردشة أرين" : "Areen Chat"}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        /* Mobile: full screen overlay. Desktop: anchored panel */
        "fixed z-50 flex flex-col overflow-hidden rounded-none bg-white shadow-2xl",
        "inset-0 lg:inset-auto",
        "lg:bottom-6 lg:rounded-2xl",
        isRtl ? "lg:left-6" : "lg:right-6",
        "lg:h-[min(600px,calc(100vh-3rem))] lg:w-[400px]",
        /* Entry animation */
        "animate-[chatSlideUp_300ms_ease_forwards]",
      )}
    >
      {/* ---- Header ---- */}
      <div className="flex shrink-0 items-center gap-3 bg-navy-deep px-4 py-3">
        {/* Areen avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
          {isRtl ? "أ" : "A"}
        </div>

        <div className="flex-1">
          <p className={cn("text-sm font-semibold text-white", isRtl ? "font-arabic" : "font-sans")}>
            {isRtl ? "أرين" : "Areen"}
          </p>
          <p className="text-[11px] text-emerald-400">
            {isRtl ? "متصلة" : "Online"}
          </p>
        </div>

        {/* New Chat */}
        <button
          type="button"
          onClick={() => void onNewChat()}
          aria-label={isRtl ? "محادثة جديدة" : "New chat"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Plus size={18} />
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={isRtl ? "إغلاق" : "Close"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* ---- Messages ---- */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto bg-[#FAF7F2] px-4 py-4"
      >
        {allMessages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
            locale={locale}
          />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-deep text-[11px] font-semibold text-gold"
              aria-hidden="true"
            >
              {isRtl ? "أ" : "A"}
            </div>
            <div className="rounded-2xl rounded-es-sm bg-sand px-4 py-3">
              <div className="flex gap-1" aria-label={isRtl ? "أرين تكتب..." : "Areen is typing..."}>
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
              onClick={() => {
                /* Retry the last user message */
                const lastUser = [...messages].reverse().find((m) => m.role === "user");
                if (lastUser) void onSend(lastUser.content);
              }}
              className="mt-1 block w-full text-xs font-medium text-red-700 underline"
            >
              {isRtl ? "إعادة المحاولة" : "Retry"}
            </button>
          </div>
        )}
      </div>

      {/* ---- Input ---- */}
      <ChatInput onSend={(t) => void onSend(t)} disabled={isLoading} locale={locale} />
    </div>
  );
}
