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
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import { FAQ_ITEMS } from "~/lib/faq";

const EASE = [0.22, 1, 0.36, 1] as const;

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "FAQ | Specialklinik Taastrup" }];
  const { siteUrl } = data;
  const siteName = "Specialklinik Taastrup";
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
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

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

      <Footer siteName={siteName} />
    </div>
  );
}
