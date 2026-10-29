import { Photo } from "./photo";

/** Banner for inner pages: placeholder photo under a navy wash, with the page title. */
export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro?: string; image?: string }) {
  return (
    <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-navy-deep">
      <Photo src={image} label={title} className="absolute inset-0 opacity-60" sizes="100vw" priority />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/30" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <p className="eyebrow animate-rise text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-rise text-4xl font-light text-white [animation-delay:120ms] sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl animate-rise text-white/70 [animation-delay:240ms]">{intro}</p>}
      </div>
    </section>
  );
}
