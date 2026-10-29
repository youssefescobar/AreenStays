import Image from "next/image";
import { cn } from "@/lib/utils";
import { AreenLogo } from "./areen-logo";

/**
 * Photo slot. Shows the real image when `src` is set, otherwise a branded placeholder
 * (navy-to-crystal gradient, faint mark, label) so layouts stay final while photos are pending.
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
      {src ? (
        <Image src={src} alt={label} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={label} className="placeholder absolute inset-0 flex items-center justify-center">
          <AreenLogo variant="mark" className="w-1/3 max-w-40 opacity-20" title="" />
          <span className="eyebrow absolute bottom-4 start-4 text-white/60">{label}</span>
        </div>
      )}
    </div>
  );
}
