// app/components/home/Testimonials.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";

const EASE = [0.22, 1, 0.36, 1] as const;

const QUOTES = [
  {
    quote:
      "Vi følte os trygge fra første kontakt. Informationen før og efter indgrebet var tydelig, og personalet var imødekommende og rolige hele vejen igennem.",
    name: "Mette & Anders",
    info: "Forældre · Taastrup",
    context: "Ringmetoden · 4 mdr.",
  },
  {
    quote:
      "Hele forløbet var professionelt og uhyre roligt. Vi fik klare råd om smertelindring og præcist hvad vi skulle være opmærksomme på derhjemme.",
    name: "Sara H.",
    info: "Mor · København",
    context: "Klassisk metode · 2 år",
  },
  {
    quote:
      "Booking og kommunikation fungerede virkelig godt. Klinikken svarede hurtigt på vores spørgsmål, og vi følte os i sikre hænder på dagen.",
    name: "Yusuf & Amal",
    info: "Forældre · Brøndby",
    context: "Fuld bedøvelse · 5 år",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setI((p) => (p + 1) % QUOTES.length),
      7200,
    );
    return () => clearInterval(t);
  }, []);

  const q = QUOTES[i];

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
              <AnimatedWords
                as="span"
                mode="inView"
                text="Ord fra"
                className="block"
              />{" "}
              <span className="relative inline-block">
                <span className="font-display italic font-light">familier</span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={0.7}
                />
              </span>{" "}
              der har været hos os.
            </h2>

            {/* Dots */}
            <div className="mt-10 flex items-center gap-3">
              {QUOTES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Vis udtalelse ${idx + 1}`}
                  className="group flex items-center gap-2"
                >
                  <span
                    className="block h-px transition-all duration-500"
                    style={{
                      width: idx === i ? "2.5rem" : "0.75rem",
                      background:
                        idx === i
                          ? "var(--color-ink)"
                          : "var(--color-border-strong)",
                    }}
                  />
                  <span
                    className={
                      "text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 " +
                      (idx === i
                        ? "text-[color:var(--color-ink)]"
                        : "text-[color:var(--color-text-muted)]")
                    }
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quote column */}
          <div className="lg:col-span-8 relative">
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.22, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="absolute -top-16 -left-4 select-none font-display text-[color:var(--color-accent-warm-soft)]"
              style={{
                fontSize: "clamp(8rem, 16vw, 14rem)",
                lineHeight: 0.8,
              }}
            >
              &ldquo;
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative"
              >
                <blockquote className="font-display italic font-light leading-[1.25] tracking-tight text-[color:var(--color-ink)] text-[clamp(1.75rem,3.2vw,3rem)] max-w-[28ch]">
                  {q.quote}
                </blockquote>

                <figcaption className="mt-10 flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                      {q.name}
                    </p>
                    <p className="text-[13px] text-[color:var(--color-text-muted)] mt-0.5">
                      {q.info}
                    </p>
                  </div>
                  <span className="h-px w-10 bg-[color:var(--color-border-strong)]" />
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-accent-warm)]">
                    {q.context}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
