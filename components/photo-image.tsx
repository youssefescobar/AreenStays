"use client";

import { useState } from "react";
import Image from "next/image";

/** next/image that removes itself if the file fails to load, revealing the placeholder underneath. */
export function PhotoImage(props: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  // Temporary Unsplash fillers: skip the optimizer so a slow/timeout upstream fetch
  // does not 500 /_next/image. Local /public photos still get optimized.
  const unoptimized = props.src.startsWith("http");

  return (
    <Image
      {...props}
      fill
      unoptimized={unoptimized}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
