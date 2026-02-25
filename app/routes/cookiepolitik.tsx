import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

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
      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-5xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-8">
            Cookiepolitik
          </h1>

          <div className="space-y-8 text-text-muted leading-[1.8]">
            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Hvad er cookies?</h2>
              <p>
                Denne hjemmeside anvender cookies. En cookie er en lille tekstfil, der lagres
                på din computer, mobil eller tablet for at genkende enheden, huske
                indstillinger, lave statistik og forbedre brugeroplevelsen.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Hvad bruger vi cookies til?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>At få siden til at fungere teknisk.</li>
                <li>At huske dine præferencer.</li>
                <li>At analysere trafik og brugsmønstre.</li>
                <li>At forbedre indhold og brugeroplevelse.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Slet eller blokér cookies</h2>
              <p>
                Du kan til enhver tid slette eller blokere cookies i din browser. Hvis du
                blokerer cookies, kan visse funktioner på siden fungere dårligere.
              </p>
              <p className="mt-2">
                Vejledning findes her:{" "}
                <a href="http://minecookies.org/cookiehandtering" target="_blank" rel="noreferrer">
                  minecookies.org/cookiehandtering
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Kontakt</h2>
              <p>
                Hvis du har spørgsmål til vores cookiepolitik, kan du kontakte os på{" "}
                <a href="mailto:kontakt@specialklinik.dk">kontakt@specialklinik.dk</a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
