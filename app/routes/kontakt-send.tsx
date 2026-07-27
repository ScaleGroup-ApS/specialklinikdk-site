import { data, Link, useActionData } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { submitContactForm } from "~/lib/crm.server";
import type { Route } from "./+types/kontakt-send";

export function meta() {
  return [
    { title: "Kontakt Specialklinik Taastrup" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

// Action-only route (#kontakt-form): the contact form on /kontakt-os posts here
// via useFetcher. With JS, the fetcher intercepts the response and renders the
// inline success/error message on the contact page itself — the component
// below never mounts. Without JS, the browser does a full POST navigation here
// and this component renders the result, so the flow still works
// (progressive enhancement).
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  // Honeypot: real visitors never fill this (it's visually hidden). A filled
  // value means a bot filled every field blindly — silently pretend success
  // rather than surfacing an error that would teach it to adapt.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { ok: true };
  }

  const name = String(formData.get("fulde_navn") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("telefon") ?? "").trim();
  const topic = String(formData.get("emne") ?? "").trim();
  const message = String(formData.get("besked") ?? "").trim();

  if (!name || !email) {
    return data({ ok: false, error: "Udfyld venligst navn og email." }, { status: 400 });
  }

  // The topic <select> is optional and not part of the CRM contract, so fold it
  // into the free-text message the clinic receives rather than dropping it.
  const composedMessage =
    [topic ? `Emne: ${topic}` : null, message || null].filter(Boolean).join("\n\n") || undefined;

  let res: Response;
  try {
    res = await submitContactForm({
      name,
      email,
      phone: phone || undefined,
      message: composedMessage,
      sourceUrl: request.headers.get("referer") ?? undefined,
    });
  } catch (error) {
    console.error("kontakt-send: failed to reach CRM", error);
    return data({ ok: false, error: "Beskeden kunne ikke sendes. Prøv igen." }, { status: 502 });
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`kontakt-send: CRM rejected submission (${res.status})`, body);
    return data({ ok: false, error: "Beskeden kunne ikke sendes. Prøv igen." }, { status: 502 });
  }

  return { ok: true };
}

// No-JS fallback page: only rendered on a full POST navigation here (JS
// disabled). With JS, the fetcher on /kontakt-os handles the response instead.
export default function KontaktSend() {
  const result = useActionData<typeof action>();
  const siteName = "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Kontakt"
          headline={result?.ok ? "Tak for din besked." : "Beskeden kunne ikke sendes."}
          body={
            result?.ok
              ? "Vi vender tilbage til dig hurtigst muligt."
              : (result && "error" in result ? result.error : undefined) ??
                "Der opstod en fejl. Prøv venligst igen."
          }
        />

        <ContentSection bg="white" narrow>
          <Link
            to="/kontakt-os"
            className="animated-link text-[color:var(--color-ink)] font-medium text-[15px]"
          >
            Tilbage til kontakt
          </Link>
        </ContentSection>
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
