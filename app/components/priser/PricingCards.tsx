// app/components/priser/PricingCards.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

interface Plan {
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  featured: boolean;
  features: string[];
  cta: string;
  href: string;
}

const PLANS: Plan[] = [
  {
    name: "Konsultation",
    subtitle: "Kom godt i gang",
    price: "595",
    unit: "kr. / konsultation",
    featured: false,
    features: [
      "Individuel vurdering",
      "Faglig rådgivning",
      "Behandlingsplan",
      "Opfølgende mail-support",
    ],
    cta: "Book konsultation",
    href: "/kontakt",
  },
  {
    name: "Behandlingsforløb",
    subtitle: "Vores mest populære",
    price: "2.495",
    unit: "kr. / forløb",
    featured: true,
    features: [
      "Alt i Konsultation",
      "5 behandlingssessioner",
      "Løbende journalføring",
      "Prioriteret booking",
      "30-dages opfølgning",
      "Direkte adgang til behandler",
    ],
    cta: "Start dit forløb",
    href: "/kontakt",
  },
  {
    name: "Komplet Pakke",
    subtitle: "Fuld sundhedsomsorg",
    price: "4.995",
    unit: "kr. / kvartal",
    featured: false,
    features: [
      "Alt i Behandlingsforløb",
      "Ubegrænset konsultationer",
      "Kvartalsvise sundhedstjek",
      "Præventiv medicin",
      "VIP-adgang til klinikken",
    ],
    cta: "Kontakt os",
    href: "/kontakt",
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const inner = (
    <div
      className="flex flex-col h-full p-8"
      style={{
        background: "#FFFFFF",
        borderRadius: plan.featured ? "calc(1rem - 1px)" : "1rem",
        border: plan.featured ? "none" : "1px solid var(--color-border)",
        boxShadow: plan.featured
          ? "0 20px 60px rgba(79,209,197,0.12)"
          : "0 10px 30px rgba(15,23,42,0.05)",
      }}
    >
      {/* Badge */}
      {plan.featured && (
        <div className="mb-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #4FD1C5 0%, #3a8a83 100%)",
            }}
          >
            Mest Populære
          </span>
        </div>
      )}

      {/* Name */}
      <p className="text-text-muted text-sm font-medium mb-2">{plan.subtitle}</p>
      <h3
        className="font-heading text-2xl font-semibold text-secondary mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mb-8">
        <span
          className="font-heading text-5xl font-light text-secondary"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {plan.price}
        </span>
        <p className="text-text-muted text-sm mt-1">{plan.unit}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="text-primary mt-0.5">
              <CheckIcon />
            </span>
            <span className="text-sm text-text leading-[1.6]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={plan.href}
        className={plan.featured ? "btn-gradient justify-center" : "btn-outline justify-center"}
        style={{ width: "100%" }}
      >
        {plan.cta}
      </Link>
    </div>
  );

  if (plan.featured) {
    return (
      <div
        className="flex-1 rounded-2xl"
        style={{
          padding: "1px",
          background: "linear-gradient(135deg, #4FD1C5 0%, #3a8a83 100%)",
        }}
      >
        {inner}
      </div>
    );
  }

  return <div className="flex-1">{inner}</div>;
}

export function PricingCards() {
  return (
    <section className="py-24" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="flex"
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
