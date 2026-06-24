import { motion } from "framer-motion";
import { Link } from "react-router";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { AccordionList } from "~/components/shared/AccordionList";
import { FRONTPAGE_FAQ } from "~/lib/faq";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQ = FRONTPAGE_FAQ;

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

            <div className="hidden lg:block mt-12 relative overflow-hidden rounded-[1.25rem] border border-[color:var(--color-border)] shadow-[0_30px_60px_-30px_rgba(11,16,32,0.2)]">
              <img
                src="/images/Klinikken-scaled%20(1).jpg"
                alt="Specialklinik Taastrup — kliniklokaler"
                className="w-full h-[260px] object-cover animate-ken-burns"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <AccordionList items={FAQ} defaultOpen={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
