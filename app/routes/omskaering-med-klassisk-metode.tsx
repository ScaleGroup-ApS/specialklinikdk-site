import type { Route } from "./+types/omskaering-med-klassisk-metode";
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
    body: "Barnet bedøves med lokalbedøvelse gennem to indstikssteder omkring penis. Bedøvelsen tager kort tid at anlægge, men kan være ubehagelig. Der ventes ca. 15 minutter, til fuld effekt er opnået.",
  },
  {
    num: "02",
    title: "Proceduren",
    body: "Under sterile forhold løsnes huden omkring glans penis, forhuden fjernes med kirurgiske instrumenter, og hudens indre og ydre blad sys sammen med selvopløselig tråd. Forbindingen skal typisk sidde i 24 timer.",
  },
];

const PRECAUTIONS = [
  "Læg et tørt papirtørklæde eller en vaskeklud i bleen for at skærme forbindingen mod afføring.",
  "Smerter behandles med Panodil Junior 24 mg/ml. Dosering: 0,5 ml pr. kilo kropsvægt hver 6. time i 3 dage, derefter ved behov.",
  "Sørg for ubesværet vandladning. Hvis barnet ikke lader vandet inden for 4 timer, kontakt klinikken.",
  "Mindre sivning af blod er normalt. Ved større eller aktiv blødning skal klinikken kontaktes.",
];

const INFLAMMATION = [
  "Let hævelse i området.",
  "Rødme og hævelse af penishovedet.",
  "Hvide/gule fibrinbelægninger, som tørrer ud og falder af over cirka en uge.",
  "Let misfarvning ved indstiksstedet og på undersiden af penis.",
  "Helingstid er normalt ca. 2 uger, med let hævelse op til 3-4 uger.",
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
  if (!data) return [{ title: "Omskæring med klassisk metode | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring med klassisk metode | ${siteName}`,
      description:
        "Information om omskæring med den klassiske metode: bedøvelse, procedure, efterforløb, inflammation og komplikationer.",
      url: `${siteUrl}/omskaering-med-klassisk-metode`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/omskaering-med-klassisk-metode` },
  ];
}

export default function OmskaeringKlassisk({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Klassisk metode"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Omskæring med den"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="klassiske metode."
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
          body="Denne side beskriver, hvordan omskæring med den klassiske metode foregår, hvad I kan forvente efter omskæringen, og hvilke forholdsregler der gælder."
        />

        {/* Feature image */}
        <ContentSection bg="ivory">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] shadow-[0_50px_100px_-40px_rgba(11,16,32,0.25)]">
              <img
                src="/images/Forside-specialklinik-Taastrup%20(2).jpg"
                alt="Kliniske rammer for behandling"
                className="w-full h-[280px] md:h-[400px] object-cover animate-ken-burns"
                loading="lazy"
              />
            </div>
          </motion.div>
        </ContentSection>

        {/* Procedure cards */}
        <ContentSection bg="white">
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
        <ContentSection bg="ivory">
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
            {PRECAUTIONS.map((item, i) => (
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
                Efter 24 timer skal forbindingen blødgøres og fjernes under rindende vand.
                Herefter smøres med Fucidin salve 2% morgen og aften i 7 dage. Vaseline kan
                bruges for at lindre og forhindre fastklistring til ble.
              </p>
            </div>
          </motion.div>
        </ContentSection>

        {/* Inflammation */}
        <ContentSection bg="white">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Normal heling
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-10">
            <AnimatedWords as="span" mode="inView" text="Inflammation" className="block" />
          </h2>

          <div className="space-y-4 max-w-3xl">
            {INFLAMMATION.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="flex items-start gap-4"
              >
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent-warm)] shrink-0" />
                <p className="text-[16px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Complications */}
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
            <AnimatedWords as="span" mode="inView" text="Komplikationer" className="block" />
          </h2>

          <div className="max-w-3xl space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
            >
              Der er en mindre risiko for blødning i det første døgn. Ved pågående blødning
              skal I presse på såret med forbinding og kontakte klinikken. Ved akutte tilfælde
              kontaktes vagtlægen.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
            >
              Infektionsrisikoen er sjælden, men ved tegn som voldsom hævelse, pus, feber,
              påvirket almentilstand eller besværet vandladning skal klinikken kontaktes.
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
