"use client";

import { cn } from "@/lib/utils";
import { MASCOT_CUT_SRC, MASCOT_SRC, MASCOT_MOODS, type MascotMood } from "./mascot";

type Props = {
  mood: MascotMood;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Stack every pose and crossfade between them (FAB + panel header). */
  live?: boolean;
  /** Use the background-free art. */
  cutout?: boolean;
};

/** REEN — a still, or a crossfading stack of poses when `live`. */
export function MascotFace({ mood, className, sizes = "64px", priority, live, cutout }: Props) {
  const SRC = cutout ? MASCOT_CUT_SRC : MASCOT_SRC;
  if (!live) {
    return (
      <img
        src={SRC[mood]}
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

  return (
    <span className="reen-stack" data-mood={mood}>
      {MASCOT_MOODS.map((m) => (
        <img
          key={m}
          src={SRC[m]}
          alt=""
          sizes={sizes}
          width={160}
          height={160}
          decoding="async"
          fetchPriority={priority && m === "idle" ? "high" : "auto"}
          draggable={false}
          aria-hidden
          className={cn("reen-stack__pose", !cutout && "object-cover object-center", className, m === mood && "is-active")}
        />
      ))}
    </span>
  );
}
