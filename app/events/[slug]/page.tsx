import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../../components/page-shell";
import { events } from "../../lib/content";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata(
  props: PageProps<"/events/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const event = events.find((item) => item.slug === slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.blurb };
}

export default async function EventPage(props: PageProps<"/events/[slug]">) {
  const { slug } = await props.params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();

  return (
    <PageShell
      eyebrow={`${event.date} · ${event.location}`}
      title={event.title}
      intro={event.blurb}
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
            What to expect
          </h2>
          <ul className="mt-4 space-y-3">
            {event.details.map((detail) => (
              <li
                key={detail}
                className="flex gap-3 border-b border-line pb-3 text-sm leading-6 last:border-0"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-xl border border-line bg-surface p-6">
          <p className="text-sm font-semibold">{event.status}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {event.status === "Concluded"
              ? "This event has already held. A recap is in the news feed."
              : "Places are confirmed by email after registration."}
          </p>
          {event.status !== "Concluded" ? (
            <Link
              href={`/register?event=${event.slug}`}
              className="mt-5 block rounded-lg bg-brand px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              Register for this event
            </Link>
          ) : (
            <Link
              href="/news"
              className="mt-5 block rounded-lg border border-line px-4 py-3 text-center text-sm font-medium hover:bg-background"
            >
              Read the recap
            </Link>
          )}
          <Link
            href="/events"
            className="mt-3 block text-center text-sm text-muted hover:text-foreground"
          >
            All events
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}
