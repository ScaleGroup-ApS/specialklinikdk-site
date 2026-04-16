import { Link } from "react-router";

interface FooterProps {
  siteName?: string;
  siteDescription?: string;
}

export function Footer({
  siteName = "Specialklinik Taastrup",
  siteDescription,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-text-on-dark)]">
      <div aria-hidden className="absolute inset-0 grain grain-dark pointer-events-none" />

      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-10 left-0 right-0 text-center font-display leading-none"
        style={{
          fontSize: "clamp(6rem, 24vw, 22rem)",
          color: "rgba(237,239,245,0.04)",
          fontWeight: 300,
          letterSpacing: "-0.05em",
        }}
      >
        specialklinik
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Top: intent + CTA */}
        <div className="grid lg:grid-cols-12 gap-10 pb-20 border-b border-white/10">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-light mb-5">Specialklinik Taastrup</p>
            <h3 className="display-xl text-white leading-[1.05] max-w-3xl">
              Et roligt, professionelt forløb —{" "}
              <span className="font-display italic font-light text-[color:var(--color-accent-warm-soft)]">
                kun et klik væk.
              </span>
            </h3>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end items-end">
            <div className="flex flex-wrap gap-3">
              <Link to="/booking" className="btn-gradient btn-on-dark">
                Book tid online
                <span className="btn-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
              <Link to="/kontakt-os" className="btn-gradient btn-outline-on-dark">
                Skriv til os
              </Link>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 pt-16 pb-14">
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/images/Specialklinik_logo.svg"
                alt={siteName}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-5 text-[14px] leading-[1.8] text-[color:var(--color-text-on-dark-muted)] max-w-xs">
              {siteDescription ??
                "Rituel drengeomskæring i trygge rammer. Vi arbejder med respekt for jeres familie, jeres tro og jeres valg."}
            </p>

            <ul className="mt-8 space-y-3 text-[13px] text-[color:var(--color-text-on-dark)]">
              <li className="flex items-start gap-3">
                <IconPin />
                Taastrup Hovedgade 80, 2. th, 2630 Taastrup
              </li>
              <li className="flex items-start gap-3">
                <IconPhone />
                <a href="tel:+4520763516" className="animated-link">
                  +45 20 76 35 16
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconMail />
                <a href="mailto:kontakt@specialklinik.dk" className="animated-link">
                  kontakt@specialklinik.dk
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="eyebrow eyebrow-light mb-5">Navigation</h4>
            <ul className="space-y-3">
              <FooterLink to="/" label="Forside" />
              <FooterLink to="/omskaering" label="Omskæring" />
              <FooterLink to="/om-os" label="Om os" />
              <FooterLink to="/faq" label="FAQ" />
              <FooterLink to="/priser" label="Priser" />
              <FooterLink to="/kontakt-os" label="Kontakt" />
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="eyebrow eyebrow-light mb-5">Metoder</h4>
            <ul className="space-y-3">
              <FooterLink to="/omskaering-med-klassisk-metode" label="Klassisk metode" />
              <FooterLink to="/omskaering-med-ringmetoden" label="Ringmetoden" />
              <FooterLink to="/omskaering-med-fuld-bedoevelse" label="Fuld bedøvelse" />
              <FooterLink to="/forberedelse-inden-omskaering" label="Forberedelse" />
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="eyebrow eyebrow-light mb-5">Juridisk</h4>
            <ul className="space-y-3">
              <FooterLink to="/privatlivspolitik" label="Privatlivspolitik" />
              <FooterLink to="/cookiepolitik" label="Cookie-politik" />
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/10 text-[12px] text-[color:var(--color-text-on-dark-muted)]">
          <p>
            © {year} {siteName} / ABB Medical ApS. Alle rettigheder forbeholdes.
          </p>
          <p>
            Designet & udviklet af{" "}
            <a
              href="https://scaleweb.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white animated-link"
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
        className="animated-link text-[14px] text-[color:var(--color-text-on-dark-muted)] hover:text-white transition-colors"
      >
        {label}
      </Link>
    </li>
  );
}

function IconPin() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--color-accent-warm-soft)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--color-accent-warm-soft)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--color-accent-warm-soft)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
