import type { Metadata } from "next";
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

export default function TeamPage() {
  const [coordinator, ...rest] = team;

  return (
    <PageShell
      eyebrow="Team"
      title="Zonal Working Committee"
      intro="The people running the zone, chapter by chapter."
    >
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-5">
          <span
            aria-hidden
            className="grid h-16 w-16 place-items-center rounded-full bg-brand text-lg font-semibold text-white"
          >
            {initials(coordinator.name)}
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {coordinator.name}
            </h2>
            <p className="text-sm font-medium text-brand">{coordinator.role}</p>
          </div>
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((member) => (
          <li
            key={member.name}
            className="flex items-center gap-4 rounded-xl border border-line p-5"
          >
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand"
            >
              {initials(member.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{member.name}</p>
              <p className="truncate text-sm text-muted">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
