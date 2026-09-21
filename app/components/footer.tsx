import Link from "next/link";
import { chapters, contact } from "../lib/content";
import { Logo } from "./logo";

const explore = [
  { href: "/about", label: "About the zone" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/team", label: "Zonal committee" },
];

const involved = [
  { href: "/join", label: "Join NCS" },
  { href: "/register", label: "Register for an event" },
  { href: "/chapters", label: "Find your chapter" },
  { href: "/jobs", label: "ICT jobs" },
];

function Column({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-[#03210d] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#a5d014]/12 via-transparent to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-6">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
              The SouthEast zone of the Nigeria Computer Society — five state
              chapters building the region&apos;s digital future together.
            </p>
          </div>

          <Column heading="Explore" links={explore} />
          <Column heading="Get involved" links={involved} />

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
              Secretariat
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="pt-1 leading-6 text-white/55">
                {contact.address}
              </li>
            </ul>
          </div>
        </div>

        <nav
          aria-label="Chapters"
          className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8"
        >
          {chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/chapters/${chapter.slug}`}
              className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-white/35 hover:text-white"
            >
              {chapter.name.replace(" State Chapter", "")}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-2 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Nigeria Computer Society, Greater
            SouthEast Zone.
          </p>
          <p>Abia · Anambra · Ebonyi · Enugu · Imo</p>
        </div>
      </div>
    </footer>
  );
}
