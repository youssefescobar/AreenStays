"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { useChat } from "./use-chat";
import { ChatPanel } from "./chat-panel";
import { MascotFace } from "./mascot-face";
import { preloadMascotFaces, reenMood } from "./mascot";
import { useMascotTip } from "./use-mascot-tip";

/** Short wave reaction: on arrival, on each new reply, on fresh section tips. */
function useWaveFlash() {
  const [flash, setFlash] = useState(false);
  const timer = useRef(0);
  const trigger = useCallback((ms = 1600) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setFlash(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlash(false), ms);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return [flash, trigger] as const;
}

export function ChatWidget({ locale }: { locale: Locale }) {
  const { messages, isOpen, isLoading, error, mode, staffName, sendMessage, retry, toggleChat } = useChat();
  const [hoveringFab, setHoveringFab] = useState(false);
  const [flash, wave] = useWaveFlash();
  const tip = useMascotTip({ locale, isOpen, hoveringFab });
  const mood = reenMood({ thinking: isLoading, hover: hoveringFab && !isOpen, flash });
  const isRtl = locale === "ar";

  useEffect(() => {
    preloadMascotFaces();
    const hello = window.setTimeout(() => wave(1800), 900);
    return () => window.clearTimeout(hello);
  }, [wave]);

  /* React to new replies from Reen or the team */
  const replyCount = useRef<number | null>(null);
  useEffect(() => {
    const count = messages.filter((m) => m.role !== "user").length;
    if (replyCount.current !== null && count > replyCount.current) wave(1400);
    replyCount.current = count;
  }, [messages, wave]);

  /* Wave when a fresh section tip pops up */
  useEffect(() => {
    if (tip?.kind === "section") wave(1200);
  }, [tip?.kind, tip?.text, wave]);

  const onPointer = (hover: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHoveringFab(hover);
  };

  const label = isOpen
    ? isRtl ? "إغلاق الدردشة" : "Close chat"
    : isRtl ? "افتح الدردشة مع رين" : "Open chat with Reen";

  return (
    <>
      {isOpen && (
        <ChatPanel
          locale={locale}
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={sendMessage}
          onRetry={retry}
          mode={mode}
          staffName={staffName}
          mood={mood}
          onClose={toggleChat}
        />
      )}

      <div className="reen-fab-row fixed z-[80] flex items-center bottom-[max(0.875rem,env(safe-area-inset-bottom))] end-4 sm:bottom-6 sm:end-6 max-lg:bottom-[calc(4.75rem+env(safe-area-inset-bottom))]">
        <span className="reen-fab relative inline-grid place-items-center">
          {tip && (
            <span
              key={tip.text}
              role="status"
              aria-live="polite"
              lang={locale}
              dir={isRtl ? "rtl" : "ltr"}
              className={cn("reen-fab__tip", tip.kind === "hello" && "is-hello")}
            >
              {tip.kind !== "hello" && <span className="reen-fab__tip-name">{isRtl ? "رين" : "Reen"}</span>}
              {tip.text}
            </span>
          )}

          <button
            type="button"
            onClick={toggleChat}
            onPointerEnter={onPointer(true)}
            onPointerLeave={onPointer(false)}
            aria-label={label}
            aria-expanded={isOpen}
            data-mood={mood}
            className={cn("reen-fab__btn", isOpen && "is-open", isLoading && "is-thinking")}
          >
            <span className="reen-fab__ring" aria-hidden />
            <span className="reen-fab__face" aria-hidden>
              <span className="reen-fab__body">
                <MascotFace mood={mood} live className="reen-fab__photo" sizes="64px" priority />
              </span>
            </span>
            <span
              className={cn("reen-fab__status", mode === "staff" && "is-staff")}
              aria-hidden
            />
            <span className="reen-fab__close" aria-hidden>
              <X size={13} strokeWidth={2.75} />
            </span>
          </button>
        </span>
      </div>
    </>
  );
}
