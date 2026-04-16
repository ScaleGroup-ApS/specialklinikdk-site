// app/components/home/CtaBand.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { MagneticButton } from "~/components/motion/MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CtaBand() {
  return (
    <section className="relative overflow-hidden isolate bg-[color:var(--color-ink)] text-[color:var(--color-text-on-dark)]">
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/3 left-1/4 w-[60%] h-[80%] rounded-full animate-blob"
          style={{
            background:
              "radial-gradient(circle, rgba(105,125,168,0.28) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 right-0 w-[55%] h-[70%] rounded-full animate-blob-2"
          style={{
            background:
              "radial-gradient(circle, rgba(183,133,91,0.22) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 grain grain-dark pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-36">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow eyebrow-light mb-6"
            >
              07 — Klar, når I er klar
            </motion.p>
            <h2 className="display-xxl text-white">
              <AnimatedWords
                as="span"
                mode="inView"
                text="Book en tid"
                className="block"
                delay={0.05}
              />
              <AnimatedWords
                as="span"
                mode="inView"
                text="— i trygge hænder."
                className="block font-display italic font-light text-[color:var(--color-accent-warm-soft)]"
                delay={0.2}
              />
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="lg:col-span-4 space-y-6"
          >
            <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-on-dark-muted)] max-w-md">
              Reservér jeres tid online på få minutter — eller kontakt klinikken
              direkte for en uforpligtende samtale om forløbet.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton strength={6}>
                <Link to="/booking" className="btn-gradient btn-on-dark">
                  Book tid
                  <span className="btn-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </MagneticButton>
              <a href="tel:+4520763516" className="btn-gradient btn-outline-on-dark">
                20 76 35 16
              </a>
            </div>
          </motion.div>
        </div>

        {/* Meta row */}
        <div className="relative mt-20 md:mt-28 pt-8 border-t border-white/10 grid md:grid-cols-3 gap-8 text-[13px]">
          <div>
            <p className="eyebrow eyebrow-light mb-3">Adresse</p>
            <p className="text-[color:var(--color-text-on-dark)]">
              Taastrup Hovedgade 80, 2. th
              <br />
              2630 Taastrup
            </p>
          </div>
          <div>
            <p className="eyebrow eyebrow-light mb-3">Kontakt</p>
            <p className="text-[color:var(--color-text-on-dark)]">
              kontakt@specialklinik.dk
              <br />
              +45 20 76 35 16
            </p>
          </div>
          <div>
            <p className="eyebrow eyebrow-light mb-3">Åbningstid</p>
            <p className="text-[color:var(--color-text-on-dark)]">
              Kun efter aftale
              <br />
              Book online eller ring
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
