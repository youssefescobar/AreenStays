import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { getSiteMedia, photo } from "@/lib/media";
import { pages } from "@/content/pages";
import { FeaturePage } from "@/components/feature-page";

const p = pages.umrah;

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/umrah", p.title[locale], p.intro[locale]);
}

export default async function UmrahPage({ params }: LocaleParams) {
  const { locale, t } = await resolve(params);
  const media = await getSiteMedia();
  const page = {
    ...p,
    image: photo(media, "umrah.hero", p.image),
    features: p.features.map((f, i) => ({ ...f, image: photo(media, `umrah.photo${i + 1}`, f.image) })),
  };
  return <FeaturePage locale={locale} page={page} cta={t.bookNow} />;
}
