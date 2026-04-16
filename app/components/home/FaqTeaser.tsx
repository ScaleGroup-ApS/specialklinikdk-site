// app/components/home/FaqTeaser.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQ = [
  {
    q: "Er omskæring smertefuldt for barnet?",
    a: "Vi anvender effektiv smertelindring tilpasset barnets alder — lokalbedøvelse, beroligende eller fuld bedøvelse hvor det er relevant. Vores mål er at holde barnet så smertefrit og trygt som muligt før, under og efter indgrebet.",
  },
  {
    q: "Hvilken metode er bedst til mit barn?",
    a: "Valget af metode afhænger primært af barnets alder. Vi anvender typisk ringmetoden (Circumplast®) til børn under ét år og den klassiske metode til større børn. Ved samtalen i klinikken rådgiver vi om det rette valg for netop jeres barn.",
  },
  {
    q: "Hvor lang tid tager selve indgrebet?",
    a: "Selve det kirurgiske indgreb tager typisk 10–20 minutter. Regn med ca. en time i klinikken i alt, så der er god tid til samtale, forberedelse og ro efter indgrebet.",
  },
  {
    q: "Hvad sker der bagefter og hvem kan jeg kontakte?",
    a: "I får udleveret skriftlig vejledning om efterbehandling og smertelindring derhjemme. Klinikken er tilgængelig via telefon og mail gennem hele helingsforløbet — I er ikke alene når I kommer hjem.",
  },
];

export function FaqTeaser() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-white">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="eyebrow mb-5">06 — Ofte stillede spørgsmål</p>
            <h2 className="display-xl text-[color:var(--color-ink)]">
              Tydelige svar{" "}
              <span className="font-display italic font-light">
                når I har brug for dem.
              </span>
            </h2>
            <p className="mt-8 text-[15px] leading-[1.8] text-[color:var(--color-text-muted)] max-w-md">
              Vi har samlet de spørgsmål, som forældre oftest stiller os — om
              smertelindring, forberedelse, efterbehandling og heling.
            </p>
            <Link
              to="/faq"
              className="btn-outline mt-10"
            >
              Se alle spørgsmål
              <span className="btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
              {FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-start gap-5">
                        <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-text-muted)] pt-1.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-[1.2] tracking-tight text-[color:var(--color-ink)]">
                          {item.q}
                        </span>
                      </span>
                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="shrink-0 w-9 h-9 rounded-full border border-[color:var(--color-border-strong)] flex items-center justify-center text-[color:var(--color-ink)] group-hover:bg-[color:var(--color-ink)] group-hover:text-white transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14M5 12h14" />
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pl-14 pb-8 pr-10 text-[15px] leading-[1.8] text-[color:var(--color-text-muted)] max-w-prose">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
