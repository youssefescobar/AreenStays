import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { MascotFace } from "./mascot-face";

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
      {!isUser && (
        <div className="reen-avatar h-7 w-7 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
          <MascotFace mood="idle" className="reen-avatar__photo" sizes="28px" />
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
