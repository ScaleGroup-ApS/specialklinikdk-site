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
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const CHECKLIST = [
  {
    title: "Tryllecreme",
    body: "Smør tryllecreme på ca. 45-60 minutter før aftalen. Tryllecreme kan købes i håndkøb (fx Emla eller Tapin). Påfør et tykt lag rundt om penisroden og dæk med plaster.",
  },
  {
    title: "Sukkervand",
    body: "Til småbørn under 6 måneder anbefales sukkervand i sutteflaske. Blandingsforhold: 10 gram sukker i 100 ml forkogt vand.",
  },
  {
    title: "Modermælk/erstatning",
    body: "Medbring modermælk eller modermælkserstatning, hvis jeres barn drikker fra flaske.",
  },
  {
    title: "Sygesikringskort/CPR-nummer",
    body: "Medbring barnets sygesikringskort. Hvis I endnu ikke har modtaget det, medbring barnets CPR-nummer.",
  },
  {
    title: "Bleer og tøj",
    body: "Tag ekstra bleer og tøj med i tilfælde af uheld. Til større drenge anbefales løst tøj.",
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
  if (!data) return [{ title: "Forberedelse inden omskæring | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Forberedelse inden omskæring | ${siteName}`,
      description:
        "Sådan forbereder I jer før omskæringsproceduren: tryllecreme, sukkervand, dokumenter og praktiske forhold.",
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
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

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

        {/* Timing callout */}
        <ContentSection bg="ivory">
          <div className="max-w-3xl">
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
              <p className="font-display italic font-light text-[clamp(1.5rem,3vw,2rem)] leading-[1.4] text-[color:var(--color-ink)]">
                Vores erfaring viser, at det ofte er bedst at udføre omskæringen, når barnet
                er mellem 2-12 uger gammelt, hvis barnet ikke er født for tidligt og vejer
                mindst 3 kg.
              </p>
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
          <h2 className="display-xl text-[color:var(--color-ink)] mb-14">
            <AnimatedWords
              as="span"
              mode="inView"
              text="Forberedelsestjekliste"
              className="block"
            />
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {CHECKLIST.slice(0, 2).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="card-elevated p-8 glow-on-hover"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[color:var(--color-surface-dim)] text-[color:var(--color-accent-warm)] text-[13px] font-semibold tracking-wide mb-5">
                  {String(i + 1).padStart(2, "0")}
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
          <div className="grid md:grid-cols-3 gap-5">
            {CHECKLIST.slice(2).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: (i + 2) * 0.08 }}
                className="card-elevated p-8 glow-on-hover"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[color:var(--color-surface-dim)] text-[color:var(--color-accent-warm)] text-[13px] font-semibold tracking-wide mb-5">
                  {String(i + 3).padStart(2, "0")}
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
                Når I ankommer til klinikken, vil lægen informere jer om procedure, risici og
                forholdsregler efter omskæringen.
              </p>
              <div className="card-ivory p-8 rounded-[1.25rem] border-l-4 border-l-[color:var(--color-accent-warm)]">
                <p className="font-display text-[1.25rem] font-light leading-[1.5] text-[color:var(--color-ink)]">
                  Begge forældre bør være til stede og give informeret samtykke. Ved delt
                  forældremyndighed, hvor én forælder ikke kan møde op, skal der medbringes
                  samtykkeerklæring.
                </p>
              </div>
            </motion.div>
          </div>
        </ContentSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
