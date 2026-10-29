import { cn } from "@/lib/utils";
import { AreenLogo } from "./areen-logo";
import { PhotoImage } from "./photo-image";

/**
 * Photo slot. Always renders the branded placeholder (navy-to-crystal gradient, faint mark, label),
 * with the image on top when `src` is set. If the image fails to load, the placeholder shows through.
 */
export function Photo({
  src,
  label,
  className,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority,
}: {
  src?: string;
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      <div role={src ? undefined : "img"} aria-label={src ? undefined : label} className="placeholder absolute inset-0 flex items-center justify-center">
        <AreenLogo variant="mark" className="w-1/3 max-w-40 opacity-20" title="" />
        <span className="eyebrow absolute bottom-4 start-4 text-white/60">{label}</span>
      </div>
      {src && <PhotoImage src={src} alt={label} sizes={sizes} priority={priority} />}
    </div>
  );
}
