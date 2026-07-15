// Legacy URL → current URL redirect map.
// Preserves link equity and search rankings carried over from the previous
// WordPress site. Keys are pathnames with no trailing slash.
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/index.php/om-os": "/om-os",
  "/index.php/omskaering": "/omskaering",
  "/index.php/booking": "/booking",
  "/index.php/priser": "/priser",
  "/index.php/faq": "/faq",
  "/index.php/kontakt-os": "/kontakt-os",
  // Retired WordPress page (62 indexed inlinks) — folded into the closest
  // equivalent procedure page rather than left to 404.
  "/omskaering-under-narkose-eller-sedation": "/omskaering-med-fuld-bedoevelse",
};
