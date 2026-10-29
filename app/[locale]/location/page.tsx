import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { pages } from "@/content/pages";
import { hotel } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

const p = pages.location;

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/location", p.title[locale], p.intro[locale]);
}

export default async function LocationPage({ params }: LocaleParams) {
  const { locale, t } = await resolve(params);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(hotel.mapsQuery)}&hl=${locale}&z=14&output=embed`;
  const contact = [
    { icon: MapPin, label: hotel.address[locale], href: `https://maps.google.com/?q=${encodeURIComponent(hotel.mapsQuery)}` },
    { icon: Phone, label: hotel.phone, href: telUrl, ltr: true },
    { icon: MessageCircle, label: t.whatsapp, href: whatsappUrl() },
    { icon: Mail, label: hotel.email, href: `mailto:${hotel.email}` },
  ];

  return (
    <>
      <PageHero eyebrow={p.eyebrow[locale]} title={p.title[locale]} intro={p.intro[locale]} image={p.image} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-12">
            <ul className="space-y-4">
              {contact.map(({ icon: Icon, label, href, ltr }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="flex items-center gap-4 text-navy hover:text-gold">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-beige bg-white text-gold">
                      <Icon size={18} />
                    </span>
                    <span dir={ltr ? "ltr" : undefined}>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <ul className="divide-y divide-beige border-y border-beige">
                {p.distances.map((d) => (
                  <li key={d.place.en} className="flex justify-between gap-4 py-4 text-sm">
                    <span className="text-ink/75">{d.place[locale]}</span>
                    <span className="shrink-0 font-semibold text-gold">{d.time[locale]}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink/45">{p.note[locale]}</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <iframe
              title={p.title[locale]}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-square w-full border-0 bg-beige lg:aspect-auto lg:h-full lg:min-h-[480px]"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
