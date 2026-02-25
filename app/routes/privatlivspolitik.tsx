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
      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-5xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-8">
            Privatlivspolitik
          </h1>

          <div className="space-y-8 text-text-muted leading-[1.8]">
            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Introduktion</h2>
              <p>
                Når du besøger vores website, indsamles oplysninger om dig, som bruges til at
                tilpasse og forbedre vores indhold. Hvis du ikke ønsker, at der indsamles
                oplysninger, bør du slette dine cookies og undlade videre brug af websitet.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Cookies</h2>
              <p>
                Websitet anvender cookies, som er små tekstfiler, der gemmes på din enhed med
                det formål at genkende dig, huske indstillinger, udføre statistik og målrette
                indhold. Cookies kan ikke indeholde skadelig kode.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Personoplysninger</h2>
              <p>
                Personoplysninger er informationer, der kan henføres til dig. Vi behandler
                eksempelvis tekniske oplysninger, IP-adresse, geografisk placering og hvilke
                sider du besøger. Hvis du selv indtaster oplysninger, kan vi også behandle
                navn, telefonnummer, e-mail, adresse og betalingsoplysninger.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Sikkerhed</h2>
              <p>
                Vi behandler dine personoplysninger sikkert og fortroligt i overensstemmelse
                med gældende lovgivning, herunder persondataforordningen og
                databeskyttelsesloven. Oplysningerne bruges kun til de formål, de er indsamlet
                til, og slettes når de ikke længere er relevante.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Formål</h2>
              <p>
                Oplysninger bruges bl.a. til at identificere dig som bruger, levere services du
                efterspørger, registrere køb/betalinger og optimere website og indhold.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Opbevaring og videregivelse</h2>
              <p>
                Oplysninger opbevares kun så længe det er nødvendigt og lovligt. Data kan
                behandles af databehandlere på vores vegne. Videregivelse af personoplysninger
                som navn og e-mail sker kun ved samtykke.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-secondary mb-3">Indsigt og klager</h2>
              <p>
                Du har ret til indsigt, berigtigelse, sletning og indsigelse. Du kan kontakte
                os på <a href="mailto:kontakt@specialklinik.dk">kontakt@specialklinik.dk</a>.
                Du kan også klage til Datatilsynet.
              </p>
            </section>

            <section className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-3">Udgiver</h2>
              <p>
                Kirurgisk Klinik Brabrand v/Amin Bakhtyar Baram
                <br />
                Taastrup Hovedgade 80, 2. th, 2630 Taastrup
                <br />
                Telefon: 20 76 35 16
                <br />
                E-mail: kontakt@specialklinik.dk
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
