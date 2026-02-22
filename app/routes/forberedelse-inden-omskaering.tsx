import type { Route } from "./+types/forberedelse-inden-omskaering";
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
  if (!data) return [{ title: "Forberedelse inden omskæring | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return [
    ...buildMeta({
      title: `Forberedelse inden omskæring | ${siteName}`,
      description:
        "Sådan forbereder I jer før omskæringsproceduren: tryllecreme, sukkervand, dokumenter og praktiske forhold.",
      url: `${siteUrl}/forberedelse-inden-omskaering`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/forberedelse-inden-omskaering` },
  ];
}

export default function Forberedelse({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Forberedelse inden omskæring
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary leading-tight mb-6">
            Procedurer til forberedelse inden omskæring
          </h1>
          <div className="space-y-6 text-text-muted leading-[1.8]">
            <p>
              Før I møder op på klinikken, er det vigtigt at læse følgende information for
              at sikre en bedre oplevelse for jeres søn. For at sikre et succesfuldt indgreb
              er det vigtigt, at jeres søn er sund og rask.
            </p>
            <p>
              Vores erfaring viser, at det ofte er bedst at udføre omskæringen, når barnet
              er mellem 2-12 uger gammelt, hvis barnet ikke er født for tidligt og vejer
              mindst 3 kg. Hvis I er i tvivl, bedes I kontakte klinikken inden
              tidsbestilling.
            </p>
          </div>

          <section className="mt-10 space-y-5">
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Tryllecreme</h2>
              <p className="text-text-muted leading-[1.8]">
                Smør tryllecreme på ca. 45-60 minutter før aftalen. Tryllecreme kan købes i
                håndkøb (fx Emla eller Tapin). Påfør et tykt lag rundt om penisroden og dæk
                med plaster.
              </p>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Sukkervand</h2>
              <p className="text-text-muted leading-[1.8]">
                Til småbørn under 6 måneder anbefales sukkervand i sutteflaske.
                Blandingsforhold: 10 gram sukker i 100 ml forkogt vand.
              </p>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Modermælk/erstatning</h2>
              <p className="text-text-muted leading-[1.8]">
                Medbring modermælk eller modermælkserstatning, hvis jeres barn drikker fra
                flaske.
              </p>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Sygesikringskort/CPR-nummer</h2>
              <p className="text-text-muted leading-[1.8]">
                Medbring barnets sygesikringskort. Hvis I endnu ikke har modtaget det,
                medbring barnets CPR-nummer.
              </p>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-heading text-2xl text-secondary mb-2">Bleer og tøj</h2>
              <p className="text-text-muted leading-[1.8]">
                Tag ekstra bleer og tøj med i tilfælde af uheld. Til større drenge anbefales
                løst tøj.
              </p>
            </div>
          </section>

          <p className="mt-10 text-text-muted leading-[1.8]">
            Når I ankommer til klinikken, vil lægen informere jer om procedure, risici og
            forholdsregler efter omskæringen. Begge forældre bør være til stede og give
            informeret samtykke. Ved delt forældremyndighed, hvor én forælder ikke kan møde
            op, skal der medbringes samtykkeerklæring.
          </p>
        </article>
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
