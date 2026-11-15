"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, useIsPhone } from "./popover";

export type SelectOption<V extends string = string> = {
  value: V;
  label: string;
  /** Small second line, e.g. "Fully booked". */
  hint?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  /** Extra words the search box matches (other language, dial code…). */
  keywords?: string;
};

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[ً-ٰٟ]/g, "") // Arabic diacritics
    .replace(/[̀-ͯ]/g, "")
    .replace(/[أإآ]/g, "ا");

/**
 * Brand-styled replacement for <select>.
 * - Without search it follows the WAI-ARIA "select-only combobox": focus stays on the trigger,
 *   arrows / Home / End / typing move the highlight, Enter or Space picks, Escape closes.
 * - With `searchable` the panel has a filter box (role=combobox) that drives the same list.
 * - On phones the list opens as a bottom sheet with large touch rows.
 */
export function Select<V extends string>({
  value,
  onChange,
  options,
  label,
  placeholder,
  searchable = false,
  searchPlaceholder,
  noResults = "—",
  closeLabel,
  renderValue,
  disabled,
  id,
  name,
  className,
  panelClassName,
  labelledBy,
}: {
  value: V | "";
  onChange: (value: V) => void;
  options: SelectOption<V>[];
  /** Accessible name; also the sheet title on phones. */
  label: string;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  noResults?: string;
  closeLabel?: string;
  /** Custom content for the closed trigger (e.g. "🇸🇦 +966"). */
  renderValue?: (option: SelectOption<V> | undefined) => React.ReactNode;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  panelClassName?: string;
  /** id of a visible label; otherwise `label` is used as aria-label. */
  labelledBy?: string;
}) {
  const auto = useId();
  const baseId = id ?? `sel${auto.replace(/:/g, "")}`;
  const listId = `${baseId}-list`;
  const trigger = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const phone = useIsPhone();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const typed = useRef({ text: "", at: 0 });

  const selected = options.find((o) => o.value === value);

  const shown = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = fold(query.trim().replace(/^\+/, ""));
    return options.filter((o) => fold(`${o.label} ${o.keywords ?? ""} ${o.value}`).includes(q));
  }, [options, query, searchable]);

  const firstEnabled = (from: number, step: 1 | -1) => {
    for (let i = from; i >= 0 && i < shown.length; i += step) if (!shown[i].disabled) return i;
    return -1;
  };

  const openList = (highlight?: "first" | "last") => {
    if (disabled) return;
    setQuery("");
    setOpen(true);
    const sel = options.findIndex((o) => o.value === value);
    setActive(highlight === "last" ? firstEnabled(options.length - 1, -1) : sel >= 0 && !highlight ? sel : firstEnabled(0, 1));
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) trigger.current?.focus({ preventScroll: true });
  };

  const pick = (o: SelectOption<V> | undefined) => {
    if (!o || o.disabled) return;
    onChange(o.value);
    close();
  };

  // Search box takes focus on desktop; on phones we skip it so the keyboard doesn't cover the list.
  useEffect(() => {
    if (!open || !searchable) return;
    if (!phone) requestAnimationFrame(() => searchRef.current?.focus());
  }, [open, searchable, phone]);

  useEffect(() => {
    if (searchable) setActive(firstEnabled(0, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Keep the highlighted row visible.
  useEffect(() => {
    if (!open || active < 0) return;
    // Scroll only the list (scrollIntoView would also nudge the page behind a phone sheet).
    const list = listRef.current;
    const row = list?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!list || !row) return;
    if (row.offsetTop < list.scrollTop) list.scrollTop = row.offsetTop - 6;
    else if (row.offsetTop + row.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = row.offsetTop + row.offsetHeight - list.clientHeight + 6;
  }, [active, open]);

  const move = (to: number) => {
    if (!shown.length) return;
    const step = to < active ? -1 : 1;
    const i = firstEnabled(Math.max(0, Math.min(shown.length - 1, to)), step as 1 | -1);
    if (i >= 0) setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList(e.key === "ArrowUp" ? "last" : undefined);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(active + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey) pick(shown[active]);
        else move(active - 1);
        break;
      case "Home":
        if (searchable && e.target === searchRef.current) return;
        e.preventDefault();
        setActive(firstEnabled(0, 1));
        break;
      case "End":
        if (searchable && e.target === searchRef.current) return;
        e.preventDefault();
        setActive(firstEnabled(shown.length - 1, -1));
        break;
      case "PageDown":
        e.preventDefault();
        move(active + 8);
        break;
      case "PageUp":
        e.preventDefault();
        move(active - 8);
        break;
      case "Enter":
        e.preventDefault();
        pick(shown[active]);
        break;
      case " ":
        if (searchable) return; // typing a space in the search box
        e.preventDefault();
        pick(shown[active]);
        break;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        // Typeahead (no search box): jump to the next option starting with the typed letters.
        if (!searchable && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const now = Date.now();
          const t = typed.current;
          t.text = now - t.at > 600 ? e.key : t.text + e.key;
          t.at = now;
          const q = fold(t.text);
          const order = [...shown.keys()].slice(active + (t.text.length === 1 ? 1 : 0)).concat([...shown.keys()]);
          const hit = order.find((i) => !shown[i].disabled && fold(shown[i].label).startsWith(q));
          if (hit !== undefined) setActive(hit);
        }
    }
  };

  const activeId = open && active >= 0 && shown[active] ? `${baseId}-opt-${active}` : undefined;
  const nameProps = labelledBy ? { "aria-labelledby": `${labelledBy} ${baseId}` } : { "aria-label": label };

  return (
    <>
      <button
        ref={trigger}
        id={baseId}
        type="button"
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
        {...(searchable
          ? { "aria-haspopup": "dialog" as const }
          : { role: "combobox", "aria-haspopup": "listbox" as const, "aria-activedescendant": activeId })}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        {...nameProps}
        className={cn(
          "group flex w-full items-center justify-between gap-2 text-start text-sm font-medium text-navy outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 rounded-sm",
          className,
        )}
      >
        <span className={cn("min-w-0 truncate", !selected && "text-ink/40")}>
          {renderValue ? renderValue(selected) : (selected?.label ?? placeholder ?? "")}
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={cn("shrink-0 text-crystal transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {name && <input type="hidden" name={name} value={value} />}

      <Popover
        open={open}
        anchor={trigger.current}
        onClose={() => close()}
        title={label}
        closeLabel={closeLabel}
        role={searchable ? "dialog" : "presentation"}
        matchWidth
        className={cn("w-max max-w-[min(92vw,26rem)]", panelClassName)}
      >
        <div onKeyDown={onKeyDown} className="flex min-h-0 flex-1 flex-col">
          {searchable && (
            <div className="relative shrink-0 border-b border-navy/10 px-3 py-2.5 sm:py-2">
              <Search size={16} aria-hidden className="pointer-events-none absolute start-6 top-1/2 -translate-y-1/2 text-crystal" />
              <input
                ref={searchRef}
                type="text"
                enterKeyHint="search"
                role="combobox"
                aria-expanded
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeId}
                aria-label={searchPlaceholder ?? label}
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                className="ui-search h-11 w-full rounded-lg bg-sand ps-10 pe-3 text-sm text-navy outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-gold/50 sm:h-10"
              />
            </div>
          )}
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            tabIndex={-1}
            className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5 sm:max-h-72"
          >
            {shown.length === 0 && <li className="px-4 py-3 text-sm text-ink/50">{noResults}</li>}
            {shown.map((o, i) => {
              const isSel = o.value === value;
              const isActive = i === active;
              return (
                <li
                  key={o.value || `__${i}`}
                  id={`${baseId}-opt-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={isSel}
                  aria-disabled={o.disabled || undefined}
                  onPointerMove={() => !o.disabled && active !== i && setActive(i)}
                  onPointerDown={(e) => e.preventDefault()} // keep focus on the trigger / search
                  onClick={() => pick(o)}
                  className={cn(
                    "mx-1.5 flex min-h-12 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy sm:min-h-10",
                    isActive && !o.disabled && "bg-sand",
                    isSel && "font-semibold",
                    o.disabled && "cursor-not-allowed text-ink/35",
                  )}
                >
                  {o.icon && <span className="shrink-0" aria-hidden>{o.icon}</span>}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{o.label}</span>
                    {o.hint && (
                      <span className={cn("block text-xs font-normal", o.disabled ? "text-gold" : "text-ink/50")}>{o.hint}</span>
                    )}
                  </span>
                  <Check size={16} aria-hidden className={cn("shrink-0 text-gold", !isSel && "invisible")} />
                </li>
              );
            })}
          </ul>
        </div>
      </Popover>
    </>
  );
}
