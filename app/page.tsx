import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { BookingBar } from "@/components/booking-bar";
import { Intro } from "@/components/intro";
import { Rooms } from "@/components/rooms";
import { Dining } from "@/components/dining";
import { Offers } from "@/components/offers";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BookingBar />
        <Intro />
        <Rooms />
        <Dining />
        <Offers />
      </main>
      <Footer />
    </>
  );
}
