import Image from "next/image";
import Link from "next/link";

/**
 * Shared vocabulary with the home page hero: pill eyebrow, display heading with
 * an optional script accent, photo under a dark gradient, arrow CTAs.
 */

export function Pill({
  children,
  onPhoto = false,
}: {
  children: React.ReactNode;
  onPhoto?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
        onPhoto
          ? "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
          : "bg-brand-soft text-brand"
      }`}
    >
      {children}
    </span>
  );
}

export function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5">
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "onPhoto";
  className?: string;
}) {
  const variants = {
    primary: "bg-brand text-white hover:opacity-90",
    secondary: "border border-line hover:bg-surface",
    onPhoto:
      "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  };
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${variants[variant]} ${className}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        className={classes}
      >
        {children}
        <Arrow />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <Arrow />
    </Link>
  );
}

export function PageShell({
  eyebrow,
  title,
  titleAccent,
  intro,
  image,
  facts,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  intro?: string;
  image?: { src: string; alt: string };
  facts?: { label: string; value: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand text-white">
        {image ? (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-10 object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/65 to-black/45"
            />
          </>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-[#a5d014]/25 via-transparent to-black/25"
          />
        )}

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
          <Pill onPhoto>{eyebrow}</Pill>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-5xl">
              {title}
              {titleAccent ? (
                <span className="font-script ml-2 text-accent">
                  {titleAccent}
                </span>
              ) : null}
            </h1>
            {intro ? (
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                {intro}
              </p>
            ) : null}
          </div>

          {facts?.length ? (
            <dl className="mx-auto grid w-full max-w-2xl gap-4 border-t border-white/20 pt-5 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium sm:text-base">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {actions ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {actions}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </div>
    </>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  action,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
          {titleAccent ? (
            <span className="font-script ml-2 text-brand">{titleAccent}</span>
          ) : null}
        </h2>
      </div>
      {action}
    </div>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-xl font-semibold tracking-tight sm:text-2xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}
