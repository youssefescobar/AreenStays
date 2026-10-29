import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy-deep hover:bg-gold-soft",
  outline: "border border-gold/70 text-gold hover:bg-gold hover:text-navy-deep",
  ghost: "text-white/80 hover:text-white",
};

export function Button({
  variant = "gold",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 px-6 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
