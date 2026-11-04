"use client";

import { cn } from "@/lib/utils";
import { MASCOT_SRC, type MascotMood } from "./mascot";

/** REEN still — remounts on mood via key. */
export function MascotFace({
  mood,
  className,
  sizes = "64px",
  priority,
}: {
  mood: MascotMood;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <img
      key={mood}
      src={MASCOT_SRC[mood]}
      alt=""
      data-mood={mood}
      sizes={sizes}
      width={160}
      height={160}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={cn("object-cover object-center", className)}
    />
  );
}
