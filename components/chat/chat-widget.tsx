"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { useChat } from "./use-chat";
import { ChatPanel } from "./chat-panel";
import { MascotFace } from "./mascot-face";
import { fabMood, preloadMascotFaces } from "./mascot";
import { useMascotTip } from "./use-mascot-tip";

export function ChatWidget({ locale }: { locale: Locale }) {
  const { messages, isOpen, isLoading, error, hasUnread, sendMessage, toggleChat } = useChat();
  const [hoveringFab, setHoveringFab] = useState(false);
  const mood = fabMood(isOpen || isLoading, hoveringFab);
  const tip = useMascotTip({ locale, isOpen, hoveringFab });

  useEffect(() => {
    preloadMascotFaces();
  }, []);

  const onPointer = (hover: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHoveringFab(hover);
  };

  return (
    <>
      {isOpen && (
        <ChatPanel
          locale={locale}
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={sendMessage}
          onClose={toggleChat}
        />
      )}

      <div className="reen-fab-row fixed z-[80] flex items-center bottom-[max(0.875rem,env(safe-area-inset-bottom))] end-4 sm:bottom-6 sm:end-6 max-lg:bottom-[calc(4.75rem+env(safe-area-inset-bottom))]">
        <span className="reen-fab relative inline-grid place-items-center">
          {tip && (
            <span
              role="status"
              aria-live="polite"
              lang={locale}
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="reen-fab__tip"
            >
              {tip}
            </span>
          )}

          <button
            type="button"
            onClick={toggleChat}
            onPointerEnter={onPointer(true)}
            onPointerLeave={onPointer(false)}
            aria-label={locale === "ar" ? "افتح الدردشة مع رين" : "Open chat with Reen"}
            aria-expanded={isOpen}
            className={cn("reen-fab__btn", isOpen && "is-open")}
          >
            <span className="reen-fab__face" aria-hidden>
              <MascotFace
                mood={mood}
                className={cn("reen-fab__photo", mood === "wave" && "is-wave")}
                sizes="56px"
                priority
              />
            </span>
            {hasUnread && !isOpen && (
              <span className="reen-fab__badge" aria-hidden>
                1
              </span>
            )}
          </button>
        </span>
      </div>
    </>
  );
}
