"use client";

import { useEffect, useState } from "react";
import { BedDouble, CalendarDays, ChevronDown, Phone, User, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content/site";
import type { Room } from "@/lib/rooms";
import { whatsappUrl } from "@/lib/contact";
import { createBooking, fetchAvailability } from "@/lib/booking/client";
import type { AvailabilityType } from "@/lib/booking/types";
import { countries, DEFAULT_COUNTRY, digitsOnly, flag, toE164 } from "@/lib/booking/phone";
import { Button } from "./button";

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex flex-1 flex-col gap-1 border-b border-navy/10 px-5 py-4 md:border-e md:border-b-0">
      <span className="eyebrow flex items-center gap-2 text-crystal">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full bg-transparent text-sm font-medium text-navy outline-none placeholder:text-ink/35";

// Remembered on this device so returning guests don't retype their details.
const CONTACT_KEY = "areen.booking.contact";

/**
 * Availability form. Checks live inventory for the selected dates, asks for the guest's
 * name and mobile (so staff can reach them), holds a room via the booking API, then
 * opens WhatsApp so reception can confirm.
 */
export function BookingBar({
  locale,
  t,
  rooms,
  defaultRoom = "",
}: {
  locale: Locale;
  t: Dict["booking"];
  rooms: Pick<Room, "slug" | "name">[];
  defaultRoom?: string;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(t.guestOptions[1]);
  const [room, setRoom] = useState(defaultRoom);
  const [types, setTypes] = useState<AvailabilityType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [localPhone, setLocalPhone] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CONTACT_KEY) ?? "null");
      if (saved?.name) setGuestName(saved.name);
      if (saved?.country && countries.some((c) => c.iso === saved.country)) setCountry(saved.country);
      if (saved?.phone) setLocalPhone(saved.phone);
    } catch {
      /* storage blocked */
    }
  }, []);

  const dialCode = countries.find((c) => c.iso === country)?.dial ?? "966";

  const datesReady = Boolean(checkIn && checkOut && checkOut > checkIn);

  useEffect(() => {
    if (!datesReady) {
      setTypes(null);
      setError(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAvailability(checkIn, checkOut);
        if (cancelled) return;
        setTypes(data.types);
        setRoom((current) => {
          if (!current) return current;
          const match = data.types.find((item) => item.slug === current);
          return match && match.status === "full" ? "" : current;
        });
      } catch {
        if (!cancelled) {
          setTypes(null);
          setError(t.bookFailed);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [checkIn, checkOut, datesReady, t.bookFailed]);

  const typeMap = new Map((types ?? []).map((item) => [item.slug, item]));
  const selected = room ? typeMap.get(room) : null;
  const anyAvailable = (types ?? []).some((item) => item.available > 0);
  const allFull = datesReady && types !== null && !anyAvailable;
  const selectedFull = Boolean(room && selected?.status === "full");
  const submitDisabled = submitting || loading || !datesReady || allFull || selectedFull || (datesReady && types === null);

  const optionLabel = (slug: string, name: string) => {
    const info = typeMap.get(slug);
    if (!datesReady || !info) return name;
    return info.status === "full" ? `${name} — ${t.fullyBooked}` : name;
  };

  const hint = contactError
    ? contactError
    : !datesReady
    ? t.pickDates
    : loading
      ? t.checking
      : allFull
        ? t.unavailable
        : error
          ? error
          : t.hint;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitDisabled) return;

    const name = guestName.trim().replace(/\s+/g, " ");
    const phone = toE164(country, localPhone);
    if (name.length < 2) {
      setContactError(t.nameInvalid);
      return;
    }
    if (!phone) {
      setContactError(t.phoneInvalid);
      return;
    }
    setContactError(null);
    try {
      localStorage.setItem(CONTACT_KEY, JSON.stringify({ name, country, phone: localPhone }));
    } catch {
      /* storage blocked */
    }

    setSubmitting(true);
    setError(null);
    try {
      const booking = await createBooking({
        checkIn,
        checkOut,
        slug: room,
        guests,
        locale,
        guestName: name,
        phone,
      });
      const roomName = rooms.find((r) => r.slug === booking.slug)?.name[locale] ?? t.anyRoom;
      const lines = [
        t.message,
        `${locale === "ar" ? "رقم الطلب" : "Reference"}: ${booking.id}`,
        `${t.name}: ${name}`,
        `${t.phone}: ${phone}`,
        `${t.checkIn}: ${booking.checkIn}`,
        `${t.checkOut}: ${booking.checkOut}`,
        `${t.guests}: ${guests}`,
        `${t.room}: ${roomName}`,
        `${t.roomNumber}: ${booking.roomNumber}`,
      ];
      window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");

      const refreshed = await fetchAvailability(checkIn, checkOut);
      setTypes(refreshed.types);
      const stillOk = refreshed.types.find((item) => item.slug === room);
      if (room && stillOk?.status === "full") setRoom("");
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      setError(status === 409 ? t.bookFailed : t.bookFailed);
      try {
        const refreshed = await fetchAvailability(checkIn, checkOut);
        setTypes(refreshed.types);
        const stillOk = refreshed.types.find((item) => item.slug === room);
        if (room && stillOk?.status === "full") setRoom("");
      } catch {
        /* ignore secondary failure */
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-6xl bg-white shadow-2xl shadow-navy/20">
      <div className="flex flex-col md:flex-row">
        <Field label={t.checkIn} icon={<CalendarDays size={14} />}>
          <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={inputCls} />
        </Field>
        <Field label={t.checkOut} icon={<CalendarDays size={14} />}>
          <input
            type="date"
            required
            min={checkIn || undefined}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.guests} icon={<Users size={14} />}>
          <select className={inputCls} value={guests} onChange={(e) => setGuests(e.target.value)}>
            {t.guestOptions.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>
        <Field label={t.room} icon={<BedDouble size={14} />}>
          <select className={inputCls} value={room} onChange={(e) => setRoom(e.target.value)} disabled={loading && !types}>
            <option value="">{t.anyRoom}</option>
            {rooms.map((r) => {
              const info = typeMap.get(r.slug);
              const full = info?.status === "full";
              return (
                <option key={r.slug} value={r.slug} disabled={full}>
                  {optionLabel(r.slug, r.name[locale])}
                </option>
              );
            })}
          </select>
        </Field>
      </div>
      <div className="flex flex-col border-t border-navy/10 md:flex-row">
        <Field label={t.name} icon={<User size={14} />}>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder={t.namePlaceholder}
            value={guestName}
            onChange={(e) => {
              setGuestName(e.target.value);
              setContactError(null);
            }}
            className={inputCls}
          />
        </Field>
        <div className="flex flex-1 flex-col gap-1 border-b border-navy/10 px-5 py-4 md:border-e md:border-b-0">
          <label htmlFor="booking-phone" className="eyebrow flex items-center gap-2 text-crystal">
            <Phone size={14} />
            {t.phone}
          </label>
          {/* Phone numbers read left-to-right in Arabic too: code first, then the number. */}
          <div dir="ltr" className="flex items-center gap-3">
            <div className="relative flex shrink-0 items-center gap-1 text-sm font-medium text-navy">
              <span aria-hidden>{flag(country)}</span>
              <span aria-hidden>+{dialCode}</span>
              <ChevronDown size={14} aria-hidden className="text-ink/40" />
              {/* Native select laid over the short "🇸🇦 +966" label: full country list, phone-friendly picker. */}
              <select
                aria-label={t.country}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setContactError(null);
                }}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {countries.map((c) => (
                  <option key={c.iso} value={c.iso}>
                    {`${flag(c.iso)} ${c[locale]} (+${c.dial})`}
                  </option>
                ))}
              </select>
            </div>
            <span aria-hidden className="h-5 w-px bg-navy/15" />
            <input
              id="booking-phone"
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel-national"
              required
              placeholder={country === "SA" ? t.phonePlaceholder : ""}
              value={localPhone}
              onChange={(e) => {
                setLocalPhone(e.target.value.replace(/[^\d٠-٩۰-۹\s()+-]/g, "").slice(0, 20));
                setContactError(null);
              }}
              className={`${inputCls} min-w-0 text-start`}
            />
          </div>
        </div>
        <Button type="submit" className="h-auto min-h-16 md:px-8" disabled={submitDisabled}>
          {submitting ? t.checking : t.submit}
        </Button>
      </div>
      <p
        aria-live="polite"
        className={`border-t border-navy/10 px-5 py-2 text-xs ${contactError || error || allFull ? "text-gold" : "text-ink/55"}`}
      >
        {hint}
      </p>
    </form>
  );
}
