import { ArrowRight, BedDouble, Maximize2 } from "lucide-react";
import { SectionHeading } from "./section-heading";

const u = (id: string) => `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80)`;

const rooms = [
  {
    name: "Deluxe Room",
    arabic: "غرفة ديلوكس",
    size: "32 m²",
    bed: "King or Twin",
    price: "From SAR 450",
    img: u("photo-1611892440504-42a792e24d32"),
  },
  {
    name: "Executive Suite",
    arabic: "جناح تنفيذي",
    size: "55 m²",
    bed: "King + Lounge",
    price: "From SAR 780",
    img: u("photo-1590490360182-c33d57733427"),
  },
  {
    name: "Family Suite",
    arabic: "جناح عائلي",
    size: "70 m²",
    bed: "2 Bedrooms",
    price: "From SAR 950",
    img: u("photo-1618773928121-c32242e63f39"),
  },
];

export function Rooms() {
  return (
    <section id="rooms" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Stay" title="Rooms & Suites" arabic="الغرف والأجنحة" />
          <a href="#" className="eyebrow flex items-center gap-2 text-navy hover:text-gold">
            View all rooms <ArrowRight size={14} />
          </a>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {rooms.map((room) => (
            <article key={room.name} className="group">
              <div className="overflow-hidden">
                <div
                  className="photo aspect-[4/5] transition-transform duration-700 group-hover:scale-105"
                  style={{ "--img": room.img } as React.CSSProperties}
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl text-navy">{room.name}</h3>
                  <p dir="rtl" lang="ar" className="w-fit font-arabic text-navy/50">
                    {room.arabic}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-gold">{room.price}</p>
              </div>
              <div className="mt-3 flex gap-5 text-xs text-ink/60">
                <span className="flex items-center gap-1.5">
                  <Maximize2 size={14} /> {room.size}
                </span>
                <span className="flex items-center gap-1.5">
                  <BedDouble size={14} /> {room.bed}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
