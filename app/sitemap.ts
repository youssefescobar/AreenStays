import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { hotel } from "@/content/site";
import { getRooms } from "@/lib/rooms";

const pages = ["", "/rooms", "/dining", "/offers", "/gallery", "/location", "/umrah", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [...pages, ...(await getRooms()).map((r) => `/rooms/${r.slug}`)];
  return paths.map((path) => ({
    url: `${hotel.domain}/ar${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${hotel.domain}/${l}${path}`])) },
  }));
}
