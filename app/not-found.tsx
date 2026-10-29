import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy-deep font-sans text-white">
        <p className="text-6xl font-light text-gold">404</p>
        <Link href="/" className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-gold">
          Areen Albasateen Hotel
        </Link>
      </body>
    </html>
  );
}
