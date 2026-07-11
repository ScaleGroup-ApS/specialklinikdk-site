// ─────────────────────────────────────────────────────────────────────────────
// SEO Helpers
// Generates meta tags, Open Graph, JSON-LD structured data, and canonical URLs.
// ─────────────────────────────────────────────────────────────────────────────

interface SeoOptions {
  title: string;
  description?: string;
  url?: string;
  siteName?: string;
  siteUrl?: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/**
 * Generate a complete set of meta tags for React Router's `meta` export.
 */
export function buildMeta(opts: SeoOptions) {
  const meta: Array<Record<string, string>> = [
    { title: opts.title },
  ];

  if (opts.description) {
    meta.push({ name: "description", content: opts.description });
  }

  // Open Graph
  meta.push({ property: "og:title", content: opts.title });
  meta.push({ property: "og:type", content: opts.type ?? "website" });
  if (opts.description) {
    meta.push({ property: "og:description", content: opts.description });
  }
  if (opts.url) {
    meta.push({ property: "og:url", content: opts.url });
  }
  if (opts.siteName) {
    meta.push({ property: "og:site_name", content: opts.siteName });
  }
  meta.push({ property: "og:locale", content: opts.locale ?? "da_DK" });

  if (opts.image) {
    meta.push({ property: "og:image", content: opts.image });
    meta.push({ property: "og:image:width", content: "1200" });
    meta.push({ property: "og:image:height", content: "630" });
    if (opts.imageAlt) {
      meta.push({ property: "og:image:alt", content: opts.imageAlt });
    }
  }

  // Twitter Card
  meta.push({ name: "twitter:card", content: opts.image ? "summary_large_image" : "summary" });
  meta.push({ name: "twitter:title", content: opts.title });
  if (opts.description) {
    meta.push({ name: "twitter:description", content: opts.description });
  }
  if (opts.image) {
    meta.push({ name: "twitter:image", content: opts.image });
  }

  // Article dates
  if (opts.type === "article") {
    if (opts.publishedTime) {
      meta.push({ property: "article:published_time", content: opts.publishedTime });
    }
    if (opts.modifiedTime) {
      meta.push({ property: "article:modified_time", content: opts.modifiedTime });
    }
  }

  // Robots
  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return meta;
}

/**
 * Generate WebSite JSON-LD (for the homepage).
 */
export function buildWebsiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Specialklinik Taastrup",
    description:
      "Professionel omskæring i trygge rammer for drengebørn. Tryghed — hele vejen.",
    url: siteUrl,
  };
}

/** Strip HTML tags from a string (for use in meta descriptions). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}
