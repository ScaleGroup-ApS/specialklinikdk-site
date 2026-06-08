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
    body: "Forhuden løsnes fra glans penis. En plastikring placeres omkring penishovedet, huden trækkes ud over ringen, og en stram snor bindes på niveauet for omskæringen. Overskydende hud klippes væk, og ringen falder typisk selv af efter 5-10 dage.",
  },
];

const AFTERCARE = [
  "Læg et tørt papirtørklæde eller en vaskeklud i bleen for at skærme operationsområdet mod afføring og urenheder.",
  "Smertebehandling med Panodil Junior 24 mg/ml: 0,5 ml pr. kilo kropsvægt hver 6. time i 2 dage, derefter ved behov.",
  "Sørg for ubesværet vandladning inden for 6-8 timer efter indgrebet. Sker det ikke, kontakt klinikken.",
  "Det første døgn: kig i bleen cirka hver time – og et par gange om natten – for at sikre, at der ikke er en aktiv blødning. 1-2 dråber blod i området eller bleen er normalt; ved pågående blødning kontaktes klinikken eller vagtlægen.",
  "Skyl med håndbruser efter hvert bleskifte, hvis der er afføring eller en stor våd ble.",
  "Karbad efter behov i cirka 5 minutter. I må gerne bruge babyolie eller babyshampoo i vandet.",
  "Fra dag 2 smøres med Fucidin salve 2% morgen og aften i 7 dage – et tyndt lag på den overskydende hud udenpå ringen. Træk ikke i snorene eller i ringen.",
];

const HIDDEN_PENIS = [
  "Hos nogle spæd- og småbørn er der et større fedtlag omkring penis på maveskindet, og huden omkring penis dækker ofte en del af penishovedet. Fedtet kan skubbe huden frem, så penis ligger gemt i en ’fedtpude’ – nogle forældre oplever, at det ser ud, som om barnet ikke er omskåret. Det er en helt normal tilstand.",
  "Skub i de tilfælde forsigtigt huden tilbage, i det omfang den dækker glans penis, for at forebygge adhærencer (sammenklistring) mellem huden og penishovedet. Smør jævnligt en fed creme eller vaseline mellem huden og kanten af penishovedet for at forebygge, at det klistrer sammen.",
  "Hos nogle spædbørn kan penis gemme sig i maveskindet i måneder til år. Det er normalt og ikke en følge af omskæringen. Skub blot huden ned med jævne mellemrum, og rens området, så der ikke samler sig urenheder. Når barnet vokser og taber sig, kommer penis mere frem og bliver synlig.",
];

const INFLAMMATION = [
  "Let hævelse, misfarvning og rødme kan være til stede, indtil ringen falder af, og aftager herefter. Hævelsen kan tiltage og aftage flere gange i løbet af helingsperioden.",
  "Sårbelægninger/fibrin rundt om ringen og hvide/gule belægninger inde i ringen på glans penis er normalt og skal ikke forsøges fjernet. De tørrer ud og falder selv af i løbet af et par uger.",
  "Let misfarvning ved indstiksstedet og på undersiden af penis, mellem penis og pungen, er normalt.",
  "Helingstiden er normalt cirka to uger, mens der kan være let hævelse i op til tre-fire uger. Det kosmetiske resultat kan først vurderes efter cirka seks uger.",
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
                Ringen falder selv af efter 5-10 dage sammen med den overskydende hud, der
                gradvist nekrotiserer og bliver bleg eller evt. sort. Falder ringen ikke af
                inden for 14 dage – eller er der voldsom hævelse, smerter og besværet
                vandladning – skal klinikken kontaktes.
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
            Normal heling
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-10">
            <AnimatedWords as="span" mode="inView" text="Inflammation og belægninger" className="block" />
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
        <ContentSection bg="white">
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
              Der er en mindre risiko for blødning i det første døgn. Ved en pågående blødning
              skal klinikken kontaktes – ved akutte tilfælde kontaktes vagtlægen.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
            >
              Infektionsrisikoen er til stede, men meget sjælden. Ved tegn som voldsom
              hævelse, sivning af pus, rødme, varme, feber, påvirket almentilstand eller
              besværet vandladning skal klinikken kontaktes.
            </motion.p>
          </div>
        </ContentSection>

        {/* Hidden penis / fat pad */}
        <ContentSection bg="ivory">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Efter ringen er faldet af
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-8">
            <AnimatedWords as="span" mode="inView" text="Skjult penis (fedtpude)" className="block" />
          </h2>

          <div className="max-w-3xl space-y-6">
            {HIDDEN_PENIS.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </ContentSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
