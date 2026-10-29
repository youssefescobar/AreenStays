import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { pages } from "@/content/pages";
import { FeaturePage } from "@/components/feature-page";

const p = pages.umrah;

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/umrah", p.title[locale], p.intro[locale]);
}

export default async function UmrahPage({ params }: LocaleParams) {
  const { locale, t } = await resolve(params);
  return <FeaturePage locale={locale} page={p} cta={t.bookNow} />;
}
