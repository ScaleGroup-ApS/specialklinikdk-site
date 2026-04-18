import type { Route } from "./+types/omskaering-med-fuld-bedoevelse";
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
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const KEY_FACTS = [
  { label: "Alderskrav", value: "Fyldt 4 år" },
  { label: "Minimumsvægt", value: "20 kg" },
  { label: "Tidsbestilling", value: "Kun via e-mail" },
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
  if (!data) return [{ title: "Omskæring med fuld bedøvelse | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring med fuld bedøvelse | ${siteName}`,
      description:
        "Information om omskæring under narkose eller sedation, booking og praktiske kriterier.",
      url: `${siteUrl}/omskaering-med-fuld-bedoevelse`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/omskaering-med-fuld-bedoevelse` },
  ];
}

export default function OmskaeringFuldBedoevelse({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Fuld bedøvelse · Narkose & sedation"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Omskæring under"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="fuld bedøvelse."
                  className="font-display italic font-light"
                  delay={0.3}
                />
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={1.1}
                />
              </span>
            </>
          }
          body="Vi tilbyder omskæring af drengebørn i fuld bedøvelse eller sedation med fokus på sikkerhed, tryghed og komfort."
        />

        {/* Key facts + content */}
        <ContentSection bg="ivory">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Omskæring under narkose er forbeholdt drenge,
                som er fyldt 4 år og vejer mindst 20 kg.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                For at arrangere tid til omskæring under narkose eller sedation skal I kontakte
                klinikken via e-mail. Tidsbestilling til denne type forløb kan ikke foretages
                online.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Klinikken planlægger herefter forløbet sammen med jer, så tidspunkt og
                rammer passer bedst muligt til barnet og familien.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Har I spørgsmål eller behov for yderligere information, er I velkomne til at
                kontakte os. Vi står altid klar til at hjælpe.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="lg:col-span-4 lg:col-start-9"
            >
              <div className="card-elevated p-8">
                <span className="sticker sticker-warm mb-6 inline-flex">
                  Vigtig info
                </span>
                <dl className="space-y-5">
                  {KEY_FACTS.map((fact) => (
                    <div key={fact.label}>
                      <dt className="eyebrow mb-1">{fact.label}</dt>
                      <dd className="font-display text-[1.5rem] font-light text-[color:var(--color-ink)]">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 pt-6 border-t border-[color:var(--color-border)]">
                  <p className="text-[14px] text-[color:var(--color-text-muted)] mb-4">
                    Kontakt os for tidsbestilling:
                  </p>
                  <a
                    href="mailto:kontakt@specialklinik.dk"
                    className="btn-gradient inline-flex items-center"
                  >
                    Skriv til os
                    <span className="btn-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </ContentSection>

        <PatientTestimonials />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
