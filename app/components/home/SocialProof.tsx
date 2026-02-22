// app/components/home/SocialProof.tsx
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  {
    title: "Under proceduren",
    text:
      "Forældre kan være til stede under deres babys omskæring eller vente i et andet behageligt rum.",
  },
  {
    title: "Tillid & sikkerhed",
    text:
      "Vores læger og sygeplejersker arbejder med stor erfaring og faglig ekspertise, så barnet er i trygge hænder.",
  },
  {
    title: "Teknisk ekspertise",
    text:
      "Vi har omfattende erfaring med variationer af forhud og penis samt et særligt fokus på nyfødte og spædbørn.",
  },
  {
    title: "Smertelindring",
    text:
      "Vi tager smertelindring alvorligt og tilbyder forskellige muligheder for at minimere smerter og ubehag.",
  },
];

export function SocialProof() {
  return (
    <section className="py-20" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-5"
        >
          Specialklinik Taastrup
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center font-heading text-3xl md:text-4xl text-secondary mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tryghed, erfaring og faglighed
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 md:p-7"
            >
              <h3 className="font-heading text-xl text-secondary mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                {item.title}
              </h3>
              <p className="text-text-muted leading-[1.7]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
