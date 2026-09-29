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
    <>
      <SectionHeading eyebrow={day.day} title={day.heading} />
      <ul className="mt-8">
        {day.entries.map((entry, index) => (
          <Entry key={index} entry={entry} />
        ))}
      </ul>
    </>
  );
}

export default function SchedulePage() {
  const [day1, day2, day3] = schedule;

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
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {schedule.map((day) => (
            <li key={day.id}>
              <a
                href={`#${day.id}`}
                className="block h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {day.day}
                </p>
                <p className="mt-2 text-lg font-semibold">{day.heading}</p>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark" id={day1.id}>
        <div className="border-t border-line pt-14">
          <Day day={day1} />
        </div>
      </Section>

      <Section tone="green" id={day2.id}>
        <Day day={day2} />
      </Section>

      <Section tone="light" id={day3.id}>
        <Day day={day3} />
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
