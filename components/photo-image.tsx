"use client";

import { useState } from "react";
import Image from "next/image";

/** next/image that removes itself if the file fails to load, revealing the placeholder underneath. */
export function PhotoImage(props: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <Image {...props} fill className="object-cover" onError={() => setFailed(true)} />;
}
