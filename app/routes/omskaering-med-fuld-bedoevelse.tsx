import type { Route } from "./+types/omskaering-med-fuld-bedoevelse";
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
  if (!data) return [{ title: "Omskæring med fuld bedøvelse | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring med fuld bedøvelse | ${siteName}`,
      description:
        "Information om omskæring under narkose eller sedation, booking og praktiske kriterier.",
      url: `${siteUrl}/omskaering-med-fuld-bedoevelse`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/omskaering-med-fuld-bedoevelse` },
  ];
}

export default function OmskaeringFuldBedoevelse({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Omskæring med fuld bedøvelse
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary leading-tight mb-8">
            Nu tilbyder vi omskæring under narkose eller sedation
          </h1>

          <div className="space-y-6 text-text-muted leading-[1.8]">
            <p>
              Vi tilbyder omskæring af drengebørn i fuld bedøvelse eller sedation med fokus
              på sikkerhed, tryghed og komfort. Omskæring under narkose er forbeholdt drenge,
              som er fyldt 4 år og vejer mindst 20 kg.
            </p>
            <p>
              For at arrangere tid til omskæring under narkose eller sedation skal I kontakte
              klinikken via e-mail. Tidsbestilling til denne type forløb kan ikke foretages
              online.
            </p>
            <p>
              Klinikken planlægger herefter forløbet sammen med jer, så tidspunkt og
              rammer passer bedst muligt til barnet og familien.
            </p>
            <p>
              Har I spørgsmål eller behov for yderligere information, er I velkomne til at
              kontakte os. Vi står altid klar til at hjælpe.
            </p>
          </div>
        </article>
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
