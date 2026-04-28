import type { Route } from "./+types/booking";
import { motion } from "framer-motion";
import { Link } from "react-router";
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

const INFO_CARDS = [
  {
    title: "Drenge over 10 år",
    body: "Omskæring af drenge over 10 år eller voksenomskæring kræver kontakt til klinikken inden tidsbestilling.",
  },
  {
    title: "Læs forberedelse først",
    body: "Før I bestiller tid, anbefaler vi, at I læser afsnittene om forberedelse inden indgrebet og information om drengeomskæring.",
    link: { to: "/forberedelse-inden-omskaering", label: "Læs forberedelse" },
  },
  {
    title: "Afbestilling",
    body: "Hvis I ikke kan komme, beder vi jer afbestille så tidligt som muligt i bookingmodulet eller skrive til kontakt@specialklinik.dk.",
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
  if (!data) return [{ title: "Booking | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Booking | ${siteName}`,
      description:
        "Book tid online til omskæring. Læs forberedelse og praktisk information før tidsbestilling.",
      url: `${siteUrl}/booking`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/booking` },
  ];
}

export default function Booking({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Booking · Online tidsbestilling"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Book en"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="tid."
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
          body="Her kan I booke en tid til at få jeres søn omskåret. Vær opmærksom på, at klinikken kun har åbent på bestemte dage."
        />

        {/* Editorial image */}
        <ContentSection bg="white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] shadow-[0_50px_100px_-40px_rgba(11,16,32,0.25)]"
          >
            <img
              src="/images/specialklinik-omskaering-scaled%20(1).jpg"
              alt="Specialklinik Taastrup — klinikken"
              className="w-full h-[280px] md:h-[420px] object-cover animate-ken-burns"
              loading="lazy"
            />
          </motion.div>
        </ContentSection>

        {/* Info cards */}
        <ContentSection bg="ivory">
          <div className="grid md:grid-cols-3 gap-5">
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="card-ivory p-7 rounded-[1.25rem]"
              >
                <h3 className="font-heading text-lg font-medium text-[color:var(--color-ink)] mb-3">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  {card.body}
                </p>
                {card.link && (
                  <Link
                    to={card.link.to}
                    className="animated-link text-[color:var(--color-ink)] font-medium text-[15px] mt-4 inline-block"
                  >
                    {card.link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Booking embed */}
        <ContentSection bg="white">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Online booking
          </motion.p>
          <h2 className="display-lg text-[color:var(--color-ink)] mb-10">
            <AnimatedWords
              as="span"
              mode="inView"
              text="Vælg en ledig tid"
              className="block"
            />
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="card-elevated overflow-hidden">
              <iframe
                title="Online booking - Specialklinik Taastrup"
                src="https://system.easypractice.net/book/specialklinik-taastrup?cookie_fixed=1"
                width="100%"
                height="760"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-[14px] text-[color:var(--color-text-muted)] mt-4">
              Hvis booking-vinduet ikke vises, kan du{" "}
              <a
                href="https://system.easypractice.net/book/specialklinik-taastrup?cookie_fixed=1"
                target="_blank"
                rel="noreferrer"
                className="animated-link text-[color:var(--color-ink)] font-medium"
              >
                åbne booking i ny fane
              </a>.
            </p>
          </motion.div>
        </ContentSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
