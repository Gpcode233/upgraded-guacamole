"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "../lib/content";

const AUTOPLAY_MS = 10000;
const TRANSITION_MS = 700;

const tones: Record<Slide["tone"], { chip: string; glow: string }> = {
  green: {
    chip: "bg-[#005417]/10 text-[#005417] dark:bg-[#2f8f5b]/20 dark:text-[#8fd6ac]",
    glow: "from-[#005417]/25 via-[#005417]/5 to-transparent",
  },
  lime: {
    chip: "bg-[#a5d014]/20 text-[#5a7a0a] dark:bg-[#a5d014]/20 dark:text-[#c8e878]",
    glow: "from-[#a5d014]/30 via-[#a5d014]/5 to-transparent",
  },
  red: {
    chip: "bg-[#d00000]/10 text-[#d00000] dark:bg-[#d00000]/20 dark:text-[#ff9c9c]",
    glow: "from-[#d00000]/25 via-[#d00000]/5 to-transparent",
  },
  blue: {
    chip: "bg-[#0851b1]/10 text-[#0851b1] dark:bg-[#0851b1]/20 dark:text-[#9dc0f0]",
    glow: "from-[#0851b1]/25 via-[#0851b1]/5 to-transparent",
  },
  yellow: {
    chip: "bg-[#ffcc00]/20 text-[#7a5d00] dark:bg-[#ffcc00]/20 dark:text-[#ffcc00]",
    glow: "from-[#ffcc00]/25 via-[#ffcc00]/5 to-transparent",
  },
};

