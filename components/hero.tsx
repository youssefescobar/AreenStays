import Image from "next/image";
import { ChevronDown } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-deep">
      {/* Placeholder photo until the hotel's own shoot is ready */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(91_143_183/0.25),transparent_60%),linear-gradient(180deg,rgb(7_30_51/0.7),rgb(7_30_51/0.4)_40%,rgb(7_30_51/0.95))]"
      />

      <div className="relative z-10 flex flex-col items-center px-4 pt-24 pb-36 text-center">
        <Image
          src="/brand/logo-lockup.png"
          alt="Areen Albasateen Hotel"
          width={700}
          height={666}
          priority
          className="w-56 animate-rise sm:w-72 lg:w-80"
        />
        <p
          dir="rtl"
          lang="ar"
          className="mt-8 animate-rise font-arabic text-2xl font-light text-beige [animation-delay:200ms] sm:text-3xl"
        >
          إقامة .. بتجربة تتجاوز التوقعات
        </p>
        <p className="mt-3 animate-rise text-sm uppercase tracking-[0.5em] text-gold [animation-delay:350ms]">
          More than a stay
        </p>
      </div>

      <a
        href="#booking"
        aria-label="Scroll to booking"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-gold"
      >
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
}
