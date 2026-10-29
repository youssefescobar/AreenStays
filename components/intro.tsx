import { MapPin, Plane, Landmark } from "lucide-react";

const facts = [
  { icon: MapPin, label: "Al Basateen, Jeddah" },
  { icon: Plane, label: "Minutes from King Abdulaziz Airport" },
  { icon: Landmark, label: "Easy reach to Makkah & Al Balad" },
];

export function Intro() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow text-crystal">Welcome to Areen</p>
          <h1 className="mt-4 text-4xl font-light leading-tight text-navy sm:text-5xl">
            A calm, crystal-clear retreat in the heart of <span className="text-gold">Jeddah</span>.
          </h1>
          <p dir="rtl" lang="ar" className="mt-4 w-fit font-arabic text-2xl text-navy/60">
            أرين البساتين.. إقامة بتجربة تتجاوز التوقعات
          </p>
        </div>
        <div className="space-y-6">
          <p className="leading-relaxed text-ink/75">
            Thoughtful rooms, warm Saudi hospitality and a quiet address in Al Basateen. Whether you are here for
            business, family or Umrah, Areen is designed to make every day of your stay feel effortless.
          </p>
          <ul className="space-y-3">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-navy">
                <Icon size={18} className="text-gold" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
