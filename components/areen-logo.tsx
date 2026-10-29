"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import "./areen-logo.css";

/**
 * Areen Albasateen logo as inline SVG. Every part has an id or class, so it can be styled or animated:
 *  - [data-part] = areen-mark, areen-left, areen-right, areen-star, center-crystal-{left,right},
 *    inner-crystal-*, leaf-*, outer-crystal-*, swoosh-*, wordmark-ar, wordmark-en, wordmark-hotel, rule-left, rule-right,
 *    divider (horizontal only)
 *  - classes group them: .areen-gold, .areen-crystal, .areen-leaf, .areen-swoosh, .areen-facets
 *  e.g. gsap.from("[data-part=areen-star]", { scale: 0 }) or document.querySelectorAll(".areen-letter")
 *  - every glyph is a .areen-letter with a --i index for staggering
 * Pass `animate` to play the built-in intro (see areen-logo.css).
 */
export function AreenLogo({
  variant = "lockup",
  animate = false,
  className,
  title = "Areen Albasateen Hotel",
}: {
  variant?: "lockup" | "mark" | "horizontal";
  animate?: boolean;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const cls = cn("areen-logo", animate && "areen-animate", className);
  if (variant === "mark")
    return (
      <svg viewBox="0 0 914 820" role="img" aria-label={title} className={cls}>

  <defs>
    <linearGradient id={`${uid}-areen-gold`} x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stopColor="#F6E6B4" />
      <stop offset="0.25" stopColor="#D9B866" />
      <stop offset="0.5" stopColor="#A9843A" />
      <stop offset="0.64" stopColor="#EBD39A" />
      <stop offset="0.84" stopColor="#C29C4E" />
      <stop offset="1" stopColor="#7C5F25" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-hi`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#EAF3FB" stopOpacity="0.85" />
      <stop offset="0.5" stopColor="#9DBEDD" stopOpacity="0.6" />
      <stop offset="1" stopColor="#4D7DA8" stopOpacity="0.55" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-mid`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#B9CEE2" stopOpacity="0.7" />
      <stop offset="0.45" stopColor="#5E86AD" stopOpacity="0.5" />
      <stop offset="1" stopColor="#0F2A47" stopOpacity="0.8" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-deep`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#4C79A3" stopOpacity="0.55" />
      <stop offset="1" stopColor="#081F36" stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-dark`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#163A5E" stopOpacity="0.8" />
      <stop offset="0.6" stopColor="#081F36" stopOpacity="0.85" />
      <stop offset="1" stopColor="#9CB9D6" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar`} x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stopColor="#6E98C0" stopOpacity="0.9" />
      <stop offset="0.3" stopColor="#1B3F64" stopOpacity="0.92" />
      <stop offset="0.75" stopColor="#0A2340" stopOpacity="0.95" />
      <stop offset="1" stopColor="#3D6B96" stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar-lit`} x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stopColor="#DCEAF7" stopOpacity="0.95" />
      <stop offset="0.4" stopColor="#93B8DA" stopOpacity="0.92" />
      <stop offset="1" stopColor="#3E6D99" stopOpacity="0.92" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar-pale`} x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stopColor="#D2E3F2" stopOpacity="0.85" />
      <stop offset="0.45" stopColor="#8FB2D3" stopOpacity="0.6" />
      <stop offset="1" stopColor="#4F7EA9" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glint`} x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <filter id={`${uid}-areen-glow`} x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
      <feOffset dy="4" />
      <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>
  <g data-part="areen-mark" filter={`url(#${uid}-areen-glow)`}>
    <g data-part="areen-left">
    <g data-part="outer-crystal-left" className="areen-crystal areen-outer-crystal">
      <path className="areen-facet" d="M28 490 L150 487 L215 590 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M150 487 L300 590 L215 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M300 590 L410 712 L215 590 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M410 712 L160 668 L215 590 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M160 668 L28 490 L215 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M28 490 L150 487 L300 590 L410 712 L160 668 Z" />
    </g>
    <path data-part="swoosh-left" className="areen-gold areen-swoosh" d="M126 676 C270 656 392 718 448 806 C380 752 270 696 126 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-left" className="areen-crystal areen-inner-crystal">
      <path className="areen-facet" d="M226 372 L326 474 L318 540 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M326 474 L384 598 L318 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M384 598 L426 728 L318 540 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M426 728 L238 482 L318 540 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M238 482 L226 372 L318 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M226 372 L326 474 L384 598 L426 728 L238 482 Z" />
    </g>
    <path data-part="leaf-left" className="areen-gold areen-leaf" d="M446 792 C330 705 214 610 204 478 L184 316 L362 462 C414 548 446 670 452 770 Z M428 730 C350 652 246 578 236 480 L224 372 L330 478 C380 560 414 650 428 730 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-left" className="areen-crystal areen-center-crystal">
      <path className="areen-facet" d="M366 202 L414 264 L436 712 L440 722 L360 432 Z" fill={`url(#${uid}-areen-glass-pillar)`} />
      <path className="areen-facet" d="M414 264 L449 284 L451 708 L436 712 Z" fill={`url(#${uid}-areen-glass-pillar-lit)`} />
      <path className="areen-glint" d="M372 236 L404 262 L392 420 L366 380 Z" fill={`url(#${uid}-areen-glint)`} />
      <path className="areen-edge" d="M366 202 L414 264 L436 712 L440 722 L360 432 Z M414 264 L449 284 L451 708 L436 712 Z" />
    </g>
    </g>
    <g data-part="areen-right">
    <g data-part="outer-crystal-right" className="areen-crystal areen-outer-crystal">
      <path className="areen-facet" d="M886 490 L764 487 L699 590 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M764 487 L614 590 L699 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M614 590 L504 712 L699 590 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M504 712 L754 668 L699 590 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M754 668 L886 490 L699 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M886 490 L764 487 L614 590 L504 712 L754 668 Z" />
    </g>
    <path data-part="swoosh-right" className="areen-gold areen-swoosh" d="M788 676 C644 656 522 718 466 806 C534 752 644 696 788 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-right" className="areen-crystal areen-inner-crystal">
      <path className="areen-facet" d="M688 372 L588 474 L596 540 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M588 474 L530 598 L596 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M530 598 L488 728 L596 540 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M488 728 L676 482 L596 540 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M676 482 L688 372 L596 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M688 372 L588 474 L530 598 L488 728 L676 482 Z" />
    </g>
    <path data-part="leaf-right" className="areen-gold areen-leaf" d="M468 792 C584 705 700 610 710 478 L730 316 L552 462 C500 548 468 670 462 770 Z M486 730 C564 652 668 578 678 480 L690 372 L584 478 C534 560 500 650 486 730 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-right" className="areen-crystal areen-center-crystal">
      <path className="areen-facet" d="M548 202 L500 264 L478 712 L474 722 L554 432 Z" fill={`url(#${uid}-areen-glass-pillar-pale)`} />
      <path className="areen-facet" d="M500 264 L465 284 L463 708 L478 712 Z" fill={`url(#${uid}-areen-glass-pillar-lit)`} />
      <path className="areen-glint" d="M542 236 L510 262 L522 420 L548 380 Z" fill={`url(#${uid}-areen-glint)`} />
      <path className="areen-edge" d="M548 202 L500 264 L478 712 L474 722 L554 432 Z M500 264 L465 284 L463 708 L478 712 Z" />
    </g>
    </g>
    <path data-part="areen-star" className="areen-gold" d="M457 22 Q467 100 524 112 Q467 124 457 226 Q447 124 390 112 Q447 100 457 22 Z" fill={`url(#${uid}-areen-gold)`} />
  </g>

      </svg>
    );
  if (variant === "horizontal")
    return (
      <svg viewBox="0 0 1315 377" role="img" aria-label={title} className={cls}>

  <defs>
    <linearGradient id={`${uid}-areen-gold`} x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stopColor="#F6E6B4" />
      <stop offset="0.25" stopColor="#D9B866" />
      <stop offset="0.5" stopColor="#A9843A" />
      <stop offset="0.64" stopColor="#EBD39A" />
      <stop offset="0.84" stopColor="#C29C4E" />
      <stop offset="1" stopColor="#7C5F25" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-hi`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#EAF3FB" stopOpacity="0.85" />
      <stop offset="0.5" stopColor="#9DBEDD" stopOpacity="0.6" />
      <stop offset="1" stopColor="#4D7DA8" stopOpacity="0.55" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-mid`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#B9CEE2" stopOpacity="0.7" />
      <stop offset="0.45" stopColor="#5E86AD" stopOpacity="0.5" />
      <stop offset="1" stopColor="#0F2A47" stopOpacity="0.8" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-deep`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#4C79A3" stopOpacity="0.55" />
      <stop offset="1" stopColor="#081F36" stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-dark`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#163A5E" stopOpacity="0.8" />
      <stop offset="0.6" stopColor="#081F36" stopOpacity="0.85" />
      <stop offset="1" stopColor="#9CB9D6" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar`} x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stopColor="#6E98C0" stopOpacity="0.9" />
      <stop offset="0.3" stopColor="#1B3F64" stopOpacity="0.92" />
      <stop offset="0.75" stopColor="#0A2340" stopOpacity="0.95" />
      <stop offset="1" stopColor="#3D6B96" stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar-lit`} x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stopColor="#DCEAF7" stopOpacity="0.95" />
      <stop offset="0.4" stopColor="#93B8DA" stopOpacity="0.92" />
      <stop offset="1" stopColor="#3E6D99" stopOpacity="0.92" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar-pale`} x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stopColor="#D2E3F2" stopOpacity="0.85" />
      <stop offset="0.45" stopColor="#8FB2D3" stopOpacity="0.6" />
      <stop offset="1" stopColor="#4F7EA9" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glint`} x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <filter id={`${uid}-areen-glow`} x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
      <feOffset dy="4" />
      <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <linearGradient id={`${uid}-areen-gold-text`} gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="360">
      <stop offset="0" stopColor="#F6E6B4" />
      <stop offset="0.4" stopColor="#D9B866" />
      <stop offset="0.55" stopColor="#A9843A" />
      <stop offset="0.7" stopColor="#E6CC8C" />
      <stop offset="1" stopColor="#B38D45" />
    </linearGradient>
  </defs>
  <g data-part="areen-mark-wrap" transform="scale(0.46)">
  <g data-part="areen-mark" filter={`url(#${uid}-areen-glow)`}>
    <g data-part="areen-left">
    <g data-part="outer-crystal-left" className="areen-crystal areen-outer-crystal">
      <path className="areen-facet" d="M28 490 L150 487 L215 590 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M150 487 L300 590 L215 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M300 590 L410 712 L215 590 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M410 712 L160 668 L215 590 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M160 668 L28 490 L215 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M28 490 L150 487 L300 590 L410 712 L160 668 Z" />
    </g>
    <path data-part="swoosh-left" className="areen-gold areen-swoosh" d="M126 676 C270 656 392 718 448 806 C380 752 270 696 126 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-left" className="areen-crystal areen-inner-crystal">
      <path className="areen-facet" d="M226 372 L326 474 L318 540 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M326 474 L384 598 L318 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M384 598 L426 728 L318 540 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M426 728 L238 482 L318 540 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M238 482 L226 372 L318 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M226 372 L326 474 L384 598 L426 728 L238 482 Z" />
    </g>
    <path data-part="leaf-left" className="areen-gold areen-leaf" d="M446 792 C330 705 214 610 204 478 L184 316 L362 462 C414 548 446 670 452 770 Z M428 730 C350 652 246 578 236 480 L224 372 L330 478 C380 560 414 650 428 730 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-left" className="areen-crystal areen-center-crystal">
      <path className="areen-facet" d="M366 202 L414 264 L436 712 L440 722 L360 432 Z" fill={`url(#${uid}-areen-glass-pillar)`} />
      <path className="areen-facet" d="M414 264 L449 284 L451 708 L436 712 Z" fill={`url(#${uid}-areen-glass-pillar-lit)`} />
      <path className="areen-glint" d="M372 236 L404 262 L392 420 L366 380 Z" fill={`url(#${uid}-areen-glint)`} />
      <path className="areen-edge" d="M366 202 L414 264 L436 712 L440 722 L360 432 Z M414 264 L449 284 L451 708 L436 712 Z" />
    </g>
    </g>
    <g data-part="areen-right">
    <g data-part="outer-crystal-right" className="areen-crystal areen-outer-crystal">
      <path className="areen-facet" d="M886 490 L764 487 L699 590 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M764 487 L614 590 L699 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M614 590 L504 712 L699 590 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M504 712 L754 668 L699 590 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M754 668 L886 490 L699 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M886 490 L764 487 L614 590 L504 712 L754 668 Z" />
    </g>
    <path data-part="swoosh-right" className="areen-gold areen-swoosh" d="M788 676 C644 656 522 718 466 806 C534 752 644 696 788 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-right" className="areen-crystal areen-inner-crystal">
      <path className="areen-facet" d="M688 372 L588 474 L596 540 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M588 474 L530 598 L596 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M530 598 L488 728 L596 540 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M488 728 L676 482 L596 540 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M676 482 L688 372 L596 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M688 372 L588 474 L530 598 L488 728 L676 482 Z" />
    </g>
    <path data-part="leaf-right" className="areen-gold areen-leaf" d="M468 792 C584 705 700 610 710 478 L730 316 L552 462 C500 548 468 670 462 770 Z M486 730 C564 652 668 578 678 480 L690 372 L584 478 C534 560 500 650 486 730 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-right" className="areen-crystal areen-center-crystal">
      <path className="areen-facet" d="M548 202 L500 264 L478 712 L474 722 L554 432 Z" fill={`url(#${uid}-areen-glass-pillar-pale)`} />
      <path className="areen-facet" d="M500 264 L465 284 L463 708 L478 712 Z" fill={`url(#${uid}-areen-glass-pillar-lit)`} />
      <path className="areen-glint" d="M542 236 L510 262 L522 420 L548 380 Z" fill={`url(#${uid}-areen-glint)`} />
      <path className="areen-edge" d="M548 202 L500 264 L478 712 L474 722 L554 432 Z M500 264 L465 284 L463 708 L478 712 Z" />
    </g>
    </g>
    <path data-part="areen-star" className="areen-gold" d="M457 22 Q467 100 524 112 Q467 124 457 226 Q447 124 390 112 Q447 100 457 22 Z" fill={`url(#${uid}-areen-gold)`} />
  </g>
  </g>
  <rect data-part="divider" x="460.4" y="40" width="3" height="297" fill={`url(#${uid}-areen-gold-text)`} />
  <g data-part="wordmark-ar" className="areen-gold-text" fill={`url(#${uid}-areen-gold-text)`}>
      <path className="areen-letter" data-char="ن" style={{ "--i": 0 } as React.CSSProperties} d="M 566.8 126.1 Q 562.9 126.1 560.6 123.8 Q 558.3 121.5 558.3 117.5 Q 558.3 113.8 560.6 111.5 Q 562.9 109.2 566.8 109.2 Q 570.6 109.2 572.8 111.4 Q 575.1 113.6 575.1 117.5 Q 575.1 126.1 566.8 126.1 Z M 611.4 166.5 H 623 V 182 H 609.9 Q 605.5 182 601.8 180.8 Q 599.4 193.1 589.4 200.2 Q 580.5 206.3 567.7 206.3 Q 550.4 206.3 540.9 194.2 Q 533.5 184.7 533.5 171.9 Q 533.5 161.8 538.2 154.2 L 553.6 151 Q 548.5 159.7 548.5 169.3 Q 548.5 179.1 554 185.1 Q 559.2 190.8 567.7 190.8 Q 576.5 190.8 581.4 186.4 Q 586.3 181.9 586.3 173.8 V 133.6 L 602.5 125.2 V 157.3 Q 602.5 162.3 604.5 164.4 Q 606.6 166.5 611.4 166.5 Z" />
      <path className="areen-letter" data-char="ي" style={{ "--i": 1 } as React.CSSProperties} d="M 660.8 166.5 H 672.4 V 182 H 659.3 Q 650 182 643.8 177 Q 637.7 182 628.3 182 H 615.3 V 166.5 H 626.8 Q 631.7 166.5 633.7 164.4 Q 635.8 162.3 635.8 157.3 V 133.6 L 651.9 125.2 V 157.3 Q 651.9 162.3 653.9 164.4 Q 656 166.5 660.8 166.5 Z M 627.7 193.6 Q 631.5 193.6 633.8 195.9 Q 636 198.1 636 202 Q 636 210.5 627.7 210.5 Q 623.9 210.5 621.5 208.2 Q 619.2 205.9 619.2 202 Q 619.2 193.6 627.7 193.6 Z M 647.4 193.6 Q 651.2 193.6 653.5 195.9 Q 655.7 198.1 655.7 202 Q 655.7 210.5 647.4 210.5 Q 643.6 210.5 641.3 208.2 Q 639 205.9 639 202 Q 639 193.6 647.4 193.6 Z" />
      <path className="areen-letter" data-char="ت" style={{ "--i": 2 } as React.CSSProperties} d="M 673.9 112.2 Q 670.1 112.2 667.8 109.9 Q 665.5 107.6 665.5 103.7 Q 665.5 95.3 673.9 95.3 Q 677.7 95.3 680 97.6 Q 682.2 99.8 682.2 103.7 Q 682.2 112.2 673.9 112.2 Z M 693.6 112.2 Q 689.8 112.2 687.5 109.9 Q 685.2 107.6 685.2 103.7 Q 685.2 95.3 693.6 95.3 Q 697.5 95.3 699.7 97.6 Q 701.9 99.8 701.9 103.7 Q 701.9 112.2 693.6 112.2 Z M 664.7 182 V 166.5 H 676.2 Q 681.1 166.5 683.1 164.4 Q 685.2 162.3 685.2 157.3 V 133.6 L 701.3 125.2 V 158.1 Q 701.3 169.7 694.1 176.2 Q 687.9 182 677.7 182 Z" />
      <path className="areen-letter" data-char="ا" style={{ "--i": 3 } as React.CSSProperties} d="M 747.9 182 Q 736.2 182 729.8 174.6 Q 724.3 168.2 724.3 158.1 V 107.9 L 740.5 99.4 V 157.3 Q 740.5 162.3 742.5 164.4 Q 744.6 166.5 749.4 166.5 H 760.9 V 182 Z" />
      <path className="areen-letter" data-char="س" style={{ "--i": 4 } as React.CSSProperties} d="M 753.3 182 V 166.5 H 766.8 Q 771.7 166.5 773.8 164.4 Q 775.9 162.3 775.9 157.3 V 140.4 L 792 132 V 157.3 Q 792 162.3 794.1 164.4 Q 796.1 166.5 801 166.5 H 809.7 Q 814.6 166.5 816.6 164.4 Q 818.7 162.3 818.7 157.3 V 137.1 L 834.8 128.5 V 157.3 Q 834.8 162.3 836.9 164.4 Q 839 166.5 843.9 166.5 H 852.6 Q 857.5 166.5 859.5 164.4 Q 861.5 162.3 861.5 157.3 V 133.6 L 877.7 125.2 V 155.2 Q 877.7 161.4 880.2 164 Q 882.7 166.5 888.6 166.5 H 900.3 V 182 H 887.7 Q 876.9 182 870.4 175.9 Q 864.6 181.9 854.9 182 H 842.2 Q 832.7 182 826.7 176.4 Q 821.2 181.9 812.1 182 H 799.5 Q 790 182 784 176.4 Q 778 182 768.5 182 Z" />
      <path className="areen-letter" data-char="ب" style={{ "--i": 5 } as React.CSSProperties} d="M 938.2 166.5 H 949.7 V 182 H 936.7 Q 927.3 182 921.2 177 Q 915.1 182 905.7 182 H 892.7 V 166.5 H 904.2 Q 909 166.5 911.1 164.4 Q 913.1 162.3 913.1 157.3 V 133.6 L 929.3 125.2 V 157.3 Q 929.3 162.3 931.3 164.4 Q 933.4 166.5 938.2 166.5 Z M 922 193.6 Q 925.8 193.6 928 195.9 Q 930.3 198.1 930.3 202 Q 930.3 210.5 922 210.5 Q 918.1 210.5 915.8 208.2 Q 913.5 205.9 913.5 202 Q 913.5 198.3 915.8 196 Q 918.1 193.6 922 193.6 Z" />
      <path className="areen-letter" data-char="ل" style={{ "--i": 6 } as React.CSSProperties} d="M 942.1 182 V 166.5 H 950.1 Q 956 166.5 958.5 164 Q 961 161.4 961 155.2 V 108 L 977 99.4 V 155.4 Q 977 167.8 969.5 175.2 Q 962.5 182 951 182 Z" />
      <path className="areen-letter" data-char="ا" style={{ "--i": 7 } as React.CSSProperties} d="M 1000 182 V 108 L 1016.2 99.4 V 182 Z" />
      <path className="areen-letter" data-char="ن" style={{ "--i": 8 } as React.CSSProperties} d="M 1100.7 126.1 Q 1096.8 126.1 1094.5 123.8 Q 1092.2 121.5 1092.2 117.5 Q 1092.2 113.8 1094.5 111.5 Q 1096.8 109.2 1100.7 109.2 Q 1104.5 109.2 1106.7 111.4 Q 1109 113.6 1109 117.5 Q 1109 126.1 1100.7 126.1 Z M 1145.3 166.5 H 1156.8 V 182 H 1143.8 Q 1139.4 182 1135.7 180.8 Q 1133.3 193.1 1123.3 200.2 Q 1114.3 206.3 1101.5 206.3 Q 1084.3 206.3 1074.8 194.2 Q 1067.4 184.7 1067.4 171.9 Q 1067.4 161.8 1072.1 154.2 L 1087.5 151 Q 1082.3 159.7 1082.3 169.3 Q 1082.3 179.1 1087.9 185.1 Q 1093.1 190.8 1101.5 190.8 Q 1110.4 190.8 1115.3 186.4 Q 1120.2 181.9 1120.2 173.8 V 133.6 L 1136.4 125.2 V 157.3 Q 1136.4 162.3 1138.4 164.4 Q 1140.5 166.5 1145.3 166.5 Z" />
      <path className="areen-letter" data-char="ي" style={{ "--i": 9 } as React.CSSProperties} d="M 1149.2 182 V 166.5 H 1160.7 Q 1165.5 166.5 1167.6 164.4 Q 1169.6 162.3 1169.6 157.3 V 133.6 L 1185.8 125.2 V 158.1 Q 1185.8 169.7 1178.6 176.2 Q 1172.3 182 1162.2 182 Z M 1156.1 210.5 Q 1152.2 210.5 1149.9 208.2 Q 1147.6 205.9 1147.6 202 Q 1147.6 193.6 1156.1 193.6 Q 1159.9 193.6 1162.2 195.9 Q 1164.4 198.1 1164.4 202 Q 1164.4 210.5 1156.1 210.5 Z M 1175.8 210.5 Q 1171.9 210.5 1169.6 208.2 Q 1167.3 205.9 1167.3 202 Q 1167.3 193.6 1175.8 193.6 Q 1179.6 193.6 1181.9 195.9 Q 1184.1 198.1 1184.1 202 Q 1184.1 210.5 1175.8 210.5 Z" />
      <path className="areen-letter" data-char="ر" style={{ "--i": 10 } as React.CSSProperties} d="M 1240.2 174.1 Q 1240.2 188.9 1232 198.1 Q 1224.4 206.7 1212 206.7 Q 1203.9 206.7 1196.3 202.6 V 188.5 Q 1202.9 192.2 1209.3 192.2 Q 1216.4 192.2 1220.3 187.7 Q 1224.2 183.2 1224.2 175.1 V 133.7 L 1240.2 125.2 Z" />
      <path className="areen-letter" data-char="أ" style={{ "--i": 11 } as React.CSSProperties} d="M 1258.3 92.3 1262.4 84.8 H 1266.3 Q 1264.9 82.3 1264.9 79.6 Q 1264.9 75.5 1267.9 72.6 Q 1270.9 69.6 1275.1 69.6 Q 1279 69.6 1282.3 72.3 V 79.7 Q 1279.2 77 1276.1 77 Q 1271.9 77 1271.9 80.9 Q 1271.9 82.8 1273.6 84.8 H 1286.2 L 1282.2 92.3 Z M 1263.2 182 V 108 L 1279.3 99.4 V 182 Z" />
  </g>
  <g data-part="wordmark-en" className="areen-gold-text" fill={`url(#${uid}-areen-gold-text)`}>
      <path className="areen-letter" data-char="A" style={{ "--i": 0 } as React.CSSProperties} d="M 510.4 270 525 237.8 H 529.5 L 544.2 270 H 539.3 L 526.3 240.4 H 528.1 L 515.1 270 Z M 516.6 261.9 517.8 258.3 H 536 L 537.3 261.9 Z" />
      <path className="areen-letter" data-char="R" style={{ "--i": 1 } as React.CSSProperties} d="M 568.9 270 V 237.8 H 581.5 Q 587.8 237.8 591.3 240.8 Q 594.9 243.7 594.9 249 Q 594.9 252.5 593.3 255 Q 591.7 257.5 588.7 258.9 Q 585.7 260.2 581.5 260.2 H 571.5 L 573.5 258.1 V 270 Z M 590.5 270 582.3 258.3 H 587.2 L 595.5 270 Z M 573.5 258.5 571.5 256.3 H 581.4 Q 585.8 256.3 588.1 254.4 Q 590.3 252.5 590.3 249 Q 590.3 245.6 588.1 243.7 Q 585.8 241.8 581.4 241.8 H 571.5 L 573.5 239.5 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 2 } as React.CSSProperties} d="M 622.4 270 V 237.8 H 645.1 V 241.8 H 627 V 266 H 645.8 V 270 Z M 626.6 255.6 V 251.7 H 643.1 V 255.6 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 3 } as React.CSSProperties} d="M 673.2 270 V 237.8 H 695.9 V 241.8 H 677.8 V 266 H 696.6 V 270 Z M 677.4 255.6 V 251.7 H 694 V 255.6 Z" />
      <path className="areen-letter" data-char="N" style={{ "--i": 4 } as React.CSSProperties} d="M 724 270 V 237.8 H 727.8 L 749.1 264.2 H 747.1 V 237.8 H 751.7 V 270 H 747.9 L 726.6 243.6 H 728.6 V 270 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 5 } as React.CSSProperties} d="M 808.9 270 823.5 237.8 H 828 L 842.6 270 H 837.8 L 824.8 240.4 H 826.6 L 813.6 270 Z M 815.1 261.9 816.3 258.3 H 834.5 L 835.8 261.9 Z" />
      <path className="areen-letter" data-char="L" style={{ "--i": 6 } as React.CSSProperties} d="M 867.4 270 V 237.8 H 872 V 266 H 889.5 V 270 Z" />
      <path className="areen-letter" data-char="B" style={{ "--i": 7 } as React.CSSProperties} d="M 914.7 270 V 237.8 H 929.2 Q 934.8 237.8 937.7 240 Q 940.7 242.3 940.7 246.1 Q 940.7 248.7 939.6 250.5 Q 938.4 252.3 936.4 253.3 Q 934.4 254.3 932.1 254.3 L 933 252.9 Q 935.7 252.9 937.8 253.9 Q 940 254.8 941.2 256.7 Q 942.4 258.5 942.4 261.3 Q 942.4 265.4 939.3 267.7 Q 936.2 270 930.1 270 Z M 919.3 266.3 H 929.9 Q 933.7 266.3 935.8 265 Q 937.8 263.7 937.8 260.9 Q 937.8 258.1 935.8 256.8 Q 933.7 255.6 929.9 255.6 H 918.9 V 251.8 H 928.8 Q 932.3 251.8 934.2 250.5 Q 936.1 249.3 936.1 246.7 Q 936.1 244.1 934.2 242.8 Q 932.3 241.5 928.8 241.5 H 919.3 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 8 } as React.CSSProperties} d="M 964.6 270 979.2 237.8 H 983.7 L 998.4 270 H 993.5 L 980.5 240.4 H 982.4 L 969.3 270 Z M 970.8 261.9 972.1 258.3 H 990.2 L 991.5 261.9 Z" />
      <path className="areen-letter" data-char="S" style={{ "--i": 9 } as React.CSSProperties} d="M 1032.5 270.4 Q 1028.9 270.4 1025.5 269.2 Q 1022.1 268.1 1020.2 266.3 L 1021.9 262.7 Q 1023.7 264.3 1026.6 265.4 Q 1029.5 266.5 1032.5 266.5 Q 1035.3 266.5 1037.1 265.8 Q 1038.8 265.2 1039.7 264 Q 1040.5 262.9 1040.5 261.5 Q 1040.5 259.8 1039.4 258.8 Q 1038.3 257.8 1036.6 257.2 Q 1034.9 256.6 1032.8 256.1 Q 1030.7 255.6 1028.6 255 Q 1026.6 254.4 1024.8 253.4 Q 1023.1 252.5 1022 250.8 Q 1021 249.2 1021 246.6 Q 1021 244.1 1022.3 242.1 Q 1023.6 240 1026.3 238.7 Q 1029.1 237.4 1033.3 237.4 Q 1036.1 237.4 1038.9 238.2 Q 1041.6 238.9 1043.7 240.3 L 1042.1 244 Q 1040.1 242.6 1037.8 242 Q 1035.5 241.3 1033.3 241.3 Q 1030.6 241.3 1028.9 242 Q 1027.1 242.7 1026.3 243.9 Q 1025.5 245 1025.5 246.4 Q 1025.5 248.2 1026.6 249.2 Q 1027.7 250.2 1029.4 250.8 Q 1031.1 251.4 1033.2 251.9 Q 1035.2 252.3 1037.3 252.9 Q 1039.4 253.5 1041.2 254.5 Q 1042.9 255.5 1043.9 257.1 Q 1045 258.7 1045 261.2 Q 1045 263.7 1043.7 265.7 Q 1042.3 267.8 1039.5 269.1 Q 1036.8 270.4 1032.5 270.4 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 10 } as React.CSSProperties} d="M 1066.8 270 1081.4 237.8 H 1086 L 1100.6 270 H 1095.8 L 1082.8 240.4 H 1084.6 L 1071.6 270 Z M 1073 261.9 1074.3 258.3 H 1092.4 L 1093.7 261.9 Z" />
      <path className="areen-letter" data-char="T" style={{ "--i": 11 } as React.CSSProperties} d="M 1130.2 270 V 241.8 H 1119.1 V 237.8 H 1145.8 V 241.8 H 1134.7 V 270 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 12 } as React.CSSProperties} d="M 1170.8 270 V 237.8 H 1193.5 V 241.8 H 1175.4 V 266 H 1194.1 V 270 Z M 1175 255.6 V 251.7 H 1191.5 V 255.6 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 13 } as React.CSSProperties} d="M 1221.6 270 V 237.8 H 1244.3 V 241.8 H 1226.2 V 266 H 1245 V 270 Z M 1225.8 255.6 V 251.7 H 1242.3 V 255.6 Z" />
      <path className="areen-letter" data-char="N" style={{ "--i": 14 } as React.CSSProperties} d="M 1272.4 270 V 237.8 H 1276.2 L 1297.5 264.2 H 1295.5 V 237.8 H 1300.1 V 270 H 1296.3 L 1275 243.6 H 1277 V 270 Z" />
  </g>
  <g data-part="wordmark-hotel" fill={`url(#${uid}-areen-gold-text)`}>
    <rect data-part="rule-left" x="510.4" y="330" width="240.9" height="3" />
    <rect data-part="rule-right" x="1064.1" y="330" width="240.9" height="3" />
      <path className="areen-letter" data-char="H" style={{ "--i": 0 } as React.CSSProperties} d="M 804.4 345 V 318.4 H 808.2 V 345 Z M 785.3 345 V 318.4 H 789.1 V 345 Z M 788.7 333.1 V 329.8 H 804.7 V 333.1 Z" />
      <path className="areen-letter" data-char="O" style={{ "--i": 1 } as React.CSSProperties} d="M 858.2 345.3 Q 855.1 345.3 852.5 344.3 Q 849.9 343.3 848 341.4 Q 846.1 339.6 845.1 337.1 Q 844 334.6 844 331.7 Q 844 328.8 845.1 326.3 Q 846.1 323.8 848 322 Q 849.9 320.1 852.5 319.1 Q 855.1 318.1 858.2 318.1 Q 861.2 318.1 863.8 319.1 Q 866.3 320.1 868.3 322 Q 870.2 323.8 871.2 326.3 Q 872.3 328.7 872.3 331.7 Q 872.3 334.7 871.2 337.1 Q 870.2 339.6 868.3 341.4 Q 866.3 343.3 863.8 344.3 Q 861.2 345.3 858.2 345.3 Z M 858.2 341.9 Q 860.4 341.9 862.3 341.2 Q 864.1 340.4 865.5 339 Q 866.9 337.6 867.7 335.8 Q 868.5 333.9 868.5 331.7 Q 868.5 329.5 867.7 327.6 Q 866.9 325.8 865.5 324.4 Q 864.1 323 862.3 322.2 Q 860.4 321.5 858.2 321.5 Q 855.9 321.5 854.1 322.2 Q 852.2 323 850.8 324.4 Q 849.4 325.8 848.6 327.6 Q 847.8 329.5 847.8 331.7 Q 847.8 333.9 848.6 335.8 Q 849.4 337.6 850.8 339 Q 852.2 340.4 854.1 341.2 Q 855.9 341.9 858.2 341.9 Z" />
      <path className="areen-letter" data-char="T" style={{ "--i": 2 } as React.CSSProperties} d="M 913 345 V 321.7 H 903.9 V 318.4 H 925.9 V 321.7 H 916.8 V 345 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 3 } as React.CSSProperties} d="M 960 345 V 318.4 H 978.8 V 321.7 H 963.8 V 341.7 H 979.3 V 345 Z M 963.5 333.1 V 329.9 H 977.2 V 333.1 Z" />
      <path className="areen-letter" data-char="L" style={{ "--i": 4 } as React.CSSProperties} d="M 1015.5 345 V 318.4 H 1019.3 V 341.7 H 1033.7 V 345 Z" />
  </g>

      </svg>
    );
  return (
    <svg viewBox="0 0 1000 930" role="img" aria-label={title} className={cls}>

  <defs>
    <linearGradient id={`${uid}-areen-gold`} x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stopColor="#F6E6B4" />
      <stop offset="0.25" stopColor="#D9B866" />
      <stop offset="0.5" stopColor="#A9843A" />
      <stop offset="0.64" stopColor="#EBD39A" />
      <stop offset="0.84" stopColor="#C29C4E" />
      <stop offset="1" stopColor="#7C5F25" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-hi`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#EAF3FB" stopOpacity="0.85" />
      <stop offset="0.5" stopColor="#9DBEDD" stopOpacity="0.6" />
      <stop offset="1" stopColor="#4D7DA8" stopOpacity="0.55" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-mid`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#B9CEE2" stopOpacity="0.7" />
      <stop offset="0.45" stopColor="#5E86AD" stopOpacity="0.5" />
      <stop offset="1" stopColor="#0F2A47" stopOpacity="0.8" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-deep`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#4C79A3" stopOpacity="0.55" />
      <stop offset="1" stopColor="#081F36" stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-dark`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#163A5E" stopOpacity="0.8" />
      <stop offset="0.6" stopColor="#081F36" stopOpacity="0.85" />
      <stop offset="1" stopColor="#9CB9D6" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar`} x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stopColor="#6E98C0" stopOpacity="0.9" />
      <stop offset="0.3" stopColor="#1B3F64" stopOpacity="0.92" />
      <stop offset="0.75" stopColor="#0A2340" stopOpacity="0.95" />
      <stop offset="1" stopColor="#3D6B96" stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar-lit`} x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stopColor="#DCEAF7" stopOpacity="0.95" />
      <stop offset="0.4" stopColor="#93B8DA" stopOpacity="0.92" />
      <stop offset="1" stopColor="#3E6D99" stopOpacity="0.92" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glass-pillar-pale`} x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stopColor="#D2E3F2" stopOpacity="0.85" />
      <stop offset="0.45" stopColor="#8FB2D3" stopOpacity="0.6" />
      <stop offset="1" stopColor="#4F7EA9" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-glint`} x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <filter id={`${uid}-areen-glow`} x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
      <feOffset dy="4" />
      <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <linearGradient id={`${uid}-areen-gold-text`} gradientUnits="userSpaceOnUse" x1="0" y1="590" x2="0" y2="910">
      <stop offset="0" stopColor="#F6E6B4" />
      <stop offset="0.4" stopColor="#D9B866" />
      <stop offset="0.55" stopColor="#A9843A" />
      <stop offset="0.7" stopColor="#E6CC8C" />
      <stop offset="1" stopColor="#B38D45" />
    </linearGradient>
  </defs>
  <g data-part="areen-mark-wrap" transform="translate(189.2 0) scale(0.68)">
  <g data-part="areen-mark" filter={`url(#${uid}-areen-glow)`}>
    <g data-part="areen-left">
    <g data-part="outer-crystal-left" className="areen-crystal areen-outer-crystal">
      <path className="areen-facet" d="M28 490 L150 487 L215 590 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M150 487 L300 590 L215 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M300 590 L410 712 L215 590 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M410 712 L160 668 L215 590 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M160 668 L28 490 L215 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M28 490 L150 487 L300 590 L410 712 L160 668 Z" />
    </g>
    <path data-part="swoosh-left" className="areen-gold areen-swoosh" d="M126 676 C270 656 392 718 448 806 C380 752 270 696 126 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-left" className="areen-crystal areen-inner-crystal">
      <path className="areen-facet" d="M226 372 L326 474 L318 540 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M326 474 L384 598 L318 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M384 598 L426 728 L318 540 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M426 728 L238 482 L318 540 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M238 482 L226 372 L318 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M226 372 L326 474 L384 598 L426 728 L238 482 Z" />
    </g>
    <path data-part="leaf-left" className="areen-gold areen-leaf" d="M446 792 C330 705 214 610 204 478 L184 316 L362 462 C414 548 446 670 452 770 Z M428 730 C350 652 246 578 236 480 L224 372 L330 478 C380 560 414 650 428 730 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-left" className="areen-crystal areen-center-crystal">
      <path className="areen-facet" d="M366 202 L414 264 L436 712 L440 722 L360 432 Z" fill={`url(#${uid}-areen-glass-pillar)`} />
      <path className="areen-facet" d="M414 264 L449 284 L451 708 L436 712 Z" fill={`url(#${uid}-areen-glass-pillar-lit)`} />
      <path className="areen-glint" d="M372 236 L404 262 L392 420 L366 380 Z" fill={`url(#${uid}-areen-glint)`} />
      <path className="areen-edge" d="M366 202 L414 264 L436 712 L440 722 L360 432 Z M414 264 L449 284 L451 708 L436 712 Z" />
    </g>
    </g>
    <g data-part="areen-right">
    <g data-part="outer-crystal-right" className="areen-crystal areen-outer-crystal">
      <path className="areen-facet" d="M886 490 L764 487 L699 590 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M764 487 L614 590 L699 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M614 590 L504 712 L699 590 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M504 712 L754 668 L699 590 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M754 668 L886 490 L699 590 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M886 490 L764 487 L614 590 L504 712 L754 668 Z" />
    </g>
    <path data-part="swoosh-right" className="areen-gold areen-swoosh" d="M788 676 C644 656 522 718 466 806 C534 752 644 696 788 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-right" className="areen-crystal areen-inner-crystal">
      <path className="areen-facet" d="M688 372 L588 474 L596 540 Z" fill={`url(#${uid}-areen-glass-hi)`} />
      <path className="areen-facet" d="M588 474 L530 598 L596 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-facet" d="M530 598 L488 728 L596 540 Z" fill={`url(#${uid}-areen-glass-deep)`} />
      <path className="areen-facet" d="M488 728 L676 482 L596 540 Z" fill={`url(#${uid}-areen-glass-dark)`} />
      <path className="areen-facet" d="M676 482 L688 372 L596 540 Z" fill={`url(#${uid}-areen-glass-mid)`} />
      <path className="areen-edge" d="M688 372 L588 474 L530 598 L488 728 L676 482 Z" />
    </g>
    <path data-part="leaf-right" className="areen-gold areen-leaf" d="M468 792 C584 705 700 610 710 478 L730 316 L552 462 C500 548 468 670 462 770 Z M486 730 C564 652 668 578 678 480 L690 372 L584 478 C534 560 500 650 486 730 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-right" className="areen-crystal areen-center-crystal">
      <path className="areen-facet" d="M548 202 L500 264 L478 712 L474 722 L554 432 Z" fill={`url(#${uid}-areen-glass-pillar-pale)`} />
      <path className="areen-facet" d="M500 264 L465 284 L463 708 L478 712 Z" fill={`url(#${uid}-areen-glass-pillar-lit)`} />
      <path className="areen-glint" d="M542 236 L510 262 L522 420 L548 380 Z" fill={`url(#${uid}-areen-glint)`} />
      <path className="areen-edge" d="M548 202 L500 264 L478 712 L474 722 L554 432 Z M500 264 L465 284 L463 708 L478 712 Z" />
    </g>
    </g>
    <path data-part="areen-star" className="areen-gold" d="M457 22 Q467 100 524 112 Q467 124 457 226 Q447 124 390 112 Q447 100 457 22 Z" fill={`url(#${uid}-areen-gold)`} />
  </g>
  </g>
  <g data-part="wordmark-ar" className="areen-gold-text" fill={`url(#${uid}-areen-gold-text)`}>
      <path className="areen-letter" data-char="ن" style={{ "--i": 0 } as React.CSSProperties} d="M 95.1 649.6 Q 90.6 649.6 87.9 646.8 Q 85.1 644.1 85.1 639.4 Q 85.1 635 87.9 632.2 Q 90.6 629.5 95.1 629.5 Q 99.7 629.5 102.4 632.2 Q 105 634.8 105 639.4 Q 105 649.6 95.1 649.6 Z M 148.2 697.6 H 161.9 V 716 H 146.4 Q 141.2 716 136.8 714.6 Q 133.9 729.2 122.1 737.6 Q 111.4 744.9 96.2 744.9 Q 75.7 744.9 64.4 730.4 Q 55.6 719.2 55.6 704 Q 55.6 692 61.3 683 L 79.5 679.2 Q 73.4 689.6 73.4 701 Q 73.4 712.5 79.9 719.6 Q 86.2 726.5 96.2 726.5 Q 106.7 726.5 112.6 721.2 Q 118.4 715.8 118.4 706.3 V 658.5 L 137.6 648.5 V 686.7 Q 137.6 692.6 140 695.1 Q 142.4 697.6 148.2 697.6 Z" />
      <path className="areen-letter" data-char="ي" style={{ "--i": 1 } as React.CSSProperties} d="M 206.9 697.6 H 220.5 V 716 H 205 Q 193.9 716 186.7 710.1 Q 179.4 716 168.3 716 H 152.8 V 697.6 H 166.4 Q 172.2 697.6 174.6 695.1 Q 177.1 692.6 177.1 686.7 V 658.5 L 196.2 648.5 V 686.7 Q 196.2 692.6 198.7 695.1 Q 201.1 697.6 206.9 697.6 Z M 167.5 729.8 Q 172.1 729.8 174.7 732.5 Q 177.4 735.2 177.4 739.7 Q 177.4 749.9 167.5 749.9 Q 162.9 749.9 160.2 747.2 Q 157.5 744.4 157.5 739.7 Q 157.5 729.8 167.5 729.8 Z M 190.9 729.8 Q 195.5 729.8 198.1 732.5 Q 200.8 735.2 200.8 739.7 Q 200.8 749.9 190.9 749.9 Q 186.3 749.9 183.6 747.2 Q 180.9 744.4 180.9 739.7 Q 180.9 729.8 190.9 729.8 Z" />
      <path className="areen-letter" data-char="ت" style={{ "--i": 2 } as React.CSSProperties} d="M 222.4 633.2 Q 217.8 633.2 215.1 630.4 Q 212.3 627.7 212.3 623 Q 212.3 613.1 222.4 613.1 Q 226.9 613.1 229.6 615.8 Q 232.3 618.4 232.3 623 Q 232.3 633.2 222.4 633.2 Z M 245.8 633.2 Q 241.2 633.2 238.5 630.4 Q 235.7 627.7 235.7 623 Q 235.7 613.1 245.8 613.1 Q 250.3 613.1 253 615.8 Q 255.7 618.4 255.7 623 Q 255.7 633.2 245.8 633.2 Z M 211.4 716 V 697.6 H 225.1 Q 230.9 697.6 233.3 695.1 Q 235.7 692.6 235.7 686.7 V 658.5 L 254.9 648.5 V 687.6 Q 254.9 701.4 246.4 709.2 Q 238.9 716 226.9 716 Z" />
      <path className="areen-letter" data-char="ا" style={{ "--i": 3 } as React.CSSProperties} d="M 310.2 716 Q 296.4 716 288.8 707.2 Q 282.3 699.6 282.3 687.6 V 628 L 301.4 618 V 686.7 Q 301.4 692.6 303.8 695.1 Q 306.3 697.6 312.1 697.6 H 325.7 V 716 Z" />
      <path className="areen-letter" data-char="س" style={{ "--i": 4 } as React.CSSProperties} d="M 316.6 716 V 697.6 H 332.7 Q 338.5 697.6 341 695.1 Q 343.5 692.6 343.5 686.7 V 666.6 L 362.7 656.6 V 686.7 Q 362.7 692.6 365.1 695.1 Q 367.5 697.6 373.3 697.6 H 383.6 Q 389.4 697.6 391.9 695.1 Q 394.3 692.6 394.3 686.7 V 662.6 L 413.4 652.5 V 686.7 Q 413.4 692.6 415.9 695.1 Q 418.5 697.6 424.2 697.6 H 434.6 Q 440.3 697.6 442.8 695.1 Q 445.2 692.6 445.2 686.7 V 658.5 L 464.4 648.5 V 684.2 Q 464.4 691.5 467.3 694.6 Q 470.3 697.6 477.3 697.6 H 491.3 V 716 H 476.2 Q 463.4 716 455.7 708.7 Q 448.9 715.8 437.3 716 H 422.3 Q 411 716 403.9 709.3 Q 397.3 715.8 386.5 716 H 371.5 Q 360.2 716 353.1 709.3 Q 345.9 716 334.7 716 Z" />
      <path className="areen-letter" data-char="ب" style={{ "--i": 5 } as React.CSSProperties} d="M 536.3 697.6 H 549.9 V 716 H 534.4 Q 523.3 716 516 710.1 Q 508.7 716 497.6 716 H 482.1 V 697.6 H 495.8 Q 501.6 697.6 504 695.1 Q 506.5 692.6 506.5 686.7 V 658.5 L 525.6 648.5 V 686.7 Q 525.6 692.6 528 695.1 Q 530.5 697.6 536.3 697.6 Z M 516.9 729.8 Q 521.5 729.8 524.2 732.5 Q 526.8 735.2 526.8 739.7 Q 526.8 749.9 516.9 749.9 Q 512.4 749.9 509.7 747.2 Q 506.9 744.4 506.9 739.7 Q 506.9 735.3 509.7 732.6 Q 512.4 729.8 516.9 729.8 Z" />
      <path className="areen-letter" data-char="ل" style={{ "--i": 6 } as React.CSSProperties} d="M 540.8 716 V 697.6 H 550.4 Q 557.4 697.6 560.3 694.6 Q 563.3 691.5 563.3 684.2 V 628.1 L 582.3 618 V 684.4 Q 582.3 699.1 573.3 707.9 Q 565.1 716 551.5 716 Z" />
      <path className="areen-letter" data-char="ا" style={{ "--i": 7 } as React.CSSProperties} d="M 609.7 716 V 628.1 L 628.8 618 V 716 Z" />
      <path className="areen-letter" data-char="ن" style={{ "--i": 8 } as React.CSSProperties} d="M 729.1 649.6 Q 724.6 649.6 721.8 646.8 Q 719.1 644.1 719.1 639.4 Q 719.1 635 721.8 632.2 Q 724.6 629.5 729.1 629.5 Q 733.7 629.5 736.4 632.2 Q 739 634.8 739 639.4 Q 739 649.6 729.1 649.6 Z M 782.2 697.6 H 795.9 V 716 H 780.4 Q 775.2 716 770.8 714.6 Q 767.9 729.2 756 737.6 Q 745.4 744.9 730.2 744.9 Q 709.7 744.9 698.4 730.4 Q 689.6 719.2 689.6 704 Q 689.6 692 695.2 683 L 713.5 679.2 Q 707.4 689.6 707.4 701 Q 707.4 712.5 713.9 719.6 Q 720.2 726.5 730.2 726.5 Q 740.7 726.5 746.5 721.2 Q 752.4 715.8 752.4 706.3 V 658.5 L 771.5 648.5 V 686.7 Q 771.5 692.6 774 695.1 Q 776.4 697.6 782.2 697.6 Z" />
      <path className="areen-letter" data-char="ي" style={{ "--i": 9 } as React.CSSProperties} d="M 786.7 716 V 697.6 H 800.4 Q 806.2 697.6 808.6 695.1 Q 811.1 692.6 811.1 686.7 V 658.5 L 830.2 648.5 V 687.6 Q 830.2 701.4 821.7 709.2 Q 814.3 716 802.3 716 Z M 795 749.9 Q 790.4 749.9 787.7 747.2 Q 784.9 744.4 784.9 739.7 Q 784.9 729.8 795 729.8 Q 799.5 729.8 802.2 732.5 Q 804.8 735.2 804.8 739.7 Q 804.8 749.9 795 749.9 Z M 818.4 749.9 Q 813.8 749.9 811.1 747.2 Q 808.3 744.4 808.3 739.7 Q 808.3 729.8 818.4 729.8 Q 822.9 729.8 825.6 732.5 Q 828.2 735.2 828.2 739.7 Q 828.2 749.9 818.4 749.9 Z" />
      <path className="areen-letter" data-char="ر" style={{ "--i": 10 } as React.CSSProperties} d="M 894.8 706.6 Q 894.8 724.2 885.1 735.2 Q 876.1 745.3 861.4 745.3 Q 851.8 745.3 842.7 740.5 V 723.8 Q 850.6 728.2 858.2 728.2 Q 866.5 728.2 871.2 722.8 Q 875.8 717.4 875.8 707.8 V 658.7 L 894.8 648.5 Z" />
      <path className="areen-letter" data-char="أ" style={{ "--i": 11 } as React.CSSProperties} d="M 916.4 609.4 921.3 600.6 H 925.8 Q 924.2 597.6 924.2 594.4 Q 924.2 589.5 927.7 586 Q 931.3 582.5 936.3 582.5 Q 940.9 582.5 944.8 585.7 V 594.6 Q 941.2 591.4 937.5 591.4 Q 932.5 591.4 932.5 595.9 Q 932.5 598.2 934.5 600.6 H 949.5 L 944.7 609.4 Z M 922.2 716 V 628.1 L 941.3 618 V 716 Z" />
  </g>
  <g data-part="wordmark-en" className="areen-gold-text" fill={`url(#${uid}-areen-gold-text)`}>
      <path className="areen-letter" data-char="A" style={{ "--i": 0 } as React.CSSProperties} d="M 40.4 820 56.9 783.6 H 62.1 L 78.6 820 H 73.2 L 58.4 786.5 H 60.5 L 45.8 820 Z M 47.5 810.9 48.9 806.7 H 69.4 L 70.9 810.9 Z" />
      <path className="areen-letter" data-char="R" style={{ "--i": 1 } as React.CSSProperties} d="M 108 820 V 783.6 H 122.2 Q 129.3 783.6 133.3 787 Q 137.4 790.3 137.4 796.3 Q 137.4 800.2 135.6 803.1 Q 133.8 805.9 130.4 807.4 Q 127 808.9 122.2 808.9 H 110.9 L 113.2 806.5 V 820 Z M 132.4 820 123.1 806.8 H 128.7 L 138 820 Z M 113.2 807.1 110.9 804.5 H 122.1 Q 127.1 804.5 129.6 802.3 Q 132.2 800.2 132.2 796.3 Q 132.2 792.4 129.6 790.3 Q 127.1 788.1 122.1 788.1 H 110.9 L 113.2 785.5 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 2 } as React.CSSProperties} d="M 169.8 820 V 783.6 H 195.5 V 788.1 H 175 V 815.5 H 196.2 V 820 Z M 174.6 803.7 V 799.3 H 193.3 V 803.7 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 3 } as React.CSSProperties} d="M 228.7 820 V 783.6 H 254.4 V 788.1 H 233.9 V 815.5 H 255.1 V 820 Z M 233.4 803.7 V 799.3 H 252.1 V 803.7 Z" />
      <path className="areen-letter" data-char="N" style={{ "--i": 4 } as React.CSSProperties} d="M 287.5 820 V 783.6 H 291.8 L 315.8 813.5 H 313.6 V 783.6 H 318.8 V 820 H 314.5 L 290.5 790.1 H 292.7 V 820 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 5 } as React.CSSProperties} d="M 386.2 820 402.7 783.6 H 407.8 L 424.4 820 H 418.9 L 404.2 786.5 H 406.3 L 391.6 820 Z M 393.2 810.9 394.6 806.7 H 415.1 L 416.6 810.9 Z" />
      <path className="areen-letter" data-char="L" style={{ "--i": 6 } as React.CSSProperties} d="M 453.8 820 V 783.6 H 459 V 815.5 H 478.7 V 820 Z" />
      <path className="areen-letter" data-char="B" style={{ "--i": 7 } as React.CSSProperties} d="M 508.7 820 V 783.6 H 525 Q 531.3 783.6 534.7 786.1 Q 538.1 788.6 538.1 793 Q 538.1 796 536.7 798 Q 535.4 800 533.2 801.1 Q 530.9 802.2 528.3 802.2 L 529.3 800.7 Q 532.4 800.7 534.8 801.7 Q 537.2 802.8 538.6 804.9 Q 540 807.1 540 810.2 Q 540 814.9 536.5 817.4 Q 533 820 526 820 Z M 513.9 815.8 H 525.8 Q 530.1 815.8 532.4 814.3 Q 534.7 812.9 534.7 809.8 Q 534.7 806.6 532.4 805.1 Q 530.1 803.7 525.8 803.7 H 513.4 V 799.5 H 524.5 Q 528.5 799.5 530.7 798 Q 532.9 796.5 532.9 793.6 Q 532.9 790.7 530.7 789.3 Q 528.5 787.8 524.5 787.8 H 513.9 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 8 } as React.CSSProperties} d="M 566.4 820 582.9 783.6 H 588.1 L 604.6 820 H 599.1 L 584.4 786.5 H 586.5 L 571.8 820 Z M 573.4 810.9 574.8 806.7 H 595.3 L 596.8 810.9 Z" />
      <path className="areen-letter" data-char="S" style={{ "--i": 9 } as React.CSSProperties} d="M 644.6 820.4 Q 640.4 820.4 636.6 819.1 Q 632.9 817.9 630.7 815.8 L 632.6 811.8 Q 634.7 813.6 637.9 814.8 Q 641.1 816 644.6 816 Q 647.8 816 649.8 815.3 Q 651.7 814.5 652.7 813.3 Q 653.6 812 653.6 810.4 Q 653.6 808.5 652.4 807.4 Q 651.2 806.2 649.2 805.5 Q 647.3 804.8 644.9 804.3 Q 642.6 803.8 640.2 803.1 Q 637.8 802.4 635.9 801.3 Q 633.9 800.2 632.7 798.3 Q 631.6 796.5 631.6 793.6 Q 631.6 790.8 633 788.4 Q 634.5 786 637.6 784.6 Q 640.7 783.2 645.5 783.2 Q 648.7 783.2 651.8 784 Q 654.9 784.8 657.2 786.4 L 655.5 790.6 Q 653.1 789 650.5 788.3 Q 647.9 787.6 645.5 787.6 Q 642.4 787.6 640.4 788.4 Q 638.5 789.2 637.6 790.5 Q 636.6 791.8 636.6 793.4 Q 636.6 795.3 637.9 796.4 Q 639.1 797.6 641 798.3 Q 643 798.9 645.3 799.5 Q 647.7 800 650 800.7 Q 652.4 801.4 654.4 802.5 Q 656.3 803.6 657.5 805.4 Q 658.7 807.2 658.7 810.1 Q 658.7 812.8 657.2 815.2 Q 655.7 817.6 652.5 819 Q 649.4 820.4 644.6 820.4 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 10 } as React.CSSProperties} d="M 684.8 820 701.3 783.6 H 706.4 L 722.9 820 H 717.5 L 702.8 786.5 H 704.8 L 690.1 820 Z M 691.8 810.9 693.2 806.7 H 713.7 L 715.2 810.9 Z" />
      <path className="areen-letter" data-char="T" style={{ "--i": 11 } as React.CSSProperties} d="M 757.8 820 V 788.1 H 745.3 V 783.6 H 775.4 V 788.1 H 762.9 V 820 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 12 } as React.CSSProperties} d="M 805.1 820 V 783.6 H 830.7 V 788.1 H 810.3 V 815.5 H 831.5 V 820 Z M 809.8 803.7 V 799.3 H 828.5 V 803.7 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 13 } as React.CSSProperties} d="M 863.9 820 V 783.6 H 889.6 V 788.1 H 869.1 V 815.5 H 890.3 V 820 Z M 868.6 803.7 V 799.3 H 887.3 V 803.7 Z" />
      <path className="areen-letter" data-char="N" style={{ "--i": 14 } as React.CSSProperties} d="M 922.7 820 V 783.6 H 927 L 951.1 813.5 H 948.8 V 783.6 H 954 V 820 H 949.8 L 925.7 790.1 H 927.9 V 820 Z" />
  </g>
  <g data-part="wordmark-hotel" fill={`url(#${uid}-areen-gold-text)`}>
    <rect data-part="rule-left" x="40.5" y="886" width="270.7" height="3" />
    <rect data-part="rule-right" x="688.8" y="886" width="270.7" height="3" />
      <path className="areen-letter" data-char="H" style={{ "--i": 0 } as React.CSSProperties} d="M 377.9 904 V 873.2 H 382.3 V 904 Z M 355.8 904 V 873.2 H 360.2 V 904 Z M 359.7 890.3 V 886.4 H 378.3 V 890.3 Z" />
      <path className="areen-letter" data-char="O" style={{ "--i": 1 } as React.CSSProperties} d="M 441.4 904.4 Q 437.9 904.4 434.9 903.2 Q 431.9 902 429.7 899.8 Q 427.5 897.7 426.2 894.8 Q 425 892 425 888.6 Q 425 885.2 426.2 882.4 Q 427.5 879.5 429.7 877.4 Q 431.9 875.2 434.9 874 Q 437.8 872.8 441.4 872.8 Q 444.9 872.8 447.9 874 Q 450.9 875.2 453.1 877.3 Q 455.3 879.4 456.5 882.3 Q 457.7 885.2 457.7 888.6 Q 457.7 892 456.5 894.9 Q 455.3 897.8 453.1 899.9 Q 450.9 902 447.9 903.2 Q 444.9 904.4 441.4 904.4 Z M 441.4 900.4 Q 444 900.4 446.1 899.6 Q 448.3 898.7 449.9 897.1 Q 451.5 895.5 452.4 893.3 Q 453.3 891.2 453.3 888.6 Q 453.3 886 452.4 883.9 Q 451.5 881.7 449.9 880.1 Q 448.3 878.5 446.1 877.6 Q 444 876.8 441.4 876.8 Q 438.8 876.8 436.6 877.6 Q 434.5 878.5 432.8 880.1 Q 431.2 881.7 430.3 883.9 Q 429.4 886 429.4 888.6 Q 429.4 891.2 430.3 893.3 Q 431.2 895.5 432.8 897.1 Q 434.5 898.7 436.6 899.6 Q 438.8 900.4 441.4 900.4 Z" />
      <path className="areen-letter" data-char="T" style={{ "--i": 2 } as React.CSSProperties} d="M 506.1 904 V 877 H 495.6 V 873.2 H 521.1 V 877 H 510.5 V 904 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 3 } as React.CSSProperties} d="M 561.9 904 V 873.2 H 583.6 V 877 H 566.2 V 900.2 H 584.2 V 904 Z M 565.9 890.2 V 886.5 H 581.7 V 890.2 Z" />
      <path className="areen-letter" data-char="L" style={{ "--i": 4 } as React.CSSProperties} d="M 627.3 904 V 873.2 H 631.7 V 900.2 H 648.4 V 904 Z" />
  </g>

    </svg>
  );
}
