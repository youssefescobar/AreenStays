import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, Check, Eye, Maximize2, Users } from "lucide-react";
import { href, isLocale, locales } from "@/lib/i18n";
import { dict } from "@/content/site";
import { getRoom, rooms } from "@/content/rooms";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/photo";
import { BookingBar } from "@/components/booking-bar";
import { RoomCard } from "@/components/room-card";
import { Reveal } from "@/components/reveal";

type Params = { params: Promise<{ locale: string; slug: string }> };

export const generateStaticParams = () => locales.flatMap((locale) => rooms.map((r) => ({ locale, slug: r.slug })));

async function load(params: Params["params"]) {
  const { locale, slug } = await params;
  const room = getRoom(slug);
  if (!isLocale(locale) || !room) notFound();
  return { locale, room, t: dict[locale] };
}

export async function generateMetadata({ params }: Params) {
  const { locale, room } = await load(params);
  return pageMetadata(locale, `/rooms/${room.slug}`, room.name[locale], room.description[locale]);
}

export default async function RoomPage({ params }: Params) {
  const { locale, room, t } = await load(params);
  const gallery = [0, 1, 2, 3, 4].map((i) => room.images[i]);
  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);
  const facts = [
    { icon: Maximize2, text: `${room.size} ${t.sqm}` },
    { icon: Users, text: `${room.guests} ${t.guests}` },
    { icon: BedDouble, text: room.bed[locale] },
    { icon: Eye, text: room.view[locale] },
  ];

  return (
    <>
      <section className="bg-navy-deep px-4 pt-28 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-2 md:grid-cols-4 md:grid-rows-2">
          {gallery.map((src, i) => (
            <Photo
              key={i}
              src={src}
              label={`${room.name[locale]} ${i + 1}`}
              priority={i === 0}
              className={i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "hidden aspect-[4/3] md:block"}
            />
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <Link href={href(locale, "/rooms")} className="eyebrow flex items-center gap-2 text-crystal hover:text-gold">
              <ArrowLeft size={14} className="rtl:rotate-180" /> {t.nav.rooms}
            </Link>
            <h1 className="mt-4 text-4xl font-light text-navy sm:text-5xl">{room.name[locale]}</h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/75">{room.description[locale]}</p>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex flex-col gap-2 border border-beige bg-white p-4 text-sm text-navy">
                  <Icon size={18} className="text-gold" />
                  {text}
                </li>
              ))}
            </ul>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a.en} className="flex items-center gap-3 text-sm text-ink/75">
                  <Check size={16} className="shrink-0 text-gold" /> {a[locale]}
                </li>
              ))}
            </ul>
          </Reveal>
          <aside className="h-fit border border-beige bg-white p-8 lg:sticky lg:top-28">
            <p className="text-sm text-ink/55">{t.from}</p>
            <p className="mt-1 text-4xl font-light text-navy">
              {room.price.toLocaleString("en-US")} <span className="text-lg text-gold">{t.sar}</span>
            </p>
            <p className="text-sm text-ink/55">{t.perNight}</p>
            <a
              href="#room-booking"
              className="mt-6 flex h-12 items-center justify-center bg-gold text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep hover:bg-gold-soft"
            >
              {t.bookNow}
            </a>
          </aside>
        </div>
      </section>

      <section id="room-booking" className="scroll-mt-28 bg-navy px-4 py-16 sm:px-6 lg:px-8">
        <BookingBar locale={locale} t={t.booking} defaultRoom={room.slug} />
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-light text-navy">{t.nav.rooms}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {others.map((r) => (
              <RoomCard key={r.slug} room={r} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
