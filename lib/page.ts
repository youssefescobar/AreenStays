import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./i18n";
import { dict } from "@/content/site";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Resolves the locale param (404 on anything else) and returns it with its dictionary. */
export async function resolve(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale: locale as Locale, t: dict[locale] };
}
