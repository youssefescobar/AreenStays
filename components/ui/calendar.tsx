"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import {
  addDays,
  addMonths,
  clamp,
  formatDay,
  formatNumber,
  monthGrid,
  sameMonth,
  startOfMonth,
  today as todayIso,
  weekday,
  weekdayNames,
  type ISODate,
} from "@/lib/dates";

const L = {
  en: { prev: "Previous month", next: "Next month", today: "today", unavailable: "unavailable" },
  ar: { prev: "الشهر السابق", next: "الشهر التالي", today: "اليوم", unavailable: "غير متاح" },
};

/**
 * Month grid(s) with full keyboard support (WAI-ARIA date grid):
 * arrows move a day/week (mirrored in Arabic), Home/End go to the week's edges,
 * PageUp/PageDown change month (with Shift: year), Enter/Space pick.
 * It only reports picks; range logic lives in the parent.
 */
export function Calendar({
  locale,
  start,
  end,
  picking = "start",
  onPick,
  min,
  max,
  months = 1,
  autoFocus = false,
  allowSameDay = false,
}: {
  locale: Locale;
  start?: ISODate;
  end?: ISODate;
  /** In a range, which end the next pick sets (drives the hover preview). Single date: leave "start". */
  picking?: "start" | "end";
  onPick: (iso: ISODate) => void;
  min?: ISODate;
  max?: ISODate;
  months?: 1 | 2;
  autoFocus?: boolean;
  /** Ranges where the last day can equal the first (inclusive nights). */
  allowSameDay?: boolean;
}) {
  const t = L[locale];
  const rtl = locale === "ar";
  const uid = useId().replace(/:/g, "");
  const today = todayIso();
  const initial = clamp((picking === "end" ? end ?? (start ? addDays(start, allowSameDay ? 0 : 1) : undefined) : start) ?? today, min, max);
  const [focus, setFocus] = useState<ISODate>(initial);
  const [view, setView] = useState<ISODate>(startOfMonth(initial));
  const [hover, setHover] = useState<ISODate | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const wantFocus = useRef(autoFocus);

  // Follow the selection when the parent changes it (e.g. after picking check-in).
  useEffect(() => {
    const next = clamp((picking === "end" ? end ?? (start ? addDays(start, allowSameDay ? 0 : 1) : undefined) : start) ?? today, min, max);
    setFocus(next);
    setView((v) => (sameMonth(v, next) || (months === 2 && sameMonth(addMonths(v, 1), next)) ? v : startOfMonth(next)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picking, start, end]);

  useEffect(() => {
    if (!wantFocus.current) return;
    // Next frame: the floating panel is still being positioned (hidden) on the first render.
    const id = requestAnimationFrame(() => {
      wantFocus.current = false;
      root.current?.querySelector<HTMLButtonElement>(`[data-day="${focus}"]`)?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [focus, view]);

  const minMonth = min ? startOfMonth(min) : undefined;
  const maxMonth = max ? startOfMonth(max) : undefined;
  const canPrev = !minMonth || view > minMonth;
  const canNext = !maxMonth || addMonths(view, months - 1) < maxMonth;
  const isOff = (d: ISODate) => Boolean((min && d < min) || (max && d > max));

  const moveFocus = (d: ISODate) => {
    const next = clamp(d, min, max);
    wantFocus.current = true;
    setFocus(next);
    const last = addMonths(view, months - 1);
    if (next < view) setView(startOfMonth(next));
    else if (!sameMonth(next, last) && next > last) setView(startOfMonth(addMonths(next, -(months - 1))));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const fwd = rtl ? -1 : 1;
    const map: Record<string, () => ISODate> = {
      ArrowRight: () => addDays(focus, fwd),
      ArrowLeft: () => addDays(focus, -fwd),
      ArrowDown: () => addDays(focus, 7),
      ArrowUp: () => addDays(focus, -7),
      Home: () => addDays(focus, -weekday(focus)),
      End: () => addDays(focus, 6 - weekday(focus)),
      PageDown: () => addMonths(focus, e.shiftKey ? 12 : 1),
      PageUp: () => addMonths(focus, e.shiftKey ? -12 : -1),
    };
    if (map[e.key]) {
      e.preventDefault();
      moveFocus(map[e.key]());
    }
  };

  // Preview the range under the pointer / keyboard focus while choosing the end date.
  const previewEnd = picking === "end" && start && !end ? (hover ?? null) : null;
  const rangeEnd = end ?? (previewEnd && start && previewEnd > start ? previewEnd : undefined);

  const weekdays = weekdayNames(locale);

  return (
    <div ref={root} className="select-none" onKeyDown={onKeyDown}>
      <div className={cn("grid gap-6", months === 2 && "sm:grid-cols-2")}>
        {Array.from({ length: months }, (_, m) => {
          const month = addMonths(view, m);
          const days = monthGrid(month);
          const headingId = `${uid}-m${m}`;
          return (
            <div key={month} className={cn(m === 1 && "hidden sm:block")}>
              <div className="mb-2 flex h-10 items-center justify-between">
                {m === 0 ? (
                  <button
                    type="button"
                    onClick={() => setView(addMonths(view, -1))}
                    disabled={!canPrev}
                    aria-label={t.prev}
                    className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-sand disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <ChevronLeft size={18} aria-hidden className="rtl:rotate-180" />
                  </button>
                ) : (
                  <span className="hidden h-10 w-10 sm:block" />
                )}
                <h2 id={headingId} aria-live="polite" className="text-sm font-semibold text-navy">
                  {formatDay(month, locale, { month: "long", year: "numeric" })}
                </h2>
                {m === months - 1 || months === 1 ? (
                  <button
                    type="button"
                    onClick={() => setView(addMonths(view, 1))}
                    disabled={!canNext}
                    aria-label={t.next}
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-sand disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-gold",
                    )}
                  >
                    <ChevronRight size={18} aria-hidden className="rtl:rotate-180" />
                  </button>
                ) : (
                  // Two months on desktop: the "next" arrow sits on the second one; phones show only this month.
                  <button
                    type="button"
                    onClick={() => setView(addMonths(view, 1))}
                    disabled={!canNext}
                    aria-label={t.next}
                    className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-sand disabled:opacity-25 sm:invisible"
                  >
                    <ChevronRight size={18} aria-hidden className="rtl:rotate-180" />
                  </button>
                )}
              </div>
              <table role="grid" aria-labelledby={headingId} className="w-full border-collapse">
                <thead>
                  <tr>
                    {weekdays.map((w) => (
                      <th key={w.long} scope="col" abbr={w.long} className="h-8 text-center text-[11px] font-medium text-crystal">
                        {w.short}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }, (_, row) => (
                    <tr key={row}>
                      {days.slice(row * 7, row * 7 + 7).map((d) => {
                        if (!sameMonth(d, month)) return <td key={d} role="gridcell" className="p-0" />;
                        const off = isOff(d);
                        const isStart = d === start;
                        const isEnd = d === rangeEnd;
                        const inRange = Boolean(start && rangeEnd && d > start && d < rangeEnd);
                        const isEdge = isStart || d === end;
                        const preview = !end && isEnd;
                        const wd = weekday(d);
                        const label = [
                          formatDay(d, locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
                          d === today ? t.today : "",
                          off ? t.unavailable : "",
                        ]
                          .filter(Boolean)
                          .join(", ");
                        return (
                          <td
                            key={d}
                            role="gridcell"
                            aria-selected={isEdge || inRange}
                            className={cn(
                              "relative p-0 text-center",
                              // Range band (logical edges so it mirrors in Arabic)
                              (inRange || ((isStart && rangeEnd && rangeEnd !== start) || (isEnd && start && start !== d))) &&
                                "before:absolute before:inset-y-1 before:-z-0 before:bg-beige/60",
                              inRange && "before:inset-x-0",
                              isStart && rangeEnd && rangeEnd !== start && "before:start-1/2 before:end-0",
                              isEnd && start && start !== d && "before:start-0 before:end-1/2",
                              inRange && wd === 0 && "before:rounded-s-full",
                              inRange && wd === 6 && "before:rounded-e-full",
                            )}
                          >
                            <button
                              type="button"
                              data-day={d}
                              tabIndex={d === focus ? 0 : -1}
                              disabled={off}
                              aria-label={label}
                              aria-pressed={isEdge || undefined}
                              aria-current={d === today ? "date" : undefined}
                              onClick={() => onPick(d)}
                              onFocus={() => {
                                setFocus(d);
                                setHover(d);
                              }}
                              onPointerEnter={() => setHover(d)}
                              onPointerLeave={() => setHover(null)}
                              className={cn(
                                "relative z-[1] mx-auto grid h-10 w-10 place-items-center rounded-full text-sm tabular-nums text-navy outline-none transition-colors sm:h-9 sm:w-9",
                                "hover:bg-sand focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
                                d === today && !isEdge && "font-semibold text-crystal underline decoration-gold decoration-2 underline-offset-4",
                                inRange && "hover:bg-beige",
                                isEdge && "bg-navy font-semibold text-white hover:bg-navy",
                                preview && "bg-navy/80 text-white hover:bg-navy/80",
                                off && "cursor-not-allowed text-ink/25 line-through decoration-ink/20 hover:bg-transparent",
                              )}
                            >
                              {formatNumber(Number(d.slice(8)), locale)}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
