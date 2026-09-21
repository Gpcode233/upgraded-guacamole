import type { Metadata } from "next";
import { NewsCard } from "../components/cards";
import { PageShell } from "../components/page-shell";
import { news } from "../lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements from the Greater SouthEast zone.",
};

export default function NewsPage() {
  return (
    <PageShell
      eyebrow="News"
      title="Zonal"
      titleAccent="announcements"
      intro="What the zone has shipped, hosted and decided, newest first."
      image={{
        src: "/images/call-for-papers.jpg",
        alt: "Call for papers artwork for the SouthEast Innovation Summit",
      }}
    >
      <div className="max-w-3xl space-y-8">
        {news.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </div>
    </PageShell>
  );
}
