"use client";

import { useState } from "react";
import { AreenLogo } from "@/components/areen-logo";
import { Button } from "@/components/button";

export default function LogoPlayground() {
  const [run, setRun] = useState(0);

  return (
    <main className="min-h-screen bg-navy-deep px-4 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
        <div className="flex gap-3">
          <Button onClick={() => setRun((r) => r + 1)}>Replay</Button>
        </div>
        <div className="grid w-full gap-12 md:grid-cols-[2fr_1fr] md:items-center">
          <AreenLogo key={`l${run}`} animate className="w-full" />
          <div className="flex flex-col items-center gap-10">
            <AreenLogo key={`m${run}`} variant="mark" animate className="w-48" />
            <div className="w-full bg-sand p-8 [--areen-gap:var(--color-sand)]">
              <AreenLogo variant="lockup" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
