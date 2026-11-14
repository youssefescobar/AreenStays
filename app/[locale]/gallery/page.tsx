import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { getSiteMedia, photo, photoList } from "@/lib/media";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";

const p = pages.gallery;
// Masonry-like rhythm: every 4th tile is tall
const shape = (i: number) => (i % 4 === 0 ? "aspect-[3/4]" : "aspect-[4/3]");

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/gallery", p.title[locale], p.intro[locale]);
}

export default async function GalleryPage({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  const media = await getSiteMedia();
  const items = photoList(media, "gallery.items", p.items.map(({ image, en, ar }) => ({ url: image ?? "", caption: { en, ar } })));
  return (
    <>
      <PageHero eyebrow={p.eyebrow[locale]} title={p.title[locale]} intro={p.intro[locale]} image={photo(media, "gallery.hero", p.image)} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal key={`${item.url}-${i}`} delay={(i % 3) * 100} className="mb-4 break-inside-avoid">
              <Photo src={item.url} label={item.caption[locale] || item.caption.en || p.title[locale]} className={shape(i)} sizes="(min-width: 1024px) 33vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
