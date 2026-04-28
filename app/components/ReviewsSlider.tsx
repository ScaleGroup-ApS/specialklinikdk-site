// app/components/ReviewsSlider.tsx
// Unified review slider — surfaces reviews from Google and Trustpilot with a
// per-review source badge, drag/keyboard/arrow/dot navigation.
//
// TODO: Replace the REVIEWS array below with the real Google + Trustpilot
// reviews. Keep the same shape — `source` must be "google" or "trustpilot".
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";

const EASE = [0.22, 1, 0.36, 1] as const;

export type ReviewSource = "google" | "trustpilot";

export type Review = {
  source: ReviewSource;
  name: string;
  date?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  context?: string;
};

// Placeholder data — replace with real reviews from Google + Trustpilot.
const REVIEWS: Review[] = [
  {
    source: "google",
    name: "Mette & Anders",
    date: "2025",
    rating: 5,
    quote:
      "Vi følte os trygge fra første kontakt. Informationen før og efter indgrebet var tydelig, og personalet var imødekommende og rolige hele vejen igennem.",
    context: "Ringmetoden · 4 mdr.",
  },
  {
    source: "trustpilot",
    name: "Sara H.",
    date: "2025",
    rating: 5,
    quote:
      "Hele forløbet var professionelt og uhyre roligt. Vi fik klare råd om smertelindring og præcist hvad vi skulle være opmærksomme på derhjemme.",
    context: "Klassisk metode · 7 år",
  },
  {
    source: "google",
    name: "Yusuf & Amal",
    date: "2024",
    rating: 5,
    quote:
      "Booking og kommunikation fungerede virkelig godt. Klinikken svarede hurtigt på vores spørgsmål, og vi følte os i sikre hænder på dagen.",
    context: "Fuld bedøvelse · 5 år",
  },
  {
    source: "trustpilot",
    name: "Familien Hansen",
    date: "2024",
    rating: 5,
    quote:
      "Amin er dygtig og rolig. Indgrebet tog få minutter, helingen forløb perfekt og vi blev passet på undervejs.",
    context: "Ringmetoden · 8 mdr.",
  },
  {
    source: "google",
    name: "Layla M.",
    date: "2024",
    rating: 5,
    quote:
      "Klinikken er ren, pæn og personalet er virkelig venligt. Vi kunne mærke den store erfaring de har med små børn.",
    context: "Ringmetoden · 3 mdr.",
  },
  {
    source: "trustpilot",
    name: "Familien Khan",
    date: "2024",
    rating: 5,
    quote:
      "Vores dreng var helt rolig hele vejen igennem. Lægen var grundig og forklarede alt før, under og efter. Vi anbefaler klinikken på det varmeste.",
    context: "Klassisk metode · 9 år",
  },
];

