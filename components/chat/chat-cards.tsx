"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { getRoom } from "@/content/rooms";
import { href, type Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import { Photo } from "../photo";

/** Mirrors ChatCard in AreenStay-Backend/src/services/booking.ts */
export type ChatCard =
  | { type: "rooms"; slugs: string[] }
  | {
      type: "booking";
      reference: string;
      roomSlug: string;
      roomName: string;
      checkIn: string;
      checkOut: string;
      nights: number;
      guests: number;
      guestName: string;
      estimatedTotal: number;
    };

const L = {
  en: { from: "From", night: "night", sar: "SAR", view: "View room", book: "Book this", guests: "guests", nights: "nights", pending: "Request received · pending confirmation", ref: "Reference", total: "Estimated total", note: "Our team will contact you shortly to confirm.", wa: "Follow up on WhatsApp", bookMsg: (n: string) => `I'd like to book the ${n}` },
  ar: { from: "يبدأ من", night: "ليلة", sar: "ر.س", view: "عرض الغرفة", book: "احجز هذه", guests: "ضيوف", nights: "ليالٍ", pending: "تم استلام الطلب · بانتظار التأكيد", ref: "رقم الطلب", total: "الإجمالي التقديري", note: "سيتواصل معك فريقنا قريباً لتأكيد الحجز.", wa: "تابع عبر واتساب", bookMsg: (n: string) => `أرغب في حجز ${n}` },
};

const fmtDate = (d: string, locale: Locale) =>
  new Date(`${d}T00:00:00`).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB", { day: "numeric", month: "short" });

export function ChatCards({ cards, locale, onSend, disabled }: { cards: ChatCard[]; locale: Locale; onSend: (text: string) => void; disabled: boolean }) {
  const t = L[locale];
  return (
    <div className="space-y-3">
      {cards.map((card, i) =>
        card.type === "rooms" ? (
          // Horizontal swipe row of room tiles; data comes from the site's own content so photos/links stay current.
          <div key={i} className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {card.slugs.map(getRoom).map(
              (room) =>
                room && (
                  <div key={room.slug} className="w-56 shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                    <Photo src={room.images[0]} label={room.name[locale]} className="aspect-[4/3]" sizes="224px" />
                    <div className="space-y-2 p-3">
                      <div>
                        <p className="text-sm font-semibold text-navy">{room.name[locale]}</p>
                        <p className="line-clamp-2 text-xs text-ink/60">{room.summary[locale]}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-ink/60">
                          <Users size={13} /> {room.guests} {t.guests}
                        </span>
                        <span className="font-semibold text-gold">
                          {t.from} {room.price.toLocaleString("en-US")} {t.sar}
                          <span className="font-normal text-ink/50"> / {t.night}</span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={href(locale, `/rooms/${room.slug}`)}
                          className="flex-1 rounded-full border border-navy/20 py-1.5 text-center text-xs font-medium text-navy hover:bg-navy/5"
                        >
                          {t.view}
                        </Link>
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => onSend(t.bookMsg(room.name[locale]))}
                          className="flex-1 rounded-full bg-gold py-1.5 text-xs font-semibold text-navy-deep hover:bg-gold-soft disabled:opacity-50"
                        >
                          {t.book}
                        </button>
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>
        ) : (
          <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700">
              <CheckCircle2 size={14} /> {t.pending}
            </div>
            <div className="space-y-2 p-4 text-sm">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-navy">{card.roomName}</p>
                <p className="font-mono text-xs text-ink/60" dir="ltr">
                  {card.reference}
                </p>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-ink/70">
                <CalendarDays size={13} />
                {fmtDate(card.checkIn, locale)} → {fmtDate(card.checkOut, locale)} · {card.nights} {t.nights} · {card.guests} {t.guests}
              </p>
              <p className="flex justify-between border-t border-ink/10 pt-2 text-xs">
                <span className="text-ink/60">{t.total}</span>
                <span className="font-semibold text-gold">
                  {card.estimatedTotal.toLocaleString("en-US")} {t.sar}
                </span>
              </p>
              <p className="text-xs text-ink/60">{t.note}</p>
              <a
                href={whatsappUrl(`${t.ref}: ${card.reference} — ${card.guestName}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-[#25D366] py-2 text-center text-xs font-semibold text-white hover:opacity-90"
              >
                {t.wa}
              </a>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
