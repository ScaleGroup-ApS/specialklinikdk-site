// app/components/priser/PricingHero.tsx
import { motion } from "framer-motion";

export function PricingHero() {
  return (
    <section
      className="text-center"
      style={{
        paddingTop: "160px",
        paddingBottom: "96px",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
        >
          Transparente priser
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl md:text-6xl font-medium text-secondary leading-[1.1] tracking-tight mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Priser &{" "}
          <span className="gradient-text">Forløb</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-text-muted leading-[1.7] mx-auto"
          style={{ maxWidth: "600px" }}
        >
          Vi tror på fuld transparens. Her finder du en oversigt over vores
          priser. Kontakt os for et skræddersyet forløb.
        </motion.p>
      </div>
    </section>
  );
}
