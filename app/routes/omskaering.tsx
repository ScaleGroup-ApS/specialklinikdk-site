import type { Route } from "./+types/omskaering";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { PatientTestimonials } from "~/components/PatientTestimonials";
import { CtaBand } from "~/components/home/CtaBand";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const METHOD_CARDS = [
  {
    to: "/forberedelse-inden-omskaering",
    title: "Forberedelse inden omskæring",
    desc: "Læs hvad I skal medbringe og hvordan I forbereder jeres barn.",
  },
  {
    to: "/omskaering-med-klassisk-metode",
    title: "Klassisk metode",
    desc: "Information om bedøvelse, procedure, efterforløb og komplikationer.",
  },
  {
    to: "/omskaering-med-ringmetoden",
    title: "Ringmetoden",
    desc: "Læs om Circumplast®, forløb, heling og forholdsregler.",
  },
  {
    to: "/omskaering-med-fuld-bedoevelse",
    title: "Fuld bedøvelse eller sedation",
    desc: "Mulighed for omskæring under narkose for relevante aldersgrupper.",
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
  if (!data) return [{ title: "Omskæring | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring | ${siteName}`,
      description:
        "Information om rituel drengeomskæring, sikkerhed, regler og metoder hos Specialklinik Taastrup.",
      url: `${siteUrl}/omskaering`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/omskaering` },
  ];
}

export default function Omskaering({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Omskæring · Information & metoder"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Rituel"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="drengeomskæring."
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
          body="Omskæring er en årtusindegammel skik i mange kulturer og religioner. Der kan være kulturelle, religiøse eller medicinske årsager til, at forældre vælger at lade deres drengebørn omskære."
        />

        {/* Content */}
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
                Omskæring af drengebørn er omdiskuteret. Styrelsen for Patientsikkerhed har
                i 2020 udgivet en omfattende rapport, der belyser mange aspekter af
                omskæring, herunder gavnlige sundhedsmæssige effekter samt en opgørelse af
                komplikationer ved omskæring.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Omskæring af drengebørn er lovligt, når det foretages af en autoriseret læge
                og ifølge gældende regler på området. Omskæring er ulovligt, når det
                foretages af en ikke-autoriseret fagperson i en ikke-registreret klinik eller
                i private hjem.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                På Specialklinik Taastrup udføres omskæring af drengebørn med enten
                ringmetoden eller den klassiske metode.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="lg:col-span-4 lg:col-start-9"
            >
              <div className="card-ivory p-8 rounded-[1.25rem] border-l-4 border-l-[color:var(--color-accent-warm)]">
                <p className="font-display italic font-light text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.4] text-[color:var(--color-ink)]">
                  Sikkerhed, tryghed og professionel behandling er altid vores førsteprioritet.
                </p>
              </div>
            </motion.div>
          </div>
        </ContentSection>

        {/* Method cards */}
        <ContentSection bg="white">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            Metoder & forberedelse
          </motion.p>
          <h2 className="display-xl text-[color:var(--color-ink)] mb-14">
            <AnimatedWords
              as="span"
              mode="inView"
              text="Læs mere om"
              className="block"
            />
            <span className="relative inline-block">
              <span className="font-display italic font-light">
                jeres muligheder.
              </span>
              <HandDrawnUnderline
                className="absolute left-0 right-0 -bottom-1 w-full h-3"
                delay={0.7}
                variant="scribble"
              />
            </span>
          </h2>

          <div className="grid md:grid-cols-2 border border-[color:var(--color-border)] rounded-[1.25rem] overflow-hidden">
            {METHOD_CARDS.map((card, i) => (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              >
                <Link
                  to={card.to}
                  className="group relative block p-8 md:p-10 border-[color:var(--color-border)] transition-colors duration-500 hover:bg-[color:var(--color-ink)] overflow-hidden"
                  style={{
                    borderRight: i % 2 === 0 ? "1px solid var(--color-border)" : "none",
                    borderBottom: i < 2 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-text-muted)] group-hover:text-[color:var(--color-accent-warm-soft)] transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-[color:var(--color-ink)] group-hover:text-white mt-4 mb-3 transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[color:var(--color-text-muted)] group-hover:text-[color:var(--color-text-on-dark-muted)] transition-colors duration-500">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-5 text-[14px] font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent-warm-soft)] transition-colors duration-500">
                    Læs mere
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
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
                alt="Specialklinik Taastrup"
                className="w-full h-[300px] md:h-[460px] object-cover animate-ken-burns"
                loading="lazy"
              />
            </div>
          </motion.div>
        </ContentSection>

        <PatientTestimonials />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
