"use client";

import { useState } from "react";
import { BedDouble, CalendarDays, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content/site";
import { rooms } from "@/content/rooms";
import { whatsappUrl } from "@/lib/contact";
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
 * Availability form. Until a booking engine is connected it opens WhatsApp with the
 * request pre-filled, so reception can confirm by hand.
 */
export function BookingBar({ locale, t, defaultRoom = "" }: { locale: Locale; t: Dict["booking"]; defaultRoom?: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(t.guestOptions[1]);
  const [room, setRoom] = useState(defaultRoom);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roomName = rooms.find((r) => r.slug === room)?.name[locale] ?? t.anyRoom;
    const lines = [
      t.message,
      `${t.checkIn}: ${checkIn || "-"}`,
      `${t.checkOut}: ${checkOut || "-"}`,
      `${t.guests}: ${guests}`,
      `${t.room}: ${roomName}`,
    ];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
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
          <select className={inputCls} value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="">{t.anyRoom}</option>
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name[locale]}
              </option>
            ))}
          </select>
        </Field>
        <Button type="submit" className="h-auto min-h-16 md:px-8">
          {t.submit}
        </Button>
      </div>
      <p className="border-t border-navy/10 px-5 py-2 text-xs text-ink/55">{t.hint}</p>
    </form>
  );
}
