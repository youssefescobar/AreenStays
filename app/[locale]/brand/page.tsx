import type { Metadata } from "next";
import { Check, Download, X } from "lucide-react";
import { resolve, type LocaleParams } from "@/lib/page";
import { LogoShowcase } from "@/components/logo-showcase";

export const metadata: Metadata = { title: "Brand", robots: { index: false } };

const colors = [
  { name: "Royal Navy", ar: "كحلي ملكي", hex: "#0B2D4A", token: "navy", dark: true },
  { name: "Deep Navy", ar: "كحلي داكن", hex: "#071E33", token: "navy-deep", dark: true },
  { name: "Crystal Blue", ar: "أزرق كريستالي", hex: "#5B8FB7", token: "crystal", dark: true },
  { name: "Light Blue", ar: "أزرق فاتح", hex: "#A7C6E0", token: "sky" },
  { name: "Luxury Gold", ar: "ذهبي فاخر", hex: "#D4AF37", token: "gold" },
  { name: "Premium Beige", ar: "بيج فاخر", hex: "#E8DCC6", token: "beige" },
  { name: "Sand", ar: "رملي", hex: "#F6F1E8", token: "sand" },
  { name: "Dark Gray", ar: "رمادي داكن", hex: "#1A1A1A", token: "ink", dark: true },
];

const downloads = [
  { label: "Logo, stacked (SVG)", file: "/brand/areen-logo.svg" },
  { label: "Logo, horizontal (SVG)", file: "/brand/areen-logo-horizontal.svg" },
  { label: "Mark (SVG)", file: "/brand/areen-mark.svg" },
  { label: "Logo, stacked (PNG 2000px)", file: "/brand/export/areen-logo.png" },
  { label: "Logo, horizontal (PNG 2000px)", file: "/brand/export/areen-logo-horizontal.png" },
  { label: "Mark (PNG 1024px)", file: "/brand/export/areen-mark.png" },
  { label: "Logo, white (SVG)", file: "/brand/export/areen-logo-white.svg" },
  { label: "Logo, gold (SVG)", file: "/brand/export/areen-logo-gold.svg" },
  { label: "Logo, white (PNG)", file: "/brand/export/areen-logo-white.png" },
  { label: "Logo, gold (PNG)", file: "/brand/export/areen-logo-gold.png" },
  { label: "Social avatar (PNG 1080px)", file: "/brand/export/areen-avatar.png" },
  { label: "Share image (PNG 1200×630)", file: "/og.png" },
];

const dos = [
  "Use the full-colour logo on navy or sand backgrounds",
  "Use the white or gold logo on photos and busy backgrounds",
  "Keep clear space around the logo of at least the height of the star",
  "Use the horizontal logo in headers, the stacked logo for hero moments",
];
const donts = [
  "Stretch, rotate or recolour parts of the mark",
  "Place the full-colour logo on mid-blue or busy backgrounds",
  "Add shadows, outlines or effects beyond the built-in ones",
  "Set the wordmark in another font",
];

export default async function BrandPage({ params }: LocaleParams) {
  await resolve(params);
  return (
    <div lang="en" dir="ltr" className="font-sans">
      <section className="bg-navy-deep px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-gold">Brand guide</p>
          <h1 className="mt-4 text-4xl font-light text-white sm:text-5xl">Areen Albasateen identity</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Logo, colours and type for anyone designing for Areen. Every value here is also a Tailwind token in the site code.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-20">
          <div>
            <h2 className="text-2xl font-light text-navy">Logo</h2>
            <p className="mt-2 mb-8 text-sm text-ink/60">
              Drawn in code: every crystal, gold leaf, the star and each letter is its own part, so it can be animated.
            </p>
            <LogoShowcase />
          </div>

          <div>
            <h2 className="text-2xl font-light text-navy">Colours</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {colors.map((c) => (
                <div key={c.hex} className="border border-beige bg-white">
                  <div className="h-24" style={{ background: c.hex }} />
                  <div className="p-4 text-sm">
                    <p className="text-navy">{c.name}</p>
                    <p lang="ar" className="font-arabic text-ink/50">{c.ar}</p>
                    <p className="mt-2 font-mono text-xs text-ink/60">{c.hex}</p>
                    <p className="font-mono text-xs text-crystal">bg-{c.token}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light text-navy">Typography</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="border border-beige bg-white p-8">
                <p className="eyebrow text-crystal">English · Montserrat</p>
                <p className="mt-4 text-4xl font-light text-navy">More than a stay</p>
                <p className="mt-2 text-sm text-ink/60">Light for headings, Medium for labels with wide tracking.</p>
              </div>
              <div className="border border-beige bg-white p-8">
                <p className="eyebrow text-crystal">Arabic · Tajawal</p>
                <p lang="ar" dir="rtl" className="mt-4 font-arabic text-4xl font-light text-navy">إقامة .. بتجربة تتجاوز التوقعات</p>
                <p className="mt-2 text-sm text-ink/60">Never letter-spaced; the site resets tracking for Arabic automatically.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-light text-navy">Do</h2>
              <ul className="mt-6 space-y-3 text-sm text-ink/75">
                {dos.map((d) => (
                  <li key={d} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-gold" />{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-light text-navy">Don&apos;t</h2>
              <ul className="mt-6 space-y-3 text-sm text-ink/75">
                {donts.map((d) => (
                  <li key={d} className="flex gap-3"><X size={16} className="mt-0.5 shrink-0 text-red-700" />{d}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light text-navy">Downloads</h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {downloads.map((d) => (
                <li key={d.file}>
                  <a href={d.file} download className="flex items-center gap-3 border border-beige bg-white px-4 py-3 text-sm text-navy hover:border-gold">
                    <Download size={16} className="text-gold" /> {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
