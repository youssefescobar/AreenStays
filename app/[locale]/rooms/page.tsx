import { resolve, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { getRooms } from "@/lib/rooms";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/page-hero";
import { RoomCard } from "@/components/room-card";
import { FloorGuide } from "@/components/floor-guide";
import { Reveal } from "@/components/reveal";

const p = pages.rooms;

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/rooms", p.title[locale], p.intro[locale]);
}

export default async function RoomsPage({ params }: LocaleParams) {
  const { locale, t } = await resolve(params);
  const floors = p.floors;
  const rooms = await getRooms();

  return (
    <>
      <PageHero eyebrow={p.eyebrow[locale]} title={p.title[locale]} intro={p.intro[locale]} image={p.image} />
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} delay={(i % 3) * 120}>
              <RoomCard room={room} locale={locale} t={t} />
            </Reveal>
          ))}
        </div>
      </section>
      <FloorGuide
        locale={locale}
        rooms={rooms}
        copy={{
          eyebrow: floors.eyebrow[locale],
          title: floors.title[locale],
          intro: floors.intro[locale],
        }}
      />
    </>
  );
}
