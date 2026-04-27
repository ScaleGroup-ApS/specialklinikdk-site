// app/components/home/HeroSection.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { MagneticButton } from "~/components/motion/MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden isolate"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FAF8F2 55%, #F3EFE3 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-15%] left-[-10%] w-[60%] h-[70%] rounded-full animate-blob"
          style={{
            background:
              "radial-gradient(circle, rgba(105,125,168,0.22) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-8%] w-[55%] h-[65%] rounded-full animate-blob-2"
          style={{
            background:
              "radial-gradient(circle, rgba(183,133,91,0.18) 0%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />
      </div>

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-24 md:pt-28 pb-20 md:pb-28">
        {/* Top bar — clinic meta */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-text-muted)] mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500">
              <span className="absolute inset-0 rounded-full bg-emerald-500 pulse-dot-outer" />
            </span>
            Åbent efter aftale
          </span>
          <span className="h-px w-6 bg-[color:var(--color-border-strong)]" />
          <span>Autoriseret læge · Styrelsen for Patientsikkerhed</span>
          <span className="h-px w-6 bg-[color:var(--color-border-strong)] hidden md:inline-block" />
          <span className="hidden md:inline">Taastrup · København</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Headline block */}
          <div className="lg:col-span-7">
            <h1 className="display-xxl text-[color:var(--color-ink)]">
              <AnimatedWords as="span" text="Tryghed" className="block" />
              <AnimatedWords
                as="span"
                text="hele"
                delay={0.12}
                className="inline-block mr-[0.22em]"
              />
              <span className="relative inline-block">
                <motion.span
                  initial={{ y: reduce ? 0 : "100%", opacity: reduce ? 1 : 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
                  className="inline-block font-display italic font-light"
                >
                  vejen
                </motion.span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={1.1}
                />
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                .
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="mt-10 max-w-xl text-[17px] md:text-[18px] leading-[1.75] text-[color:var(--color-text-muted)]"
            >
              Rituel drengeomskæring udført af autoriseret læge i rolige,
              professionelle rammer. Vi guider jer trygt gennem hele forløbet —
              med faglig omhu, klar information og respekt for jeres valg.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <MagneticButton strength={6}>
                <Link to="/booking" className="btn-gradient">
                  Book tid
                  <span className="btn-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.6}
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </span>
                </Link>
              </MagneticButton>
              <Link to="/priser" className="btn-outline">
                Se priser
              </Link>
            </motion.div>
          </div>

          {/* Editorial image block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
            className="lg:col-span-5 relative"
          >
            {/* Back "polaroid" layer */}
            <div
              aria-hidden
              className="hidden md:block absolute -top-6 -right-4 w-40 h-52 rounded-2xl bg-white border border-[color:var(--color-border)] shadow-[0_30px_60px_-30px_rgba(11,16,32,0.25)] rotate-[6deg]"
              style={{
                backgroundImage: "url(/images/Klinikken-scaled%20(1).jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-[color:var(--color-surface-dim-2)] shadow-[0_50px_100px_-40px_rgba(11,16,32,0.35)]">
              <img
                src="/images/Forside-specialklinik-Taastrup%20(2).jpg"
                alt="Specialklinik Taastrup — klinikken indefra"
                className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
              />
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/90">
                <span>Est. 2023</span>
                <span>Taastrup, DK</span>
              </div>
              {/* Caption card */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold"
                        style={{
                          background: [
                            "linear-gradient(135deg,#697DA8,#4A5D87)",
                            "linear-gradient(135deg,#B7855B,#8a5f3b)",
                            "linear-gradient(135deg,#1B2237,#0B1020)",
                          ][i],
                          color: "#fff",
                        }}
                      >
                        {["M", "A", "S"][i]}
                      </span>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[color:var(--color-ink)] leading-tight">
                      Hundredvis af forældre har valgt os
                    </p>
                    <p className="text-[11px] text-[color:var(--color-text-muted)] mt-0.5">
                      Dokumenteret forløb · Lovpligtig patientforsikring
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
              className="hidden md:flex absolute -left-8 -bottom-6 card-elevated px-5 py-4 items-center gap-3 animate-bob-tilt"
            >
              <span className="text-[color:var(--color-accent-warm)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.47L12 14.77 7.06 17.37 8 11.9 4 8l5.61-1.16L12 2z" />
                </svg>
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">Anbefales af forældre</p>
                <p className="text-sm font-semibold text-[color:var(--color-ink)]">4.9 / 5 · 100+ anmeldelser</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-[color:var(--color-text-muted)]"
        >
          <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,16,32,0.45), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
