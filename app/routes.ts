import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("omskaering", "routes/omskaering.tsx"),
  route("forberedelse-inden-omskaering", "routes/forberedelse-inden-omskaering.tsx"),
  route("omskaering-med-klassisk-metode", "routes/omskaering-med-klassisk-metode.tsx"),
  route("omskaering-med-ringmetoden", "routes/omskaering-med-ringmetoden.tsx"),
  route("omskaering-med-fuld-bedoevelse", "routes/omskaering-med-fuld-bedoevelse.tsx"),
  route("om-os", "routes/omos.tsx"),
  route("faq", "routes/faq.tsx"),
  route("kontakt-os", "routes/kontaktos.tsx"),
  route("booking", "routes/booking.tsx"),
  route("priser", "routes/priser.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
