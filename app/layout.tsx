import type { Metadata } from "next";
import { Montserrat, Tajawal } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Areen Albasateen Hotel · Jeddah",
  description: "More than a stay. Areen Albasateen Hotel in Al Basateen, Jeddah.",
  icons: { icon: "/brand/logo-mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${tajawal.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
