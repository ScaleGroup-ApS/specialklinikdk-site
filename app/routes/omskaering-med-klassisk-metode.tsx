import type { Route } from "./+types/omskaering-med-klassisk-metode";
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
} from "~/components/shared/InfoBlock";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROCEDURE = [
  {
    num: "01",
    title: "Bedøvelse",
    body: "Barnet bedøves med lokalbedøvelse gennem to indstikssteder omkring penis. Bedøvelsen tager kort tid at anlægge, men kan være ubehagelig. Sukkervand på sutteflaske virker beroligende. Der ventes ca. 15 minutter, til fuld effekt er opnået.",
  },
  {
    num: "02",
    title: "Proceduren",
    body: "Under sterile forhold løsnes huden omkring glans penis, forhuden fjernes med kirurgiske instrumenter, og hudens indre og ydre blad sys sammen med selvopløselig tråd. Forbindingen skal typisk sidde i 24 timer.",
  },
];

const PRECAUTIONS = [
  "Smertestillende: Panodil Junior 24 mg/ml — 0,5 ml pr. kg kropsvægt hver 6. time i 3 dage, herefter efter behov.",
  "Sørg for, at barnet har vandladning inden for 6-8 timer efter indgrebet.",
  "Hygiejne: skyl området forsigtigt med håndbruser to gange dagligt, inden I smører med Fucidin.",
  "Fucidin® salve 2% når såret er tørt: smør et tyndt lag morgen og aften i 7 dage på sårområdet. Træk ikke i stingene. Klinikken laver en elektronisk recept.",
];

const ACTIVITY = [
  "De første to dage skal barnet holde sengen. Det er tilladt at gå forsigtigt på toilet, men al anden aktivitet bør undgås.",
  "De følgende dage — frem til såret er helet — må barnet gå forsigtigt rundt i hjemmet, men skal hvile i sengen det meste af dagen og undgå unødvendig bevægelse.",
  "Fysisk aktivitet som fodbold, sport, trampolinspring og lignende skal undgås i 3 uger. Det samme gælder svømmehal, badning i hav eller sø samt andre aktiviteter, hvor operationsområdet udsættes for vand.",
  "Barnet bør holdes hjemme fra skole eller institution i cirka 2 uger.",
];

const INFLAMMATION = [
  "Moderat hævelse, rødme og misfarvning af huden er typisk mest udtalt de første dage og aftager gradvist. Hævelsen kan variere gennem helingsperioden.",
  "Sårbelægninger: hvide eller gullige belægninger på penishovedet (glans) og fibrinbelægninger omkring såret og stingene er normalt. De skal ikke fjernes og forsvinder af sig selv i løbet af en til to uger.",
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

const HIDDEN_PENIS = [
  "Træk jævnligt huden blidt tilbage i det omfang, den dækker penishovedet.",
  "Smør med en fed creme eller vaseline mellem huden og kanten af penishovedet.",
];

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Omskæring med klassisk metode | Specialklinik Taastrup" }];
  const { siteUrl } = data;
  const siteName = "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring med klassisk metode | ${siteName}`,
      description:
        "Information om omskæring med den klassiske metode: bedøvelse, procedure, efterforløb, aktivitet og hvile, normale reaktioner og komplikationer.",
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
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

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

        {/* Intro + prerequisite */}
        <ContentSection bg="white">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Omskæring med den klassiske metode i lokalbedøvelse tilbydes til børn på
                6 – 11 år og koster 3.500 kr. inkl. lovpligtig patientforsikring. Forhuden
                fjernes med kirurgiske instrumenter, og hudens indre og ydre blad sys sammen
                med selvopløselig tråd. Stingene skal ikke fjernes — trådene opløses og
                absorberes i vævet i løbet af cirka 3 – 4 uger.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Lokalbedøvelsen anlægges gennem to indstikssteder omkring penis, så barnet
                ikke mærker smerte under indgrebet. Er barnet under 6 år, foretages omskæring
                i fuld bedøvelse i stedet.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="lg:col-span-4 lg:col-start-9"
            >
              <div className="card-elevated p-8 border-l-4 border-l-[color:var(--color-accent-warm)]">
                <span className="sticker sticker-warm mb-5 inline-flex">
                  Vigtig information
                </span>
                <p className="text-[16px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  Det er en forudsætning, at jeres barn inddrages i beslutningen i det
                  omfang, dets modenhed tillader det, og at han kan samarbejde til at få
                  indgrebet udført i lokalbedøvelse.
                </p>
              </div>
            </motion.div>
          </div>
        </ContentSection>

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

        {/* Forholdsregler */}
        <InfoSection bg="ivory" eyebrow="Forholdsregler" title="Efter omskæringen">
          <BulletList items={PRECAUTIONS} />
          <Callout>
            Efter cirka 24 timer skal forbindingen blødgøres under rindende vand og fjernes.
            Den kan godt klistre lidt — løsn den eventuelt med saltvand eller lidt babyolie. I
            kan også anvende klorhexidinpudder 1 – 2 gange dagligt (fås i håndkøb på apoteket),
            men ikke samtidig med Fucidin-salven — brug det på andre tidspunkter af dagen.
          </Callout>
        </InfoSection>

        {/* Smerter & blødning */}
        <InfoSection bg="white" eyebrow="Det første døgn" title="Smerter og blødning">
          <Prose
            paragraphs={[
              "Bedøvelsen aftager normalt efter 1-2 timer. Det er helt normalt, at barnet har smerter efter omskæringen — typisk mest udtalte på operationsdagen og de første par dage, hvorefter de aftager gradvist i takt med helingen.",
              "Vær opmærksom på blødning fra operationsområdet. Let pletblødning gennem helingsperioden er normalt. Ved vedvarende sivning eller egentlig blødning skal I kontakte klinikken. Ved akut eller kraftig blødning kontaktes klinikken telefonisk — og kan klinikken ikke kontaktes uden for åbningstid, skal I kontakte vagtlægen.",
            ]}
          />
        </InfoSection>

        {/* Aktivitet og hvile */}
        <InfoSection bg="ivory" eyebrow="Ro til at hele" title="Aktivitet og hvile">
          <BulletList items={ACTIVITY} />
        </InfoSection>

        {/* Normale reaktioner */}
        <InfoSection bg="white" eyebrow="Normale reaktioner" title="Inflammation, belægninger og heling">
          <BulletList items={INFLAMMATION} />
        </InfoSection>

        {/* Infektion */}
        <InfoSection bg="ivory" eyebrow="Vær opmærksom" title="Tegn på infektion">
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

        {/* Efter omskæringen er helet */}
        <InfoSection bg="white" eyebrow="Efter omskæringen er helet" title="Skjult penis (fedtpude)">
          <Prose
            paragraphs={[
              "Hos nogle spæd- og småbørn er der en naturlig fedtpude over kønsbenet, som kan få penis til at se kortere ud eller delvist skjult. Det kan betyde, at huden omkring penis dækker en del af penishovedet, og nogle forældre oplever derfor, at det ser ud, som om barnet ikke er omskåret.",
              "Når såret er ophelet (ca. en uge efter indgrebet) anbefales det for at forebygge sammenvoksninger (adhærencer) mellem huden og penishovedet:",
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

      <Footer siteName={siteName} />
    </div>
  );
}
