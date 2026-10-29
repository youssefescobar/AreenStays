import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import { hotel, type Dict } from "@/content/site";
import { telUrl } from "@/lib/contact";
import { AreenLogo } from "./areen-logo";
import { Button } from "./button";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const links = [
    { label: t.nav.rooms, path: "/rooms" },
    { label: t.nav.dining, path: "/dining" },
    { label: t.nav.offers, path: "/offers" },
    { label: t.nav.umrah, path: "/umrah" },
    { label: t.nav.corporate, path: "/corporate" },
    { label: t.nav.gallery, path: "/gallery" },
    { label: t.nav.location, path: "/location" },
  ];

  return (
    <footer className="bg-navy-deep px-4 pt-20 pb-28 text-white/70 sm:px-6 lg:px-8 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-gold">{t.footer.newsletter}</p>
            <p className="mt-2 text-xl font-light text-white">{t.footer.newsletterTitle}</p>
          </div>
          <form className="flex w-full max-w-md" action="#">
            <input
              type="email"
              placeholder={t.footer.email}
              aria-label={t.footer.email}
              className="h-11 flex-1 border border-white/20 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-gold"
            />
            <Button type="submit">{t.footer.subscribe}</Button>
          </form>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <AreenLogo variant="horizontal" className="h-20 w-auto" />
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> {hotel.address[locale]}
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="shrink-0 text-gold" />
              <a href={telUrl} dir="ltr" className="hover:text-gold">
                {hotel.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="shrink-0 text-gold" />
              <a href={`mailto:${hotel.email}`} className="hover:text-gold">
                {hotel.email}
              </a>
            </li>
          </ul>
          <ul className="grid grid-cols-2 gap-3 text-sm md:grid-cols-1">
            {links.map((l) => (
              <li key={l.path}>
                <Link href={href(locale, l.path)} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <p className="eyebrow text-gold">{t.footer.findUs}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {hotel.listings.map((l) => (
                <li key={l.name}>
                  <a href={l.url} target="_blank" rel="noopener" className="hover:text-gold">
                    {l.name}
                  </a>
                </li>
              ))}
              <li className="flex gap-4 pt-2">
                <a href={hotel.social.instagram} target="_blank" rel="noopener" className="hover:text-gold">Instagram</a>
                <a href={hotel.social.x} target="_blank" rel="noopener" className="hover:text-gold">X</a>
                <a href={hotel.social.tiktok} target="_blank" rel="noopener" className="hover:text-gold">TikTok</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {hotel.name[locale]}. {t.footer.rights}
          </p>
          <p>{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
