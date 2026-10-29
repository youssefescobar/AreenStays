import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  arabic,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  arabic?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className={cn("eyebrow", light ? "text-gold" : "text-crystal")}>{eyebrow}</p>
      <h2 className={cn("mt-4 text-3xl font-light leading-tight sm:text-4xl", light ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {arabic && (
        <p dir="rtl" lang="ar" className={cn("mt-2 w-fit font-arabic text-xl", light ? "text-beige/80" : "text-navy/60")}>
          {arabic}
        </p>
      )}
    </div>
  );
}
