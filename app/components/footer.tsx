import Link from "next/link";

const sponsors = [
  "Anambra State Government — Solution Innovation District (SID)",
  "IEEE",
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/ncssoutheast",
    icon: (
      <path d="M13.5 9H11V7.5c0-.62.5-.75.9-.75H13.5V4.02L11.2 4C8.7 4 8 5.9 8 7.3V9H6v3h2v8h3v-8h2.2L13.5 9Z" />
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/ncssoutheast",
    icon: (
      <path d="M4 4h3.4l3.2 4.4L14.2 4H17l-4.8 6.3L17.3 20h-3.4l-3.5-4.8L6.4 20H4l5.1-6.8L4 4Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ncssoutheast",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.6" cy="7.4" r="1" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/ncssoutheast",
    icon: (
      <>
        <rect x="4" y="9" width="3" height="10" />
        <circle cx="5.5" cy="5.5" r="1.7" />
        <path d="M11 9h3v1.7c.6-1 1.7-1.9 3.3-1.9 2.6 0 3.7 1.7 3.7 4.6V19h-3v-4.9c0-1.3-.5-2.3-1.8-2.3-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1 1V19h-3V9Z" />
      </>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-deep">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">
            Sponsors &amp; partners
          </p>
          <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
            {sponsors.map((sponsor) => (
              <li
                key={sponsor}
                className="text-sm font-medium text-white/90"
              >
                {sponsor}
              </li>
            ))}
          </ul>
          <Link
            href="/sponsorship"
            className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Become a sponsor →
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="currentColor">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-6">
        © {new Date().getFullYear()} NCS SouthEast Innovation Summit & Awards. All rights reserved.
      </div>
    </footer>
  );
}
