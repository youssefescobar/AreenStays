import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

/**
 * Sends visitors without a locale in the URL to /ar or /en.
 * Order: saved choice (cookie) -> Saudi visitor (Vercel geo header) -> browser language -> Arabic.
 */
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get("locale")?.value;
  if (saved && isLocale(saved)) return saved;
  if (req.headers.get("x-vercel-ip-country") === "SA") return "ar";
  const lang = req.headers.get("accept-language") ?? "";
  if (/^\s*ar\b/i.test(lang)) return "ar";
  if (/^\s*en\b/i.test(lang)) return "en";
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, svg, icons, robots, sitemap)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
