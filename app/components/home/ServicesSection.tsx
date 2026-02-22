// app/components/home/ServicesSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

const SERVICES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Om omskæring",
    description:
      "Læs om proceduren, sikkerheden og vores tilgang til rituel omskæring af drengebørn.",
    href: "/omskaering",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Forberedelse inden omskæring",
    description:
      "En praktisk guide til, hvad I skal være opmærksomme på inden jeres aftale i klinikken.",
    href: "/forberedelse-inden-omskaering",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Klassisk metode",
    description:
      "Vi anvender som udgangspunkt klassisk metode til børn over et år.",
    href: "/omskaering-med-klassisk-metode",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Ringmetoden",
    description:
      "Vi anvender ofte ringmetoden til børn under et år og rådgiver om det rette valg.",
    href: "/omskaering-med-ringmetoden",
  },
];

export function ServicesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--color-surface-dim)" }}
      >
        <div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full animate-blob"
          style={{
            background: "radial-gradient(circle, rgba(79,209,197,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] w-[420px] h-[420px] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle, rgba(126,232,226,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            Operationsteknik
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-medium text-secondary leading-[1.2]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Metoder med fokus på{" "}
            <span className="gradient-text">tryghed og kvalitet</span>
          </motion.h2>
        </div>

        {/* 2×2 glassmorphism grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link to={service.href} className="block h-full group">
                <div
                  className="glass-card p-8 h-full transition-shadow duration-300 group-hover:shadow-[0_20px_60px_rgba(79,209,197,0.15)]"
                >
                  <div className="text-primary mb-6">{service.icon}</div>
                  <h3
                    className="font-heading text-2xl font-semibold text-secondary mb-4 leading-[1.3]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-[1.7] text-base mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    Læs mere
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
