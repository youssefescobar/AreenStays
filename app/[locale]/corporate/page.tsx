import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { pages } from "@/content/pages";
import { FeaturePage } from "@/components/feature-page";

const p = pages.corporate;

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/corporate", p.title[locale], p.intro[locale]);
}

export default async function CorporatePage({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return <FeaturePage locale={locale} page={p} cta={p.cta[locale]} />;
}
