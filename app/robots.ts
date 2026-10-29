import type { MetadataRoute } from "next";
import { hotel } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/ar/brand", "/en/brand"] },
    sitemap: `${hotel.domain}/sitemap.xml`,
  };
}
