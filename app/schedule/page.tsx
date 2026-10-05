import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  Section,
  SectionHeading,
  buttonStyles,
} from "../components/page-shell";
import {
  schedule,
  scheduleNote,
  type ScheduleDay,
  type ScheduleEntry,
} from "../lib/programme";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The three-day programme of the NCS SouthEast Innovation Summit & Awards, Awka: opening ceremony, panels, symposia, fire chats, research sessions, AGM and award night.",
};

function Entry({ entry }: { entry: ScheduleEntry }) {
  if (entry.kind === "break") {
    return (
      <li className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-6">
        <span className="text-sm font-semibold tabular-nums text-brand">
          {entry.time}
        </span>
        <p className="text-sm font-medium italic text-muted">{entry.title}</p>
      </li>
    );
  }

  return (
    <li className="grid gap-1 border-t border-line py-5 first:border-t-0 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <span className="text-sm font-semibold tabular-nums text-brand">
        {entry.time}
      </span>
      <div>
        <h3 className="text-base font-semibold leading-snug">
          {entry.title}
          {entry.duration ? (
            <span className="ml-2 inline-block rounded-full border border-line px-2 py-0.5 align-middle font-sans text-[11px] font-medium text-muted">
              {entry.duration}
            </span>
          ) : null}
        </h3>
        {entry.people?.map((person) => (
          <p key={person} className="mt-1 text-sm text-muted">
            {person}
          </p>
        ))}
        {entry.sub ? (
          <ul className="mt-3 space-y-2.5 border-l-2 border-brand pl-4">
            {entry.sub.map((item, index) => (
              <li key={index} className="text-sm leading-6">
                {item.title ? (
                  <span className="font-medium">{item.title}</span>
                ) : null}
                {item.title && item.person ? (
                  <span className="text-muted"> — {item.person}</span>
                ) : (
                  <span className="text-muted">{item.person}</span>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

function Day({ day }: { day: ScheduleDay }) {
  return (
    <details
      id={day.id}
      name="schedule"
      className="schedule-accordion border-b border-line"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6">
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            {day.day}
          </span>
          <span className="mt-2 block text-xl font-semibold leading-snug sm:text-2xl">
            {day.heading}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
          <span className="schedule-read-more">Read more</span>
          <span className="schedule-read-less">Show less</span>
          <span aria-hidden="true" className="schedule-chevron text-lg">⌄</span>
        </span>
      </summary>
      <ul className="pb-6">
        {day.entries.map((entry, index) => (
          <Entry key={index} entry={entry} />
        ))}
      </ul>
    </details>
  );
}

export default function SchedulePage() {
  return (
    <PageShell
      eyebrow="Programme"
      title="Summit schedule"
      intro="Three days of keynotes, panels, symposia, research sessions and the Leadership & Innovation Awards in Awka."
      image={{ src: "/images/icc-awka-venue.jpg" }}
    >
      <Section tone="dark">
        <SectionHeading
          eyebrow="At a glance"
          title="Three days, one programme"
          intro={scheduleNote}
        />
        <div className="mt-8 border-t border-line">
          {schedule.map((day) => (
            <Day key={day.id} day={day} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-10">
          <Link href="/register" className={buttonStyles.green}>
            Register for the Summit
          </Link>
          <Link href="/hackathon" className={buttonStyles.outlineDark}>
            Join the Hackathon
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
