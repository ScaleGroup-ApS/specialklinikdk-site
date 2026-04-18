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
  if (!data) return [{ title: "Cookiepolitik | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Cookiepolitik | ${siteName}`,
      description:
        "Læs hvordan vi anvender cookies, hvilke typer der bruges, og hvordan du kan slette eller blokere dem.",
      url: `${siteUrl}/cookiepolitik`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/cookiepolitik` },
  ];
}

export default function Cookiepolitik({ loaderData }: { loaderData: { siteInfo: WpSiteInfo | null; siteUrl: string } }) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Juridisk · Cookiepolitik"
          size="xl"
          headline={
            <AnimatedWords
              as="span"
              text="Cookiepolitik"
              className="block"
              delay={0.1}
            />
          }
        />

        <ContentSection bg="ivory" narrow>
          <div className="space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <h2 className="display-lg text-[color:var(--color-ink)] mb-4">Hvad er cookies?</h2>
              <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                Denne hjemmeside anvender cookies. En cookie er en lille tekstfil, der lagres
                på din computer, mobil eller tablet for at genkende enheden, huske
                indstillinger, lave statistik og forbedre brugeroplevelsen.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <h2 className="display-lg text-[color:var(--color-ink)] mb-4">Hvad bruger vi cookies til?</h2>
              <ul className="space-y-3 text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                <li className="flex items-start gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent-warm)] shrink-0" />
                  At få siden til at fungere teknisk.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent-warm)] shrink-0" />
                  At huske dine præferencer.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent-warm)] shrink-0" />
                  At analysere trafik og brugsmønstre.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent-warm)] shrink-0" />
                  At forbedre indhold og brugeroplevelse.
                </li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <h2 className="display-lg text-[color:var(--color-ink)] mb-4">Slet eller blokér cookies</h2>
              <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                Du kan til enhver tid slette eller blokere cookies i din browser. Hvis du
                blokerer cookies, kan visse funktioner på siden fungere dårligere.
              </p>
              <p className="mt-3 text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                Vejledning findes her:{" "}
                <a
                  href="http://minecookies.org/cookiehandtering"
                  target="_blank"
                  rel="noreferrer"
                  className="animated-link text-[color:var(--color-ink)] font-medium"
                >
                  minecookies.org/cookiehandtering
                </a>
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="card-ivory p-8 rounded-[1.25rem]">
                <h2 className="display-lg text-[color:var(--color-ink)] mb-4">Kontakt</h2>
                <p className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]">
                  Hvis du har spørgsmål til vores cookiepolitik, kan du kontakte os på{" "}
                  <a
                    href="mailto:kontakt@specialklinik.dk"
                    className="animated-link text-[color:var(--color-ink)] font-medium"
                  >
                    kontakt@specialklinik.dk
                  </a>.
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
