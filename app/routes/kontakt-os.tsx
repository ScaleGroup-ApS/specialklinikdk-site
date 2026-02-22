import type { Route } from "./+types/kontakt-os";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

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
  if (!data) return [{ title: "Kontakt os | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Kontakt os | ${siteName}`,
      description:
        "Kontakt Specialklinik Taastrup ved spørgsmål om omskæring, booking og forberedelse.",
      url: `${siteUrl}/kontakt-os`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/kontakt-os` },
  ];
}

export default function KontaktOs({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />
      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-6">
            Kontakt os
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-3">Kontaktoplysninger</h2>
              <ul className="space-y-2 text-text-muted">
                <li>Telefon: 20 76 35 16</li>
                <li>Email: kontakt@specialklinik.dk</li>
                <li>CVR: 44505975</li>
                <li>Taastrup Hovedgade 80, 2. th, 2630 Taastrup</li>
              </ul>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-3">Booking</h2>
              <p className="text-text-muted leading-[1.8]">
                Tidsbestilling foregår online. Ved spørgsmål er I velkomne til at kontakte os
                på e-mail.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
