"use client";

import { useId, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { formatDay, formatNumber, nightsBetween, type ISODate } from "@/lib/dates";
import { Calendar } from "./calendar";
import { Popover, useMediaQuery } from "./popover";

export type DateRange = { start: ISODate; end: ISODate };
type Which = "start" | "end";

const L = {
  en: {
    nights: (n: number) => `${n} night${n === 1 ? "" : "s"}`,
    pickStart: "Choose your check-in date",
    pickEnd: "Now choose your check-out date",
    clear: "Clear",
    done: "Done",
    close: "Close",
    dialog: "Choose dates",
  },
  ar: {
    nights: (n: number) => (n === 1 ? "ليلة واحدة" : n === 2 ? "ليلتان" : n <= 10 ? `${formatNumber(n, "ar")} ليالٍ` : `${formatNumber(n, "ar")} ليلة`),
    pickStart: "اختر تاريخ الوصول",
    pickEnd: "اختر الآن تاريخ المغادرة",
    clear: "مسح",
    done: "تم",
    close: "إغلاق",
    dialog: "اختيار التواريخ",
  },
};

export type DateTriggerProps = {
  ref: (el: HTMLButtonElement | null) => void;
  type: "button";
  onClick: () => void;
  "aria-haspopup": "dialog";
  "aria-expanded": boolean;
  "aria-controls"?: string;
};

/** "Tue, 18 Nov" / "الثلاثاء، ١٨ نوفمبر" for a trigger, or "" when empty. */
export const shortDate = (iso: ISODate | "", locale: Locale) =>
  iso ? formatDay(iso, locale, { weekday: "short", day: "numeric", month: "short" }) : "";

/**
 * Check-in / check-out picker. The caller draws the two triggers (so they can sit in any layout)
 * and spreads `trigger("start")` / `trigger("end")` on them; one calendar panel serves both.
 * Picking check-in moves straight on to check-out, and the panel closes once both are set.
 */
export function DateRangePicker({
  locale,
  start,
  end,
  onChange,
  min,
  max,
  allowSameDay = false,
  labels,
  children,
}: {
  locale: Locale;
  start: ISODate | "";
  end: ISODate | "";
  onChange: (range: { start: ISODate | ""; end: ISODate | "" }) => void;
  min?: ISODate;
  max?: ISODate;
  allowSameDay?: boolean;
  labels?: Partial<(typeof L)["en"]>;
  children: (api: { trigger: (which: Which) => DateTriggerProps; open: Which | null }) => React.ReactNode;
}) {
  const t = { ...L[locale], ...labels };
  const panelId = useId().replace(/:/g, "") + "-dates";
  const [open, setOpen] = useState<Which | null>(null);
  const triggers = useRef<Record<Which, HTMLButtonElement | null>>({ start: null, end: null });
  const wide = useMediaQuery("(min-width: 768px)");

  const close = (focus: Which | null = open) => {
    setOpen(null);
    if (focus) triggers.current[focus]?.focus({ preventScroll: true });
  };

  const after = (a: ISODate, b: ISODate) => (allowSameDay ? b >= a : b > a);

  const onPick = (d: ISODate) => {
    if (open === "start" || !start || !after(start, d)) {
      // New first day; drop a last day that no longer fits.
      onChange({ start: d, end: end && after(d, end) ? end : "" });
      setOpen("end");
      return;
    }
    onChange({ start, end: d });
    close("end");
  };

  const trigger = (which: Which): DateTriggerProps => ({
    ref: (el) => {
      triggers.current[which] = el;
    },
    type: "button",
    onClick: () => (open === which ? close(which) : setOpen(which)),
    "aria-haspopup": "dialog",
    "aria-expanded": open === which,
    "aria-controls": open ? panelId : undefined,
  });

  const nights = start && end ? nightsBetween(start, end) + (allowSameDay ? 1 : 0) : 0;

  return (
    <>
      {children({ trigger, open })}
      <Popover
        open={open !== null}
        anchor={open ? triggers.current[open] : null}
        onClose={() => close()}
        title={t.dialog}
        closeLabel={t.close}
        id={panelId}
        className="p-4"
      >
        <div className="px-4 pb-4 sm:p-0">
          <p className="mb-3 text-xs font-medium text-ink/60" aria-live="polite">
            {open === "end" && start ? t.pickEnd : t.pickStart}
          </p>
          <Calendar
            key={wide ? "2" : "1"}
            locale={locale}
            start={start || undefined}
            end={end || undefined}
            picking={open ?? "start"}
            onPick={onPick}
            min={min}
            max={max}
            months={wide ? 2 : 1}
            allowSameDay={allowSameDay}
            autoFocus
          />
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-navy/10 pt-3">
            <span className="text-sm font-semibold text-navy">{nights > 0 ? t.nights(nights) : ""}</span>
            <div className="flex gap-2">
              {(start || end) && (
                <button
                  type="button"
                  onClick={() => {
                    onChange({ start: "", end: "" });
                    setOpen("start");
                  }}
                  className="h-10 rounded-full px-4 text-xs font-semibold text-crystal hover:bg-sand focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {t.clear}
                </button>
              )}
              <button
                type="button"
                onClick={() => close()}
                className="h-10 rounded-full bg-gold px-5 text-xs font-semibold text-navy-deep hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                {t.done}
              </button>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
}
