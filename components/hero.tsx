import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content/site";
import { AreenLogo } from "./areen-logo";
import { Photo } from "./photo";
import { stock } from "@/content/stock";

export function Hero({ locale, t }: { locale: Locale; t: Pick<Dict, "tagline" | "taglineAlt"> }) {
  const altLang = locale === "ar" ? "en" : "ar";
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-deep">
      {/* Swap for the hero photo or video once the shoot is ready */}
      <Photo src={stock.hero} label="Hero" className="absolute inset-0 opacity-45" sizes="100vw" priority />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(91_143_183/0.25),transparent_60%),linear-gradient(180deg,rgb(7_30_51/0.7),rgb(7_30_51/0.4)_40%,rgb(7_30_51/0.95))]"
      />

      <div className="relative z-10 flex flex-col items-center px-4 pt-24 pb-40 text-center">
        <AreenLogo animate className="w-64 sm:w-80 lg:w-96" />
        <p className="mt-8 animate-rise text-2xl font-light text-beige [animation-delay:2600ms] sm:text-3xl">{t.tagline}</p>
        <p
          lang={altLang}
          className={
            altLang === "ar"
              ? "mt-3 animate-rise font-arabic text-lg text-gold [animation-delay:2800ms]"
              : "mt-3 animate-rise font-sans text-sm uppercase tracking-[0.5em] text-gold [animation-delay:2800ms]"
          }
        >
          {t.taglineAlt}
        </p>
      </div>

      <a
        href="#booking"
        aria-label="Scroll to booking"
        className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-gold"
      >
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
}
