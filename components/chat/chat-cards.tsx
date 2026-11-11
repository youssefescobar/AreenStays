"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { getRoom } from "@/content/rooms";
import { href, type Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import { Photo } from "../photo";

/** Mirrors ChatCard in AreenStay-Backend/src/services/booking.ts */
export type ChatCard =
  | { type: "rooms"; slugs: string[] }
  | { type: "dates"; maxGuests: number; guests?: number }
  | {
      type: "booking";
      reference: string;
      roomSlug: string;
      roomName: string;
      checkIn: string;
      checkOut: string;
      nights: number;
      guests: number;
      rooms?: number;
      guestName: string;
      estimatedTotal: number;
    };

const L = {
  en: { checkIn: "Check-in", checkOut: "Check-out", guestsLabel: "Guests", send: "Continue", datesMsg: (a: string, b: string, g: number) => `Check-in ${a}, check-out ${b}, ${g} guest${g > 1 ? "s" : ""}`, from: "From", night: "night", sar: "SAR", view: "View room", book: "Book this", guests: "guests", nights: "nights", pending: "Request received · pending confirmation", ref: "Reference", total: "Estimated total", note: "Our team will contact you shortly to confirm.", wa: "Follow up on WhatsApp", bookMsg: (n: string) => `I'd like to book the ${n}` },
  ar: { checkIn: "تاريخ الدخول", checkOut: "تاريخ الخروج", guestsLabel: "عدد الضيوف", send: "متابعة", datesMsg: (a: string, b: string, g: number) => `الدخول ${a}، الخروج ${b}، عدد الضيوف ${g}`, from: "يبدأ من", night: "ليلة", sar: "ر.س", view: "عرض الغرفة", book: "احجز هذه", guests: "ضيوف", nights: "ليالٍ", pending: "تم استلام الطلب · بانتظار التأكيد", ref: "رقم الطلب", total: "الإجمالي التقديري", note: "سيتواصل معك فريقنا قريباً لتأكيد الحجز.", wa: "تابع عبر واتساب", bookMsg: (n: string) => `أرغب في حجز ${n}` },
};

const fmtDate = (d: string, locale: Locale) =>
  new Date(`${d}T00:00:00`).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB", { day: "numeric", month: "short" });

const isoDay = (d: Date) => d.toLocaleDateString("en-CA"); // YYYY-MM-DD in the guest's timezone
const addDays = (iso: string, n: number) => isoDay(new Date(new Date(`${iso}T12:00:00`).getTime() + n * 86_400_000));

/** Native date inputs + guest stepper; sends the choice back as a normal chat message. */
function DatesCard({ card, locale, onSend, disabled }: { card: Extract<ChatCard, { type: "dates" }>; locale: Locale; onSend: (text: string) => void; disabled: boolean }) {
  const t = L[locale];
  const today = isoDay(new Date());
  const [checkIn, setCheckIn] = useState(addDays(today, 1));
  const [checkOut, setCheckOut] = useState(addDays(today, 2));
  const [guests, setGuests] = useState(Math.min(card.guests ?? 2, card.maxGuests));
  const valid = checkIn >= today && checkOut > checkIn;
  const field = "mt-1 w-full rounded-lg border border-ink/15 bg-sand/40 px-2 py-1.5 text-sm text-ink outline-none focus:border-gold";

  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="grid grid-cols-2 gap-2 text-xs text-ink/60">
        <label>
          {t.checkIn}
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1));
            }}
            className={field}
          />
        </label>
        <label>
          {t.checkOut}
          <input type="date" min={addDays(checkIn, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={field} />
        </label>
      </div>
      <div className="flex items-center justify-between text-xs text-ink/60">
        <span>{t.guestsLabel}</span>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="-" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="h-9 w-9 rounded-full border border-ink/15 text-base text-ink">
            −
          </button>
          <span className="w-4 text-center text-sm font-semibold text-ink">{guests}</span>
          <button type="button" aria-label="+" onClick={() => setGuests((g) => Math.min(card.maxGuests, g + 1))} className="h-9 w-9 rounded-full border border-ink/15 text-base text-ink">
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        disabled={disabled || !valid}
        onClick={() => onSend(t.datesMsg(checkIn, checkOut, guests))}
        className="w-full rounded-full bg-gold py-2 text-xs font-semibold text-navy-deep hover:bg-gold-soft disabled:opacity-50"
      >
        {t.send}
      </button>
    </div>
  );
}

export function ChatCards({ cards, locale, onSend, disabled, isLatest }: { cards: ChatCard[]; locale: Locale; onSend: (text: string) => void; disabled: boolean; isLatest: boolean }) {
  const t = L[locale];
  return (
    <div className="space-y-3">
      {cards.map((card, i) =>
        card.type === "dates" ? (
          // Only the latest picker is live; older ones would re-send stale dates.
          isLatest ? <DatesCard key={i} card={card} locale={locale} onSend={onSend} disabled={disabled} /> : null
        ) : card.type === "rooms" ? (
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
                {(card.rooms ?? 1) > 1 && ` · ${card.rooms} ${locale === "ar" ? "غرف" : "rooms"}`}
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
