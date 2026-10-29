"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { AreenLogo } from "./areen-logo";

/** Logo variants with a replay button for the intro animation. */
export function LogoShowcase() {
  const [run, setRun] = useState(0);
  return (
    <div>
      <button
        onClick={() => setRun((r) => r + 1)}
        className="eyebrow mb-6 flex items-center gap-2 text-gold hover:text-gold-soft"
      >
        <RotateCcw size={14} /> Replay intro
      </button>
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="flex items-center justify-center bg-navy-deep p-10">
          <AreenLogo key={`l${run}`} animate className="w-full max-w-md" />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-center bg-navy-deep p-8">
            <AreenLogo key={`m${run}`} variant="mark" animate className="w-40" />
          </div>
          <div className="flex items-center justify-center border border-beige bg-sand p-8 [--areen-gap:var(--color-sand)]">
            <AreenLogo variant="horizontal" className="areen-shimmer w-full max-w-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
