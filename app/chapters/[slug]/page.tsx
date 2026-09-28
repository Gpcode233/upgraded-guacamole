import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../../components/page-shell";
import { chapters, contact } from "../../lib/content";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata(
  props: PageProps<"/chapters/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const chapter = chapters.find((item) => item.slug === slug);
  if (!chapter) return { title: "Chapter not found" };
  return {
    title: chapter.name,
    description: `${chapter.name} of the Nigeria Computer Society, based in ${chapter.base}.`,
  };
}

export default async function ChapterPage(
  props: PageProps<"/chapters/[slug]">,
) {
  const { slug } = await props.params;
  const chapter = chapters.find((item) => item.slug === slug);
  if (!chapter) notFound();

  return (
    <PageShell
      eyebrow="Chapter"
      title={chapter.name}
      intro={`Based in ${chapter.base}, serving members and student branches across the state.`}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
            Chapter leadership
          </h2>
          <p className="mt-4 text-lg font-semibold">{chapter.lead}</p>
          <p className="text-sm text-brand">{chapter.role}</p>
          <p className="mt-5 text-sm leading-6 text-muted">
            Chapter meetings, student branch activities and professional
            development sessions are announced on the home page carousel and in
            the news feed.
          </p>
        </div>

        <aside className="h-fit rounded-xl border border-line p-6">
          <h2 className="text-sm font-semibold">Get involved</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-brand-deep px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              Join this chapter
            </Link>
            <Link
              href="/register"
              className="rounded-lg border border-line px-4 py-2.5 text-center text-sm font-medium hover:bg-surface"
            >
              Register for an event
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="text-center text-sm text-muted hover:text-foreground"
            >
              {contact.email}
            </a>
          </div>
        </aside>
      </div>

      <nav aria-label="Other chapters" className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
          Other chapters
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {chapters
            .filter((item) => item.slug !== chapter.slug)
            .map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/chapters/${item.slug}`}
                  className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm hover:bg-surface"
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </PageShell>
  );
}
