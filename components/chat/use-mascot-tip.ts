"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { HELLO_TIP, IDLE_TIPS, tipFromPath } from "./mascot";

const ROTATE_MS = 6000;
const IDLE_DELAY_MS = 1800;

const isMouseHoverDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Tip above the closed FAB:
 * 1) FAB hover → hello
 * 2) Hovered data-mascot-hint or internal /path link
 * 3) Rotating idle tips (after a short delay so load isn't noisy)
 * Hidden when open; rotation pauses on prefers-reduced-motion.
 */
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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIdleReady(false);
      return;
    }
    const t = window.setTimeout(() => setIdleReady(true), IDLE_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || !isMouseHoverDevice()) {
      setContextTip(null);
      return;
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const hinted = target.closest<HTMLElement>("[data-mascot-hint]");
      if (hinted?.dataset.mascotHint) {
        setContextTip(hinted.dataset.mascotHint);
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      try {
        const url = new URL(link.href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        const tip = tipFromPath(`${url.pathname}${url.hash}`, locale);
        if (tip) setContextTip(tip);
      } catch {
        /* ignore */
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (related?.closest?.("[data-mascot-hint], a[href]")) return;
      setContextTip(null);
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isOpen, locale]);

  useEffect(() => {
    if (isOpen || hoveringFab || contextTip || reducedMotion || !idleReady) return;
    const id = window.setInterval(() => {
      setIdleIndex((i) => (i + 1) % IDLE_TIPS[locale].length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isOpen, hoveringFab, contextTip, reducedMotion, idleReady, locale]);

  if (isOpen) return null;
  if (hoveringFab) return HELLO_TIP[locale];
  if (contextTip) return contextTip;
  if (!idleReady) return null;
  return IDLE_TIPS[locale][idleIndex] ?? null;
}
