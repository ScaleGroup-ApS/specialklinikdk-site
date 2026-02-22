// app/routes/priser.tsx
/**
 * /priser — Pricing Page
 * Dedicated route with SSR, SEO meta, and JSON-LD.
 */
import type { Route } from "./+types/priser";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

// ── Loader ────────────────────────────────────────────────────────────────────

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

// ── Meta ──────────────────────────────────────────────────────────────────────

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Priser | Specialklinik Taastrup" }];

  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return [
    ...buildMeta({
      title: `Priser | ${siteName}`,
      description:
        "Priser for omskæring med tydeligt overblik over aldersgrupper og behandlingsformer.",
      url: `${siteUrl}/priser`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/priser` },
  ];
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Priser({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-6">
            Priser
          </h1>
          <h2 className="font-heading text-2xl text-secondary mb-4">Priser for omskæring</h2>
          <p className="text-text-muted leading-[1.8] mb-8">
            Her finder I en oversigt over priser for omskæring. Priserne er inklusive
            lovpligtig patientforsikring.
          </p>

          <div className="space-y-4">
            <div className="glass-card p-5 flex items-center justify-between gap-4">
              <span className="text-secondary font-medium">Barn under 6 måneder</span>
              <span className="text-2xl font-semibold text-secondary">2500 kr</span>
            </div>
            <div className="glass-card p-5 flex items-center justify-between gap-4">
              <span className="text-secondary font-medium">Barn 6 måneder - 1 år</span>
              <span className="text-2xl font-semibold text-secondary">3000 kr</span>
            </div>
            <div className="glass-card p-5">
              <p className="text-secondary font-medium mb-1">Barn 2 år - 6 år</p>
              <p className="text-text-muted">
                Omskæring foretages i fuld bedøvelse. Kontakt klinikken på e-mail for
                planlægning.
              </p>
            </div>
            <div className="glass-card p-5 flex items-center justify-between gap-4">
              <span className="text-secondary font-medium">Barn 6 år - 11 år (lokalbedøvelse)</span>
              <span className="text-2xl font-semibold text-secondary">3500 kr</span>
            </div>
            <div className="glass-card p-5 flex items-center justify-between gap-4">
              <span className="text-secondary font-medium">Omskæring i fuld bedøvelse (2-11 år)</span>
              <span className="text-2xl font-semibold text-secondary">9000 kr</span>
            </div>
          </div>

          <p className="text-text-muted leading-[1.8] mt-8">
            Vi anbefaler ofte omskæring i fuld bedøvelse til børn over spædbarnsalderen.
            Kontakt klinikken hvis I er i tvivl om, hvad der er bedst for jeres barn.
          </p>
        </article>
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
