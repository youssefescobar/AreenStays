import Link from "next/link";
import { BedDouble } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import { bedLabels, floorLabel, floors, floorNote, type BedKind } from "@/content/floors";
import { getRoom } from "@/content/rooms";
import { SectionHeading } from "./section-heading";

type FloorCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  legendKing: string;
  legendTwin: string;
  cta: string;
};

const chipTone: Record<BedKind, string> = {
  king: "border-gold/40 bg-sand/60 text-navy",
  twin: "border-crystal/50 bg-white text-navy",
};

export function FloorGuide({ locale, copy }: { locale: Locale; copy: FloorCopy }) {
  return (
    <section className="border-t border-beige bg-sand px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink/70">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center border border-gold/40 bg-sand/60 text-gold" aria-hidden>
              <BedDouble size={16} />
            </span>
            {copy.legendKing}
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center border border-crystal/50 bg-white text-crystal" aria-hidden>
              <BedDouble size={14} />
              <BedDouble size={14} className="-ms-1" />
            </span>
            {copy.legendTwin}
          </span>
        </div>

        <p className="mt-4 max-w-2xl text-sm text-ink/60">{floorNote[locale]}</p>

        <div className="mt-12 space-y-10">
          {floors.map((floor) => (
            <div key={floor.level}>
              <p className="eyebrow text-crystal">{floorLabel(floor.level, locale)}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={floorLabel(floor.level, locale)}>
                {floor.rooms.map((room) => (
                  <li key={room.number}>
                    <span
                      className={`inline-flex min-w-[4.5rem] flex-col items-center gap-0.5 border px-3 py-2 ${chipTone[room.bed]}`}
                    >
                      <span className="text-sm font-semibold tabular-nums">{room.number}</span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-ink/50">
                        {bedLabels[room.bed][locale]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href={href(locale, "/rooms/king-room")}
            className="inline-flex h-11 items-center justify-center bg-gold px-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            {getRoom("king-room")?.name[locale] ?? copy.cta}
          </Link>
          <Link
            href={href(locale, "/rooms/twin-room")}
            className="inline-flex h-11 items-center justify-center border border-navy/20 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:border-gold hover:text-gold"
          >
            {getRoom("twin-room")?.name[locale] ?? copy.legendTwin}
          </Link>
        </div>
      </div>
    </section>
  );
}
