import type { Route } from "./+types/omskaering-med-ringmetoden";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { ReviewsSlider } from "~/components/ReviewsSlider";
import { CtaBand } from "~/components/home/CtaBand";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import {
  InfoSection,
  BulletList,
  Prose,
  Callout,
  SubHeading,
} from "~/components/shared/InfoBlock";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

// External references for the Circumplast® intro.
const STUDY_URL =
  "https://www.sciencedirect.com/science/article/pii/S2213576623000295?via%3Dihub";
const CIRCUMPLAST_URL = "https://www.novadien.com/circumplast";
const VIDEO_URL = "https://www.youtube.com/watch?v=x4x5O1Q0GeY";

const refLink =
  "underline decoration-[color:var(--color-accent-warm)] decoration-1 underline-offset-4 hover:text-[color:var(--color-ink)] transition-colors";

const PROCEDURE = [
  {
    num: "01",
    title: "Bedøvelse",
    body: "Barnet bedøves med lokalbedøvelse gennem to indstikssteder omkring penis. Vi anbefaler tryllecreme inden fremmøde, og sukkervand på sutteflaske virker beroligende. Efter anlæggelse ventes ca. 10-20 minutter for fuld effekt.",
  },
  {
    num: "02",
    title: "Proceduren",
    body: "Forhuden løsnes fra glans penis. En plastikring placeres omkring penishovedet, huden trækkes ud over ringen, og en stram snor bindes på niveauet for omskæringen. Overskydende hud klippes væk, og ringen falder selv af efter 5-10 dage.",
  },
];

const PRECAUTIONS = [
  "Dæk operationsområdet i bleen med en tør forbinding, fx et stykke Mesoft®, for at forebygge forurening med afføring og urin.",
  "Smertestillende: Panodil Junior 24 mg/ml — 0,5 ml pr. kg kropsvægt hver 6. time i 2 dage, herefter efter behov.",
  "Sørg for, at barnet har vandladning inden for 6-8 timer efter indgrebet.",
  "Hygiejne: skyl området forsigtigt med håndbruser efter hvert bleskift, hvis der er afføring eller en meget våd ble. Barnet må gerne få et kort karbad på ca. 5 minutter efter behov — babyolie og mild babyshampoo må anvendes i vandet.",
  "Fucidin® salve 2% fra dag 2: smør et tyndt lag morgen og aften i 7 dage på den overskydende hud uden på ringen. Træk ikke i ringen eller snorene. Klinikken laver en elektronisk recept.",
];

const INFLAMMATION = [
  "Moderat hævelse, rødme og misfarvning af huden kan være til stede, indtil ringen falder af, og aftager derefter gradvist. Hævelsen kan variere gennem helingsperioden.",
  "Sårbelægninger: hvide eller gullige belægninger på penishovedet (glans) og fibrinbelægninger omkring såret og ringen er normalt. De skal ikke fjernes og forsvinder af sig selv i løbet af nogle uger.",
  "Let blålig eller mørkere misfarvning omkring indstiksstederne og på undersiden af penis, mellem penis og pung, er normalt og forsvinder gradvist.",
  "Den normale helingstid er cirka 2 uger. Let hævelse kan vare i op til 3-4 uger, og det endelige kosmetiske resultat kan først vurderes efter cirka 6 uger.",
];

const INFECTION_SIGNS = [
  "Udtalt hævelse",
  "Tiltagende rødme eller varme",
  "Pus eller gulligt sekret fra såret",
  "Feber",
  "Påvirket almentilstand",
  "Besvær med vandladning",
];

const PRESSURE_RECOMMEND = [
  "Brug løst tøj.",
  "Lad være med at lukke knapper på bodystocking hen over operationsområdet.",
  "Undgå tryk mod penis, når barnet bæres eller bøvses.",
  "Stram ikke sikkerhedsseler i autostol unødigt over operationsområdet.",
];

const PRESSURE_AVOID = [
  "Mavetid.",
  "Bæreseler.",
  "Andre hjælpemidler eller aktiviteter, der giver direkte tryk mod operationsområdet.",
  "At lade barnet ligge uden ble — spædbørn sparker ofte med benene og kan ramme operationsområdet, hvilket kan give smerter, irritation eller blødning.",
];

