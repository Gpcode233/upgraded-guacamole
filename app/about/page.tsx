import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageShell } from "../components/page-shell";
import { objectives, pillars, summitDetails } from "../lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The NCS SouthEast Innovation Summit & Awards — a high-impact regional platform for technology, research, innovation and economic development.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About the Summit"
      title={summitDetails.event}
      intro="A high-impact regional platform for technology, research, innovation and economic development, designed to strengthen the SouthEast's contribution to Nigeria's and the global digital economy."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-sm font-semibold">Background</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            The Summit will bring together government, academia, industry,
            researchers, technology professionals, innovators, entrepreneurs,
            investors and young people to examine how technology and
            Artificial Intelligence can accelerate sustainable development
            across the region. Rather than serving as a conventional
            conference, the Summit is designed around practical outcomes,
            collaboration and long-term impact — connecting research,
            innovation, enterprise and economic development.
          </p>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Event details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Date</dt>
              <dd className="font-medium text-right">{summitDetails.date}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Venue</dt>
              <dd className="font-medium text-right">
                {summitDetails.venue}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Organizer</dt>
              <dd className="font-medium text-right">
                {summitDetails.organizer}
              </dd>
            </div>
          </dl>
          <p className="mt-5 border-t border-line pt-4 text-sm font-medium">
            {summitDetails.theme}
          </p>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          The Summit seeks to
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {objectives.map((objective) => (
            <li
              key={objective}
              className="rounded-xl border border-line px-4 py-5 text-sm leading-6"
            >
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Strategic pillars
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Unlike a conventional conference, the Summit is driven by practical
          outcomes, bold ideas and lasting impact, built around four major
          pillars.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <Card key={pillar.name}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
                Pillar {pillar.numeral}
              </p>
              <h3 className="mt-1 font-semibold">{pillar.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {pillar.detail}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/register"
          className="rounded-lg bg-brand-deep px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Register for the Summit
        </Link>
        <Link
          href="/sponsorship"
          className="rounded-lg border border-line px-5 py-3 text-sm font-medium hover:bg-surface"
        >
          Become a partner
        </Link>
      </div>
    </PageShell>
  );
}
