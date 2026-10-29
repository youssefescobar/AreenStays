import type { Metadata } from "next";
import { hotel } from "@/content/site";
import { locales, type Locale } from "./i18n";

/** Per-page metadata with canonical + hreflang alternates for /ar and /en. */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const url = `${hotel.domain}/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l === "ar" ? "ar-SA" : "en", `${hotel.domain}/${l}${path}`])),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: hotel.name[locale],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

/** schema.org Hotel data for Google */
export function hotelJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name[locale],
    url: `${hotel.domain}/${locale}`,
    logo: `${hotel.domain}/brand/areen-logo.svg`,
    image: `${hotel.domain}/og.png`,
    telephone: hotel.phone,
    email: hotel.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.address[locale],
      addressLocality: locale === "ar" ? "جدة" : "Jeddah",
      addressCountry: "SA",
    },
    geo: { "@type": "GeoCoordinates", latitude: hotel.geo.lat, longitude: hotel.geo.lng },
    checkinTime: hotel.checkIn,
    checkoutTime: hotel.checkOut,
    starRating: { "@type": "Rating", ratingValue: hotel.stars },
    priceRange: "SAR 450 – 1800",
    sameAs: Object.values(hotel.social),
  };
}
