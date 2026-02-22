/**
 * Homepage Route
 *
 * Hybrid: Custom React sections (Hero, SocialProof, Services, Testimonials)
 * + optional WordPress supplementary content below.
 */
import type { Route } from "./+types/index";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { WpContent } from "~/components/WpContent";
import { JsonLd } from "~/components/JsonLd";
import { HeroSection } from "~/components/home/HeroSection";
import { SocialProof } from "~/components/home/SocialProof";
import { ServicesSection } from "~/components/home/ServicesSection";
import { Testimonials } from "~/components/home/Testimonials";
import { getFrontPage, getSiteInfo } from "~/lib/wp-api";
import {
  buildMeta,
  buildWebsiteJsonLd,
  buildPageJsonLd,
  getFeaturedImageUrl,
  stripHtml,
} from "~/lib/seo";
import type { WpPage, WpSiteInfo } from "~/lib/wp-types";

// ── Loader ───────────────────────────────────────────────────────────────────

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;

  let page: WpPage | null = null;
  let siteInfo: WpSiteInfo | null = null;

  try {
    [page, siteInfo] = await Promise.all([
      getFrontPage().catch(() => null),
      getSiteInfo().catch(() => null),
    ]);
  } catch {
    // graceful degradation — custom sections always render
  }

  return { page, siteInfo, siteUrl };
}

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Specialklinik Taastrup" }];

  const { siteInfo, page, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  const description = page?.excerpt?.rendered
    ? stripHtml(page.excerpt.rendered)
    : siteInfo?.description ??
      "Professionel omskæring i trygge rammer for drengebørn. Tryghed - hele vejen.";

  return [
    ...buildMeta({
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      siteUrl,
      type: "website",
      image: page ? getFeaturedImageUrl(page) : undefined,
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: siteUrl },
  ];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Index({ loaderData }: Route.ComponentProps) {
  const { page, siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} />

      {/* Structured Data */}
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />
      {page && <JsonLd data={buildPageJsonLd({ page, siteInfo, siteUrl })} />}

      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <ServicesSection />
        <Testimonials />

        {/* Supplementary WordPress content (rendered below the fold if configured) */}
        {page?.content?.rendered && (
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-6">
              <WpContent html={page.content.rendered} />
            </div>
          </section>
        )}
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
