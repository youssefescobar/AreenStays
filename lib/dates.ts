/**
 * Calendar-day helpers. Days are "YYYY-MM-DD" strings everywhere (what the booking API takes),
 * and all maths runs in UTC so a guest's timezone or a DST switch can never shift a day.
 */
import type { Locale } from "./i18n";

export type ISODate = string;

const toDate = (iso: ISODate) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const fromDate = (date: Date): ISODate => date.toISOString().slice(0, 10);

/** Today in the guest's own timezone. */
export const today = (): ISODate => new Date().toLocaleDateString("en-CA");

export const addDays = (iso: ISODate, n: number): ISODate => {
  const d = toDate(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return fromDate(d);
};

export const addMonths = (iso: ISODate, n: number): ISODate => {
  const d = toDate(iso);
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + n);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return fromDate(d);
};

export const startOfMonth = (iso: ISODate): ISODate => `${iso.slice(0, 7)}-01`;
export const sameMonth = (a: ISODate, b: ISODate) => a.slice(0, 7) === b.slice(0, 7);
export const weekday = (iso: ISODate) => toDate(iso).getUTCDay();
export const nightsBetween = (from: ISODate, to: ISODate) => Math.round((toDate(to).getTime() - toDate(from).getTime()) / 86_400_000);
export const clamp = (iso: ISODate, min?: ISODate, max?: ISODate) => (min && iso < min ? min : max && iso > max ? max : iso);

/** Gregorian calendar in both languages; Arabic keeps Arabic-Indic digits like the rest of the site. */
const intlLocale = (locale: Locale) => (locale === "ar" ? "ar-SA-u-ca-gregory-nu-arab" : "en-GB");

export const formatDay = (iso: ISODate, locale: Locale, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(intlLocale(locale), { timeZone: "UTC", ...opts }).format(toDate(iso));

export const formatNumber = (n: number, locale: Locale) => new Intl.NumberFormat(intlLocale(locale)).format(n);

/** Weekday headers starting Sunday (the Saudi working week). */
export const weekdayNames = (locale: Locale) =>
  Array.from({ length: 7 }, (_, i) => {
    const iso = addDays("2026-11-01", i); // a Sunday
    return {
      short: formatDay(iso, locale, { weekday: locale === "ar" ? "narrow" : "short" }).slice(0, locale === "ar" ? 2 : 2),
      long: formatDay(iso, locale, { weekday: "long" }),
    };
  });

/** 6×7 grid of days for the month containing `iso` (leading/trailing days belong to nearby months). */
export const monthGrid = (iso: ISODate): ISODate[] => {
  const first = startOfMonth(iso);
  const start = addDays(first, -weekday(first));
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
};
