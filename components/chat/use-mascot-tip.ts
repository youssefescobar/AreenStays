"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { HELLO_TIP, IDLE_TIPS, tipFromPath } from "./mascot";

/** Tip above closed FAB: hello on hover → page hint → rotating idle tips. */
export function useMascotTip({
  locale,
  isOpen,
  hoveringFab,
}: {
  locale: Locale;
  isOpen: boolean;
  hoveringFab: boolean;
}) {
  const [contextTip, setContextTip] = useState<string | null>(null);
  const [idleIndex, setIdleIndex] = useState(0);
  const [idleReady, setIdleReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIdleReady(false);
      setContextTip(null);
      return;
    }
    const ready = window.setTimeout(() => setIdleReady(true), 1800);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return () => window.clearTimeout(ready);

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest) return;
      const hinted = el.closest<HTMLElement>("[data-mascot-hint]");
      if (hinted?.dataset.mascotHint) {
        setContextTip(hinted.dataset.mascotHint);
        return;
      }
      const link = el.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      try {
        const url = new URL(link.href, location.origin);
        if (url.origin !== location.origin) return;
        const tip = tipFromPath(`${url.pathname}${url.hash}`, locale);
        if (tip) setContextTip(tip);
      } catch {
        /* ignore */
      }
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest?.("[data-mascot-hint], a[href]")) setContextTip(null);
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.clearTimeout(ready);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isOpen, locale]);

  useEffect(() => {
    if (isOpen || hoveringFab || contextTip || !idleReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIdleIndex((i) => (i + 1) % IDLE_TIPS[locale].length),
      6000,
    );
    return () => window.clearInterval(id);
  }, [isOpen, hoveringFab, contextTip, idleReady, locale]);

  if (isOpen) return null;
  if (hoveringFab) return HELLO_TIP[locale];
  if (contextTip) return contextTip;
  if (!idleReady) return null;
  return IDLE_TIPS[locale][idleIndex] ?? null;
}
