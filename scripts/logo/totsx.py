# Converts the generated SVGs into a typed React component with named parts.
import re, sys
lock = open("lockup.svg").read(); mark = open("mark.svg").read()

def body(svg):
    svg = re.sub(r"\s*<style>.*?</style>", "", svg, flags=re.S)
    inner = re.search(r"<svg[^>]*>(.*)</svg>", svg, re.S).group(1)
    vb = re.search(r'viewBox="([^"]+)"', svg).group(1)
    inner = re.sub(r'class="', 'className="', inner)
    for a in ["stop-color", "fill-rule", "stop-opacity"]:
        camel = re.sub(r"-(\w)", lambda m: m.group(1).upper(), a)
        inner = inner.replace(a + "=", camel + "=")
    inner = re.sub(r'style="--i:(\d+)"', r'style={{ "--i": \1 } as React.CSSProperties}', inner)
    # ids must be unique per instance; prefix gradients with a per-instance id
    for g in ["areen-gold-text", "areen-crystal-deep", "areen-gold", "areen-crystal"]:
        inner = inner.replace(f'id="{g}"', f'id={{`${{uid}}-{g}`}}').replace(f'url(#{g})', f'__URL__{g}__')
    inner = re.sub(r'"__URL__([a-z-]+)__"', r'{`url(#${uid}-\1)`}', inner)
    inner = re.sub(r'\bid="', 'data-part="', inner)
    return vb, inner

lvb, linner = body(lock); mvb, minner = body(mark)
tsx = f'''"use client";

import {{ useId }} from "react";
import {{ cn }} from "@/lib/utils";
import "./areen-logo.css";

/**
 * Areen Albasateen logo as inline SVG. Every part has an id or class, so it can be styled or animated:
 *  - [data-part] = areen-mark, areen-left, areen-right, areen-star, center-crystal-{{left,right}},
 *    inner-crystal-*, leaf-*, outer-crystal-*, swoosh-*, wordmark-ar, wordmark-en, wordmark-hotel, rule-left, rule-right
 *  - classes group them: .areen-gold, .areen-crystal, .areen-leaf, .areen-swoosh, .areen-facets
 *  e.g. gsap.from("[data-part=areen-star]", {{ scale: 0 }}) or document.querySelectorAll(".areen-letter")
 *  - every glyph is a .areen-letter with a --i index for staggering
 * Pass `animate` to play the built-in intro (see areen-logo.css).
 */
export function AreenLogo({{
  variant = "lockup",
  animate = false,
  className,
  title = "Areen Albasateen Hotel",
}}: {{
  variant?: "lockup" | "mark";
  animate?: boolean;
  className?: string;
  title?: string;
}}) {{
  const uid = useId().replace(/:/g, "");
  return variant === "mark" ? (
    <svg viewBox="{mvb}" role="img" aria-label={{title}} className={{cn("areen-logo", animate && "areen-animate", className)}}>
{minner}
    </svg>
  ) : (
    <svg viewBox="{lvb}" role="img" aria-label={{title}} className={{cn("areen-logo", animate && "areen-animate", className)}}>
{linner}
    </svg>
  );
}}
'''
open(sys.argv[1], "w").write(tsx)
