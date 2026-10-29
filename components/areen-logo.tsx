"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import "./areen-logo.css";

/**
 * Areen Albasateen logo as inline SVG. Every part has an id or class, so it can be styled or animated:
 *  - [data-part] = areen-mark, areen-left, areen-right, areen-star, center-crystal-{left,right},
 *    inner-crystal-*, leaf-*, outer-crystal-*, swoosh-*, wordmark-ar, wordmark-en, wordmark-hotel, rule-left, rule-right
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
  variant?: "lockup" | "mark";
  animate?: boolean;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  return variant === "mark" ? (
    <svg viewBox="0 0 914 820" role="img" aria-label={title} className={cn("areen-logo", animate && "areen-animate", className)}>

  <defs>
    <linearGradient id={`${uid}-areen-gold`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F6E3A1" />
      <stop offset="0.45" stopColor="#D4AF37" />
      <stop offset="1" stopColor="#A27E22" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-crystal`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#E4F0FA" />
      <stop offset="0.5" stopColor="#A7C6E0" />
      <stop offset="1" stopColor="#5B8FB7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-crystal-deep`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#A7C6E0" />
      <stop offset="0.55" stopColor="#5B8FB7" />
      <stop offset="1" stopColor="#2B5578" />
    </linearGradient>
  </defs>
  <g data-part="areen-mark">
    <g data-part="areen-left">
    <g data-part="outer-crystal-left" className="areen-crystal areen-outer-crystal">
      <path d="M28 490 L150 487 L300 590 L410 712 L160 668 Z" fill={`url(#${uid}-areen-crystal)`} />
      <path className="areen-facets" d="M28 490 L215 590 L410 712 M150 487 L215 590 M160 668 L215 590 M90 560 L215 590" />
    </g>
    <path data-part="swoosh-left" className="areen-gold areen-swoosh" d="M126 676 C270 656 392 718 448 806 C380 752 270 696 126 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-left" className="areen-crystal areen-inner-crystal">
      <path d="M216 354 L296 400 L354 488 L430 740 L230 480 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path className="areen-facets" d="M216 354 L326 560 L430 740 M296 400 L326 560 M230 480 L326 560" />
    </g>
    <path data-part="leaf-left" className="areen-gold areen-leaf" d="M446 792 C330 705 214 610 204 478 L184 316 C262 352 336 410 374 476 C420 560 446 680 452 770 Z M432 744 C350 662 238 582 226 478 L212 350 C276 382 330 430 356 486 C394 570 422 662 432 744 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-left" className="areen-crystal areen-center-crystal">
      <path d="M366 202 L449 284 L451 708 L440 722 L360 432 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path d="M414 264 L449 284 L451 708 L436 712 Z" fill={`url(#${uid}-areen-crystal)`} opacity="0.9" />
      <path className="areen-facets" d="M366 202 L414 264 L436 712" />
    </g>
    </g>
    <g data-part="areen-right">
    <g data-part="outer-crystal-right" className="areen-crystal areen-outer-crystal">
      <path d="M886 490 L764 487 L614 590 L504 712 L754 668 Z" fill={`url(#${uid}-areen-crystal)`} />
      <path className="areen-facets" d="M886 490 L699 590 L504 712 M764 487 L699 590 M754 668 L699 590 M824 560 L699 590" />
    </g>
    <path data-part="swoosh-right" className="areen-gold areen-swoosh" d="M788 676 C644 656 522 718 466 806 C534 752 644 696 788 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-right" className="areen-crystal areen-inner-crystal">
      <path d="M698 354 L618 400 L560 488 L484 740 L684 480 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path className="areen-facets" d="M698 354 L588 560 L484 740 M618 400 L588 560 M684 480 L588 560" />
    </g>
    <path data-part="leaf-right" className="areen-gold areen-leaf" d="M468 792 C584 705 700 610 710 478 L730 316 C652 352 578 410 540 476 C494 560 468 680 462 770 Z M482 744 C564 662 676 582 688 478 L702 350 C638 382 584 430 558 486 C520 570 492 662 482 744 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-right" className="areen-crystal areen-center-crystal">
      <path d="M548 202 L465 284 L463 708 L474 722 L554 432 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path d="M500 264 L465 284 L463 708 L478 712 Z" fill={`url(#${uid}-areen-crystal)`} opacity="0.9" />
      <path className="areen-facets" d="M548 202 L500 264 L478 712" />
    </g>
    </g>
    <path data-part="areen-star" className="areen-gold" d="M457 22 Q467 100 524 112 Q467 124 457 226 Q447 124 390 112 Q447 100 457 22 Z" fill={`url(#${uid}-areen-gold)`} />
  </g>

    </svg>
  ) : (
    <svg viewBox="0 0 1000 880" role="img" aria-label={title} className={cn("areen-logo", animate && "areen-animate", className)}>

  <defs>
    <linearGradient id={`${uid}-areen-gold`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F6E3A1" />
      <stop offset="0.45" stopColor="#D4AF37" />
      <stop offset="1" stopColor="#A27E22" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-crystal`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#E4F0FA" />
      <stop offset="0.5" stopColor="#A7C6E0" />
      <stop offset="1" stopColor="#5B8FB7" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-crystal-deep`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#A7C6E0" />
      <stop offset="0.55" stopColor="#5B8FB7" />
      <stop offset="1" stopColor="#2B5578" />
    </linearGradient>
    <linearGradient id={`${uid}-areen-gold-text`} gradientUnits="userSpaceOnUse" x1="0" y1="540" x2="0" y2="860">
      <stop offset="0" stopColor="#F3D98B" />
      <stop offset="0.5" stopColor="#D4AF37" />
      <stop offset="1" stopColor="#B8922A" />
    </linearGradient>
  </defs>
  <g data-part="areen-mark-wrap" transform="translate(216.7 0) scale(0.62)">
  <g data-part="areen-mark">
    <g data-part="areen-left">
    <g data-part="outer-crystal-left" className="areen-crystal areen-outer-crystal">
      <path d="M28 490 L150 487 L300 590 L410 712 L160 668 Z" fill={`url(#${uid}-areen-crystal)`} />
      <path className="areen-facets" d="M28 490 L215 590 L410 712 M150 487 L215 590 M160 668 L215 590 M90 560 L215 590" />
    </g>
    <path data-part="swoosh-left" className="areen-gold areen-swoosh" d="M126 676 C270 656 392 718 448 806 C380 752 270 696 126 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-left" className="areen-crystal areen-inner-crystal">
      <path d="M216 354 L296 400 L354 488 L430 740 L230 480 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path className="areen-facets" d="M216 354 L326 560 L430 740 M296 400 L326 560 M230 480 L326 560" />
    </g>
    <path data-part="leaf-left" className="areen-gold areen-leaf" d="M446 792 C330 705 214 610 204 478 L184 316 C262 352 336 410 374 476 C420 560 446 680 452 770 Z M432 744 C350 662 238 582 226 478 L212 350 C276 382 330 430 356 486 C394 570 422 662 432 744 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-left" className="areen-crystal areen-center-crystal">
      <path d="M366 202 L449 284 L451 708 L440 722 L360 432 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path d="M414 264 L449 284 L451 708 L436 712 Z" fill={`url(#${uid}-areen-crystal)`} opacity="0.9" />
      <path className="areen-facets" d="M366 202 L414 264 L436 712" />
    </g>
    </g>
    <g data-part="areen-right">
    <g data-part="outer-crystal-right" className="areen-crystal areen-outer-crystal">
      <path d="M886 490 L764 487 L614 590 L504 712 L754 668 Z" fill={`url(#${uid}-areen-crystal)`} />
      <path className="areen-facets" d="M886 490 L699 590 L504 712 M764 487 L699 590 M754 668 L699 590 M824 560 L699 590" />
    </g>
    <path data-part="swoosh-right" className="areen-gold areen-swoosh" d="M788 676 C644 656 522 718 466 806 C534 752 644 696 788 676 Z" fill={`url(#${uid}-areen-gold)`} />
    <g data-part="inner-crystal-right" className="areen-crystal areen-inner-crystal">
      <path d="M698 354 L618 400 L560 488 L484 740 L684 480 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path className="areen-facets" d="M698 354 L588 560 L484 740 M618 400 L588 560 M684 480 L588 560" />
    </g>
    <path data-part="leaf-right" className="areen-gold areen-leaf" d="M468 792 C584 705 700 610 710 478 L730 316 C652 352 578 410 540 476 C494 560 468 680 462 770 Z M482 744 C564 662 676 582 688 478 L702 350 C638 382 584 430 558 486 C520 570 492 662 482 744 Z" fill={`url(#${uid}-areen-gold)`} fillRule="evenodd" />
    <g data-part="center-crystal-right" className="areen-crystal areen-center-crystal">
      <path d="M548 202 L465 284 L463 708 L474 722 L554 432 Z" fill={`url(#${uid}-areen-crystal-deep)`} />
      <path d="M500 264 L465 284 L463 708 L478 712 Z" fill={`url(#${uid}-areen-crystal)`} opacity="0.9" />
      <path className="areen-facets" d="M548 202 L500 264 L478 712" />
    </g>
    </g>
    <path data-part="areen-star" className="areen-gold" d="M457 22 Q467 100 524 112 Q467 124 457 226 Q447 124 390 112 Q447 100 457 22 Z" fill={`url(#${uid}-areen-gold)`} />
  </g>
  </g>
  <g data-part="wordmark-ar" className="areen-gold-text" fill={`url(#${uid}-areen-gold-text)`}>
      <path className="areen-letter" data-char="ن" style={{ "--i": 0 } as React.CSSProperties} d="M 95.1 597.6 Q 90.6 597.6 87.9 594.8 Q 85.1 592.1 85.1 587.4 Q 85.1 583 87.9 580.2 Q 90.6 577.5 95.1 577.5 Q 99.7 577.5 102.4 580.2 Q 105 582.8 105 587.4 Q 105 597.6 95.1 597.6 Z M 148.2 645.6 H 161.9 V 664 H 146.4 Q 141.2 664 136.8 662.6 Q 133.9 677.2 122.1 685.6 Q 111.4 692.9 96.2 692.9 Q 75.7 692.9 64.4 678.4 Q 55.6 667.2 55.6 652 Q 55.6 640 61.3 631 L 79.5 627.2 Q 73.4 637.6 73.4 649 Q 73.4 660.5 79.9 667.6 Q 86.2 674.5 96.2 674.5 Q 106.7 674.5 112.6 669.2 Q 118.4 663.8 118.4 654.3 V 606.5 L 137.6 596.5 V 634.7 Q 137.6 640.6 140 643.1 Q 142.4 645.6 148.2 645.6 Z" />
      <path className="areen-letter" data-char="ي" style={{ "--i": 1 } as React.CSSProperties} d="M 206.9 645.6 H 220.5 V 664 H 205 Q 193.9 664 186.7 658.1 Q 179.4 664 168.3 664 H 152.8 V 645.6 H 166.4 Q 172.2 645.6 174.6 643.1 Q 177.1 640.6 177.1 634.7 V 606.5 L 196.2 596.5 V 634.7 Q 196.2 640.6 198.7 643.1 Q 201.1 645.6 206.9 645.6 Z M 167.5 677.8 Q 172.1 677.8 174.7 680.5 Q 177.4 683.2 177.4 687.7 Q 177.4 697.9 167.5 697.9 Q 162.9 697.9 160.2 695.2 Q 157.5 692.4 157.5 687.7 Q 157.5 677.8 167.5 677.8 Z M 190.9 677.8 Q 195.5 677.8 198.1 680.5 Q 200.8 683.2 200.8 687.7 Q 200.8 697.9 190.9 697.9 Q 186.3 697.9 183.6 695.2 Q 180.9 692.4 180.9 687.7 Q 180.9 677.8 190.9 677.8 Z" />
      <path className="areen-letter" data-char="ت" style={{ "--i": 2 } as React.CSSProperties} d="M 222.4 581.2 Q 217.8 581.2 215.1 578.4 Q 212.3 575.7 212.3 571 Q 212.3 561.1 222.4 561.1 Q 226.9 561.1 229.6 563.8 Q 232.3 566.4 232.3 571 Q 232.3 581.2 222.4 581.2 Z M 245.8 581.2 Q 241.2 581.2 238.5 578.4 Q 235.7 575.7 235.7 571 Q 235.7 561.1 245.8 561.1 Q 250.3 561.1 253 563.8 Q 255.7 566.4 255.7 571 Q 255.7 581.2 245.8 581.2 Z M 211.4 664 V 645.6 H 225.1 Q 230.9 645.6 233.3 643.1 Q 235.7 640.6 235.7 634.7 V 606.5 L 254.9 596.5 V 635.6 Q 254.9 649.4 246.4 657.2 Q 238.9 664 226.9 664 Z" />
      <path className="areen-letter" data-char="ا" style={{ "--i": 3 } as React.CSSProperties} d="M 310.2 664 Q 296.4 664 288.8 655.2 Q 282.3 647.6 282.3 635.6 V 576 L 301.4 566 V 634.7 Q 301.4 640.6 303.8 643.1 Q 306.3 645.6 312.1 645.6 H 325.7 V 664 Z" />
      <path className="areen-letter" data-char="س" style={{ "--i": 4 } as React.CSSProperties} d="M 316.6 664 V 645.6 H 332.7 Q 338.5 645.6 341 643.1 Q 343.5 640.6 343.5 634.7 V 614.6 L 362.7 604.6 V 634.7 Q 362.7 640.6 365.1 643.1 Q 367.5 645.6 373.3 645.6 H 383.6 Q 389.4 645.6 391.9 643.1 Q 394.3 640.6 394.3 634.7 V 610.6 L 413.4 600.5 V 634.7 Q 413.4 640.6 415.9 643.1 Q 418.5 645.6 424.2 645.6 H 434.6 Q 440.3 645.6 442.8 643.1 Q 445.2 640.6 445.2 634.7 V 606.5 L 464.4 596.5 V 632.2 Q 464.4 639.5 467.3 642.6 Q 470.3 645.6 477.3 645.6 H 491.3 V 664 H 476.2 Q 463.4 664 455.7 656.7 Q 448.9 663.8 437.3 664 H 422.3 Q 411 664 403.9 657.3 Q 397.3 663.8 386.5 664 H 371.5 Q 360.2 664 353.1 657.3 Q 345.9 664 334.7 664 Z" />
      <path className="areen-letter" data-char="ب" style={{ "--i": 5 } as React.CSSProperties} d="M 536.3 645.6 H 549.9 V 664 H 534.4 Q 523.3 664 516 658.1 Q 508.7 664 497.6 664 H 482.1 V 645.6 H 495.8 Q 501.6 645.6 504 643.1 Q 506.5 640.6 506.5 634.7 V 606.5 L 525.6 596.5 V 634.7 Q 525.6 640.6 528 643.1 Q 530.5 645.6 536.3 645.6 Z M 516.9 677.8 Q 521.5 677.8 524.2 680.5 Q 526.8 683.2 526.8 687.7 Q 526.8 697.9 516.9 697.9 Q 512.4 697.9 509.7 695.2 Q 506.9 692.4 506.9 687.7 Q 506.9 683.3 509.7 680.6 Q 512.4 677.8 516.9 677.8 Z" />
      <path className="areen-letter" data-char="ل" style={{ "--i": 6 } as React.CSSProperties} d="M 540.8 664 V 645.6 H 550.4 Q 557.4 645.6 560.3 642.6 Q 563.3 639.5 563.3 632.2 V 576.1 L 582.3 566 V 632.4 Q 582.3 647.1 573.3 655.9 Q 565.1 664 551.5 664 Z" />
      <path className="areen-letter" data-char="ا" style={{ "--i": 7 } as React.CSSProperties} d="M 609.7 664 V 576.1 L 628.8 566 V 664 Z" />
      <path className="areen-letter" data-char="ن" style={{ "--i": 8 } as React.CSSProperties} d="M 729.1 597.6 Q 724.6 597.6 721.8 594.8 Q 719.1 592.1 719.1 587.4 Q 719.1 583 721.8 580.2 Q 724.6 577.5 729.1 577.5 Q 733.7 577.5 736.4 580.2 Q 739 582.8 739 587.4 Q 739 597.6 729.1 597.6 Z M 782.2 645.6 H 795.9 V 664 H 780.4 Q 775.2 664 770.8 662.6 Q 767.9 677.2 756 685.6 Q 745.4 692.9 730.2 692.9 Q 709.7 692.9 698.4 678.4 Q 689.6 667.2 689.6 652 Q 689.6 640 695.2 631 L 713.5 627.2 Q 707.4 637.6 707.4 649 Q 707.4 660.5 713.9 667.6 Q 720.2 674.5 730.2 674.5 Q 740.7 674.5 746.5 669.2 Q 752.4 663.8 752.4 654.3 V 606.5 L 771.5 596.5 V 634.7 Q 771.5 640.6 774 643.1 Q 776.4 645.6 782.2 645.6 Z" />
      <path className="areen-letter" data-char="ي" style={{ "--i": 9 } as React.CSSProperties} d="M 786.7 664 V 645.6 H 800.4 Q 806.2 645.6 808.6 643.1 Q 811.1 640.6 811.1 634.7 V 606.5 L 830.2 596.5 V 635.6 Q 830.2 649.4 821.7 657.2 Q 814.3 664 802.3 664 Z M 795 697.9 Q 790.4 697.9 787.7 695.2 Q 784.9 692.4 784.9 687.7 Q 784.9 677.8 795 677.8 Q 799.5 677.8 802.2 680.5 Q 804.8 683.2 804.8 687.7 Q 804.8 697.9 795 697.9 Z M 818.4 697.9 Q 813.8 697.9 811.1 695.2 Q 808.3 692.4 808.3 687.7 Q 808.3 677.8 818.4 677.8 Q 822.9 677.8 825.6 680.5 Q 828.2 683.2 828.2 687.7 Q 828.2 697.9 818.4 697.9 Z" />
      <path className="areen-letter" data-char="ر" style={{ "--i": 10 } as React.CSSProperties} d="M 894.8 654.6 Q 894.8 672.2 885.1 683.2 Q 876.1 693.3 861.4 693.3 Q 851.8 693.3 842.7 688.5 V 671.8 Q 850.6 676.2 858.2 676.2 Q 866.5 676.2 871.2 670.8 Q 875.8 665.4 875.8 655.8 V 606.7 L 894.8 596.5 Z" />
      <path className="areen-letter" data-char="أ" style={{ "--i": 11 } as React.CSSProperties} d="M 916.4 557.4 921.3 548.6 H 925.8 Q 924.2 545.6 924.2 542.4 Q 924.2 537.5 927.7 534 Q 931.3 530.5 936.3 530.5 Q 940.9 530.5 944.8 533.7 V 542.6 Q 941.2 539.4 937.5 539.4 Q 932.5 539.4 932.5 543.9 Q 932.5 546.2 934.5 548.6 H 949.5 L 944.7 557.4 Z M 922.2 664 V 576.1 L 941.3 566 V 664 Z" />
  </g>
  <g data-part="wordmark-en" className="areen-gold-text" fill={`url(#${uid}-areen-gold-text)`}>
      <path className="areen-letter" data-char="A" style={{ "--i": 0 } as React.CSSProperties} d="M 40.4 768 56.9 731.6 H 62.1 L 78.6 768 H 73.2 L 58.4 734.5 H 60.5 L 45.8 768 Z M 47.5 758.9 48.9 754.7 H 69.4 L 70.9 758.9 Z" />
      <path className="areen-letter" data-char="R" style={{ "--i": 1 } as React.CSSProperties} d="M 108 768 V 731.6 H 122.2 Q 129.3 731.6 133.3 735 Q 137.4 738.3 137.4 744.3 Q 137.4 748.2 135.6 751.1 Q 133.8 753.9 130.4 755.4 Q 127 756.9 122.2 756.9 H 110.9 L 113.2 754.5 V 768 Z M 132.4 768 123.1 754.8 H 128.7 L 138 768 Z M 113.2 755.1 110.9 752.5 H 122.1 Q 127.1 752.5 129.6 750.3 Q 132.2 748.2 132.2 744.3 Q 132.2 740.4 129.6 738.3 Q 127.1 736.1 122.1 736.1 H 110.9 L 113.2 733.5 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 2 } as React.CSSProperties} d="M 169.8 768 V 731.6 H 195.5 V 736.1 H 175 V 763.5 H 196.2 V 768 Z M 174.6 751.7 V 747.3 H 193.3 V 751.7 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 3 } as React.CSSProperties} d="M 228.7 768 V 731.6 H 254.4 V 736.1 H 233.9 V 763.5 H 255.1 V 768 Z M 233.4 751.7 V 747.3 H 252.1 V 751.7 Z" />
      <path className="areen-letter" data-char="N" style={{ "--i": 4 } as React.CSSProperties} d="M 287.5 768 V 731.6 H 291.8 L 315.8 761.5 H 313.6 V 731.6 H 318.8 V 768 H 314.5 L 290.5 738.1 H 292.7 V 768 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 5 } as React.CSSProperties} d="M 386.2 768 402.7 731.6 H 407.8 L 424.4 768 H 418.9 L 404.2 734.5 H 406.3 L 391.6 768 Z M 393.2 758.9 394.6 754.7 H 415.1 L 416.6 758.9 Z" />
      <path className="areen-letter" data-char="L" style={{ "--i": 6 } as React.CSSProperties} d="M 453.8 768 V 731.6 H 459 V 763.5 H 478.7 V 768 Z" />
      <path className="areen-letter" data-char="B" style={{ "--i": 7 } as React.CSSProperties} d="M 508.7 768 V 731.6 H 525 Q 531.3 731.6 534.7 734.1 Q 538.1 736.6 538.1 741 Q 538.1 744 536.7 746 Q 535.4 748 533.2 749.1 Q 530.9 750.2 528.3 750.2 L 529.3 748.7 Q 532.4 748.7 534.8 749.7 Q 537.2 750.8 538.6 752.9 Q 540 755.1 540 758.2 Q 540 762.9 536.5 765.4 Q 533 768 526 768 Z M 513.9 763.8 H 525.8 Q 530.1 763.8 532.4 762.3 Q 534.7 760.9 534.7 757.8 Q 534.7 754.6 532.4 753.1 Q 530.1 751.7 525.8 751.7 H 513.4 V 747.5 H 524.5 Q 528.5 747.5 530.7 746 Q 532.9 744.5 532.9 741.6 Q 532.9 738.7 530.7 737.3 Q 528.5 735.8 524.5 735.8 H 513.9 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 8 } as React.CSSProperties} d="M 566.4 768 582.9 731.6 H 588.1 L 604.6 768 H 599.1 L 584.4 734.5 H 586.5 L 571.8 768 Z M 573.4 758.9 574.8 754.7 H 595.3 L 596.8 758.9 Z" />
      <path className="areen-letter" data-char="S" style={{ "--i": 9 } as React.CSSProperties} d="M 644.6 768.4 Q 640.4 768.4 636.6 767.1 Q 632.9 765.9 630.7 763.8 L 632.6 759.8 Q 634.7 761.6 637.9 762.8 Q 641.1 764 644.6 764 Q 647.8 764 649.8 763.3 Q 651.7 762.5 652.7 761.3 Q 653.6 760 653.6 758.4 Q 653.6 756.5 652.4 755.4 Q 651.2 754.2 649.2 753.5 Q 647.3 752.8 644.9 752.3 Q 642.6 751.8 640.2 751.1 Q 637.8 750.4 635.9 749.3 Q 633.9 748.2 632.7 746.3 Q 631.6 744.5 631.6 741.6 Q 631.6 738.8 633 736.4 Q 634.5 734 637.6 732.6 Q 640.7 731.2 645.5 731.2 Q 648.7 731.2 651.8 732 Q 654.9 732.8 657.2 734.4 L 655.5 738.6 Q 653.1 737 650.5 736.3 Q 647.9 735.6 645.5 735.6 Q 642.4 735.6 640.4 736.4 Q 638.5 737.2 637.6 738.5 Q 636.6 739.8 636.6 741.4 Q 636.6 743.3 637.9 744.4 Q 639.1 745.6 641 746.3 Q 643 746.9 645.3 747.5 Q 647.7 748 650 748.7 Q 652.4 749.4 654.4 750.5 Q 656.3 751.6 657.5 753.4 Q 658.7 755.2 658.7 758.1 Q 658.7 760.8 657.2 763.2 Q 655.7 765.6 652.5 767 Q 649.4 768.4 644.6 768.4 Z" />
      <path className="areen-letter" data-char="A" style={{ "--i": 10 } as React.CSSProperties} d="M 684.8 768 701.3 731.6 H 706.4 L 722.9 768 H 717.5 L 702.8 734.5 H 704.8 L 690.1 768 Z M 691.8 758.9 693.2 754.7 H 713.7 L 715.2 758.9 Z" />
      <path className="areen-letter" data-char="T" style={{ "--i": 11 } as React.CSSProperties} d="M 757.8 768 V 736.1 H 745.3 V 731.6 H 775.4 V 736.1 H 762.9 V 768 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 12 } as React.CSSProperties} d="M 805.1 768 V 731.6 H 830.7 V 736.1 H 810.3 V 763.5 H 831.5 V 768 Z M 809.8 751.7 V 747.3 H 828.5 V 751.7 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 13 } as React.CSSProperties} d="M 863.9 768 V 731.6 H 889.6 V 736.1 H 869.1 V 763.5 H 890.3 V 768 Z M 868.6 751.7 V 747.3 H 887.3 V 751.7 Z" />
      <path className="areen-letter" data-char="N" style={{ "--i": 14 } as React.CSSProperties} d="M 922.7 768 V 731.6 H 927 L 951.1 761.5 H 948.8 V 731.6 H 954 V 768 H 949.8 L 925.7 738.1 H 927.9 V 768 Z" />
  </g>
  <g data-part="wordmark-hotel" fill={`url(#${uid}-areen-gold-text)`}>
    <rect data-part="rule-left" x="40.5" y="834" width="270.7" height="3" />
    <rect data-part="rule-right" x="688.8" y="834" width="270.7" height="3" />
      <path className="areen-letter" data-char="H" style={{ "--i": 0 } as React.CSSProperties} d="M 377.9 852 V 821.2 H 382.3 V 852 Z M 355.8 852 V 821.2 H 360.2 V 852 Z M 359.7 838.3 V 834.4 H 378.3 V 838.3 Z" />
      <path className="areen-letter" data-char="O" style={{ "--i": 1 } as React.CSSProperties} d="M 441.4 852.4 Q 437.9 852.4 434.9 851.2 Q 431.9 850 429.7 847.8 Q 427.5 845.7 426.2 842.8 Q 425 840 425 836.6 Q 425 833.2 426.2 830.4 Q 427.5 827.5 429.7 825.4 Q 431.9 823.2 434.9 822 Q 437.8 820.8 441.4 820.8 Q 444.9 820.8 447.9 822 Q 450.9 823.2 453.1 825.3 Q 455.3 827.4 456.5 830.3 Q 457.7 833.2 457.7 836.6 Q 457.7 840 456.5 842.9 Q 455.3 845.8 453.1 847.9 Q 450.9 850 447.9 851.2 Q 444.9 852.4 441.4 852.4 Z M 441.4 848.4 Q 444 848.4 446.1 847.6 Q 448.3 846.7 449.9 845.1 Q 451.5 843.5 452.4 841.3 Q 453.3 839.2 453.3 836.6 Q 453.3 834 452.4 831.9 Q 451.5 829.7 449.9 828.1 Q 448.3 826.5 446.1 825.6 Q 444 824.8 441.4 824.8 Q 438.8 824.8 436.6 825.6 Q 434.5 826.5 432.8 828.1 Q 431.2 829.7 430.3 831.9 Q 429.4 834 429.4 836.6 Q 429.4 839.2 430.3 841.3 Q 431.2 843.5 432.8 845.1 Q 434.5 846.7 436.6 847.6 Q 438.8 848.4 441.4 848.4 Z" />
      <path className="areen-letter" data-char="T" style={{ "--i": 2 } as React.CSSProperties} d="M 506.1 852 V 825 H 495.6 V 821.2 H 521.1 V 825 H 510.5 V 852 Z" />
      <path className="areen-letter" data-char="E" style={{ "--i": 3 } as React.CSSProperties} d="M 561.9 852 V 821.2 H 583.6 V 825 H 566.2 V 848.2 H 584.2 V 852 Z M 565.9 838.2 V 834.5 H 581.7 V 838.2 Z" />
      <path className="areen-letter" data-char="L" style={{ "--i": 4 } as React.CSSProperties} d="M 627.3 852 V 821.2 H 631.7 V 848.2 H 648.4 V 852 Z" />
  </g>

    </svg>
  );
}
