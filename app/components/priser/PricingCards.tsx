// app/components/priser/PricingCards.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tier = {
  ageGroup: string;
  method: string;
  description: string;
  price: string;
  unit: string;
  featured?: boolean;
  note?: string;
};

const TIERS: Tier[] = [
  {
    ageGroup: "0 – 6 måneder",
    method: "Ringmetoden",
    description:
      "Skånsom, sutur-fri metode med forudsigelig heling. Ideel til nyfødte og spædbørn.",
    price: "2.500",
    unit: "kr. · inkl. forsikring",
  },
  {
    ageGroup: "6 måneder – 1 år",
    method: "Ringmetoden",
    description:
      "Samme tilgang med ekstra tid og tilpasning. Lokalbedøvelse og beroligende hvor det er relevant.",
    price: "3.000",
    unit: "kr. · inkl. forsikring",
    featured: true,
    note: "Mest valgte",
  },
  {
    ageGroup: "6 – 11 år",
    method: "Klassisk metode · lokalbedøvelse",
    description:
      "Rolig gennemgang, grundig smertelindring og fokus på tryghed igennem hele besøget.",
    price: "3.500",
    unit: "kr. · inkl. forsikring",
  },
  {
    ageGroup: "2 – 6 år",
    method: "Fuld bedøvelse",
    description:
      "Udføres i fuld bedøvelse. Aftale laves individuelt — kontakt klinikken på mail for planlægning.",
    price: "Efter aftale",
    unit: "Kontakt os",
  },
  {
    ageGroup: "2 – 11 år",
    method: "Fuld bedøvelse · narkoseteam",
    description:
      "Indgreb under fuld bedøvelse med komplet narkoseforløb og efterforløb.",
    price: "9.000",
    unit: "kr. · inkl. forsikring",
  },
];

function Row({ t, i }: { t: Tier; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
      className={[
        "group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-8 md:py-10 border-b border-[color:var(--color-border)]",
        t.featured ? "bg-[color:var(--color-surface-dim)] px-6 md:px-10 -mx-6 md:-mx-10 rounded-2xl border-b-0 md:border md:border-[color:var(--color-border-strong)]" : "",
      ].join(" ")}
    >
      {t.featured && (
        <motion.span
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.2 }}
          className="absolute -top-3 left-6 md:left-10 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.24em] bg-[color:var(--color-ink)] text-white shadow-[0_10px_20px_-8px_rgba(11,16,32,0.45)]"
        >
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent-warm-soft)]">
            <span className="absolute inset-0 rounded-full bg-[color:var(--color-accent-warm-soft)] pulse-dot-outer" />
          </span>
          {t.note ?? "Populær"}
        </motion.span>
      )}

      <div className="md:col-span-3">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[color:var(--color-accent-warm)]">
          Aldersgruppe
        </p>
        <p className="mt-2 font-display text-2xl md:text-[26px] font-light tracking-tight text-[color:var(--color-ink)]">
          {t.ageGroup}
        </p>
      </div>

      <div className="md:col-span-5">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[color:var(--color-text-muted)] mb-2">
          Metode
        </p>
        <p className="text-[15px] font-medium text-[color:var(--color-ink)]">
          {t.method}
        </p>
        <p className="mt-2 text-[14px] leading-[1.7] text-[color:var(--color-text-muted)] max-w-prose">
          {t.description}
        </p>
      </div>

      <div className="md:col-span-2 md:text-right">
        <p className="font-display text-[40px] md:text-[44px] font-light leading-none tracking-tight text-[color:var(--color-ink)]">
          {t.price}
        </p>
        <p className="text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] mt-1">
          {t.unit}
        </p>
      </div>

      <div className="md:col-span-2 md:justify-self-end">
        <Link
          to="/booking"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-ink)] animated-link"
        >
          Book tid
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

export function PricingCards() {
  return (
    <section className="relative bg-white">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Prisoversigt</p>
            <h2 className="display-xl text-[color:var(--color-ink)]">
              <AnimatedWords
                as="span"
                mode="inView"
                text="Pris efter"
                className="block"
              />
              <span className="relative inline-block">
                <span className="font-display italic font-light">alder & metode.</span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={0.7}
                />
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
              Alle priser er inklusive lovpligtig patientforsikring, samtale
              inden indgrebet og skriftlig efterbehandlingsvejledning. Kontakt
              os hvis I er i tvivl om, hvad der er bedst for jeres barn.
            </p>
          </div>
        </div>

        <div className="border-t border-[color:var(--color-border)]">
          {TIERS.map((t, i) => (
            <Row key={`${t.ageGroup}-${t.method}`} t={t} i={i} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <p className="text-[15px] text-[color:var(--color-text-muted)] max-w-lg">
            Vi anbefaler ofte omskæring i fuld bedøvelse til børn over
            spædbarnsalderen. Kontakt klinikken for individuel rådgivning.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/booking" className="btn-gradient">
              Book tid online
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
