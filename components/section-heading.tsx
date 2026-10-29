import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className={cn("eyebrow", light ? "text-gold" : "text-crystal")}>{eyebrow}</p>
      <h2 className={cn("mt-4 text-3xl font-light leading-tight sm:text-4xl", light ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {intro && <p className={cn("mt-4 leading-relaxed", light ? "text-white/70" : "text-ink/70")}>{intro}</p>}
    </div>
  );
}
