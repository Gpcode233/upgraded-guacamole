import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "../components/page-shell";
import { team } from "../lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The Zonal Working Committee of the Greater SouthEast zone, Nigeria Computer Society.",
};

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Engr\.|Prof\.)\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Portrait({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-brand-soft">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="grid aspect-[4/5] w-full place-items-center rounded-xl bg-brand-soft">
      <span className="text-4xl font-semibold text-brand">
        {initials(name)}
      </span>
    </div>
  );
}

function MemberCard({
  name,
  role,
  photo,
}: {
  name: string;
  role: string;
  photo?: string;
}) {
  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-line p-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5">
      <Portrait name={name} photo={photo} />
      <div className="mt-4 min-w-0">
        <p className="text-base font-semibold leading-snug">{name}</p>
        <p className="mt-0.5 text-sm leading-snug text-muted">{role}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [coordinator, ...rest] = team;

  return (
    <PageShell
      eyebrow="Team"
      title="Zonal Working"
      titleAccent="Committee"
      intro="The people running the zone, chapter by chapter."
      image={{
        src: "/images/summit-speakers.jpg",
        alt: "Speakers at a Greater SouthEast zone summit",
      }}
    >
      <div className="grid gap-6 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-8 sm:p-8">
        <Portrait name={coordinator.name} photo={coordinator.photo} />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            {coordinator.role}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {coordinator.name}
          </p>
          <blockquote className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
            &ldquo;The future will not be given to us — we will build it
            together.&rdquo;
          </blockquote>
        </div>
      </div>

      <h2 className="mt-14 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        The committee
      </h2>
      <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rest.map((member) => (
          <li key={member.name}>
            <MemberCard
              name={member.name}
              role={member.role}
              photo={member.photo}
            />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
