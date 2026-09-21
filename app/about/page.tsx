import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageShell } from "../components/page-shell";
import { chapters, focusAreas } from "../lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who the Greater SouthEast zone of the Nigeria Computer Society is, and what it works on.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Unlocking the full potential of the SouthEast"
      intro="The Greater SouthEast zone of the Nigeria Computer Society is where professionals connect, chapters coordinate and the region's ICT agenda gets set — across Abia, Anambra, Ebonyi, Enugu and Imo."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <blockquote className="text-lg leading-8">
            &ldquo;The future will not be given to us — we will build it
            together.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-medium">
            Chidiebere Ugwuegbulam
            <span className="block text-muted">Zonal Coordinator</span>
          </p>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">The zone at a glance</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Chapters</dt>
              <dd className="font-medium">{chapters.length}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Membership target</dt>
              <dd className="font-medium">+500 by July 2026</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Elders Forum</dt>
              <dd className="font-medium">Inaugurated</dd>
            </div>
          </dl>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Focus areas</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm"
            >
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Partners and collaborators
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "IEEE Nigeria SouthEast Sub Section",
            "Zinox Computers",
            "OGSL Group",
            "CBTng.Com",
          ].map((partner) => (
            <li
              key={partner}
              className="rounded-xl border border-line px-4 py-5 text-sm font-medium"
            >
              {partner}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/team"
          className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Meet the zonal working committee
        </Link>
        <Link
          href="/chapters"
          className="rounded-lg border border-line px-5 py-3 text-sm font-medium hover:bg-surface"
        >
          Browse chapters
        </Link>
      </div>
    </PageShell>
  );
}
