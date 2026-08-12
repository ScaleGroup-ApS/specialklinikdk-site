import type { Route } from "./+types/forberedelse-inden-omskaering";
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
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

// Tryllecreme has its own full-width feature block (with figure), so the card
// grid below starts numbering from 02.
const TRYLLECREME_BODY =
  "Brugen af tryllecreme sikrer, at barnet ikke føler stikket fra kanylen under lokalbedøvelsen, men det kan stadig opleve en svien og en let spænding, når bedøvelsen sprøjtes ind under huden. Vi anbefaler, at I smører Tryllecreme på ca. 45-60 minutter før jeres aftale. Tryllecreme kan købes på apoteket i håndkøb under navnene Emla og Tapin. Det fås både som creme, plaster og som en kombination af creme og plaster. Vi anbefaler at købe det som en kombination af creme og plaster. Påfør et tykt lag rundt om penisroden og dæk det til med det tilhørende plaster. Hvis I bruger creme uden det tilhørende plaster, kan I dække det med husholdningsfilm.";

const CHECKLIST = [
  {
    title: "Sukkervand",
    body: "Til småbørn under 6 måneder anbefaler vi, at I medbringer sukkervand i en sutteflaske. Sukkervand har en dokumenteret smertestillende og beroligende effekt, især til nyfødte, og kan bruges som supplement til lokalbedøvelse både under bedøvelse og under omskæringen. Bland 10 gram sukker i 100 ml forkogt vand for at lave sukkervandet.",
  },
  {
    title: "Modermælk/erstatning",
    body: "Hvis jeres barn drikker modermælk eller modermælkserstatning fra flaske, bedes I også medbringe dette.",
  },
  {
    title: "Sygesikringskort/CPR-nummer",
    body: "Husk at medbringe barnets sygesikringskort, hvis I har dette. Hvis I endnu ikke har modtaget det, bedes I medbringe barnets CPR-nummer.",
  },
  {
    title: "Bleer og tøj mm.",
    body: "Tag ekstra bleer og tøj med til indgrebet i tilfælde af uheld. For store drenge anbefales løst tøj, f.eks. en lang traditionel kjortel.",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Forberedelse inden omskæring | Sådan forbereder du dig på en omskæringsprocedure" }];
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: "Forberedelse inden omskæring | Sådan forbereder du dig på en omskæringsprocedure",
      description:
        "Få tips og råd til, hvordan du bedst forbereder dig til en omskæringsprocedure på vores side om forberedelse inden omskæring. Hos Specialklinik Taastrup er vi specialiserede i omskæringsprocedurer og tilbyder vores patienter en sikker og effektiv behandling.",
      url: `${siteUrl}/forberedelse-inden-omskaering`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/forberedelse-inden-omskaering` },
  ];
}

export default function Forberedelse({ loaderData }: Route.ComponentProps) {
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Forberedelse · For forældrene"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Forbered jer inden"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="omskæring."
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
          body="Før I møder op på klinikken, er det vigtigt at læse følgende information for at sikre en bedre oplevelse for jeres søn."
        />

        {/* Health requirement + timing callout */}
        <ContentSection bg="ivory">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)] mb-12"
            >
              For at sikre et succesfuldt indgreb er det vigtigt, at jeres søn er sund og
              rask. Hvis jeres barn lider af kendte sygdomme eller lidelser, bedes I
              kontakte klinikken inden tidsbestilling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col md:flex-row md:items-start gap-6"
            >
              <span className="sticker sticker-warm shrink-0">
                Anbefalet alder: 2–12 uger
              </span>
              <div>
                <p className="font-display italic font-light text-[clamp(1.5rem,3vw,2rem)] leading-[1.4] text-[color:var(--color-ink)]">
                  Vores erfaring viser, at det er bedst at udføre omskæringen, når barnet er
                  mellem 2-12 uger gammelt. Forudsætningen er, at barnet ikke er født for
                  tidligt og vejer mindst 3 kg.
                </p>
                <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)] mt-6">
                  Hvis I er i tvivl, bedes I kontakte os inden tidsbestilling. Når barnet er
                  ældre end 12 uger, er der risiko for, at han vil være utryg og urolig under
                  indgrebet, og helingstiden kan være længere. Der vil også være en større
                  risiko for en skjult penis på grund af øget fedtomfang, hvilket vil kræve,
                  at omskæringen udsættes til en senere alder. Hvis I har mistanke om, at
                  jeres søn har en skjult penis, bedes I kontakte klinikken.
                </p>
              </div>
            </motion.div>
          </div>
        </ContentSection>

        {/* Checklist */}
        <ContentSection bg="white">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Hvad I skal medbringe
          </motion.p>
          <h2 className="display-xl text-[color:var(--color-ink)] mb-6">
            <AnimatedWords
              as="span"
              mode="inView"
              text="Forberedelsestjekliste"
              className="block"
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)] max-w-2xl mb-14"
          >
            Følgende forberedelser og genstande skal I medbringe inden fremmødet:
          </motion.p>

          {/* Tryllecreme — full-width feature with application figure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="card-elevated p-8 md:p-10 glow-on-hover mb-5"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 md:items-center">
              <div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[color:var(--color-surface-dim)] text-[color:var(--color-accent-warm)] text-[13px] font-semibold tracking-wide mb-5">
                  01
                </span>
                <h3 className="font-heading text-xl font-medium text-[color:var(--color-ink)] mb-3">
                  Tryllecreme
                </h3>
                <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  {TRYLLECREME_BODY}
                </p>
              </div>
              <figure className="m-0">
                <div className="overflow-hidden rounded-[1.25rem] border border-[color:var(--color-border)] bg-white">
                  <img
                    src="/images/tryllecreme.png"
                    alt="Denne figur viser dig hvor omkring penis tryllecremen skal påsmøres"
                    className="w-full h-auto max-h-[420px] object-contain"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 text-[13px] leading-[1.6] text-[color:var(--color-text-muted)] italic text-center">
                  Denne figur viser dig hvor omkring penis tryllecremen skal påsmøres
                </figcaption>
              </figure>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {CHECKLIST.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="card-elevated p-8 glow-on-hover"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[color:var(--color-surface-dim)] text-[color:var(--color-accent-warm)] text-[13px] font-semibold tracking-wide mb-5">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-medium text-[color:var(--color-ink)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Consent */}
        <ContentSection bg="ivory">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)] mb-8">
                Når I ankommer til klinikken, vil den læge, der udfører indgrebet, tage imod
                jer og informere jer om proceduren, risiciene og de forholdsregler, der skal
                tages efter omskæringen.
              </p>
              <div className="card-ivory p-8 rounded-[1.25rem] border-l-4 border-l-[color:var(--color-accent-warm)]">
                <p className="font-display text-[1.25rem] font-light leading-[1.5] text-[color:var(--color-ink)]">
                  Det er vigtigt, at begge forældre er til stede og giver informeret samtykke
                  til indgrebet. Hvis begge forældre ikke kan være til stede, og der er delt
                  forældremyndighed, skal I medbringe en samtykkeerklæring fra den anden
                  forælder.
                </p>
              </div>
            </motion.div>
          </div>
        </ContentSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
