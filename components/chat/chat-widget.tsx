"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { useChat } from "./use-chat";
import { ChatPanel } from "./chat-panel";

/* ------------------------------------------------------------------ */
/*  ChatWidget — floating bubble + panel                               */
/* ------------------------------------------------------------------ */

export function ChatWidget({ locale }: { locale: Locale }) {
  const {
    messages,
    isOpen,
    isLoading,
    error,
    sendMessage,
    retry,
    startNewChat,
    toggleChat,
  } = useChat();

  const isRtl = locale === "ar";

  return (
    <>
      {/* ---- Chat Panel ---- */}
      {isOpen && (
        <ChatPanel
          locale={locale}
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={sendMessage}
          onRetry={retry}
          onNewChat={startNewChat}
          onClose={toggleChat}
        />
      )}

      {/* ---- Floating Action Button ---- */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleChat}
          aria-label={isRtl ? "افتح الدردشة" : "Open chat"}
          className={cn(
            "fixed z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300",
            /* Gradient background */
            "bg-gradient-to-br from-[#C9A351] to-[#DEB968]",
            "hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
            /* Size: 56px mobile, 64px desktop */
            "h-14 w-14 lg:h-16 lg:w-16",
            /* Position: above MobileBookBar on mobile (bottom-20 ≈ 5rem clear), normal on desktop */
            "bottom-20 lg:bottom-6",
            isRtl ? "left-4 lg:left-6" : "right-4 lg:right-6",
            /* Subtle entrance pulse */
            "animate-[chatPulse_2s_ease-in-out_1]",
          )}
        >
          <MessageCircle size={24} className="text-navy-deep lg:h-7 lg:w-7" />
        </button>
      )}
    </>
  );
}
