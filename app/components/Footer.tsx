import { Link } from "react-router";

interface FooterProps {
  siteName?: string;
  siteDescription?: string;
}

export function Footer({ siteName = "Specialklinik Taastrup", siteDescription }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-text-on-dark">
      {/* Top accent line */}
      <div className="h-[1px]" style={{ background: "#697DA8" }} />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center"
            >
              <img
                src="/images/Specialklinik-Taastrup-1%20(2).svg"
                alt={siteName}
                className="h-12 w-auto rounded-md bg-white p-1"
              />
            </Link>
            {siteDescription ? (
              <p className="mt-4 text-slate-400 max-w-xs leading-relaxed text-sm">
                {siteDescription}
              </p>
            ) : (
              <p className="mt-4 text-slate-400 max-w-xs leading-relaxed text-sm">
                Professionel omskæring i trygge rammer med fokus på sikkerhed, erfaring og tydelig vejledning.
              </p>
            )}

            {/* Contact Info */}
            <div className="mt-8 space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Taastrup Hovedgade 80, 2. th, 2630 Taastrup</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>20 76 35 16</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>kontakt@specialklinik.dk</span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/" label="Forside" />
              <FooterLink to="/omskaering" label="Omskæring" />
              <FooterLink to="/om-os" label="Om os" />
              <FooterLink to="/faq" label="FAQ" />
              <FooterLink to="/priser" label="Priser" />
              <FooterLink to="/kontakt-os" label="Kontakt os" />
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Ydelser
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/omskaering" label="Om omskæring" />
              <FooterLink to="/forberedelse-inden-omskaering" label="Forberedelse inden omskæring" />
              <FooterLink to="/omskaering-med-klassisk-metode" label="Klassisk metode" />
              <FooterLink to="/omskaering-med-ringmetoden" label="Ringmetoden" />
              <FooterLink to="/omskaering-med-fuld-bedoevelse" label="Omskæring med fuld bedøvelse" />
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Juridisk
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/privatlivspolitik" label="Privatlivspolitik" />
              <FooterLink to="/cookies" label="Cookie-politik" />
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {year} {siteName}. Alle rettigheder forbeholdes.
          </p>
          <p className="text-xs text-slate-600">
            Drevet af{" "}
            <a
              href="https://scaleweb.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-400 transition-colors"
            >
              Scaleweb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="animated-link text-sm text-slate-400 hover:text-white transition-colors"
      >
        {label}
      </Link>
    </li>
  );
}
