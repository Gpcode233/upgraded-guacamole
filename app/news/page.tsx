import type { Metadata } from "next";
import { PageShell, Section } from "../components/page-shell";
import { news } from "../lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements from the Greater SouthEast zone.",
};

export default function NewsPage() {
  return (
    <PageShell
      eyebrow="News"
      title="Zonal announcements"
      image={{ src: "/images/elders-forum.jpg" }}
    >
      <Section tone="light">
        <ul className="divide-y divide-line rounded-xl border border-line">
          {news.map((item) => (
            <li key={item.slug} className="p-6">
              <time
                dateTime={item.date}
                className="text-xs font-medium uppercase tracking-[0.08em] text-muted"
              >
                {new Date(item.date).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.excerpt}</p>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
