"use client";

import { useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  locale: Locale;
}

export function ChatInput({ onSend, disabled, locale }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isRtl = locale === "ar";

  const placeholder = isRtl ? "اكتب رسالة..." : "Type a message...";

  /* Auto-resize the textarea up to 4 lines */
  function resizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    // Approx 4 lines ≈ 96px (24px line-height × 4)
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    void e; // value is read from ref
    resizeTextarea();
  }

  function handleSubmit() {
    const el = textareaRef.current;
    if (!el) return;
    const value = el.value.trim();
    if (!value || disabled) return;

    onSend(value);
    el.value = "";
    resizeTextarea();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  /* Focus the input when the component mounts */
  useEffect(() => {
    // Small delay so the panel open animation can finish
    const timer = setTimeout(() => textareaRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-end gap-2 border-t border-gray-200 bg-white p-3">
      <textarea
        ref={textareaRef}
        dir={isRtl ? "rtl" : "ltr"}
        rows={1}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={placeholder}
        className={cn(
          "flex-1 resize-none rounded-xl border border-gray-200 bg-sand/40 px-4 py-2.5 text-sm leading-6 text-ink outline-none transition-colors",
          "placeholder:text-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isRtl ? "font-arabic" : "font-sans",
        )}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled}
        aria-label={isRtl ? "إرسال" : "Send"}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-navy-deep transition-colors",
          "hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
          "disabled:cursor-not-allowed disabled:opacity-40",
        )}
      >
        <SendHorizontal
          size={18}
          className={cn(isRtl && "scale-x-[-1]")}
        />
      </button>
    </div>
  );
}
