import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { hotel } from "@/content/site";
import { rooms } from "@/content/rooms";

const paths = ["", "/rooms", "/dining", "/offers", "/gallery", "/location", "/umrah", "/corporate", ...rooms.map((r) => `/rooms/${r.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${hotel.domain}/ar${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${hotel.domain}/${l}${path}`])) },
  }));
}
