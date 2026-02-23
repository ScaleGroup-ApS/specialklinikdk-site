const TESTIMONIALS = [
  {
    quote:
      "Vi følte os trygge fra første kontakt. Informationen før og efter indgrebet var tydelig, og personalet var meget imødekommende.",
    name: "Forælder, Taastrup",
  },
  {
    quote:
      "Hele forløbet var professionelt og roligt. Vi fik klare råd om smertelindring og hvad vi skulle være opmærksomme på derhjemme.",
    name: "Forælder, København",
  },
  {
    quote:
      "Booking og kommunikation fungerede virkelig godt. Klinikken svarede hurtigt på vores spørgsmål, og vi følte os i sikre hænder.",
    name: "Forælder, Brøndby",
  },
];

export function PatientTestimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-16">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
          Patientoplevelser
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-secondary">
          Hvad siger forældrene?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((item) => (
          <article key={item.name} className="glass-card card-hover p-6">
            <p className="text-text-muted leading-[1.8] mb-4">"{item.quote}"</p>
            <p className="text-secondary font-semibold text-sm">{item.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
