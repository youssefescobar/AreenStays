export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Bilingual text field used across the content files */
export type T = Record<Locale, string>;

/** Prefix an internal path with the locale, e.g. href("ar", "/rooms") -> "/ar/rooms" */
export const href = (locale: Locale, path = "") => `/${locale}${path === "/" ? "" : path}`;
