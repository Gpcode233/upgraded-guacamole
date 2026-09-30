import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  PageShell,
  Section,
  SectionHeading,
  buttonStyles,
} from "../components/page-shell";
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
    <div className="overflow-hidden rounded-xl border border-line p-4">
      <Portrait name={name} photo={photo} />
      <div className="mt-4 min-w-0">
        <p className="truncate text-base font-semibold">{name}</p>
        <p className="truncate text-sm text-muted">{role}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [coordinator, ...rest] = team;

  return (
    <PageShell
      eyebrow="Team"
      title="Zonal Working Committee"
      intro="The people running the zone, chapter by chapter."
      image={{ src: "/images/zonal-assembly.jpg" }}
    >
      <Section tone="dark">
        <div className="mx-auto w-full max-w-[220px]">
          <MemberCard
            name={coordinator.name}
            role={coordinator.role}
            photo={coordinator.photo}
          />
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </Section>

      <Section tone="light">
        <SectionHeading
          eyebrow="Work with us"
          title="Have a question for the committee?"
          intro="Reach the zonal secretariat about the Summit, partnerships or membership."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className={buttonStyles.green}>
            Contact the secretariat
          </Link>
          <Link href="/sponsorship" className={buttonStyles.outlineDark}>
            Become a partner
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
