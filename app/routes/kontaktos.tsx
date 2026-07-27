import type { Route } from "./+types/kontaktos";
import { motion } from "framer-motion";
import { useFetcher } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { ReviewsSlider } from "~/components/ReviewsSlider";
import { CtaBand } from "~/components/home/CtaBand";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { MagneticButton } from "~/components/motion/MagneticButton";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { action as kontaktSendAction } from "./kontakt-send";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTACT_ITEMS = [
  {
    label: "Email",
    value: "kontakt@specialklinik.dk",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Adresse",
    value: "Taastrup Hovedgade 80, 2. th\n2630 Taastrup",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
];

// Reassurance points shown alongside the form — reduces friction and answers
// the "what happens if I send this" hesitation that costs conversions.
const TRUST_POINTS = [
  {
    title: "Svar inden for 24 timer",
    body: "På hverdage vender vi tilbage samme eller næste dag.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Fortroligt og diskret",
    body: "Dine oplysninger behandles GDPR-sikkert og deles aldrig.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Helt uforpligtende",
    body: "Still spørgsmål frit — du binder dig ikke til noget.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

// Optional topic — guides the visitor and pre-qualifies the enquiry for the
// clinic. Folded into the message body server-side (see /kontakt-send action).
const CONTACT_TOPICS = [
  "Book en tid til omskæring",
  "Spørgsmål om priser",
  "Spørgsmål om metode eller bedøvelse",
  "Forberedelse og efterforløb",
  "Andet",
];

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Kontakt Specialklinik Taastrup | Få svar på dine spørgsmål om omskæring" }];
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: "Kontakt Specialklinik Taastrup | Få svar på dine spørgsmål om omskæring",
      description:
        "Har du spørgsmål om omskæring, eller vil du booke en tid til en professionel omskæringsprocedure? Kontakt Specialklinik Taastrup i dag. Vi tilbyder vores patienter en sikker og effektiv behandling, udført af erfarne læger.",
      url: `${siteUrl}/kontakt-os`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/kontakt-os` },
  ];
}

export default function KontaktOs({ loaderData }: Route.ComponentProps) {
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";
  const fetcher = useFetcher<typeof kontaktSendAction>();
  const isSubmitting = fetcher.state !== "idle";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Kontakt · Vi er klar til at hjælpe"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Kontakt"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="klinikken."
                  className="font-display italic font-light"
                  delay={0.25}
                />
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={1.0}
                />
              </span>
            </>
          }
          body="Vi er her for at hjælpe jer med spørgsmål om omskæring, booking og forberedelse. Vores team giver jer tydelig information og støtte gennem hele forløbet."
        />

        {/* Contact grid */}
        <ContentSection bg="ivory">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-5"
            >
              <div className="card-elevated p-8">
                <h2 className="font-heading text-xl font-medium text-[color:var(--color-ink)] mb-6">
                  Hurtig kontakt
                </h2>
                <div className="space-y-5 mb-8">
                  {CONTACT_ITEMS.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <svg
                        className="w-5 h-5 text-[color:var(--color-accent-warm)] mt-0.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={item.icon}
                        />
                      </svg>
                      <div>
                        <p className="eyebrow text-[11px] mb-1">{item.label}</p>
                        <p className="text-[15px] text-[color:var(--color-ink)] whitespace-pre-line">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="mailto:kontakt@specialklinik.dk" className="btn-gradient inline-flex justify-center items-center">
                    Skriv e-mail
                    <span className="btn-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-[color:var(--color-border)]">
                  <div className="flex items-start gap-4">
                    <svg
                      className="w-5 h-5 text-[color:var(--color-accent-warm)] mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <p className="eyebrow text-[11px] mb-1">Akut telefon</p>
                      <a
                        href="tel:+4520763516"
                        className="text-[15px] font-semibold text-[color:var(--color-ink)] animated-link"
                      >
                        20 76 35 16
                      </a>
                      <p className="mt-2 text-[13px] leading-[1.7] text-[color:var(--color-text-muted)]">
                        Kun akutte henvendelser efter omskæring – øvrige
                        spørgsmål bedes sendt på mail.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] shadow-[0_50px_100px_-40px_rgba(11,16,32,0.25)]">
                <img
                  src="/images/Klinikken-scaled%20(1).jpg"
                  alt="Specialklinik Taastrup kliniklokaler"
                  className="w-full h-[320px] md:h-[440px] object-cover animate-ken-burns"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </ContentSection>

        {/* Contact form */}
        <ContentSection bg="white">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Reassurance / value panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <p className="eyebrow mb-4">Kontaktformular</p>
              <h2 className="display-lg text-[color:var(--color-ink)] mb-5">
                <AnimatedWords as="span" mode="inView" text="Send os en" className="block" />
                <span className="relative inline-block">
                  <span className="font-display italic font-light">besked.</span>
                  <HandDrawnUnderline
                    className="absolute left-0 right-0 -bottom-1 w-full h-3"
                    delay={0.6}
                  />
                </span>
              </h2>
              <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)] mb-9 max-w-md">
                Skriv til os om omskæring, priser eller forberedelse — vi læser
                hver besked personligt og vender tilbage med et klart, konkret
                svar. Det tager under et minut at udfylde.
              </p>

              <ul className="space-y-5 mb-9">
                {TRUST_POINTS.map((point) => (
                  <li key={point.title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-surface-dim)] border border-[color:var(--color-border)]">
                      <svg
                        className="w-5 h-5 text-[color:var(--color-accent-warm)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={point.icon}
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-[color:var(--color-ink)]">
                        {point.title}
                      </p>
                      <p className="mt-0.5 text-[13px] leading-[1.6] text-[color:var(--color-text-muted)]">
                        {point.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Social proof — mirrors the numbers used across the site */}
              <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-dim)] p-4">
                <div
                  className="flex text-[color:var(--color-accent-warm)]"
                  aria-hidden
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.47L12 14.77 7.06 17.37 8 11.9 4 8l5.61-1.16L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[13px] leading-[1.5] text-[color:var(--color-ink)]">
                  <span className="font-semibold">4.9 / 5</span> i vurdering ·
                  1000+ familier har valgt Specialklinik Taastrup
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <fetcher.Form
                method="post"
                action="/kontakt-send"
                className="card-elevated p-8 md:p-10"
              >
                {/* Honeypot — hidden from real visitors, invisible to screen readers via
                    aria-hidden, and skipped in tab order. Bots that fill every field
                    blindly trip it; the action route silently no-ops on a filled value. */}
                <div aria-hidden className="absolute w-0 h-0 overflow-hidden opacity-0">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <p className="text-[13px] text-[color:var(--color-text-muted)] mb-6">
                  Felter markeret med <span className="text-[color:var(--color-accent-warm)]">*</span> er påkrævet.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Fulde navn <span className="text-[color:var(--color-accent-warm)]">*</span>
                    </span>
                    <input
                      type="text"
                      name="fulde_navn"
                      required
                      autoComplete="name"
                      placeholder="Fx Sara Hansen"
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Telefon
                    </span>
                    <input
                      type="tel"
                      name="telefon"
                      autoComplete="tel"
                      placeholder="Fx 20 76 35 16"
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Email <span className="text-[color:var(--color-accent-warm)]">*</span>
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="din@email.dk"
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Hvad drejer det sig om?
                    </span>
                    <select
                      name="emne"
                      defaultValue=""
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow"
                    >
                      <option value="" disabled>
                        Vælg et emne (valgfrit)
                      </option>
                      {CONTACT_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Besked
                    </span>
                    <textarea
                      name="besked"
                      rows={5}
                      placeholder="Skriv gerne dit spørgsmål eller ønsket tidspunkt, så kan vi svare præcist."
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow resize-y"
                    />
                  </label>
                </div>

                {fetcher.data && (
                  <p
                    role="status"
                    className={`mt-6 flex items-start gap-2 text-[14px] ${
                      fetcher.data.ok
                        ? "text-[color:var(--color-ink)]"
                        : "text-red-600"
                    }`}
                  >
                    {fetcher.data.ok && (
                      <svg className="w-5 h-5 shrink-0 text-[color:var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span>
                      {fetcher.data.ok
                        ? "Tak for din besked! Vi vender tilbage til dig hurtigst muligt."
                        : ("error" in fetcher.data ? fetcher.data.error : undefined) ??
                          "Der opstod en fejl. Prøv venligst igen."}
                    </span>
                  </p>
                )}

                <div className="mt-7">
                  <MagneticButton strength={6}>
                    <button type="submit" disabled={isSubmitting} className="btn-gradient w-full sm:w-auto disabled:opacity-60">
                      {isSubmitting ? "Sender..." : "Send besked"}
                      <span className="btn-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </button>
                  </MagneticButton>

                  <p className="mt-4 flex items-start gap-2 text-[13px] leading-[1.6] text-[color:var(--color-text-muted)]">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--color-accent-warm)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Vi svarer typisk inden for 24 timer. Dine oplysninger
                    behandles fortroligt og deles aldrig med tredjepart.
                  </p>
                </div>
              </fetcher.Form>
            </motion.div>
          </div>
        </ContentSection>

        {/* Map */}
        <ContentSection bg="ivory">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Find klinikken
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-4">
            <AnimatedWords as="span" mode="inView" text="Kort & rutevejledning" className="block" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)] mb-10 max-w-xl"
          >
            Taastrup S-togsstation ligger cirka 450 meter fra klinikken. Der er gratis
            parkering foran klinikken.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="card-elevated overflow-hidden">
              <iframe
                title="Kort over Specialklinik Taastrup"
                src="https://maps.google.com/maps?q=Taastrup%20Hovedgade%2080%2C%202630%20Taastrup&z=15&output=embed"
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </ContentSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
