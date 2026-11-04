"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  hasUnread: boolean;
  sendMessage: (text: string) => Promise<void>;
  toggleChat: () => void;
  dismissUnread: () => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const API_BASE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CHAT_API_URL) ||
  "http://localhost:4000";

const STORAGE_KEY = "areen-session-id";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readSessionId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeSessionId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* localStorage may be unavailable */
  }
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  /** Session id is kept in a ref so async callbacks always see the latest value */
  const sessionIdRef = useRef<string | null>(null);
  /** Guard to ensure history is only loaded once per mount */
  const historyLoadedRef = useRef(false);

  /* ---- Load history on mount ---- */
  useEffect(() => {
    if (historyLoadedRef.current) return;
    historyLoadedRef.current = true;

    const stored = readSessionId();
    if (!stored) return;

    sessionIdRef.current = stored;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/history/${stored}`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(
            data.messages.map(
              (m: { role: string; content: string; timestamp?: string }, i: number) => ({
                id: `hist-${i}`,
                role: m.role as "user" | "assistant",
                content: m.content,
                timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
              }),
            ),
          );
        }
      } catch {
        /* History load is best-effort — silently ignore */
      }
    })();
  }, []);

  /* ---- Send message ---- */
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setError(null);

    /* Ensure we have a session id */
    let sid = sessionIdRef.current;
    if (!sid) {
      try {
        const res = await fetch(`${API_BASE}/api/chat/new`, { method: "POST" });
        if (!res.ok) throw new Error("Failed to create session");
        const data = await res.json();
        sid = data.sessionId as string;
      } catch {
        sid = generateId();
      }
      sessionIdRef.current = sid;
      writeSessionId(sid);
    }

    /* Append user message */
    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid, message: trimmed }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(
          (errBody as { error?: string }).error || `Request failed (${res.status})`,
        );
      }

      const data = (await res.json()) as { response: string };

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setHasUnread(false);
      return !prev;
    });
  }, []);

  const dismissUnread = useCallback(() => setHasUnread(false), []);

  return {
    messages,
    isOpen,
    isLoading,
    error,
    hasUnread,
    sendMessage,
    toggleChat,
    dismissUnread,
  };
}
