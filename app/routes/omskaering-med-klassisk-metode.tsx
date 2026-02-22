import type { Route } from "./+types/omskaering-med-klassisk-metode";
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
  if (!data) return [{ title: "Omskæring med klassisk metode | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Omskæring med klassisk metode | ${siteName}`,
      description:
        "Information om omskæring med den klassiske metode: bedøvelse, procedure, efterforløb, inflammation og komplikationer.",
      url: `${siteUrl}/omskaering-med-klassisk-metode`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/omskaering-med-klassisk-metode` },
  ];
}

const PRECAUTIONS = [
  "Læg et tørt papirtørklæde eller en vaskeklud i bleen for at skærme forbindingen mod afføring.",
  "Smerter behandles med Panodil Junior 24 mg/ml. Dosering: 0,5 ml pr. kilo kropsvægt hver 6. time i 3 dage, derefter ved behov.",
  "Sørg for ubesværet vandladning. Hvis barnet ikke lader vandet inden for 4 timer, kontakt klinikken.",
  "Mindre sivning af blod er normalt. Ved større eller aktiv blødning skal klinikken kontaktes.",
];

const INFLAMMATION = [
  "Let hævelse i området.",
  "Rødme og hævelse af penishovedet.",
  "Hvide/gule fibrinbelægninger, som tørrer ud og falder af over cirka en uge.",
  "Let misfarvning ved indstiksstedet og på undersiden af penis.",
  "Helingstid er normalt ca. 2 uger, med let hævelse op til 3-4 uger.",
];

export default function OmskaeringKlassisk({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Klassisk metode
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary leading-tight mb-6">
            Omskæring med den klassiske metode
          </h1>
          <p className="text-text-muted leading-[1.8] mb-8">
            Denne side beskriver, hvordan omskæring med den klassiske metode foregår, hvad I
            kan forvente efter omskæringen, og hvilke forholdsregler der gælder.
          </p>

          <section className="space-y-6 text-text-muted leading-[1.8]">
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Bedøvelse</h2>
              <p>
                Barnet bedøves med lokalbedøvelse gennem to indstikssteder omkring penis.
                Bedøvelsen tager kort tid at anlægge, men kan være ubehagelig. Der ventes ca.
                15 minutter, til fuld effekt er opnået.
              </p>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Proceduren</h2>
              <p>
                Under sterile forhold løsnes huden omkring glans penis, forhuden fjernes med
                kirurgiske instrumenter, og hudens indre og ydre blad sys sammen med
                selvopløselig tråd. Forbindingen skal typisk sidde i 24 timer.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-heading text-3xl text-secondary mb-4">Forholdsregler efter omskæring</h2>
            <ul className="space-y-3 text-text-muted leading-[1.8] list-disc pl-6">
              {PRECAUTIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-text-muted leading-[1.8] mt-5">
              Efter 24 timer skal forbindingen blødgøres og fjernes under rindende vand.
              Herefter smøres med Fucidin salve 2% morgen og aften i 7 dage. Vaseline kan
              bruges for at lindre og forhindre fastklistring til ble.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-heading text-3xl text-secondary mb-4">Inflammation</h2>
            <ul className="space-y-3 text-text-muted leading-[1.8] list-disc pl-6">
              {INFLAMMATION.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 text-text-muted leading-[1.8]">
            <h2 className="font-heading text-3xl text-secondary mb-4">Komplikationer ved omskæring</h2>
            <p>
              Der er en mindre risiko for blødning i det første døgn. Ved pågående blødning
              skal I presse på såret med forbinding og kontakte klinikken. Ved akutte tilfælde
              kontaktes vagtlægen.
            </p>
            <p className="mt-4">
              Infektionsrisikoen er sjælden, men ved tegn som voldsom hævelse, pus, feber,
              påvirket almentilstand eller besværet vandladning skal klinikken kontaktes.
            </p>
          </section>
        </article>
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
