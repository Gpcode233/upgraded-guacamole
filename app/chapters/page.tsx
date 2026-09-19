import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/page-shell";
import { chapters } from "../lib/content";

export const metadata: Metadata = {
  title: "Chapters",
  description:
    "The five state chapters of the Greater SouthEast zone: Abia, Anambra, Ebonyi, Enugu and Imo.",
};

export default function ChaptersPage() {
  return (
    <PageShell
      eyebrow="Chapters"
      title="Five states, one zone"
      intro="Each state chapter runs its own meetings, student branches and outreach under the zonal umbrella."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link
              href={`/chapters/${chapter.slug}`}
              className="flex h-full flex-col rounded-xl border border-line p-6 transition-colors hover:bg-surface"
            >
              <h2 className="text-lg font-semibold tracking-tight">
                {chapter.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{chapter.base}</p>
              <p className="mt-4 text-sm">
                {chapter.lead}
                <span className="block text-muted">{chapter.role}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
