import type { Metadata } from "next";
import { ChapterCard } from "../components/cards";
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
      title="Five states,"
      titleAccent="one zone"
      intro="Each state chapter runs its own meetings, student branches and outreach under the zonal umbrella."
      image={{
        src: "/images/zonal-assembly.jpg",
        alt: "Delegates at a Greater SouthEast zonal assembly",
      }}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <li key={chapter.slug}>
            <ChapterCard chapter={chapter} />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
