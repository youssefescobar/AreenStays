import { Sparkle } from "lucide-react";
import type { Locale, T } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import { PageHero } from "./page-hero";
import { Photo } from "./photo";
import { Reveal } from "./reveal";

/** Shared layout for the Umrah and Business pages: hero, feature grid, photo strip, enquiry button. */
export function FeaturePage({
  locale,
  page,
  cta,
}: {
  locale: Locale;
  page: { eyebrow: T; title: T; intro: T; image?: string; features: { title: T; text: T; image?: string }[] };
  cta: string;
}) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow[locale]} title={page.title[locale]} intro={page.intro[locale]} image={page.image} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-px bg-beige sm:grid-cols-2 lg:grid-cols-3">
          {page.features.map((f, i) => (
            <Reveal key={f.title.en} delay={(i % 3) * 100} className="bg-sand p-8">
              <Sparkle size={20} className="text-gold" />
              <h2 className="mt-5 text-xl text-navy">{f.title[locale]}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{f.text[locale]}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-navy px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {page.features.slice(0, 3).map((f) => (
            <Photo key={f.title.en} src={f.image} label={f.title[locale]} className="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" />
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={whatsappUrl(page.title[locale])}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep hover:bg-gold-soft"
          >
            {cta}
          </a>
        </div>
      </section>
    </>
  );
}
