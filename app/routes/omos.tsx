import type { Route } from "./+types/omos";
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
import { CountUp } from "~/components/motion/CountUp";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "1995", label: "Kirurgisk Klinik Brabrand grundlagt" },
  { value: "1000+", label: "Vellykkede indgreb udført" },
  { value: "100%", label: "Autoriserede speciallæger" },
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
  if (!data) return [{ title: "Om os | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Om os | ${siteName}`,
      description:
        "Specialklinik Taastrup er en underafdeling af Kirurgisk Klinik Brabrand med mange års erfaring i rituel drengeomskæring.",
      url: `${siteUrl}/om-os`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/om-os` },
  ];
}

export default function OmOs({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Om os · Specialklinik Taastrup"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Speciallæger med"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="mange års erfaring."
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
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="mt-8"
          >
            <span className="sticker sticker-warm">
              Est. 2023 · Taastrup
            </span>
          </motion.div>
        </SubpageHero>

        {/* Stats strip */}
        <ContentSection bg="white">
          <div className="grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-[color:var(--color-border)]">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                className="text-center px-8"
              >
                <CountUp
                  value={stat.value}
                  className="stat-number text-[color:var(--color-ink)]"
                />
                <p className="mt-3 text-[14px] text-[color:var(--color-text-muted)] tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* About content */}
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
                <strong className="text-[color:var(--color-ink)]">Specialklinik Taastrup</strong> blev etableret i 2023 og er en
                underafdeling af Kirurgisk Klinik Brabrand, som har eksisteret siden 1995.
                Klinikken bemandes af autoriserede speciallæger med mange års erfaring inden
                for omskæring af spædbørn og drenge.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Vi overholder Styrelsen for Patientsikkerheds vejledning om
                ikke-terapeutisk omskæring af drenge, og vores primære mål er at levere høj
                kvalitet af behandling, så forældre kan føle sig trygge ved at lade deres søn
                blive omskåret hos os.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
                className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
              >
                Vi lægger stor vægt på at give omfattende information til forældrene både før,
                under og efter indgrebet. Det har medført høj tilfredshed og en stærk
                anbefalingsrate fra familier, der har været i klinikken.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] shadow-[0_50px_100px_-40px_rgba(11,16,32,0.25)]">
                <img
                  src="/images/specialklinik-omskaering-scaled%20(1).jpg"
                  alt="Specialklinik Taastrup — klinikken indefra"
                  className="w-full h-[320px] md:h-[420px] object-cover animate-ken-burns"
                  loading="lazy"
                />
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
