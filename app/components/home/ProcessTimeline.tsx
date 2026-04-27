// app/components/home/ProcessTimeline.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    step: "Trin 01",
    title: "Booking & forberedelse",
    desc: "Book jeres tid online. Vi sender klare retningslinjer for hvordan I forbereder jeres barn inden aftalen.",
  },
  {
    step: "Trin 02",
    title: "Samtale i klinikken",
    desc: "Ved ankomst tager vi en rolig samtale, svarer på spørgsmål og forbereder smertelindringen, så I er trygge og velinformerede inden indgrebet.",
  },
  {
    step: "Trin 03",
    title: "Indgrebet",
    desc: "Den autoriserede læge udfører indgrebet skånsomt, typisk på få minutter. I må gerne være til stede eller vente i et tilstødende rum.",
  },
  {
    step: "Trin 04",
    title: "Efterforløb & opfølgning",
    desc: "Vi gennemgår efterbehandlingen grundigt, udleverer skriftlig vejledning og er til rådighed via telefon og mail i hele helingsforløbet.",
  },
];

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        position: "relative",
        background:
          "linear-gradient(180deg, var(--color-surface-dim) 0%, #FFFFFF 100%)",
      }}
    >
      <div aria-hidden className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-24 items-end">
          <div className="lg:col-span-7">
            <h2 className="display-xl text-[color:var(--color-ink)]">
              <AnimatedWords
                as="span"
                mode="inView"
                text="Fire rolige trin —"
                className="block"
              />
              <span className="relative inline-block">
                <span className="font-display italic font-light">
                  fra første tanke til heling.
                </span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={0.8}
                />
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
              Vi har bygget vores forløb op om det, som forældre har brug for:
              tid, klarhed og tydelig opfølgning. I ved præcis, hvad der skal
              ske — og hvornår.
            </p>
          </div>
        </div>

        {/* Timeline grid */}
        <div className="relative">
          {/* Vertical progress line (desktop) */}
          <div
            aria-hidden
            className="absolute left-[11px] top-2 bottom-2 w-px bg-[color:var(--color-border)] hidden md:block"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-[11px] top-2 bottom-2 w-px bg-[color:var(--color-ink)] hidden md:block"
          />

          <ol className="space-y-10 md:space-y-16">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="relative pl-10 md:pl-16 grid md:grid-cols-12 gap-6 md:gap-10 items-start"
              >
                {/* Dot */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 320, damping: 14, delay: i * 0.08 + 0.1 }}
                  className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-white border border-[color:var(--color-border-strong)] flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(11,16,32,0.25)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-ink)]" />
                </motion.span>

                <div className="md:col-span-3">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
                    {s.step}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <h3 className="display-lg text-[color:var(--color-ink)]">
                    {s.title}
                  </h3>
                </div>
                <div className="md:col-span-3">
                  <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-between gap-6">
          <p className="text-[15px] text-[color:var(--color-text-muted)] max-w-lg">
            Er I i tvivl om forløbet eller hvilken metode der passer jeres barn?
            Skriv til os — vi svarer altid hurtigt.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/booking" className="btn-gradient">
              Book tid
              <span className="btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link to="/kontakt-os" className="btn-outline">
              Skriv til klinikken
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
