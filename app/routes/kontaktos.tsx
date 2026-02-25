import type { Route } from "./+types/kontaktos";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { PatientTestimonials } from "~/components/PatientTestimonials";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  let siteInfo: WpSiteInfo | null = null;
  try {
    siteInfo = await getSiteInfo().catch(() => null);
  } catch {
    // graceful degradation
  }
  return { siteInfo, siteUrl };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Kontakt os | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Kontakt os | ${siteName}`,
      description:
        "Kontakt Specialklinik Taastrup ved spørgsmål om omskæring, booking og forberedelse.",
      url: `${siteUrl}/kontakt-os`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/kontakt-os` },
  ];
}

export default function KontaktOs({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />
      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Kontakt os
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-5">
              Kontakt Specialklinik Taastrup
            </h1>
            <p className="text-text-muted leading-[1.8]">
              Vi er her for at hjælpe jer med spørgsmål om omskæring, booking og forberedelse.
              Vores team giver jer tydelig information og støtte gennem hele forløbet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <section className="glass-card p-6 lg:col-span-5">
              <h2 className="font-heading text-2xl text-secondary mb-4">Hurtig kontakt</h2>
              <div className="space-y-3 mb-5 text-text-muted">
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span><span className="font-semibold text-secondary">Telefon:</span> 20 76 35 16</span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span><span className="font-semibold text-secondary">Email:</span> kontakt@specialklinik.dk</span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><span className="font-semibold text-secondary">Adresse:</span> Taastrup Hovedgade 80<br></br> 2. th, 2630 Taastrup</span>
                </p>
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span><span className="font-semibold text-secondary">CVR:</span> 44505975</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+4520763516"
                  className="hover-primary-btn inline-flex w-full justify-center items-center px-6 py-3 rounded-lg border border-slate-200 text-secondary font-semibold"
                >
                  Ring nu
                </a>
                <a
                  href="mailto:kontakt@specialklinik.dk"
                  className="hover-primary-btn inline-flex w-full justify-center items-center px-6 py-3 rounded-lg border border-slate-200 text-secondary font-semibold"
                >
                  Skriv e-mail
                </a>
              </div>
            </section>

            <section className="glass-card p-0 overflow-hidden lg:col-span-7">
              <img
                src="/images/Klinikken-scaled%20(1).jpg"
                alt="Specialklinik Taastrup kliniklokaler"
                className="w-full h-[280px] md:h-[360px] object-cover"
                loading="lazy"
              />
            </section>
          </div>

          <section className="glass-card p-6 mb-8">
            <h3 className="font-heading text-2xl text-secondary mb-3">Send os en besked</h3>
            <p className="text-text-muted leading-[1.8] mb-5">
              Udfyld formularen, så vender vi tilbage hurtigst muligt.
            </p>

            <form
              action="mailto:kontakt@specialklinik.dk"
              method="post"
              encType="text/plain"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <label className="block">
                <span className="text-sm font-semibold text-secondary">Fulde navn *</span>
                <input
                  type="text"
                  name="fulde_navn"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-secondary">Telefon *</span>
                <input
                  type="tel"
                  name="telefon"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-secondary">Email *</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-secondary">Besked</span>
                <textarea
                  name="besked"
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="btn-gradient rounded-lg px-6 py-3"
                >
                  Send besked
                </button>
              </div>
            </form>
          </section>

          <section className="glass-card p-6 mb-8">
            <h3 className="font-heading text-2xl text-secondary mb-3">Find klinikken</h3>
            <p className="text-text-muted leading-[1.8]">
              Taastrup S-togsstation ligger cirka 450 meter fra klinikken. Der er gratis
              parkering foran klinikken. Hvis I kommer i bil, anbefaler vi at komme få minutter
              før aftaletidspunktet.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Kort over Specialklinik Taastrup"
                src="https://maps.google.com/maps?q=Taastrup%20Hovedgade%2080%2C%202630%20Taastrup&z=15&output=embed"
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </article>
        <PatientTestimonials />
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
