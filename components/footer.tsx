import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./button";

export function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep px-4 pt-20 pb-10 text-white/70 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-gold">Newsletter</p>
            <p className="mt-2 text-xl font-light text-white">Offers and news from Areen, now and then.</p>
          </div>
          <form className="flex w-full max-w-md" action="#">
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              className="h-11 flex-1 border border-white/20 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-gold"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Areen Albasateen Hotel"
            width={552}
            height={156}
            className="h-14 w-auto"
          />
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> Al Basateen, Jeddah, Saudi Arabia
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="shrink-0 text-gold" /> +966 00 000 0000
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="shrink-0 text-gold" /> stay@areenstay.com
            </li>
          </ul>
          <ul className="space-y-3 text-sm">
            {["Rooms & Suites", "Dining", "Offers", "Careers", "Privacy"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Areen Albasateen Hotel. All rights reserved.</p>
          <p dir="rtl" lang="ar" className="font-arabic">
            أرين البساتين · إقامة .. بتجربة تتجاوز التوقعات
          </p>
        </div>
      </div>
    </footer>
  );
}