export function ReviewsSlider({ reviews = REVIEWS }: { reviews?: Review[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = reviews.length;
  const intervalRef = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % total) + total) % total;
      setDirection(next > index ? 1 : -1);
      setIndex(wrapped);
    },
    [index, total],
  );

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Auto-advance every 7s; pause on user interaction
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDirection(1);
      setIndex((p) => (p + 1) % total);
    }, 7500);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [total]);

  const pause = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  // Keyboard arrows
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        pause();
        next();
      }
      if (e.key === "ArrowLeft") {
        pause();
        prev();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const dragX = useMotionValue(0);
  const cardOpacity = useTransform(dragX, [-200, 0, 200], [0.4, 1, 0.4]);
  const cardRotate = useTransform(dragX, [-200, 0, 200], [-2, 0, 2]);

  const r = reviews[index];

  const counts = reviews.reduce(
    (acc, rv) => {
      acc[rv.source] += 1;
      return acc;
    },
    { google: 0, trustpilot: 0 } as Record<ReviewSource, number>,
  );

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Label column */}
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-3">
              <span className="sticker sticker-warm">
                <span className="text-base leading-none">💬</span>
                Forældre fortæller
              </span>
            </div>
            <h2 className="display-xl text-[color:var(--color-ink)] leading-[1.02]">
              <AnimatedWords as="span" mode="inView" text="Ord fra" className="block" />{" "}
              <span className="relative inline-block">
                <span className="font-display italic font-light">familier</span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={0.7}
                />
              </span>{" "}
              der har været hos os.
            </h2>

            {/* Source meta */}
            <div className="mt-10 grid grid-cols-2 gap-3 max-w-sm">
              <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-4">
                <div className="flex items-center gap-2">
                  <GoogleMark className="w-5 h-5" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
                    Google
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-light text-[color:var(--color-ink)]">
                  {counts.google}
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] mt-1">
                  Anmeldelser
                </p>
              </div>
              <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-4">
                <div className="flex items-center gap-2">
                  <TrustpilotMark className="w-5 h-5" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
                    Trustpilot
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-light text-[color:var(--color-ink)]">
                  {counts.trustpilot}
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] mt-1">
                  Anmeldelser
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => {
                  pause();
                  prev();
                }}
                aria-label="Forrige anmeldelse"
                className="group inline-flex items-center justify-center w-11 h-11 rounded-full border border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-ink)] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  pause();
                  next();
                }}
                aria-label="Næste anmeldelse"
                className="group inline-flex items-center justify-center w-11 h-11 rounded-full border border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-ink)] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <span className="ml-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-text-muted)]">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Quote column */}
          <div
            ref={containerRef}
            tabIndex={0}
            className="lg:col-span-8 relative outline-none"
          >
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.22, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="absolute -top-16 -left-4 select-none font-display text-[color:var(--color-accent-warm-soft)]"
              style={{ fontSize: "clamp(8rem, 16vw, 14rem)", lineHeight: 0.8 }}
            >
              &ldquo;
            </motion.span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                style={{ x: dragX, opacity: cardOpacity, rotate: cardRotate }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) {
                    pause();
                    next();
                  } else if (info.offset.x > 80) {
                    pause();
                    prev();
                  }
                }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                {/* Source badge */}
                <div className="mb-6 flex items-center gap-3">
                  <SourceBadge source={r.source} />
                  <Stars rating={r.rating} />
                  {r.date && (
                    <span className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-text-muted)]">
                      {r.date}
                    </span>
                  )}
                </div>

                <blockquote className="font-display italic font-light leading-[1.25] tracking-tight text-[color:var(--color-ink)] text-[clamp(1.5rem,2.6vw,2.4rem)] max-w-[36ch]">
                  {r.quote}
                </blockquote>

                <figcaption className="mt-10 flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                      {r.name}
                    </p>
                    {r.context && (
                      <p className="text-[13px] text-[color:var(--color-text-muted)] mt-0.5">
                        {r.context}
                      </p>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Dots */}
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    pause();
                    goTo(idx);
                  }}
                  aria-label={`Vis anmeldelse ${idx + 1}`}
                  className="group flex items-center"
                >
                  <span
                    className="block h-px transition-all duration-500"
                    style={{
                      width: idx === index ? "2.25rem" : "0.75rem",
                      background:
                        idx === index
                          ? "var(--color-ink)"
                          : "var(--color-border-strong)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} ud af 5 stjerner`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill={i < rating ? "#F5A623" : "none"}
          stroke={i < rating ? "#F5A623" : "currentColor"}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.47L12 14.77 7.06 17.37 8 11.9 4 8l5.61-1.16L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function SourceBadge({ source }: { source: ReviewSource }) {
  if (source === "google") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[color:var(--color-border)] shadow-[0_4px_12px_-6px_rgba(11,16,32,0.15)]">
        <GoogleMark className="w-4 h-4" />
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-ink)]">
          Google
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[color:var(--color-border)] shadow-[0_4px_12px_-6px_rgba(11,16,32,0.15)]">
      <TrustpilotMark className="w-4 h-4" />
      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-ink)]">
        Trustpilot
      </span>
    </span>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function TrustpilotMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#00B67A" d="M12 1.5l2.755 8.483H23.5l-7.122 5.176 2.755 8.483L12 18.466l-7.133 5.176 2.755-8.483L.5 9.983h8.745z" />
    </svg>
  );
}
