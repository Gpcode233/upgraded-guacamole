import { Carousel } from "./components/carousel";
import { slides } from "./lib/content";

export default function Home() {
  return (
    <section
      aria-label="Upcoming events and announcements"
      className="-mb-20 h-[100dvh] w-full"
    >
      <Carousel slides={slides} fullBleed />
    </section>
  );
}
