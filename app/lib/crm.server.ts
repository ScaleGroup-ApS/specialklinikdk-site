// Server-only client for the CRM platform's internal API (cluster-only,
// reached over the internal service DNS — never from the browser).
// Mirrors apps/scaleweb.dk/app/lib/services.server.ts in the CRM monorepo.

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  sourceUrl?: string;
}

/**
 * POSTs to the CRM's POST /internal/site-submission, which stores the
 * submission and delivers it to the clinic's inbox (Resend, from
 * noreply@scaleweb.dk) via the WEBSITE_FORM_SUBMISSION event handler.
 */
export async function submitContactForm(input: ContactFormInput): Promise<Response> {
  const url = `${requireEnv("CRM_API_URL")}/internal/site-submission`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${requireEnv("CRM_API_TOKEN")}`,
    },
    body: JSON.stringify({ slug: requireEnv("SITE_SLUG"), ...input }),
  });
}
