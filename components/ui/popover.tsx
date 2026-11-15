"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Subscribe to a media query (false on the server and during hydration). */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Phones get a bottom sheet instead of a floating panel. */
export const useIsPhone = () => useMediaQuery("(max-width: 639px)");

const GAP = 6;
const EDGE = 8;

/**
 * Floating panel anchored to a trigger, rendered in a portal so it is never clipped by
 * overflow:hidden parents (hero, chat panel). On phones it becomes a bottom sheet with a title
 * and a close button. Closes on outside press and Escape; the caller moves focus back.
 */
export function Popover({
  open,
  anchor,
  onClose,
  title,
  id,
  role = "dialog",
  matchWidth = false,
  closeLabel = "Close",
  className,
  children,
}: {
  open: boolean;
  anchor: HTMLElement | null;
  onClose: () => void;
  /** Sheet heading on phones and the accessible name of the panel. */
  title: string;
  id?: string;
  role?: "dialog" | "presentation";
  matchWidth?: boolean;
  closeLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const phone = useIsPhone();
  const [pos, setPos] = useState<React.CSSProperties>({ visibility: "hidden" });

  const place = useCallback(() => {
    const el = panel.current;
    if (!el || !anchor || phone) return;
    const r = anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(el.offsetWidth, vw - EDGE * 2);
    const h = el.offsetHeight;
    const below = vh - r.bottom - GAP - EDGE;
    const above = r.top - GAP - EDGE;
    const top = h > below && above > below ? Math.max(EDGE, r.top - GAP - h) : r.bottom + GAP;
    const rtl = getComputedStyle(anchor).direction === "rtl";
    let left = rtl ? r.right - w : r.left;
    left = Math.max(EDGE, Math.min(left, vw - w - EDGE));
    setPos({
      top,
      left,
      minWidth: matchWidth ? r.width : undefined,
      maxHeight: Math.max(below, above, 240),
    });
  }, [anchor, matchWidth, phone]);

  useLayoutEffect(() => {
    if (!open) {
      setPos({ visibility: "hidden" });
      return;
    }
    place();
  }, [open, place]);

  useEffect(() => {
    if (!open || phone) return;
    let frame = 0;
    const onMove = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };
    const ro = new ResizeObserver(onMove);
    if (panel.current) ro.observe(panel.current);
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [open, phone, place]);

  // Outside press closes (desktop; the sheet has its own backdrop).
  useEffect(() => {
    if (!open || phone) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panel.current?.contains(t) || anchor?.contains(t)) return;
      onClose();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, phone, anchor, onClose]);

  // Lock page scroll behind the sheet.
  useEffect(() => {
    if (!open || !phone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, phone]);

  if (!open || typeof document === "undefined") return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    }
  };

  const a11y = role === "dialog" ? { role: "dialog" as const, "aria-label": title, "aria-modal": phone || undefined } : { role: "presentation" as const };

  return createPortal(
    phone ? (
      <div className="fixed inset-0 z-[120]" onKeyDown={onKeyDown}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={onClose}
          className="absolute inset-0 h-full w-full cursor-default bg-navy-deep/50 backdrop-blur-[2px] animate-[fadeIn_160ms_ease-out]"
        />
        <div
          ref={panel}
          id={id}
          {...a11y}
          data-lenis-prevent
          className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgb(7_30_51/0.35)] animate-[sheetUp_220ms_cubic-bezier(0.2,0.7,0.2,1)]"
        >
          <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-navy/15" aria-hidden />
          <div className="flex shrink-0 items-center justify-between px-5 pt-2 pb-3">
            <p className="text-base font-semibold text-navy">{title}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="-me-2 grid h-11 w-11 place-items-center rounded-full text-navy/60 hover:bg-sand focus-visible:outline-2 focus-visible:outline-gold"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        </div>
      </div>
    ) : (
      <div
        ref={panel}
        id={id}
        {...a11y}
        data-lenis-prevent
        onKeyDown={onKeyDown}
        style={{ position: "fixed", ...pos }}
        className={cn(
          "z-[120] flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_18px_50px_-12px_rgb(7_30_51/0.45)] ring-1 ring-navy/10 animate-[popIn_140ms_ease-out]",
          className,
        )}
      >
        {children}
      </div>
    ),
    document.body,
  );
}
