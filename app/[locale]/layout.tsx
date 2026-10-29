import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Montserrat, Tajawal } from "next/font/google";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { dict, hotel } from "@/content/site";
import { hotelJsonLd } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBookBar } from "@/components/mobile-book-bar";
import { SmoothScroll } from "@/components/smooth-scroll";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: "#071E33" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(hotel.domain),
    title: { default: `${hotel.name[locale]} · ${locale === "ar" ? "جدة" : "Jeddah"}`, template: `%s · ${hotel.name[locale]}` },
    description: dict[locale].home.welcomeBody,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dict[locale];

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${montserrat.variable} ${tajawal.variable}`}>
      <body className={locale === "ar" ? "font-arabic antialiased" : "font-sans antialiased"}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd(locale)) }} />
        <SmoothScroll />
        <Header locale={locale} t={t} />
        <main>{children}</main>
        <Footer locale={locale} t={t} />
        <MobileBookBar locale={locale} t={t} />
      </body>
    </html>
  );
}
