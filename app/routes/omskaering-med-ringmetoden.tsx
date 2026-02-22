import type { Route } from "./+types/omskaering-med-ringmetoden";
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
  if (!data) return [{ title: "Omskæring med ringmetoden | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring med ringmetoden | ${siteName}`,
      description:
        "Information om Circumplast® ringmetoden: procedure, efterforløb, inflammation og komplikationer.",
      url: `${siteUrl}/omskaering-med-ringmetoden`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/omskaering-med-ringmetoden` },
  ];
}

const AFTERCARE = [
  "Skærm området mod afføring med tørt papirtørklæde/vaskeklud i bleen.",
  "Smertebehandling med Panodil Junior 24 mg/ml: 0,5 ml pr. kilo kropsvægt hver 6. time i 3 dage, derefter ved behov.",
  "Sørg for ubesværet vandladning. Kontakt klinikken hvis barnet ikke lader vandet inden for 6 timer.",
  "Mindre blodpletter er normalt. Ved større eller aktiv blødning kontaktes klinikken straks.",
  "Start Fucidin salve 2% dagen efter omskæring, morgen og aften i en uge.",
  "Giv dagligt karbad i 5-10 min for at fremskynde processen, hvor ringen slipper.",
];

export default function OmskaeringRingmetoden({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Ringmetoden
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary leading-tight mb-6">
            Omskæring med ringmetoden
          </h1>

          <section className="space-y-6 text-text-muted leading-[1.8]">
            <p>
              Specialklinik Taastrup tilbyder ringmetoden med Circumplast®. Circumplast® er
              en avanceret ring til omskæring af drenge, som i flere studier er forbundet med
              lavere risiko for komplikationer sammenlignet med traditionelle ringe.
            </p>
            <p>
              Circumplast® har en unik cylindrisk form og er produceret af Novadien
              Healthcare. Ringen er godkendt af både FDA og UKCA.
            </p>
          </section>

          <section className="mt-10 space-y-6 text-text-muted leading-[1.8]">
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Bedøvelse</h2>
              <p>
                Barnet bedøves med lokalbedøvelse gennem to indstikssteder omkring penis.
                Tryllecreme inden fremmøde anbefales. Efter anlæggelse af bedøvelse ventes ca.
                10-20 minutter for fuld effekt.
              </p>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Proceduren</h2>
              <p>
                Forhuden løsnes fra glans penis. En plastikring placeres omkring
                penishovedet, huden trækkes ud over ringen, og en stram snor bindes på
                niveauet for omskæringen. Overskydende hud klippes væk, og ringen falder
                typisk af efter 5-14 dage.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-heading text-3xl text-secondary mb-4">Forholdsregler efter omskæring</h2>
            <ul className="space-y-3 text-text-muted leading-[1.8] list-disc pl-6">
              {AFTERCARE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-text-muted leading-[1.8] mt-5">
              Sjældent falder ringen ikke af inden for 14 dage. I sådanne tilfælde eller ved
              besværet vandladning og mange smerter skal klinikken kontaktes.
            </p>
          </section>

          <section className="mt-10 text-text-muted leading-[1.8]">
            <h2 className="font-heading text-3xl text-secondary mb-4">Inflammation og komplikationer</h2>
            <p>
              Let til moderat hævelse, rødme og belægninger kan være en normal del af
              helingen. Der er en mindre risiko for blødning i det første døgn og en sjælden
              risiko for infektion. Ved tegn på infektion, feber, pus eller besværet
              vandladning skal klinikken kontaktes.
            </p>
            <p className="mt-4">
              Når ringen er faldet af og såret er helet, kan jævnlig pleje med fed creme eller
              vaseline hjælpe med at forebygge sammenklistring hos børn med tendens til
              skjult penis.
            </p>
          </section>
        </article>
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
