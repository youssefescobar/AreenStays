"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { useChat } from "./use-chat";
import { ChatPanel } from "./chat-panel";
import { ReenLauncher } from "./reen-launcher";
import { DEFAULT_FAB_VARIANT, FAB_VARIANTS, preloadMascotFaces, reenMood, type FabVariant } from "./mascot";
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

  /* Launcher look: ?fab=<variant> previews one and keeps it for the visit. */
  const [variant, setVariant] = useState<FabVariant>(DEFAULT_FAB_VARIANT);
  useEffect(() => {
    try {
      const asked = new URLSearchParams(location.search).get("fab") ?? sessionStorage.getItem("reen-fab");
      if (asked && (FAB_VARIANTS as readonly string[]).includes(asked)) {
        setVariant(asked as FabVariant);
        sessionStorage.setItem("reen-fab", asked);
      }
    } catch {
      /* storage blocked: keep the default */
    }
  }, []);

  const onQuick = (text: string) => {
    if (!isOpen) toggleChat();
    void sendMessage(text);
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
          onRetry={retry}
          mode={mode}
          staffName={staffName}
          mood={mood}
          onClose={toggleChat}
        />
      )}

      <ReenLauncher
        variant={variant}
        locale={locale}
        mood={mood}
        tip={tip}
        isOpen={isOpen}
        isLoading={isLoading}
        mode={mode}
        onToggle={toggleChat}
        onQuick={onQuick}
        onHover={setHoveringFab}
      />
    </>
  );
}
