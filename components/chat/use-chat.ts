"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatCard } from "./chat-cards";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  cards?: ChatCard[];
}

// Base URL without "/api" — paths below add it.
const API_BASE = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:4000";
const STORAGE_KEY = "areen-session-id";

const newId = () => crypto.randomUUID();

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

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref so async callbacks always see the latest session id.
  const sessionIdRef = useRef<string | null>(null);

  /* Restore the previous conversation, if any */
  useEffect(() => {
    const stored = readSessionId();
    if (!stored) return;
    sessionIdRef.current = stored;

    fetch(`${API_BASE}/api/chat/history/${encodeURIComponent(stored)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!Array.isArray(data?.messages)) return;
        setMessages(
          data.messages.map((m: { role: ChatMessage["role"]; content: string; timestamp?: string; cards?: ChatCard[] }) => ({
            id: newId(),
            role: m.role,
            content: m.content,
            timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
            cards: m.cards,
          })),
        );
      })
      .catch(() => {
        /* best-effort */
      });
  }, []);

  /** Ask the backend; `text` must already be shown in the list as the last user message. */
  const request = useCallback(async (text: string) => {
    let sid = sessionIdRef.current;
    if (!sid) {
      sid = newId(); // the backend creates the conversation on the first message
      sessionIdRef.current = sid;
      writeSessionId(sid);
    }

    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid, message: text }),
      });
      const data = (await res.json().catch(() => ({}))) as { response?: string; error?: string; cards?: ChatCard[] };
      if (!res.ok || !data.response) throw new Error(data.error || `Request failed (${res.status})`);

      setMessages((prev) => [
        ...prev,
        { id: newId(), role: "assistant", content: data.response!, timestamp: new Date(), cards: data.cards },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((prev) => [...prev, { id: newId(), role: "user", content: trimmed, timestamp: new Date() }]);
      await request(trimmed);
    },
    [request],
  );

  /** Re-send the last user message without adding a duplicate bubble. */
  const retry = useCallback(async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) await request(lastUser.content);
  }, [messages, request]);

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  return { messages, isOpen, isLoading, error, sendMessage, retry, toggleChat };
}
