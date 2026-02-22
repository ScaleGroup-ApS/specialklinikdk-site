import type { Route } from "./+types/om-os";
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
      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-6">
            Om os
          </h1>
          <div className="space-y-6 text-text-muted leading-[1.8]">
            <p>
              Specialklinik Taastrup er en underafdeling af Kirurgisk Klinik Brabrand.
              Klinikken blev etableret i 1995 og har siden udført flere tusinde rituelle
              omskæringer af drengebørn under høj sikkerhedsstandard og faglig ekspertise.
            </p>
            <p>
              Vores speciallæger er autoriserede og har omfattende erfaring med omskæring af
              spæd- og drengebørn. Klinikken er registreret behandlingssted hos Styrelsen for
              Patientsikkerhed og underlagt tilsyn.
            </p>
          </div>
        </article>
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
