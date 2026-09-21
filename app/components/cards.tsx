import Link from "next/link";
import type { EventItem } from "../lib/content";
import { CtaLink } from "./page-shell";

const cardBase =
  "group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5";

export function StatusPill({ status }: { status: EventItem["status"] }) {
  const concluded = status === "Concluded";
  return (
    <span
      className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
        concluded ? "bg-line text-muted" : "bg-brand-soft text-brand"
      }`}
    >
      {status}
    </span>
  );
}

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className={cardBase}>
      <StatusPill status={event.status} />

      <h3 className="mt-4 text-xl font-semibold tracking-tight">
        <Link
          href={`/events/${event.slug}`}
          className="transition-colors group-hover:text-brand"
        >
          {event.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm font-medium text-muted">
        {event.date} · {event.location}
      </p>
      <p className="mt-3 flex-1 text-[15px] leading-7 text-muted">
        {event.blurb}
      </p>

      <div className="relative z-10 mt-6 flex flex-wrap gap-3">
        {event.status !== "Concluded" ? (
          <CtaLink href={`/register?event=${event.slug}`}>Register</CtaLink>
        ) : null}
        <CtaLink href={`/events/${event.slug}`} variant="secondary">
          Details
        </CtaLink>
      </div>
    </article>
  );
}

export function ChapterCard({
  chapter,
}: {
  chapter: { slug: string; name: string; base: string; lead: string; role: string };
}) {
  return (
    <Link href={`/chapters/${chapter.slug}`} className={`${cardBase} block`}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
        {chapter.base}
      </span>
      <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">
        {chapter.name.replace(" State Chapter", "")}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-6">
        {chapter.lead}
        <span className="block text-muted">{chapter.role}</span>
      </p>
      <span
        aria-hidden
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
      >
        Chapter page
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
          <path
            d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export function NewsCard({
  item,
}: {
  item: { slug: string; title: string; date: string; excerpt: string };
}) {
  return (
    <article className="flex flex-col gap-2 border-t border-line pt-5">
      <time
        dateTime={item.date}
        className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
      >
        {new Date(item.date).toLocaleDateString("en-NG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h3 className="text-lg font-semibold tracking-tight text-balance">
        {item.title}
      </h3>
      <p className="text-[15px] leading-7 text-muted">{item.excerpt}</p>
    </article>
  );
}