const HIDDEN_PENIS = [
  "Træk jævnligt huden blidt tilbage i det omfang, den dækker penishovedet.",
  "Smør med en fed creme eller vaseline mellem huden og kanten af penishovedet.",
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
        "Information om Circumplast® ringmetoden: hvorfor den er bedre end Plastibell, procedure, efterforløb, normale reaktioner og komplikationer.",
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

        {/* Intro — Circumplast® vs. Plastibell */}
        <ContentSection bg="ivory">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="eyebrow"
              >
                Ringmetoden med Circumplast®
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Specialklinik Taastrup er stolt af at kunne præsentere Circumplast® i Danmark.
                Circumplast® er en avanceret ring til omskæring af drenge, som er overlegen i
                forhold til den traditionelle Plastibell-ring. Det er blevet påvist i flere
                studier, at brugen af Circumplast® er forbundet med en lavere risiko for
                komplikationer. Særligt er den velkendte risiko for, at ringen forskyder sig
                ned og sidder fast omkring penisskaftet med voldsomme smerter og besværet
                vandladning til følge, ikke til stede med Circumplast® i forhold til
                Plastibell. Dette bliver belyst i en artikel fra 2023, hvor der blev foretaget
                1.000 omskæringer med Circumplast® (
                <a href={STUDY_URL} target="_blank" rel="noopener noreferrer" className={refLink}>
                  læs studiet
                </a>
                ).
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Det skyldes Circumplasts® helt unikke cylindriske form, som adskiller sig fra
                den traditionelle Plastibell-ring. Circumplast® er produceret af den engelske
                medicotekniske virksomhed Novadien Healthcare og er godkendt af både den
                amerikanske lægemiddelstyrelse FDA og UKCA-mærket i Storbritannien. Du kan
                læse mere om Circumplast®{" "}
                <a href={CIRCUMPLAST_URL} target="_blank" rel="noopener noreferrer" className={refLink}>
                  her
                </a>
                , og se{" "}
                <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer" className={refLink}>
                  videoen
                </a>{" "}
                med en sammenligning af operationsteknikken med Circumplast® og Plastibell.
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
                  Lavere risiko for komplikationer sammenlignet med den traditionelle
                  Plastibell-ring.
                </p>
                <p className="mt-5 text-[14px] leading-[1.7] text-[color:var(--color-text-muted)]">
                  Dokumenteret i et studie fra 2023 med 1.000 omskæringer med Circumplast®.
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

        {/* Forholdsregler */}
        <InfoSection bg="white" eyebrow="Forholdsregler" title="Efter omskæringen">
          <BulletList items={PRECAUTIONS} />
        </InfoSection>

        {/* Smerter & blødning */}
        <InfoSection bg="ivory" eyebrow="Det første døgn" title="Smerter og blødning">
          <Prose
            paragraphs={[
              "Bedøvelsen aftager normalt efter 1-2 timer. Det er helt normalt, at barnet har smerter efter omskæringen — typisk mest udtalte på operationsdagen, hvorefter de aftager gradvist. Når ringen begynder at løsne sig, kan der igen opstå ømhed eller smerter.",
              "Vær opmærksom på blødning fra operationsområdet. Det første døgn anbefales det at kontrollere bleen cirka én gang i timen i dagtimerne og et par gange i løbet af natten. Let pletblødning gennem helingsperioden er normalt.",
              "Ved vedvarende sivning eller egentlig blødning skal I kontakte klinikken. Ved akut eller kraftig blødning kontaktes klinikken telefonisk. Kan klinikken ikke kontaktes, og vurderes situationen akut uden for åbningstid, skal I kontakte vagtlægen.",
            ]}
          />
        </InfoSection>

        {/* Ringen */}
        <InfoSection bg="white" eyebrow="Vigtig information" title="Ringen falder selv af">
          <Prose
            paragraphs={[
              "Ringen falder normalt af sig selv efter 5-10 dage sammen med den overskydende hud, som gradvist tørrer ind og bliver bleg, brun eller sort. Hvis ringen kun er delvist løsnet, skal I lade den sidde, indtil den falder helt af af sig selv.",
            ]}
          />
          <Callout>
            Hvis ringen ikke er faldet af efter 14 dage, eller hvis der opstår udtalt hævelse,
            stærke smerter eller besvær med vandladning, bedes I kontakte klinikken via e-mail.
            Ved akutte problemer kontaktes klinikken telefonisk.
          </Callout>
        </InfoSection>

        {/* Normale reaktioner */}
        <InfoSection bg="ivory" eyebrow="Normale reaktioner" title="Inflammation, belægninger og heling">
          <BulletList items={INFLAMMATION} />
        </InfoSection>

        {/* Infektion */}
        <InfoSection bg="white" eyebrow="Vær opmærksom" title="Tegn på infektion">
          <Prose
            paragraphs={[
              "Infektion efter omskæring er sjælden, men kan forekomme. Kontakt klinikken, hvis I bemærker et eller flere af følgende:",
            ]}
          />
          <div className="mt-6">
            <BulletList items={INFECTION_SIGNS} />
          </div>
          <Callout>
            Ved mistanke om infektion bedes I kontakte klinikken via e-mail. Ved påvirket
            almentilstand eller andre akutte symptomer kontaktes klinikken telefonisk.
          </Callout>
        </InfoSection>

        {/* Undgå tryk */}
        <InfoSection bg="ivory" eyebrow="Mens ringen sidder på" title="Undgå tryk på operationsområdet">
          <Prose
            paragraphs={[
              "Så længe ringen sidder på, bør unødigt tryk på operationsområdet undgås.",
            ]}
          />
          <div className="mt-8">
            <SubHeading>Vi anbefaler</SubHeading>
            <BulletList items={PRESSURE_RECOMMEND} />
          </div>
          <div className="mt-8">
            <SubHeading>Undgå desuden</SubHeading>
            <BulletList items={PRESSURE_AVOID} />
          </div>
          <Callout>
            Barnet må gerne sidde i autostol, så længe selen ikke strammes unødigt over
            operationsområdet.
          </Callout>
        </InfoSection>

        {/* Efter ringen er faldet af */}
        <InfoSection bg="white" eyebrow="Efter ringen er faldet af" title="Skjult penis (fedtpude)">
          <Prose
            paragraphs={[
              "Hos nogle spæd- og småbørn er der en naturlig fedtpude over kønsbenet, som kan få penis til at se kortere ud eller delvist skjult. Det kan betyde, at huden omkring penis dækker en del af penishovedet, og nogle forældre oplever derfor, at det ser ud, som om barnet ikke er omskåret.",
              "For at forebygge sammenvoksninger (adhærencer) mellem huden og penishovedet anbefales det:",
            ]}
          />
          <div className="mt-6">
            <BulletList items={HIDDEN_PENIS} />
          </div>
          <div className="mt-8">
            <Prose
              paragraphs={[
                "Hos nogle børn kan penis være delvist skjult i fedtpuden i måneder til år. Det er en normal anatomisk variation og ikke en komplikation til omskæringen. Hold jævnligt området rent, og forebyg sammenvoksninger ved at holde huden mobil omkring penishovedet. Efterhånden som barnet vokser, vil penis som regel blive mere synlig.",
              ]}
            />
          </div>
        </InfoSection>

        {/* Kontakt */}
        <InfoSection bg="ivory" eyebrow="Spørgsmål i helingsperioden" title="Kontakt til klinikken">
          <Prose
            paragraphs={[
              "Ved spørgsmål eller bekymringer i helingsperioden bedes I kontakte klinikken via e-mail på kontakt@specialklinik.dk. Vi bestræber os på at besvare alle henvendelser inden for få timer.",
              "Ved akutte problemer — herunder vedvarende blødning, betydelige smerter, besvær med vandladning eller andre forhold, der kræver akut vurdering — bedes I kontakte klinikken telefonisk på 20 76 35 16. Kan klinikken ikke kontaktes, og vurderes situationen akut uden for åbningstid, skal I kontakte vagtlægen.",
            ]}
          />
        </InfoSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
