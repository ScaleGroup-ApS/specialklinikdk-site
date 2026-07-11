// app/routes/priser.tsx
/**
 * /priser — Pricing Page (editorial redesign).
 */
import type { Route } from "./+types/priser";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { ReviewsSlider } from "~/components/ReviewsSlider";
import { PricingHero } from "~/components/priser/PricingHero";
import { PricingCards } from "~/components/priser/PricingCards";
import { CtaBand } from "~/components/home/CtaBand";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";

// ── Loader ────────────────────────────────────────────────────────────────────

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

// ── Meta ──────────────────────────────────────────────────────────────────────

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Priser | Specialklinik Taastrup" }];

  const { siteUrl } = data;
  const siteName = "Specialklinik Taastrup";

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
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <PricingHero />
        <PricingCards />
        <ReviewsSlider />
        <div className="h-20 md:h-28" />
        <CtaBand />
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
