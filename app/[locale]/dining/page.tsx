import { Clock } from "lucide-react";
import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { venues } from "@/content/dining";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";

const p = pages.dining;

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/dining", p.title[locale], p.intro[locale]);
}

export default async function DiningPage({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return (
    <>
      <PageHero eyebrow={p.eyebrow[locale]} title={p.title[locale]} intro={p.intro[locale]} image={p.image} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          {venues.map((v, i) => (
            <Reveal key={v.slug} className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Photo src={v.images[0]} label={v.name[locale]} className={i % 2 ? "aspect-[4/3] lg:order-2" : "aspect-[4/3]"} />
              <div>
                <p className="eyebrow text-crystal">{v.type[locale]}</p>
                <h2 className="mt-4 text-3xl font-light text-navy sm:text-4xl">{v.name[locale]}</h2>
                <p className="mt-5 max-w-lg leading-relaxed text-ink/70">{v.description[locale]}</p>
                <p dir="ltr" className="mt-6 flex w-fit items-center gap-2 text-sm text-gold">
                  <Clock size={16} /> {v.hours}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
