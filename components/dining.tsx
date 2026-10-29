import { Clock } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Button } from "./button";

const venues = [
  { name: "Al Basateen Restaurant", type: "All-day dining · Saudi & international", hours: "6:30 – 23:00" },
  { name: "Crystal Lounge", type: "Arabic coffee, tea & desserts", hours: "10:00 – 01:00" },
];

export function Dining() {
  return (
    <section id="dining" className="relative overflow-hidden bg-navy px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div
          className="photo aspect-[4/3] w-full"
          style={
            {
              "--img":
                "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80)",
            } as React.CSSProperties
          }
        />
        <div>
          <SectionHeading eyebrow="Dining" title="Flavours worth staying in for" arabic="المطاعم والمقاهي" light />
          <p className="mt-6 max-w-lg leading-relaxed text-white/70">
            From a generous Saudi breakfast to late-night coffee, our kitchens bring Jeddah&apos;s hospitality to the
            table.
          </p>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {venues.map((v) => (
              <li key={v.name} className="flex flex-col justify-between gap-2 py-5 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg text-beige">{v.name}</h3>
                  <p className="text-sm text-white/55">{v.type}</p>
                </div>
                <span className="flex items-center gap-2 text-xs text-sky">
                  <Clock size={14} /> {v.hours}
                </span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-8">
            Explore dining
          </Button>
        </div>
      </div>
    </section>
  );
}
