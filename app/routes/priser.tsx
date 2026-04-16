// app/routes/priser.tsx
/**
 * /priser — Pricing Page (editorial redesign).
 */
import type { Route } from "./+types/priser";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { PatientTestimonials } from "~/components/PatientTestimonials";
import { PricingHero } from "~/components/priser/PricingHero";
import { PricingCards } from "~/components/priser/PricingCards";
import { CtaBand } from "~/components/home/CtaBand";
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
        "Tydelige priser for omskæring — efter alder og metode. Alt inklusive lovpligtig patientforsikring.",
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

      <main className="flex-1">
        <PricingHero />
        <PricingCards />
        <PatientTestimonials />
        <div className="h-20 md:h-28" />
        <CtaBand />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
