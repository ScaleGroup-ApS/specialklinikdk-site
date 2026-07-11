/**
 * sitemap[.]xml route — served at /sitemap.xml
 *
 * Static sitemap generated from the app's route table (app/routes.ts).
 * The site is fully code-defined, so routes are enumerated here directly.
 */
import type { Route } from "./+types/sitemap[.]xml";

/** Public routes with their sitemap priority. Keep in sync with app/routes.ts. */
const ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "omskaering", priority: "0.8", changefreq: "monthly" },
  { path: "priser", priority: "0.8", changefreq: "monthly" },
  { path: "booking", priority: "0.8", changefreq: "monthly" },
  { path: "omskaering-med-klassisk-metode", priority: "0.7", changefreq: "monthly" },
  { path: "omskaering-med-ringmetoden", priority: "0.7", changefreq: "monthly" },
  { path: "omskaering-med-fuld-bedoevelse", priority: "0.7", changefreq: "monthly" },
  { path: "forberedelse-inden-omskaering", priority: "0.7", changefreq: "monthly" },
  { path: "om-os", priority: "0.6", changefreq: "monthly" },
  { path: "faq", priority: "0.6", changefreq: "monthly" },
  { path: "kontakt-os", priority: "0.6", changefreq: "monthly" },
  { path: "privatlivspolitik", priority: "0.3", changefreq: "yearly" },
  { path: "cookiepolitik", priority: "0.3", changefreq: "yearly" },
];

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  const lastmod = new Date().toISOString().split("T")[0];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...ROUTES.map((r) => {
      const loc = r.path ? `${siteUrl}/${r.path}` : siteUrl;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
    }),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
