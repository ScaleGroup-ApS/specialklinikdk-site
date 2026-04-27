import { motion } from "framer-motion";
import { Link } from "react-router";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { AccordionList } from "~/components/shared/AccordionList";

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
  return (
    <section className="relative bg-white">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="mb-5 flex items-center gap-3">
              <span className="sticker sticker-warm">
                <span className="text-base leading-none">💡</span>
                Spørgsmål & svar
              </span>
            </div>
            <h2 className="display-xl text-[color:var(--color-ink)]">
              <AnimatedWords
                as="span"
                mode="inView"
                text="Tydelige svar"
                className="block"
              />
              <span className="relative inline-block">
                <span className="font-display italic font-light">
                  når I har brug for dem.
                </span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={0.7}
                  variant="scribble"
                />
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
            <AccordionList items={FAQ} defaultOpen={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
