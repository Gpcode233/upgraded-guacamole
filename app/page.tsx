import Link from "next/link";
import { Carousel } from "./components/carousel";
import { ChapterCard, EventCard, NewsCard } from "./components/cards";
import { CtaLink, SectionHeader } from "./components/page-shell";
import { chapters, events, focusAreas, news, slides } from "./lib/content";

export default function Home() {
  const upcoming = events.filter((event) => event.status !== "Concluded");
  const latest = news.slice(0, 3);

  return (
    <>
      {/* Short of full height on purpose: the next section peeks above the
          fold so the page reads as scrollable. */}
      <section
        aria-label="Upcoming events and announcements"
        className="h-[88dvh] min-h-[560px] w-full"
      >
        <Carousel slides={slides} fullBleed />
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="What's next"
            title="On the zonal"
            titleAccent="calendar"
            action={
              <Link
                href="/events"
                className="text-sm font-semibold text-brand hover:underline"
              >
                All events →
              </Link>
            }
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {upcoming.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line py-16 sm:py-20">
          <SectionHeader
            eyebrow="Chapters"
            title="Five states,"
            titleAccent="one zone"
            action={
              <Link
                href="/chapters"
                className="text-sm font-semibold text-brand hover:underline"
              >
                All chapters →
              </Link>
            }
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => (
              <li key={chapter.slug}>
                <ChapterCard chapter={chapter} />
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeader eyebrow="News" title="Latest from the zone" />
              <div className="mt-6 space-y-6">
                {latest.map((item) => (
                  <NewsCard key={item.slug} item={item} />
                ))}
              </div>
              <Link
                href="/news"
                className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
              >
                All announcements →
              </Link>
            </div>

            <div>
              <SectionHeader eyebrow="Agenda" title="What the zone works on" />
              <ul className="mt-6 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-brand-soft px-3.5 py-1.5 text-sm font-medium text-brand"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-7 text-muted">
                Set with the Zonal Elders Forum and reviewed with IEEE Nigeria
                SouthEast Sub Section — it shapes the summit tracks, chapter
                programmes and what the zone takes to state ICT ministries.
              </p>
              <CtaLink href="/about" variant="secondary" className="mt-6">
                How the zone works
              </CtaLink>
            </div>
          </div>
        </section>
      </div>

      <section className="relative isolate overflow-hidden bg-brand text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#a5d014]/25 via-transparent to-black/25"
        />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-24">
          <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ring-1 ring-white/25 backdrop-blur-sm">
            Membership
          </span>
          <h2 className="max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-5xl">
            500 new members by
            <span className="font-script ml-2 text-accent">July 2026</span>
          </h2>
          <p className="max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Student, professional and corporate grades are open across all five
            chapters. Join the zone shaping ICT policy and practice in the
            SouthEast.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <CtaLink href="/join">Join NCS</CtaLink>
            <CtaLink href="/contact" variant="onPhoto">
              Talk to the secretariat
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
