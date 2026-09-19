"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "../lib/content";

const AUTOPLAY_MS = 7000;

const tones: Record<Slide["tone"], { chip: string; glow: string }> = {
  indigo: {
    chip: "bg-[#1b3fa0]/10 text-[#1b3fa0] dark:bg-[#7f9cff]/15 dark:text-[#9db4ff]",
    glow: "from-[#1b3fa0]/25 via-[#1b3fa0]/5 to-transparent",
  },
  emerald: {
    chip: "bg-[#0f766e]/10 text-[#0f766e] dark:bg-[#2dd4bf]/15 dark:text-[#5eead4]",
    glow: "from-[#0f766e]/25 via-[#0f766e]/5 to-transparent",
  },
  amber: {
    chip: "bg-[#b45309]/10 text-[#b45309] dark:bg-[#fbbf24]/15 dark:text-[#fcd34d]",
    glow: "from-[#b45309]/25 via-[#b45309]/5 to-transparent",
  },
  rose: {
    chip: "bg-[#be123c]/10 text-[#be123c] dark:bg-[#fb7185]/15 dark:text-[#fda4af]",
    glow: "from-[#be123c]/25 via-[#be123c]/5 to-transparent",
  },
};

export function Carousel({
  slides,
  fullBleed = false,
}: {
  slides: Slide[];
  fullBleed?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  const current = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Upcoming events and announcements"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        if (start === null) return;
        const delta = event.changedTouches[0].clientX - start;
        if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
      className={`relative w-full ${fullBleed ? "h-full" : ""}`}
    >
      <div
        className={`relative h-full overflow-hidden bg-surface ${
          fullBleed ? "" : "rounded-2xl border border-line"
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tones[current.tone].glow}`}
        />

        <article
          key={current.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${count}`}
          className={`relative flex h-full flex-col items-center justify-center gap-8 overflow-hidden p-6 py-20 text-center motion-safe:animate-[slide-in_0.4s_ease-out] sm:px-16 sm:py-20 ${
            fullBleed ? "" : "min-h-[340px] sm:min-h-[360px]"
          }`}
        >
          <SlideBody
            slide={current}
            active
            tone={tones[current.tone]}
          />
        </article>

        {count > 1 ? (
          <>
            <div className="absolute inset-y-0 left-2 z-10 flex items-center sm:left-4">
              <ArrowButton label="Previous slide" onClick={() => go(index - 1)} />
            </div>
            <div className="absolute inset-y-0 right-2 z-10 flex items-center sm:right-4">
              <ArrowButton
                label="Next slide"
                flipped
                onClick={() => go(index + 1)}
              />
            </div>

            <div className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-2 sm:bottom-5">
              <div className="flex items-center gap-3 rounded-full bg-black/45 px-3 py-2 shadow-md ring-1 ring-white/20 backdrop-blur-sm">
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Slides"
                >
                  {slides.map((slide, position) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={position === index}
                      aria-label={slide.title}
                      onClick={() => go(position)}
                      className={`h-2 rounded-full transition-all ${
                        position === index
                          ? "w-8 bg-white"
                          : "w-2 bg-white/45 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
                <p aria-live="polite" className="text-[11px] tabular-nums text-white/90">
                  {index + 1} / {count}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function HeroVideo({
  video,
}: {
  video: NonNullable<Slide["video"]>;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-10 h-full w-full object-cover"
      src={video.src}
      poster={video.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onEnded={(event) => {
        const element = event.currentTarget;
        element.currentTime = 0;
        element.play().catch(() => {});
      }}
      aria-hidden
    />
  );
}

function SlideBody({
  slide,
  active,
  tone,
}: {
  slide: Slide;
  active: boolean;
  tone: { chip: string; glow: string };
}) {
  if (slide.layout === "video-hero") {
    return (
      <>
        {slide.video && active ? <HeroVideo video={slide.video} /> : null}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/30"
        />

        <div className="mx-auto max-w-2xl">
          <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white ring-1 ring-white/25">
            {slide.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
            {slide.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {slide.summary}
          </p>
        </div>

        {slide.facts?.length ? (
          <dl className="mx-auto grid max-w-2xl gap-4 border-t border-white/20 pt-5 sm:grid-cols-3">
            {slide.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-white sm:text-base">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <SlideCta href={slide.href} label={slide.cta} />
        </div>
      </>
    );
  }

  if (slide.layout === "speakers") {
    return (
      <>
        <div className="mx-auto max-w-2xl">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${tone.chip}`}
          >
            {slide.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-4xl">
            {slide.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {slide.summary}
          </p>
        </div>

        {slide.speakers?.length ? (
          <ul className="mx-auto grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {slide.speakers.map((speaker) => (
              <li
                key={speaker.name}
                className="flex items-center gap-3 rounded-xl border border-line bg-background/60 p-3"
              >
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand"
                >
                  {initials(speaker.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {speaker.name}
                  </p>
                  <p className="truncate text-xs text-muted">{speaker.role}</p>
                  <p className="truncate text-xs font-medium text-brand">
                    {speaker.topic}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <SlideCta href={slide.href} label={slide.cta} />
          <p className="text-sm font-medium text-muted">{slide.meta}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${tone.chip}`}
        >
          {slide.eyebrow}
        </span>
        <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-5xl">
          {slide.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {slide.summary}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <SlideCta href={slide.href} label={slide.cta} />
        <p className="text-sm font-medium text-muted">{slide.meta}</p>
      </div>
    </>
  );
}

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Engr\.|Prof\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function SlideCta({ href, label }: { href: string; label: string }) {
  const className =
    "inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90";
  const arrow = (
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

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {label}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      {arrow}
    </Link>
  );
}

function ArrowButton({
  label,
  onClick,
  flipped = false,
}: {
  label: string;
  onClick: () => void;
  flipped?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white shadow-md ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/65 sm:h-11 sm:w-11"
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className={`h-4 w-4 ${flipped ? "" : "rotate-180"}`}
      >
        <path
          d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
