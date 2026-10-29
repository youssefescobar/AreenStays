import Link from "next/link";
import { ArrowRight, Clock, Landmark, MapPin, Plane } from "lucide-react";
import { href } from "@/lib/i18n";
import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { rooms } from "@/content/rooms";
import { venues } from "@/content/dining";
import { offers } from "@/content/offers";
import { hotel } from "@/content/site";
import { stock } from "@/content/stock";
import { Hero } from "@/components/hero";
import { BookingBar } from "@/components/booking-bar";
import { SectionHeading } from "@/components/section-heading";
import { RoomCard } from "@/components/room-card";
import { OfferCard } from "@/components/offer-card";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, t } = await resolve(params);
  return pageMetadata(locale, "", `${hotel.name[locale]} · ${t.tagline}`, t.home.welcomeBody);
}

const factIcons = [MapPin, Plane, Landmark];
const arrow = "rtl:rotate-180";

export default async function Home({ params }: LocaleParams) {
  const { locale, t } = await resolve(params);

  return (
    <>
      <Hero locale={locale} t={t} />

      <section id="booking" className="relative z-20 -mt-24 scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <BookingBar locale={locale} t={t.booking} />
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-crystal">{t.home.welcomeEyebrow}</p>
            <h1 className="mt-4 text-4xl font-light leading-tight text-navy sm:text-5xl">{t.home.welcomeTitle}</h1>
          </div>
          <div className="space-y-6">
            <p className="leading-relaxed text-ink/75">{t.home.welcomeBody}</p>
            <ul className="space-y-3">
              {t.home.facts.map((fact, i) => {
                const Icon = factIcons[i];
                return (
                  <li key={fact} className="flex items-center gap-3 text-sm text-navy">
                    <Icon size={18} className="text-gold" />
                    {fact}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.home.roomsEyebrow} title={t.nav.rooms} />
            <Link href={href(locale, "/rooms")} className="eyebrow flex items-center gap-2 text-navy hover:text-gold">
              {t.viewAll} <ArrowRight size={14} className={arrow} />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {rooms.slice(0, 3).map((room, i) => (
              <Reveal key={room.slug} delay={i * 120}>
                <RoomCard room={room} locale={locale} t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Photo src={venues[0].images[0]} label={venues[0].name[locale]} className="aspect-[4/3] w-full" />
          </Reveal>
          <Reveal delay={150}>
            <SectionHeading eyebrow={t.home.diningEyebrow} title={t.home.diningTitle} intro={t.home.diningBody} light />
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {venues.slice(0, 2).map((v) => (
                <li key={v.slug} className="flex flex-col justify-between gap-2 py-5 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg text-beige">{v.name[locale]}</h3>
                    <p className="text-sm text-white/55">{v.type[locale]}</p>
                  </div>
                  <span dir="ltr" className="flex items-center gap-2 text-xs text-sky">
                    <Clock size={14} /> {v.hours}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={href(locale, "/dining")}
              className="mt-8 inline-flex h-11 items-center border border-gold/70 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
            >
              {t.learnMore}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow={t.home.offersEyebrow} title={t.nav.offers} />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offers.map((o, i) => (
              <Reveal key={o.slug} delay={i * 120}>
                <OfferCard offer={o} locale={locale} cta={t.bookNow} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-deep px-4 py-24 sm:px-6 lg:px-8">
        <Photo src={stock.lobby} label={t.nav.umrah} className="absolute inset-0 opacity-30" sizes="100vw" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold">{t.nav.umrah}</p>
          <h2 className="mt-4 text-3xl font-light text-white sm:text-4xl">{t.home.umrahTitle}</h2>
          <p className="mt-4 text-white/70">{t.home.umrahBody}</p>
          <Link
            href={href(locale, "/umrah")}
            className="mt-8 inline-flex h-11 items-center bg-gold px-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep hover:bg-gold-soft"
          >
            {t.learnMore}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
