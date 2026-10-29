"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { href, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content/site";
import { AreenLogo } from "./areen-logo";

export function Header({ locale, t }: { locale: Locale; t: Pick<Dict, "nav" | "book" | "switchLang"> }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = [
    { label: t.nav.rooms, path: "/rooms" },
    { label: t.nav.dining, path: "/dining" },
    { label: t.nav.offers, path: "/offers" },
    { label: t.nav.umrah, path: "/umrah" },
    { label: t.nav.corporate, path: "/corporate" },
    { label: t.nav.location, path: "/location" },
  ];

  const other: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(/^\/(ar|en)/, `/${other}`) || `/${other}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "bg-navy-deep/95 shadow-lg backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href={href(locale)} aria-label={locale === "ar" ? "الرئيسية" : "Home"} className="shrink-0">
          <AreenLogo variant="horizontal" className="areen-shimmer h-12 w-auto sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(href(locale, item.path));
            return (
              <Link
                key={item.path}
                href={href(locale, item.path)}
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-gold",
                  active ? "text-gold" : "text-white/80",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href={switchHref}
            lang={other}
            onClick={() => (document.cookie = `locale=${other};path=/;max-age=31536000`)}
            className={cn("hidden text-sm text-white/80 hover:text-gold sm:inline", other === "ar" ? "font-arabic" : "font-sans")}
          >
            {t.switchLang}
          </Link>
          <Link
            href={`${href(locale)}#booking`}
            className="inline-flex h-10 items-center bg-gold px-5 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            {t.book}
          </Link>
          <button
            className="p-2 text-white xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 px-4 pb-6 xl:hidden">
          {[...nav, { label: t.nav.gallery, path: "/gallery" }].map((item) => (
            <Link
              key={item.path}
              href={href(locale, item.path)}
              className="block py-3 text-sm uppercase tracking-[0.2em] text-white/85"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            lang={other}
            onClick={() => (document.cookie = `locale=${other};path=/;max-age=31536000`)}
            className={cn("block py-3 text-sm text-gold", other === "ar" ? "font-arabic" : "font-sans")}
          >
            {t.switchLang}
          </Link>
        </nav>
      )}
    </header>
  );
}
