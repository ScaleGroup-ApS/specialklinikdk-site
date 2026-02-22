import type { Route } from "./+types/faq";
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
  if (!data) return [{ title: "FAQ | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `FAQ | ${siteName}`,
      description:
        "Ofte stillede spørgsmål om omskæring, forberedelse, smertelindring, efterforløb og sikkerhed.",
      url: `${siteUrl}/faq`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/faq` },
  ];
}

const FAQ_ITEMS = [
  {
    q: "Hvornår er den bedste alder for omskæring?",
    a: "Vi anbefaler ofte, at omskæring finder sted når barnet er 2-8 uger gammelt, da indgrebet her typisk er mest skånsomt.",
  },
  {
    q: "Er omskæring farligt?",
    a: "Forekomsten af komplikationer er lav ved korrekt udført omskæring. Derfor bør indgrebet kun udføres af autoriserede og erfarne sundhedspersoner.",
  },
  {
    q: "Hvilke risici er forbundet med omskæring?",
    a: "De væsentligste risici er blødning og infektion. Klinikken vejleder altid grundigt i, hvad I skal holde øje med efter indgrebet.",
  },
  {
    q: "Er omskæring af drengebørn ulovligt?",
    a: "Omskæring er ikke ulovligt i Danmark, når det foretages af autoriserede sundhedspersoner og efter gældende regler.",
  },
  {
    q: "Mit barn er forkølet, skal jeg aflyse tiden?",
    a: "Hvis barnet er alment påvirket med fx feber, sløvhed eller nedsat appetit, bør tiden aflyses. Ved let forkølelse kan indgrebet ofte stadig gennemføres.",
  },
  {
    q: "Hvad skal jeg medbringe til klinikken?",
    a: "Barnets CPR/sygesikringskort, evt. sukkervand i sutteflaske, evt. modermælk/modermælkserstatning samt ekstra bleer og tøj.",
  },
  {
    q: "Hvordan foregår betalingen?",
    a: "Betalingen foregår ved fremmøde i klinikken.",
  },
  {
    q: "Hvilken operationsmetode bruger I?",
    a: "Der anvendes enten klassisk metode eller ringmetoden Circumplast. Metoden vælges i dialog med forældrene.",
  },
  {
    q: "Hvor længe har barnet ondt efter omskæring?",
    a: "Som regel lette smerter i 2-3 dage, som typisk kan håndteres med relevant smertestillende behandling.",
  },
  {
    q: "Hvor længe går der før såret er helet?",
    a: "Såret heler som regel på 1-2 uger. Let hævelse kan ses i flere uger, og det kosmetiske resultat vurderes først senere.",
  },
  {
    q: "Skal begge forældre komme med i klinikken?",
    a: "Begge forældre anbefales at møde op. Hvis kun den ene møder, kan samtykke/fuldmagt fra den anden forælder være nødvendig ved fælles forældremyndighed.",
  },
];

export default function FAQ({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />
      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-6">
            FAQ
          </h1>
          <h2 className="font-heading text-2xl text-secondary mb-4">Oftest stillede spørgsmål</h2>
          <p className="text-text-muted leading-[1.8] mb-8">
            Her finder I svar på de mest almindelige spørgsmål om klinikken og vores
            procedurer. Hvis I ikke finder svar på jeres spørgsmål, kontakt os gerne.
          </p>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <section key={item.q} className="glass-card p-5">
                <h3 className="font-heading text-xl text-secondary mb-2">{item.q}</h3>
                <p className="text-text-muted leading-[1.8]">{item.a}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
