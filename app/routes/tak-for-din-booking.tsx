import type { Route } from "./+types/tak-for-din-booking";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Tak for din booking | Specialklinik Taastrup" }];
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Tak for din booking | ${siteName}`,
      description:
        "Tak fordi du har booket en tid hos Specialklinik Taastrup. Vi glæder os til at tage imod dig og din familie.",
      url: `${siteUrl}/tak-for-din-booking`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/tak-for-din-booking` },
  ];
}

export default function TakForDinBooking({ loaderData }: Route.ComponentProps) {
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Booking · Bekræftelse"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Tak for din"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="booking."
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
          body="Tak fordi du har booket en tid hos Specialklinik Taastrup. Vi glæder os til at tage imod dig og din familie."
        />

        <ContentSection bg="white" narrow>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
          >
            For at du kan møde velforberedt op, anbefaler vi, at du læser afsnittet{" "}
            <Link
              to="/forberedelse-inden-omskaering"
              className="animated-link text-[color:var(--color-ink)] font-medium"
            >
              Forberedelse før omskæring
            </Link>{" "}
            på vores hjemmeside inden din tid.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mt-6 text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
          >
            Har du spørgsmål inden da, er du altid velkommen til at kontakte os:
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="mt-6 space-y-3 text-[17px] text-[color:var(--color-ink)]"
          >
            <li className="flex items-center gap-3">
              <span aria-hidden>✉️</span>
              <a
                href="mailto:kontakt@specialklinik.dk"
                className="animated-link font-medium"
              >
                kontakt@specialklinik.dk
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden>📍</span>
              <span>Taastrup Hovedgade 80, 2. th, 2630 Taastrup</span>
            </li>
          </motion.ul>
        </ContentSection>
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
