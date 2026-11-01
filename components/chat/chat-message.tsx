import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  locale: Locale;
}

export function ChatMessage({ role, content, timestamp, locale }: ChatMessageProps) {
  const isUser = role === "user";
  const isRtl = locale === "ar";

  const time = timestamp.toLocaleTimeString(locale === "ar" ? "ar-SA" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex gap-2.5",
        /* User messages: end-aligned; assistant: start-aligned */
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {/* Areen avatar — shown before assistant messages in LTR, after in RTL */}
      {!isUser && (
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-deep text-[11px] font-semibold text-gold"
          aria-hidden="true"
        >
          {isRtl ? "أ" : "A"}
        </div>
      )}

      <div className={cn("max-w-[85%]", isUser ? "items-end" : "items-start")}>
        <div
          dir="auto"
          className={cn(
            "whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-navy-deep text-white rounded-ee-sm"
              : "bg-sand text-ink rounded-es-sm",
            isRtl ? "font-arabic" : "font-sans",
          )}
        >
          {content}
        </div>

        <p
          className={cn(
            "mt-1 text-[10px] text-gray-400",
            isUser ? "text-end" : "text-start",
          )}
        >
          {time}
        </p>
      </div>
    </div>
  );
}
