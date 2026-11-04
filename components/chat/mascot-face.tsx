"use client";

import { cn } from "@/lib/utils";
import { MASCOT_SRC, type MascotMood } from "./mascot";

type MascotFaceProps = {
  mood: MascotMood;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "contain" | "cover";
};

/** Circular REEN still. Remounts on mood change via key so the face swaps cleanly. */
export function MascotFace({
  mood,
  alt = "",
  className,
  sizes = "64px",
  priority,
  fit = "cover",
}: MascotFaceProps) {
  return (
    <img
      key={mood}
      src={MASCOT_SRC[mood]}
      alt={alt}
      data-mood={mood}
      sizes={sizes}
      width={160}
      height={160}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={cn(
        fit === "cover" ? "object-cover object-center" : "object-contain object-center",
        className,
      )}
    />
  );
}
