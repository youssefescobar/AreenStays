import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { offers } from "@/content/offers";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/page-hero";
import { OfferCard } from "@/components/offer-card";
import { Reveal } from "@/components/reveal";

const p = pages.offers;

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/offers", p.title[locale], p.intro[locale]);
}

export default async function OffersPage({ params }: LocaleParams) {
  const { locale, t } = await resolve(params);
  return (
    <>
      <PageHero eyebrow={p.eyebrow[locale]} title={p.title[locale]} intro={p.intro[locale]} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.slug} delay={i * 120}>
              <OfferCard offer={o} locale={locale} cta={t.bookNow} showTerms />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
