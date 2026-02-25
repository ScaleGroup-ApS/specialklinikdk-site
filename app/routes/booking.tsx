import type { Route } from "./+types/booking";
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
  if (!data) return [{ title: "Booking | Specialklinik Taastrup" }];
  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";
  return [
    ...buildMeta({
      title: `Booking | ${siteName}`,
      description:
        "Book tid online til omskæring. Læs forberedelse og praktisk information før tidsbestilling.",
      url: `${siteUrl}/booking`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/booking` },
  ];
}

export default function Booking({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Specialklinik Taastrup";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />
      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-secondary mb-6">
            Booking
          </h1>
          <h2 className="font-heading text-2xl text-secondary mb-4">
            Book tid online til omskæring
          </h2>

          <figure className="mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
            <img
              src="/images/Forside-specialklinik-Taastrup%20(2).jpg"
              alt="Specialklinik Taastrup"
              className="w-full h-[240px] md:h-[320px] object-cover"
              loading="lazy"
            />
          </figure>

          <div className="space-y-6 text-text-muted leading-[1.8]">
            <p>
              Her kan I booke en tid til at få jeres søn omskåret. Hvis det drejer sig om
              omskæring af en dreng over 10 år eller voksenomskæring, bedes I kontakte
              klinikken inden tidsbestilling.
            </p>
            <p>
              Før I bestiller tid, anbefaler vi, at I læser afsnittene om forberedelse inden
              indgrebet og information om drengeomskæring.
            </p>
            <p>
              Hvis I ikke kan komme til jeres aftale, beder vi jer afbestille så tidligt som
              muligt i bookingmodulet eller via SMS til 20 76 35 16.
            </p>
            <p className="font-medium text-secondary">
              Vær opmærksom på, at klinikken kun har åbent på bestemte dage, og at fremmøde
              kun kan ske efter forudgående booking eller aftale.
            </p>
          </div>

          <section className="mt-10">
            <h3 className="font-heading text-2xl text-secondary mb-4">Online booking</h3>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <iframe
                title="Online booking - Specialklinik Taastrup"
                src="https://system.easypractice.net/book/specialklinik-taastrup?cookie_fixed=1"
                width="100%"
                height="760"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-sm text-text-muted mt-3">
              Hvis booking-vinduet ikke vises, kan du åbne booking i ny fane{" "}
              <a
                href="https://system.easypractice.net/book/specialklinik-taastrup?cookie_fixed=1"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                her
              </a>.
            </p>
          </section>
        </article>
        <PatientTestimonials />
      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
