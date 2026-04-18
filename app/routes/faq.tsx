import type { Route } from "./+types/faq";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { CtaBand } from "~/components/home/CtaBand";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AccordionList } from "~/components/shared/AccordionList";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQ_ITEMS = [
  {
    q: "Hvornår er den bedste alder for omskæring?",
    a: "Vi anbefaler ofte, at omskæring finder sted når barnet er 2-8 uger gammelt, da indgrebet her typisk er mest skånsomt.",
  },
  {
    q: "Er omskæring farligt?",
    a: "Forekomsten af komplikationer er lav ved korrekt udført omskæring. Derfor bør indgrebet kun udføres af autoriserede og erfarne sundhedspersoner.",
  },
  {
    q: "Hvilke risici er forbundet med omskæring?",
    a: "De væsentligste risici er blødning og infektion. Klinikken vejleder altid grundigt i, hvad I skal holde øje med efter indgrebet.",
  },
  {
    q: "Er omskæring af drengebørn ulovligt?",
    a: "Omskæring er ikke ulovligt i Danmark, når det foretages af autoriserede sundhedspersoner og efter gældende regler.",
  },
  {
    q: "Mit barn er forkølet, skal jeg aflyse tiden?",
    a: "Hvis barnet er alment påvirket med fx feber, sløvhed eller nedsat appetit, bør tiden aflyses. Ved let forkølelse kan indgrebet ofte stadig gennemføres.",
  },
  {
    q: "Hvad skal jeg medbringe til klinikken?",
    a: "Barnets CPR/sygesikringskort, evt. sukkervand i sutteflaske, evt. modermælk/modermælkserstatning samt ekstra bleer og tøj.",
  },
  {
    q: "Hvordan foregår betalingen?",
    a: "Betalingen foregår ved fremmøde i klinikken.",
  },
  {
    q: "Hvilken operationsmetode bruger I?",
    a: "Der anvendes enten klassisk metode eller ringmetoden Circumplast. Metoden vælges i dialog med forældrene.",
  },
  {
    q: "Hvor længe har barnet ondt efter omskæring?",
    a: "Som regel lette smerter i 2-3 dage, som typisk kan håndteres med relevant smertestillende behandling.",
  },
  {
    q: "Hvor længe går der før såret er helet?",
    a: "Såret heler som regel på 1-2 uger. Let hævelse kan ses i flere uger, og det kosmetiske resultat vurderes først senere.",
  },
  {
    q: "Skal begge forældre komme med i klinikken?",
    a: "Begge forældre anbefales at møde op. Hvis kun den ene møder, kan samtykke/fuldmagt fra den anden forælder være nødvendig ved fælles forældremyndighed.",
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
  if (!data) return [{ title: "FAQ | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `FAQ | ${siteName}`,
      description:
        "Ofte stillede spørgsmål om omskæring, forberedelse, smertelindring, efterforløb og sikkerhed.",
      url: `${siteUrl}/faq`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/faq` },
  ];
}

export default function FAQ({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="FAQ · Ofte stillede spørgsmål"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Tydelige"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="svar."
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
        />

        <ContentSection bg="ivory">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <span className="sticker sticker-warm mb-6 inline-flex">
                  {FAQ_ITEMS.length} spørgsmål
                </span>
                <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)] max-w-md mt-6">
                  Her finder I svar på de mest almindelige spørgsmål om klinikken og vores
                  procedurer. Hvis I ikke finder svar på jeres spørgsmål, er I altid velkomne til at kontakte os.
                </p>
                <Link
                  to="/kontakt-os"
                  className="btn-outline mt-8 inline-flex items-center"
                >
                  Kontakt os
                  <span className="btn-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <AccordionList items={FAQ_ITEMS} defaultOpen={0} />
            </div>
          </div>
        </ContentSection>

        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
