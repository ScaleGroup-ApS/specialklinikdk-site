import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TESTIMONIALS = [
  {
    quote:
      "Vi følte os trygge fra første kontakt. Informationen før og efter indgrebet var tydelig, og personalet var meget imødekommende.",
    name: "Mette & Anders",
    info: "Forælder, Taastrup",
  },
  {
    quote:
      "Hele forløbet var professionelt og roligt. Vi fik klare råd om smertelindring og hvad vi skulle være opmærksomme på derhjemme.",
    name: "Sara H.",
    info: "Forælder, København",
  },
  {
    quote:
      "Booking og kommunikation fungerede virkelig godt. Klinikken svarede hurtigt på vores spørgsmål, og vi følte os i sikre hænder.",
    name: "Yusuf & Amal",
    info: "Forælder, Brøndby",
  },
];

export function PatientTestimonials() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-24 md:mt-28">
      <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-5">Forældreoplevelser</p>
          <h2 className="display-lg text-[color:var(--color-ink)]">
            Hvad siger{" "}
            <span className="font-display italic font-light">forældrene?</span>
          </h2>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
            Ærlige ord fra familier, som har valgt at lægge indgrebet i vores
            hænder.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)] rounded-2xl overflow-hidden">
        {TESTIMONIALS.map((item, i) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            className="bg-white p-8 flex flex-col justify-between min-h-[220px]"
          >
            <p className="font-display italic text-[color:var(--color-ink)] text-lg leading-[1.5] tracking-tight">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-8 pt-5 border-t border-[color:var(--color-border)]">
              <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                {item.name}
              </p>
              <p className="text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] mt-1">
                {item.info}
              </p>
            </footer>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
