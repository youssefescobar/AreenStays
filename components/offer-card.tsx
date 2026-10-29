import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Offer } from "@/content/offers";
import { whatsappUrl } from "@/lib/contact";

export function OfferCard({ offer, locale, cta, showTerms = false }: { offer: Offer; locale: Locale; cta: string; showTerms?: boolean }) {
  return (
    <article className="group flex h-full flex-col border border-beige bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-navy/10">
      <span className="eyebrow w-fit bg-beige/60 px-3 py-1.5 text-navy">{offer.tag[locale]}</span>
      <h3 className="mt-6 text-2xl font-light text-navy">{offer.title[locale]}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{offer.text[locale]}</p>
      {showTerms && <p className="mt-4 text-xs text-ink/45">{offer.terms[locale]}</p>}
      <a
        href={whatsappUrl(offer.title[locale])}
        target="_blank"
        rel="noopener"
        className="eyebrow mt-8 flex items-center gap-2 text-gold"
      >
        {cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </a>
    </article>
  );
}