export function Carousel({
  slides,
  fullBleed = false,
}: {
  slides: Slide[];
  fullBleed?: boolean;
}) {
  const count = slides.length;
  // The track holds a clone of the last slide before the first and a clone of
  // the first slide after the last, so the horizontal scroll can keep going in
  // one direction and snap back invisibly at the seams.
  const looped = count > 1;
  const track = looped
    ? [slides[count - 1], ...slides, slides[0]]
    : slides;

  // Position within `track`; the real slides start at 1 when looping.
  const [position, setPosition] = useState(looped ? 1 : 0);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const reducedRef = useRef(false);
  const touchStart = useRef<number | null>(null);

  const index = looped ? (((position - 1) % count) + count) % count : 0;
  const wrap = useCallback(
    (slot: number) => ((((slot - 1) % count) + count) % count) + 1,
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedRef.current = query.matches;
      setReduced(query.matches);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Reduced motion gets an instant swap, so it never parks on a clone.
  const go = useCallback(
    (delta: number) => {
      if (!looped) return;
      setAnimated(true);
      setPosition((value) =>
        reducedRef.current ? wrap(value + delta) : value + delta,
      );
    },
    [looped, wrap],
  );

  const jumpTo = useCallback(
    (target: number) => {
      if (!looped) return;
      setAnimated(true);
      setPosition(target + 1);
    },
    [looped],
  );

  // Once the scroll has landed on a clone, snap back to its real twin with the
  // transition off so the jump is invisible.
  useEffect(() => {
    if (!looped || (position >= 1 && position <= count)) return;
    const timer = window.setTimeout(
      () => {
        setAnimated(false);
        setPosition(wrap(position));
      },
      animated && !reduced ? TRANSITION_MS : 0,
    );
    return () => window.clearTimeout(timer);
  }, [position, count, looped, animated, reduced, wrap]);

  // Re-enable the transition once the browser has painted the seam jump.
  useEffect(() => {
    if (animated) return;
    const frame = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => setAnimated(true)),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [animated]);

  useEffect(() => {
    if (paused || reduced || !looped) return;
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduced, looped, go]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  // A full-bleed hero fills the viewport, so the pointer sits on it almost all
  // the time; hover-pausing there would stop the scroll for good.
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Upcoming events and announcements"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={fullBleed ? undefined : () => setPaused(true)}
      onMouseLeave={fullBleed ? undefined : () => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        if (start === null) return;
        const delta = event.changedTouches[0].clientX - start;
        if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
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
          className={`flex h-full ${
            animated && !reduced ? "transition-transform ease-out" : ""
          }`}
          style={{
            transform: `translate3d(-${position * 100}%, 0, 0)`,
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
        >
          {track.map((slide, slot) => (
            <article
              key={`${slide.id}-${slot}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${looped ? wrap(slot) : slot + 1} of ${count}`}
              inert={slot !== position}
              className={`relative isolate flex h-full w-full shrink-0 flex-col items-center justify-center gap-8 overflow-hidden p-6 py-20 text-center sm:px-16 sm:py-20 ${
                fullBleed ? "" : "min-h-[340px] sm:min-h-[360px]"
              }`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 z-0 bg-gradient-to-br ${tones[slide.tone].glow}`}
              />
              <SlideBody
                slide={slide}
                tone={tones[slide.tone]}
                eager={slot <= 1}
              />
            </article>
          ))}
        </div>

        {count > 1 ? (
          <>
            <div className="absolute inset-y-0 left-2 z-20 flex items-center sm:left-4">
              <ArrowButton label="Previous slide" onClick={() => go(-1)} />
            </div>
            <div className="absolute inset-y-0 right-2 z-20 flex items-center sm:right-4">
              <ArrowButton
                label="Next slide"
                flipped
                onClick={() => go(1)}
              />
            </div>

            <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2 sm:bottom-5">
              <div className="flex items-center gap-3 rounded-full bg-black/45 px-3 py-2 shadow-md ring-1 ring-white/20 backdrop-blur-sm">
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Slides"
                >
                  {slides.map((slide, dot) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={dot === index}
                      aria-label={slide.title}
                      onClick={() => jumpTo(dot)}
                      className={`h-2 rounded-full transition-all ${
                        dot === index
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

function SlideBody({
  slide,
  tone,
  eager = false,
}: {
  slide: Slide;
  tone: { chip: string; glow: string };
  eager?: boolean;
}) {
  const hasImage = Boolean(slide.image);

  if (slide.layout === "image-hero") {
    return (
      <>
        {slide.image ? (
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            priority={eager}
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35"
        />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white ring-1 ring-white/25 backdrop-blur-sm">
            {slide.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
            {slide.title}
            {slide.titleAccent ? (
              <span className="font-script ml-2 text-accent">
                {slide.titleAccent}
              </span>
            ) : null}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {slide.summary}
          </p>
        </div>

        {slide.facts?.length ? (
          <dl className="relative z-10 mx-auto grid max-w-2xl gap-4 border-t border-white/20 pt-5 sm:grid-cols-3">
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

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <SlideCta href={slide.href} label={slide.cta} />
        </div>
      </>
    );
  }

  if (slide.layout === "speakers") {
    return (
      <>
        {slide.image ? (
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            priority={eager}
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
        ) : null}
        <div
          aria-hidden
          className={`absolute inset-0 z-0 ${
            hasImage
              ? "bg-gradient-to-t from-black/92 via-black/80 to-black/60"
              : ""
          }`}
        />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
              hasImage
                ? "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
                : tone.chip
            }`}
          >
            {slide.eyebrow}
          </span>
          <h2
            className={`mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-4xl ${
              hasImage ? "text-white" : ""
            }`}
          >
            {slide.title}
          </h2>
          <p
            className={`mt-3 text-base leading-7 ${
              hasImage ? "text-white/80" : "text-muted"
            }`}
          >
            {slide.summary}
          </p>
        </div>

        {slide.speakers?.length ? (
          <ul className="relative z-10 mx-auto grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {slide.speakers.map((speaker) => (
              <li
                key={speaker.name}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  hasImage
                    ? "border-white/15 bg-black/50 backdrop-blur-md shadow-sm"
                    : "border-line bg-background/60"
                }`}
              >
                <span
                  aria-hidden
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                    hasImage
                      ? "bg-brand text-white ring-1 ring-white/20"
                      : "bg-brand-soft text-brand"
                  }`}
                >
                  {initials(speaker.name)}
                </span>
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-semibold ${
                      hasImage ? "text-white" : ""
                    }`}
                  >
                    {speaker.name}
                  </p>
                  <p
                    className={`truncate text-xs ${
                      hasImage ? "text-white/70" : "text-muted"
                    }`}
                  >
                    {speaker.role}
                  </p>
                  <p
                    className={`truncate text-xs font-medium ${
                      hasImage ? "text-accent" : "text-brand"
                    }`}
                  >
                    {speaker.topic}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <SlideCta href={slide.href} label={slide.cta} />
          <p
            className={`text-sm font-medium ${
              hasImage ? "text-white/80" : "text-muted"
            }`}
          >
            {slide.meta}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {slide.image ? (
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          priority={eager}
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
        />
      ) : null}
      <div
        aria-hidden
        className={`absolute inset-0 z-0 ${
          hasImage
            ? "bg-gradient-to-t from-black/90 via-black/65 to-black/40"
            : ""
        }`}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
            hasImage
              ? "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
              : tone.chip
          }`}
        >
          {slide.eyebrow}
        </span>
        <h2
          className={`mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-5xl ${
            hasImage ? "text-white" : ""
          }`}
        >
          {slide.title}
          {slide.titleAccent ? (
            <span className="font-script ml-2 text-accent">
              {slide.titleAccent}
            </span>
          ) : null}
        </h2>
        <p
          className={`mx-auto mt-4 max-w-xl text-base leading-7 sm:text-lg sm:leading-8 ${
            hasImage ? "text-white/85" : "text-muted"
          }`}
        >
          {slide.summary}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <SlideCta href={slide.href} label={slide.cta} />
        {slide.meta ? (
          <p
            className={`text-sm font-medium ${
              hasImage ? "text-white/80" : "text-muted"
            }`}
          >
            {slide.meta}
          </p>
        ) : null}
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
