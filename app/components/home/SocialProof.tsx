// app/components/home/SocialProof.tsx
import { motion } from "framer-motion";

const LOGOS = [
  { name: "Sundhedsstyrelsen", abbr: "SST" },
  { name: "Dansk Medicinsk Selskab", abbr: "DMS" },
  { name: "Region Hovedstaden", abbr: "RH" },
  { name: "ISO 9001:2015", abbr: "ISO" },
  { name: "GDPR Compliant", abbr: "GDPR" },
];

export function SocialProof() {
  return (
    <section className="py-12" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-8"
        >
          Anerkendt af branchen
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.abbr}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-default"
              title={logo.name}
            >
              <div
                className="px-5 py-2.5 rounded-lg border font-semibold text-sm tracking-wide transition-all duration-300"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-muted)",
                  filter: "grayscale(1) opacity(0.6)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.filter = "grayscale(0) opacity(1)";
                  el.style.borderColor = "var(--color-primary)";
                  el.style.color = "var(--color-primary-dark)";
                  el.style.boxShadow = "0 4px 12px rgba(79,209,197,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.filter = "grayscale(1) opacity(0.6)";
                  el.style.borderColor = "var(--color-border)";
                  el.style.color = "var(--color-text-muted)";
                  el.style.boxShadow = "none";
                }}
              >
                {logo.abbr}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
