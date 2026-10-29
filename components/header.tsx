"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const nav = [
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Offers", href: "#offers" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "bg-navy-deep/95 shadow-lg backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="Areen Albasateen Hotel, home" className="shrink-0">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Areen Albasateen Hotel"
            width={552}
            height={156}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#" lang="ar" className="hidden font-arabic text-sm text-white/80 hover:text-gold sm:inline">
            عربي
          </a>
          <Button className="h-10 px-5">Book</Button>
          <button
            className="p-2 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-6 lg:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm uppercase tracking-[0.2em] text-white/85"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
