import type { Metadata } from "next";
import { PageShell, Section } from "../components/page-shell";
import { jobs } from "../lib/content";

export const metadata: Metadata = {
  title: "ICT Jobs",
  description: "ICT vacancies shared across the Greater SouthEast zone.",
};

export default function JobsPage() {
  return (
    <PageShell
      eyebrow="ICT Jobs"
      title="Vacancies from the zone"
      intro="Roles shared by chapter partners and members. Apply directly with the organisation."
      image={{ src: "/images/call-for-papers.jpg" }}
    >
      <Section tone="light">
        <ul className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => (
            <li
              key={job.title}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight">
                {job.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-brand">{job.org}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-line px-2.5 py-1">
                  {job.location}
                </span>
                <span className="rounded-full border border-line px-2.5 py-1">
                  {job.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
