import type { Route } from "./+types/omskaering-med-ringmetoden";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { ReviewsSlider } from "~/components/ReviewsSlider";
import { CtaBand } from "~/components/home/CtaBand";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROCEDURE = [
  {
    num: "01",
    title: "Bedøvelse",
    body: "Barnet bedøves med lokalbedøvelse gennem to indstikssteder omkring penis. Tryllecreme inden fremmøde anbefales. Efter anlæggelse af bedøvelse ventes ca. 10-20 minutter for fuld effekt.",
  },
  {
    num: "02",
    title: "Proceduren",
    body: "Forhuden løsnes fra glans penis. En plastikring placeres omkring penishovedet, huden trækkes ud over ringen, og en stram snor bindes på niveauet for omskæringen. Overskydende hud klippes væk, og ringen falder typisk af efter 5-14 dage.",
  },
];

const AFTERCARE = [
  "Skærm området mod afføring med tørt papirtørklæde/vaskeklud i bleen.",
  "Smertebehandling med Panodil Junior 24 mg/ml: 0,5 ml pr. kilo kropsvægt hver 6. time i 3 dage, derefter ved behov.",
  "Sørg for ubesværet vandladning. Kontakt klinikken hvis barnet ikke lader vandet inden for 6 timer.",
  "Mindre blodpletter er normalt. Ved større eller aktiv blødning kontaktes klinikken straks.",
  "Start Fucidin salve 2% dagen efter omskæring, morgen og aften i en uge.",
  "Giv dagligt karbad i 5-10 min for at fremskynde processen, hvor ringen slipper.",
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
  if (!data) return [{ title: "Omskæring med ringmetoden | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring med ringmetoden | ${siteName}`,
      description:
        "Information om Circumplast® ringmetoden: procedure, efterforløb, inflammation og komplikationer.",
      url: `${siteUrl}/omskaering-med-ringmetoden`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/omskaering-med-ringmetoden` },
  ];
}

export default function OmskaeringRingmetoden({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Ringmetoden · Circumplast®"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Omskæring med"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="ringmetoden."
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
        />

        {/* Intro */}
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
                Specialklinik Taastrup tilbyder ringmetoden med Circumplast®. Circumplast® er
                en avanceret ring til omskæring af drenge, som i flere studier er forbundet med
                lavere risiko for komplikationer sammenlignet med traditionelle ringe.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Circumplast® har en unik cylindrisk form og er produceret af Novadien
                Healthcare. Ringen er godkendt af både FDA og UKCA.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="lg:col-span-4 lg:col-start-9"
            >
              <div className="card-elevated p-8">
                <span className="sticker sticker-warm mb-5 inline-flex">
                  FDA & UKCA godkendt
                </span>
                <p className="font-display italic font-light text-[1.25rem] leading-[1.4] text-[color:var(--color-ink)]">
                  Lavere risiko for komplikationer sammenlignet med traditionelle ringe.
                </p>
              </div>
            </motion.div>
          </div>
        </ContentSection>

        {/* Feature image */}
        <ContentSection bg="white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] shadow-[0_50px_100px_-40px_rgba(11,16,32,0.25)]">
              <img
                src="/images/Klinikken-scaled%20(1).jpg"
                alt="Trygge omgivelser hos Specialklinik Taastrup"
                className="w-full h-[280px] md:h-[400px] object-cover animate-ken-burns"
                loading="lazy"
              />
            </div>
          </motion.div>
        </ContentSection>

        {/* Procedure cards */}
        <ContentSection bg="ivory">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Forløbet
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-12">
            <AnimatedWords as="span" mode="inView" text="Trin for trin" className="block" />
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {PROCEDURE.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                className="card-elevated p-8 glow-on-hover"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[color:var(--color-surface-dim)] text-[color:var(--color-accent-warm)] text-[13px] font-semibold tracking-wide mb-5">
                  {step.num}
                </span>
                <h3 className="font-heading text-xl font-medium text-[color:var(--color-ink)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Aftercare */}
        <ContentSection bg="white">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Forholdsregler
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-10">
            <AnimatedWords as="span" mode="inView" text="Efter omskæring" className="block" />
          </h2>

          <div className="space-y-4 max-w-3xl">
            {AFTERCARE.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="flex items-start gap-5"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[color:var(--color-border-strong)] text-[color:var(--color-accent-warm)] text-[12px] font-semibold shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[16px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-10 max-w-3xl"
          >
            <div className="card-ivory p-8 rounded-[1.25rem] border-l-4 border-l-[color:var(--color-accent-warm)]">
              <p className="text-[16px] leading-[1.8] text-[color:var(--color-text-muted)]">
                Sjældent falder ringen ikke af inden for 14 dage. I sådanne tilfælde eller ved
                besværet vandladning og mange smerter skal klinikken kontaktes.
              </p>
            </div>
          </motion.div>
        </ContentSection>

        {/* Inflammation */}
        <ContentSection bg="ivory">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Vigtig information
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-8">
            <AnimatedWords as="span" mode="inView" text="Inflammation og komplikationer" className="block" />
          </h2>

          <div className="max-w-3xl space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
            >
              Let til moderat hævelse, rødme og belægninger kan være en normal del af
              helingen. Der er en mindre risiko for blødning i det første døgn og en sjælden
              risiko for infektion. Ved tegn på infektion, feber, pus eller besværet
              vandladning skal klinikken kontaktes.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
            >
              Når ringen er faldet af og såret er helet, kan jævnlig pleje med fed creme eller
              vaseline hjælpe med at forebygge sammenklistring hos børn med tendens til
              skjult penis.
            </motion.p>
          </div>
        </ContentSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
