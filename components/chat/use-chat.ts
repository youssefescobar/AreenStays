"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatCard } from "./chat-cards";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "staff";
  content: string;
  timestamp: Date;
  cards?: ChatCard[];
}

type ServerMessage = { role: ChatMessage["role"]; content: string; timestamp?: string; cards?: ChatCard[] };

// Base URL without "/api" — paths below add it.
const API_BASE = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:4000";
const STORAGE_KEY = "areen-session-id";

// How often an open chat checks for replies typed by staff in the admin app.
// ponytail: polling, not websockets; ~1 cheap request per 4s per open chat is fine at hotel scale.
const POLL_STAFF_MS = 4000;
const POLL_AI_MS = 15000; // catches a staff takeover while the guest is just reading

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
  const [mode, setMode] = useState<"ai" | "staff">("ai");
  const [staffName, setStaffName] = useState<string | null>(null);

  // Ref so async callbacks always see the latest session id.
  const sessionIdRef = useRef<string | null>(null);

  /** Replace local state with the server's copy of the conversation (source of truth). */
  const syncHistory = useCallback(async () => {
    const sid = sessionIdRef.current;
    if (!sid) return;
    try {
      const res = await fetch(`${API_BASE}/api/chat/history/${encodeURIComponent(sid)}`);
      if (!res.ok) return;
      const data = (await res.json()) as { messages?: ServerMessage[]; mode?: "ai" | "staff"; staffName?: string };
      if (!Array.isArray(data.messages)) return;
      setMessages(
        data.messages.map((m, i) => ({
          id: `m-${i}`, // index ids keep bubbles stable across polls
          role: m.role,
          content: m.content,
          timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
          cards: m.cards,
        })),
      );
      setMode(data.mode ?? "ai");
      setStaffName(data.staffName ?? null);
    } catch {
      /* best-effort */
    }
  }, []);

  /* Restore the previous conversation, if any */
  useEffect(() => {
    sessionIdRef.current = readSessionId();
    void syncHistory();
  }, [syncHistory]);

  /* While open, check for staff replies / takeover */
  useEffect(() => {
    if (!isOpen || !sessionIdRef.current) return;
    const timer = setInterval(() => {
      if (!isLoading) void syncHistory();
    }, mode === "staff" ? POLL_STAFF_MS : POLL_AI_MS);
    return () => clearInterval(timer);
  }, [isOpen, isLoading, mode, syncHistory]);

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
      const data = (await res.json().catch(() => ({}))) as {
        response?: string | null;
        error?: string;
        cards?: ChatCard[];
        mode?: "ai" | "staff";
        staffName?: string;
      };
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);

      if (data.mode === "staff") {
        // A team member is handling this chat: no AI reply; their answer arrives via polling.
        setMode("staff");
        setStaffName(data.staffName ?? null);
        return;
      }
      if (!data.response) throw new Error("Empty response");
      setMode("ai");
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

  return { messages, isOpen, isLoading, error, mode, staffName, sendMessage, retry, toggleChat };
}
