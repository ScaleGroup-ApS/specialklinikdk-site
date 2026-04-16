// app/components/home/ServicesSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

const EASE = [0.22, 1, 0.36, 1] as const;

type Method = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  meta: string;
  href: string;
};

const METHODS: Method[] = [
  {
    index: "01",
    title: "Klassisk metode",
    tagline: "Erfaren, præcis, velafprøvet",
    description:
      "Vores foretrukne tilgang til børn over et år. Indgrebet udføres skånsomt i lokalbedøvelse med fokus på præcision og et roligt forløb.",
    meta: "Alder: 12 mdr. +",
    href: "/omskaering-med-klassisk-metode",
  },
  {
    index: "02",
    title: "Ringmetoden",
    tagline: "Skånsom til nyfødte",
    description:
      "Circumplast® anvendes typisk til børn under et år. En særligt skånsom, sutur-fri metode der giver forudsigelig heling og minimal efterbehandling.",
    meta: "Alder: 0–12 mdr.",
    href: "/omskaering-med-ringmetoden",
  },
  {
    index: "03",
    title: "Fuld bedøvelse",
    tagline: "For de mellemstore børn",
    description:
      "For drengebørn i aldersgruppen, hvor lokalbedøvelse ikke er hensigtsmæssig, tilbyder vi omskæring under fuld bedøvelse i trygge rammer.",
    meta: "Alder: 2–11 år",
    href: "/omskaering-med-fuld-bedoevelse",
  },
  {
    index: "04",
    title: "Forberedelse",
    tagline: "Før I møder op",
    description:
      "En praktisk guide med alt det, I som forældre skal være opmærksomme på inden aftalen — så dagen bliver så rolig som mulig for jer og barnet.",
    meta: "For forældre",
    href: "/forberedelse-inden-omskaering",
  },
];

export function ServicesSection() {
  return (
    <section
      id="metoder"
      className="relative overflow-hidden"
      style={{ background: "var(--color-surface-dim)" }}
    >
      <div aria-hidden className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">03 — Metoder & forløb</p>
            <h2 className="display-xl text-[color:var(--color-ink)]">
              Valget af metode{" "}
              <span className="font-display italic font-light">
                tilpasses jeres barn.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
              Vi anvender de metoder, som er bedst dokumenteret og mest skånsomme
              i den pågældende aldersgruppe — og vi rådgiver jer om det rette
              valg i en ærlig, afklarende samtale.
            </p>
          </div>
        </div>

        {/* Editorial 2×2 grid with hairline rule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--color-border)] rounded-[1.5rem] overflow-hidden border border-[color:var(--color-border)]">
          {METHODS.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              className="bg-white"
            >
              <Link
                to={m.href}
                className="group block h-full p-8 md:p-10 relative overflow-hidden"
              >
                {/* Hover fill */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[color:var(--color-ink)] translate-y-full group-hover:translate-y-0 transition-transform duration-[650ms]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-10">
                    <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-text-muted)] group-hover:text-[color:var(--color-text-on-dark-muted)] transition-colors duration-500">
                      {m.index}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.24em] px-3 py-1 rounded-full border border-[color:var(--color-border-strong)] text-[color:var(--color-text-muted)] group-hover:text-[color:var(--color-text-on-dark-muted)] group-hover:border-white/20 transition-colors duration-500">
                      {m.meta}
                    </span>
                  </div>

                  <h3 className="display-lg text-[color:var(--color-ink)] group-hover:text-white transition-colors duration-500 mb-3">
                    {m.title}
                  </h3>
                  <p className="font-display italic text-[color:var(--color-primary-dark)] group-hover:text-[color:var(--color-accent-warm-soft)] text-lg mb-6 transition-colors duration-500">
                    {m.tagline}
                  </p>
                  <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)] group-hover:text-[color:var(--color-text-on-dark-muted)] max-w-prose transition-colors duration-500">
                    {m.description}
                  </p>

                  <span className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-[color:var(--color-ink)] group-hover:text-white transition-colors duration-500">
                    Læs mere
                    <span className="w-10 h-px bg-current" />
                    <svg
                      className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.6}
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
