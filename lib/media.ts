import { API_URL } from "./rooms";

export type GalleryItem = { url: string; caption: { en: string; ar: string } };

/**
 * The owner's photo choices from the admin (Site images page), keyed by slot, e.g. "home.hero".
 * Only slots they changed are present; everything else keeps the default from content/.
 * `url: null` means they removed the photo, so the branded placeholder shows.
 */
export type SiteMedia = Record<string, { url?: string | null; items?: GalleryItem[] }>;

/**
 * Re-checked every 60 s. Throws on failure so a bad refresh keeps the last good page.
 * A 404 (a backend without Site images yet) just means "all defaults".
 */
export async function getSiteMedia(): Promise<SiteMedia> {
  const res = await fetch(`${API_URL}/api/site-media`, { next: { revalidate: 60 } });
  if (res.status === 404) return {};
  if (!res.ok) throw new Error(`Site media API returned ${res.status}`);
  return ((await res.json()) as { media: SiteMedia }).media ?? {};
}

/** Photo for a single slot: the owner's choice, else the built-in default. */
export function photo(media: SiteMedia, key: string, fallback?: string): string | undefined {
  const m = media[key];
  return m && "url" in m ? (m.url ?? undefined) : fallback;
}

/** Photos for a list slot (the gallery). */
export function photoList(media: SiteMedia, key: string, fallback: GalleryItem[]): GalleryItem[] {
  return media[key]?.items ?? fallback;
}
