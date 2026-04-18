import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const SECTIONS = [
  {
    title: "Introduktion",
    body: "Når du besøger vores website, indsamles oplysninger om dig, som bruges til at tilpasse og forbedre vores indhold. Hvis du ikke ønsker, at der indsamles oplysninger, bør du slette dine cookies og undlade videre brug af websitet.",
  },
  {
    title: "Cookies",
    body: "Websitet anvender cookies, som er små tekstfiler, der gemmes på din enhed med det formål at genkende dig, huske indstillinger, udføre statistik og målrette indhold. Cookies kan ikke indeholde skadelig kode.",
  },
  {
    title: "Personoplysninger",
    body: "Personoplysninger er informationer, der kan henføres til dig. Vi behandler eksempelvis tekniske oplysninger, IP-adresse, geografisk placering og hvilke sider du besøger. Hvis du selv indtaster oplysninger, kan vi også behandle navn, telefonnummer, e-mail, adresse og betalingsoplysninger.",
  },
  {
    title: "Sikkerhed",
    body: "Vi behandler dine personoplysninger sikkert og fortroligt i overensstemmelse med gældende lovgivning, herunder persondataforordningen og databeskyttelsesloven. Oplysningerne bruges kun til de formål, de er indsamlet til, og slettes når de ikke længere er relevante.",
  },
  {
    title: "Formål",
    body: "Oplysninger bruges bl.a. til at identificere dig som bruger, levere services du efterspørger, registrere køb/betalinger og optimere website og indhold.",
  },
  {
    title: "Opbevaring og videregivelse",
    body: "Oplysninger opbevares kun så længe det er nødvendigt og lovligt. Data kan behandles af databehandlere på vores vegne. Videregivelse af personoplysninger som navn og e-mail sker kun ved samtykke.",
  },
];

export async function loader({ request }: { request: Request }) {
  const siteUrl = new URL(request.url).origin;
  let siteInfo: WpSiteInfo | null = null;
  try {
    siteInfo = await getSiteInfo().catch(() => null);
  } catch {
    // graceful degradation
  }
  return { siteInfo, siteUrl };
}

export function meta({ data }: { data?: { siteInfo: WpSiteInfo | null; siteUrl: string } }) {
  if (!data) return [{ title: "Privatlivspolitik | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Privatlivspolitik | ${siteName}`,
      description:
        "Læs hvordan vi behandler personoplysninger, cookies, datalagring, videregivelse og dine rettigheder.",
      url: `${siteUrl}/privatlivspolitik`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/privatlivspolitik` },
  ];
}

export default function Privatlivspolitik({ loaderData }: { loaderData: { siteInfo: WpSiteInfo | null; siteUrl: string } }) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Juridisk · Privatlivspolitik"
          size="xl"
          headline={
            <AnimatedWords
              as="span"
              text="Privatlivspolitik"
              className="block"
              delay={0.1}
            />
          }
        />

        <ContentSection bg="ivory" narrow>
          <div className="space-y-12">
            {SECTIONS.map((section, i) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <h2 className="display-lg text-[color:var(--color-ink)] mb-4">{section.title}</h2>
                <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  {section.body}
                </p>
              </motion.section>
            ))}

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <h2 className="display-lg text-[color:var(--color-ink)] mb-4">Indsigt og klager</h2>
              <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                Du har ret til indsigt, berigtigelse, sletning og indsigelse. Du kan kontakte
                os på{" "}
                <a
                  href="mailto:kontakt@specialklinik.dk"
                  className="animated-link text-[color:var(--color-ink)] font-medium"
                >
                  kontakt@specialklinik.dk
                </a>.
                Du kan også klage til Datatilsynet.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="card-elevated p-8">
                <h2 className="display-lg text-[color:var(--color-ink)] mb-4">Udgiver</h2>
                <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  Kirurgisk Klinik Brabrand v/Amin Bakhtyar Baram
                  <br />
                  Taastrup Hovedgade 80, 2. th, 2630 Taastrup
                  <br />
                  Telefon: 20 76 35 16
                  <br />
                  E-mail:{" "}
                  <a
                    href="mailto:kontakt@specialklinik.dk"
                    className="animated-link text-[color:var(--color-ink)] font-medium"
                  >
                    kontakt@specialklinik.dk
                  </a>
                </p>
              </div>
            </motion.section>
          </div>
        </ContentSection>
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
