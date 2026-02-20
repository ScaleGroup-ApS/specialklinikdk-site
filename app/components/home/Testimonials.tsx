// app/components/home/Testimonials.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "ABB Medical har ændret mit liv. Den personlige omsorg og den faglige ekspertise er i en klasse for sig. Jeg ville ønske, jeg var startet her langt tidligere.",
    name: "Maria K.",
    info: "Patient, Hudterapi",
  },
  {
    quote:
      "Efter min sportsskade var jeg dybt frustreret. ABB Medicals team fik mig hurtigt tilbage på banen med en struktureret og professionel behandlingsplan.",
    name: "Thomas B.",
    info: "Patient, Sportsskader & Fysioterapi",
  },
  {
    quote:
      "Den diskrete og respektfulde tilgang til behandling gav mig tryghed fra første dag. Præventiv medicin har nu en helt ny betydning for mig.",
    name: "Anne-Sofie L.",
    info: "Patient, Præventiv Medicin",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section
      className="py-32"
      style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            Patientoplevelser
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-medium text-secondary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Hvad siger vores{" "}
            <span className="gradient-text">patienter</span>
          </motion.h2>
        </div>

        {/* Testimonial area */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[260px]">
            {/* Decorative large quote mark */}
            <div
              className="absolute top-0 left-0 select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "220px",
                lineHeight: 0.9,
                color: "var(--color-primary)",
                opacity: 0.06,
              }}
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative grid md:grid-cols-[1fr_200px] gap-12 items-center"
              >
                <blockquote>
                  <p
                    className="font-heading text-2xl md:text-3xl text-secondary italic leading-[1.55] mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-semibold text-secondary text-base">
                      {TESTIMONIALS[current].name}
                    </p>
                    <p className="text-text-muted text-sm mt-1">
                      {TESTIMONIALS[current].info}
                    </p>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Vis udtalelse ${i + 1}`}
                style={{
                  width: i === current ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "999px",
                  background:
                    i === current ? "var(--color-primary)" : "var(--color-border)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
