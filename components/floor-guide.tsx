import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import type { Room } from "@/lib/rooms";
import { SectionHeading } from "./section-heading";

type FloorCopy = { eyebrow: string; title: string; intro: string };

const tones = [
  "border-gold/40 bg-sand/60 text-navy",
  "border-crystal/50 bg-white text-navy",
  "border-navy/30 bg-navy/5 text-navy",
  "border-gold/70 bg-white text-navy",
];

const note = {
  en: "Room numbers show our layout. Your exact room is confirmed when we reply on WhatsApp.",
  ar: "أرقام الغرف توضح توزيعنا. يتم تأكيد غرفتك عند ردنا على واتساب.",
};

const floorLabel = (level: number, locale: Locale) => (locale === "ar" ? `الطابق ${level}` : `Floor ${level}`);

/** Room numbers by floor, built from each room type's numbers (edited in the admin app). */
export function FloorGuide({ locale, copy, rooms }: { locale: Locale; copy: FloorCopy; rooms: Room[] }) {
  // ponytail: floor = first digit(s) of the room number (701 → floor 7); add a floor field if numbering ever breaks that rule.
  const byFloor = new Map<number, { number: number; type: number }[]>();
  rooms.forEach((room, type) =>
    room.units.forEach((number) => {
      const level = Math.floor(number / 100);
      byFloor.set(level, [...(byFloor.get(level) ?? []), { number, type }]);
    }),
  );
  const floors = [...byFloor.entries()].sort((a, b) => b[0] - a[0]);
  if (!floors.length) return null;

  return (
    <section className="border-t border-beige bg-sand px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink/70">
          {rooms.map((room, i) =>
            room.units.length ? (
              <span key={room.slug} className="flex items-center gap-2">
                <span className={`inline-block h-6 w-6 border ${tones[i % tones.length]}`} aria-hidden />
                {room.name[locale]}
              </span>
            ) : null,
          )}
        </div>

        <p className="mt-4 max-w-2xl text-sm text-ink/60">{note[locale]}</p>

        <div className="mt-12 space-y-10">
          {floors.map(([level, units]) => (
            <div key={level}>
              <p className="eyebrow text-crystal">{floorLabel(level, locale)}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={floorLabel(level, locale)}>
                {units
                  .sort((a, b) => a.number - b.number)
                  .map(({ number, type }) => (
                    <li key={number}>
                      <span className={`inline-flex min-w-[4.5rem] flex-col items-center gap-0.5 border px-3 py-2 ${tones[type % tones.length]}`}>
                        <span className="text-sm font-semibold tabular-nums">{number}</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-ink/50">{rooms[type].bed[locale]}</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {rooms.map((room, i) => (
            <Link
              key={room.slug}
              href={href(locale, `/rooms/${room.slug}`)}
              className={
                i === 0
                  ? "inline-flex h-11 items-center justify-center bg-gold px-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
                  : "inline-flex h-11 items-center justify-center border border-navy/20 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:border-gold hover:text-gold"
              }
            >
              {room.name[locale]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
