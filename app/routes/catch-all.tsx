/**
 * Splat route — catches every unmatched path.
 * Issues 301s for legacy URLs (see ~/lib/redirects), otherwise 404s.
 */
import { redirect } from "react-router";
import type { Route } from "./+types/catch-all";
import { LEGACY_REDIRECTS } from "~/lib/redirects";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";
  const target = LEGACY_REDIRECTS[pathname];

  if (target) {
    throw redirect(target, 301);
  }

  throw new Response("Not Found", { status: 404 });
}

export default function CatchAll() {
  return null;
}
