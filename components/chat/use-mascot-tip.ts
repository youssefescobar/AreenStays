"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { HELLO_TIP, IDLE_TIPS, tipFromPath } from "./mascot";

export type MascotTip = { text: string; kind: "hello" | "hover" | "section" | "idle" } | null;

const SECTION_TIP_MS = 5000;

/**
 * Tip above the closed FAB, by priority:
 * hello on FAB hover → hovered link/section hint → section scrolled into view → rotating idle tips.
 * Section tips are what touch devices get, since they never hover.
 */
export function useMascotTip({
  locale,
  isOpen,
  hoveringFab,
}: {
  locale: Locale;
  isOpen: boolean;
  hoveringFab: boolean;
}): MascotTip {
  const [contextTip, setContextTip] = useState<string | null>(null);
  const [sectionTip, setSectionTip] = useState<string | null>(null);
  const [idleIndex, setIdleIndex] = useState(0);
  const [idleReady, setIdleReady] = useState(false);

  /* Hover hints (fine pointers only) */
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
      /* Big sections are handled by the scroll observer; hover is for links and nav. */
      if (hinted?.dataset.mascotHint && hinted.tagName !== "SECTION") {
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
      const next = related?.closest?.<HTMLElement>("[data-mascot-hint], a[href]");
      if (!next || next.tagName === "SECTION") setContextTip(null);
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.clearTimeout(ready);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isOpen, locale]);

  /* Section hints as the guest scrolls (all devices) */
  useEffect(() => {
    if (isOpen || !("IntersectionObserver" in window)) {
      setSectionTip(null);
      return;
    }
    const targets = Array.from(document.querySelectorAll<HTMLElement>("section[data-mascot-hint]"));
    if (!targets.length) return;

    const ratios = new Map<HTMLElement, number>();
    let shown: string | null = null;
    let hide = 0;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target as HTMLElement, e.isIntersecting ? e.intersectionRatio : 0);
        let best: HTMLElement | null = null;
        let bestRatio = 0.45;
        for (const [el, r] of ratios) if (r > bestRatio) [best, bestRatio] = [el, r];
        const hint = best?.dataset.mascotHint ?? null;
        if (!hint || hint === shown) return;
        shown = hint;
        setSectionTip(hint);
        window.clearTimeout(hide);
        hide = window.setTimeout(() => setSectionTip(null), SECTION_TIP_MS);
      },
      { threshold: [0, 0.25, 0.45, 0.6, 0.8, 1] },
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      window.clearTimeout(hide);
    };
  }, [isOpen, locale]);

  /* Rotating idle tips */
  useEffect(() => {
    if (isOpen || hoveringFab || contextTip || sectionTip || !idleReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIdleIndex((i) => (i + 1) % IDLE_TIPS[locale].length),
      6000,
    );
    return () => window.clearInterval(id);
  }, [isOpen, hoveringFab, contextTip, sectionTip, idleReady, locale]);

  if (isOpen) return null;
  if (hoveringFab) return { text: HELLO_TIP[locale], kind: "hello" };
  if (contextTip) return { text: contextTip, kind: "hover" };
  if (!idleReady) return null;
  if (sectionTip) return { text: sectionTip, kind: "section" };
  const idle = IDLE_TIPS[locale][idleIndex];
  return idle ? { text: idle, kind: "idle" } : null;
}
