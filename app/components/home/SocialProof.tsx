// app/components/home/SocialProof.tsx
// "Trust bar" — stats + qualitative markers in an editorial row.
import { motion } from "framer-motion";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { CountUp } from "~/components/motion/CountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "1000+", label: "Omskæringer foretaget", emoji: "👶" },
  { value: "10+", label: "År med klinisk erfaring", emoji: "🩺" },
  { value: "4.9", label: "Gennemsnitlig vurdering", emoji: "⭐" },
];

const MARQUEE = [
  "Styrelsen for Patientsikkerhed",
  "Autoriseret læge",
  "Lovpligtig patientforsikring",
  "Ringmetoden — Circumplast®",
  "Klassisk metode",
  "Fuld bedøvelse",
  "Taastrup · København",
];

export function SocialProof() {
  return (
    <section className="relative bg-white">
      {/* Stats row */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">02 — Klinikken i tal</p>
            <h2 className="display-lg text-[color:var(--color-ink)]">
              <AnimatedWords
                as="span"
                mode="inView"
                text="Faglig erfaring,"
                className="block"
              />
              <span className="relative inline-block">
                <span className="font-display italic font-light">dokumenteret</span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={0.5}
                />
              </span>{" "}
              tryghed.
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-6 text-[15px] leading-[1.75] text-[color:var(--color-text-muted)] max-w-md"
            >
              Vi arbejder efter de retningslinjer, som Styrelsen for
              Patientsikkerhed har udstukket — og vi tager os tid til hver enkelt
              familie.
            </motion.p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-border)] rounded-2xl overflow-hidden border border-[color:var(--color-border)]">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative bg-white p-6 md:p-8 flex flex-col justify-between min-h-[180px] group overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute top-4 right-4 text-xl opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500"
                >
                  {s.emoji}
                </span>
                <CountUp
                  value={s.value}
                  className="stat-number text-[color:var(--color-ink)]"
                />
                <span className="mt-4 text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
                  {s.label}
                </span>
                {/* Hover accent rule */}
                <span
                  aria-hidden
                  className="absolute left-6 right-6 bottom-0 h-px origin-left scale-x-0 bg-[color:var(--color-accent-warm)] transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust marquee */}
      <div className="marquee-pause border-y border-[color:var(--color-border)] bg-[color:var(--color-surface-dim)] overflow-hidden">
        <div className="marquee-track animate-marquee py-6">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-text-muted)] inline-flex items-center gap-4 whitespace-nowrap"
            >
              {item}
              <svg
                className="w-3 h-3 opacity-60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.47L12 14.77 7.06 17.37 8 11.9 4 8l5.61-1.16L12 2z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
