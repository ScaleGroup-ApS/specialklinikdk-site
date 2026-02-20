// app/routes/priser.tsx
/**
 * /priser — Pricing Page
 * Dedicated route with SSR, SEO meta, and JSON-LD.
 */
import type { Route } from "./+types/priser";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { PricingHero } from "~/components/priser/PricingHero";
import { PricingCards } from "~/components/priser/PricingCards";
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
  if (!data) return [{ title: "Priser — ABB Medical" }];

  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "ABB Medical";

  return [
    ...buildMeta({
      title: `Priser & Forløb — ${siteName}`,
      description:
        "Se vores transparente priser for konsultationer og behandlingsforløb hos ABB Medical i København. Kontakt os for et skræddersyet tilbud.",
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
  const siteName = siteInfo?.name ?? "ABB Medical";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <PricingHero />
        <PricingCards />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
