import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  Section,
  SectionHeading,
  buttonStyles,
} from "../components/page-shell";
import { events } from "../lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Assemblies, conferences and summits run by the SouthEast zone of the Nigeria Computer Society.",
};

export default function EventsPage() {
  return (
    <PageShell
      eyebrow="Events"
      title="Events and assemblies"
      intro="Every zonal and national date on the calendar. Registration runs through one form."
      image={{ src: "/images/stock-speaker-stage.jpg" }}
    >
      <Section tone="dark">
        <ul className="grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <li
              key={event.slug}
              className="flex flex-col rounded-xl border border-line bg-surface p-6"
            >
              <span
                className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                  event.status === "Concluded"
                    ? "bg-line text-muted"
                    : "bg-brand-soft text-brand"
                }`}
              >
                {event.status}
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                <Link
                  href={`/events/${event.slug}`}
                  className="hover:text-brand"
                >
                  {event.title}
                </Link>
              </h2>
              <p className="mt-1.5 text-sm font-medium text-muted">
                {event.date} · {event.location}
              </p>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                {event.blurb}
              </p>
              <div className="mt-5 flex gap-3">
                {event.status !== "Concluded" ? (
                  <Link
                    href={`/register?event=${event.slug}`}
                    className={buttonStyles.green}
                  >
                    Register
                  </Link>
                ) : null}
                <Link
                  href={`/events/${event.slug}`}
                  className={buttonStyles.outlineLight}
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeading
          eyebrow="Summit 2026"
          title="Plan your Summit"
          intro="See the full three-day programme or take part in the Innovation Hackathon."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/schedule" className={buttonStyles.green}>
            View the schedule
          </Link>
          <Link href="/hackathon" className={buttonStyles.outlineDark}>
            Join the Hackathon
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
