"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { href, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

/** Pinned to the bottom on phones once the visitor scrolls past the hero. */
export function MobileBookBar({ locale, t }: { locale: Locale; t: Pick<Dict, "bookNow" | "call" | "whatsapp" | "booking"> }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const iconBtn = "flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 text-white";

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-navy-deep/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgb(0_0_0/0.3)] backdrop-blur transition-transform duration-500 lg:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a href={telUrl} aria-label={t.call} className={iconBtn}>
        <Phone size={18} />
      </a>
      <a href={whatsappUrl(t.booking.message)} target="_blank" rel="noopener" aria-label={t.whatsapp} className={iconBtn}>
        <MessageCircle size={18} />
      </a>
      <Link
        href={`${href(locale)}#booking`}
        className="flex h-12 flex-1 items-center justify-center bg-gold text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep"
      >
        {t.bookNow}
      </Link>
    </div>
  );
}
