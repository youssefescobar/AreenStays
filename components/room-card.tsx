import Link from "next/link";
import { BedDouble, Maximize2, Users } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import type { Room } from "@/content/rooms";
import type { Dict } from "@/content/site";
import { Photo } from "./photo";

export function RoomCard({ room, locale, t }: { room: Room; locale: Locale; t: Dict }) {
  return (
    <Link href={href(locale, `/rooms/${room.slug}`)} className="group block">
      <div className="overflow-hidden">
        <Photo
          src={room.images[0]}
          label={room.name[locale]}
          className="aspect-[4/5] transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl text-navy transition-colors group-hover:text-gold">{room.name[locale]}</h3>
          <p className="mt-1 text-sm text-ink/60">{room.summary[locale]}</p>
        </div>
        <p className="shrink-0 text-end text-sm font-semibold text-gold">
          <span className="block text-[11px] font-normal text-ink/50">{t.from}</span>
          {room.price.toLocaleString("en-US")} {t.sar}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/60">
        <span className="flex items-center gap-1.5">
          <Maximize2 size={14} /> {room.size} {t.sqm}
        </span>
        <span className="flex items-center gap-1.5">
          <Users size={14} /> {room.guests} {t.guests}
        </span>
        <span className="flex items-center gap-1.5">
          <BedDouble size={14} /> {room.bed[locale]}
        </span>
      </div>
    </Link>
  );
}
