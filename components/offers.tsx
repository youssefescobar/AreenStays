import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";

const offers = [
  {
    tag: "Save 15%",
    title: "Book Direct & Save",
    text: "Our best available rate, with free breakfast when you book on areenstay.com.",
  },
  {
    tag: "3 nights",
    title: "Umrah Stay Package",
    text: "Flexible check-in, airport transfer and a quiet room to rest between visits.",
  },
  {
    tag: "Family",
    title: "Weekend in Jeddah",
    text: "Kids stay and eat free, plus late check-out on Saturdays.",
  },
];

export function Offers() {
  return (
    <section id="offers" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Offers" title="Special offers" arabic="العروض الخاصة" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {offers.map((o) => (
            <article
              key={o.title}
              className="group flex flex-col border border-beige bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-navy/10"
            >
              <span className="eyebrow w-fit bg-beige/60 px-3 py-1.5 text-navy">{o.tag}</span>
              <h3 className="mt-6 text-2xl font-light text-navy">{o.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{o.text}</p>
              <a href="#" className="eyebrow mt-8 flex items-center gap-2 text-gold">
                View offer <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
