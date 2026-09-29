import Image from "next/image";

export type Tone = "dark" | "green" | "light";

export function PageShell({
  eyebrow,
  title,
  intro,
  image,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: { src: string; alt?: string };
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-black text-white">
        <Image
          src={image.src}
          alt={image.alt ?? ""}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/65 to-black/40"
        />
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
            {intro ? (
              <p className="mt-5 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                {intro}
              </p>
            ) : null}
            {actions ? (
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            ) : null}
          </div>
        </div>
      </section>
      {children}
    </>
  );
}

export function Section({
  tone = "dark",
  id,
  children,
}: {
  tone?: Tone;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`tone-${tone} scroll-mt-16`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-3 text-base leading-7 text-muted">{intro}</p>
      ) : null}
    </header>
  );
}

export function SideImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover"
      />
    </div>
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
      className={`rounded-xl border border-line bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90";

export const buttonStyles = {
  lime: `${buttonBase} bg-accent text-[#10241a]`,
  green: `${buttonBase} bg-brand-deep text-white`,
  outlineLight: `${buttonBase} border border-white/40 text-white hover:bg-white/10`,
  outlineDark: `${buttonBase} border border-[#10241a]/30 text-[#10241a] hover:bg-[#10241a]/5`,
};
