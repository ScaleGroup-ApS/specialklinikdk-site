import type { Route } from "./+types/omskaering";
import { Link } from "react-router";
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

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Omskæring
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary leading-tight mb-6">
            Rituel drengeomskæring
          </h1>
          <p className="text-text-muted text-lg leading-[1.8] mb-10">
            Omskæring er en årtusindegammel skik i mange kulturer og religioner. Der kan
            være kulturelle, religiøse eller medicinske årsager til, at forældre vælger at
            lade deres drengebørn omskære.
          </p>

          <div className="space-y-6 text-text-muted leading-[1.8]">
            <p>
              Omskæring af drengebørn er omdiskuteret. Styrelsen for Patientsikkerhed har
              i 2020 udgivet en omfattende rapport, der belyser mange aspekter af
              omskæring, herunder gavnlige sundhedsmæssige effekter samt en opgørelse af
              komplikationer ved omskæring.
            </p>
            <p>
              Omskæring af drengebørn er lovligt, når det foretages af en autoriseret læge
              og ifølge gældende regler på området. Omskæring er ulovligt, når det
              foretages af en ikke-autoriseret fagperson i en ikke-registreret klinik eller
              i private hjem.
            </p>
            <p>
              På Specialklinik Taastrup udføres omskæring af drengebørn med enten
              ringmetoden eller den klassiske metode.
            </p>
          </div>

          <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/forberedelse-inden-omskaering" className="glass-card p-5 hover:shadow-lg transition-shadow">
              <h2 className="font-heading text-xl text-secondary mb-2">Forberedelse inden omskæring</h2>
              <p className="text-text-muted text-sm">Læs hvad I skal medbringe og hvordan I forbereder jeres barn.</p>
            </Link>
            <Link to="/omskaering-med-klassisk-metode" className="glass-card p-5 hover:shadow-lg transition-shadow">
              <h2 className="font-heading text-xl text-secondary mb-2">Klassisk metode</h2>
              <p className="text-text-muted text-sm">Information om bedøvelse, procedure, efterforløb og komplikationer.</p>
            </Link>
            <Link to="/omskaering-med-ringmetoden" className="glass-card p-5 hover:shadow-lg transition-shadow">
              <h2 className="font-heading text-xl text-secondary mb-2">Ringmetoden</h2>
              <p className="text-text-muted text-sm">Læs om Circumplast®, forløb, heling og forholdsregler.</p>
            </Link>
            <Link to="/omskaering-med-fuld-bedoevelse" className="glass-card p-5 hover:shadow-lg transition-shadow">
              <h2 className="font-heading text-xl text-secondary mb-2">Fuld bedøvelse eller sedation</h2>
              <p className="text-text-muted text-sm">Mulighed for omskæring under narkose for relevante aldersgrupper.</p>
            </Link>
          </section>
        </article>
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
