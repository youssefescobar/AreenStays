"use client";

import { useEffect, useState } from "react";
import { BedDouble, CalendarDays, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content/site";
import { rooms } from "@/content/rooms";
import { whatsappUrl } from "@/lib/contact";
import { createBooking, fetchAvailability } from "@/lib/booking/client";
import type { AvailabilityType } from "@/lib/booking/types";
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

const inputCls = "w-full bg-transparent text-sm font-medium text-navy outline-none";

/**
 * Availability form. Checks live inventory for the selected dates, holds a room via
 * the booking API, then opens WhatsApp so reception can confirm.
 */
export function BookingBar({ locale, t, defaultRoom = "" }: { locale: Locale; t: Dict["booking"]; defaultRoom?: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(t.guestOptions[1]);
  const [room, setRoom] = useState(defaultRoom);
  const [types, setTypes] = useState<AvailabilityType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (info.status === "full") return `${name} — ${t.fullyBooked}`;
    return `${name} — ${info.available} ${t.left}`;
  };

  const hint = !datesReady
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

    setSubmitting(true);
    setError(null);
    try {
      const booking = await createBooking({
        checkIn,
        checkOut,
        slug: room,
        guests,
        locale,
      });
      const roomName = rooms.find((r) => r.slug === booking.slug)?.name[locale] ?? t.anyRoom;
      const lines = [
        t.message,
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
        <Button type="submit" className="h-auto min-h-16 md:px-8" disabled={submitDisabled}>
          {submitting ? t.checking : t.submit}
        </Button>
      </div>
      <p className={`border-t border-navy/10 px-5 py-2 text-xs ${error || allFull ? "text-gold" : "text-ink/55"}`}>{hint}</p>
    </form>
  );
}
