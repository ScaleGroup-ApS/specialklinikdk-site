/**
 * Homepage Route — editorial redesign.
 */
import type { Route } from "./+types/index";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { HeroSection } from "~/components/home/HeroSection";
import { SocialProof } from "~/components/home/SocialProof";
import { ServicesSection } from "~/components/home/ServicesSection";
import { ProcessTimeline } from "~/components/home/ProcessTimeline";
import { ReviewsSlider } from "~/components/ReviewsSlider";
import { FaqTeaser } from "~/components/home/FaqTeaser";
import { CtaBand } from "~/components/home/CtaBand";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";

// ── Loader ───────────────────────────────────────────────────────────────────

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Specialklinik Taastrup" }];

  const { siteUrl } = data;
  const siteName = "Specialklinik Taastrup";
  const description =
    "Professionel omskæring i trygge rammer for drengebørn. Tryghed — hele vejen.";

  return [
    ...buildMeta({
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: siteUrl },
  ];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Index({ loaderData }: Route.ComponentProps) {
  const { siteUrl } = loaderData;
  const siteName = "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />

      {/* Structured Data */}
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <ServicesSection />
        <ProcessTimeline />
        <ReviewsSlider />
        <FaqTeaser />
        <CtaBand />
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
