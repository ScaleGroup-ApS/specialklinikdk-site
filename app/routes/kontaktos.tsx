import type { Route } from "./+types/kontaktos";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { PatientTestimonials } from "~/components/PatientTestimonials";
import { CtaBand } from "~/components/home/CtaBand";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { MagneticButton } from "~/components/motion/MagneticButton";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTACT_ITEMS = [
  {
    label: "Telefon",
    value: "20 76 35 16",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
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
  {
    label: "CVR",
    value: "44505975",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  let siteInfo: WpSiteInfo | null = null;
  try {
    siteInfo = await getSiteInfo().catch(() => null);
  } catch {
    // graceful degradation
  }
  return { siteInfo, siteUrl };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Kontakt os | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Kontakt os | ${siteName}`,
      description:
        "Kontakt Specialklinik Taastrup ved spørgsmål om omskæring, booking og forberedelse.",
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
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

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
                  <a href="tel:+4520763516" className="btn-gradient inline-flex justify-center items-center">
                    Ring nu
                    <span className="btn-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </a>
                  <a href="mailto:kontakt@specialklinik.dk" className="btn-outline inline-flex justify-center items-center">
                    Skriv e-mail
                  </a>
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
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow mb-4"
            >
              Kontaktformular
            </motion.p>
            <h2 className="display-lg text-[color:var(--color-ink)] mb-4">
              <AnimatedWords as="span" mode="inView" text="Send os en besked" className="block" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)] mb-10"
            >
              Udfyld formularen, så vender vi tilbage hurtigst muligt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <form
                action="mailto:kontakt@specialklinik.dk"
                method="post"
                encType="text/plain"
                className="card-elevated p-8 md:p-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Fulde navn *
                    </span>
                    <input
                      type="text"
                      name="fulde_navn"
                      required
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Telefon *
                    </span>
                    <input
                      type="tel"
                      name="telefon"
                      required
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Email *
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-[13px] font-semibold text-[color:var(--color-ink)] mb-1.5 block">
                      Besked
                    </span>
                    <textarea
                      name="besked"
                      rows={5}
                      className="w-full rounded-lg border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/40 transition-shadow resize-y"
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <MagneticButton strength={6}>
                    <button type="submit" className="btn-gradient">
                      Send besked
                      <span className="btn-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </button>
                  </MagneticButton>
                </div>
              </form>
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

        <PatientTestimonials />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
