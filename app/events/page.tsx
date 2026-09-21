import type { Metadata } from "next";
import { EventCard } from "../components/cards";
import { CtaLink, PageShell } from "../components/page-shell";
import { events } from "../lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Assemblies, conferences and summits run by the SouthEast zone of the Nigeria Computer Society.",
};

export default function EventsPage() {
  const upcoming = events.filter((event) => event.status !== "Concluded");
  const past = events.filter((event) => event.status === "Concluded");

  return (
    <PageShell
      eyebrow="Events"
      title="Events and"
      titleAccent="assemblies"
      intro="Every zonal and national date on the calendar. Registration runs through one form."
      image={{
        src: "/images/icc-awka-venue.jpg",
        alt: "The International Conference Centre, Awka",
      }}
      actions={<CtaLink href="/register">Register for an event</CtaLink>}
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
        Coming up
      </h2>
      <ul className="mt-5 grid gap-5 md:grid-cols-2">
        {upcoming.map((event) => (
          <li key={event.slug}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>

      {past.length ? (
        <section className="mt-14 border-t border-line pt-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Already held
          </h2>
          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            {past.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}
