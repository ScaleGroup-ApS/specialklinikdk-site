import { useState, useEffect } from "react";

interface HeaderProps {
  siteName?: string;
  lightBg?: boolean;
  menuItems?: Array<{
    title: string;
    url: string;
    children?: Array<{ title: string; url: string }>;
  }>;
}

export function Header({
  siteName = "Specialklinik Taastrup",
  menuItems = [],
  lightBg = false,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems =
    menuItems.length > 0
      ? menuItems
      : [
          {
            title: "Omskæring",
            url: "/omskaering",
            children: [
              { title: "Om omskæring", url: "/omskaering" },
              { title: "Ringmetoden", url: "/omskaering-med-ringmetoden" },
              { title: "Klassisk metode", url: "/omskaering-med-klassisk-metode" },
              { title: "Fuld bedøvelse", url: "/omskaering-med-fuld-bedoevelse" },
              { title: "Forberedelse", url: "/forberedelse-inden-omskaering" },
            ],
          },
          { title: "Om os", url: "/om-os" },
          { title: "FAQ", url: "/faq" },
          { title: "Priser", url: "/priser" },
          { title: "Kontakt", url: "/kontakt-os" },
        ];

  const solid = scrolled || lightBg || mobileOpen;

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solid
          ? "bg-white/90 backdrop-blur-xl border-b border-[color:var(--color-border)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-3 shrink-0 group">
          <img
            src="/images/Specialklinik_logo.svg"
            alt={siteName}
            className="h-11 md:h-14 w-auto object-contain transition-opacity duration-300"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              href={item.url}
              label={item.title}
              childrenItems={item.children}
              solid={solid}
            />
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="/booking" className="btn-gradient" style={{ padding: "0.65rem 1.3rem" }}>
            Book tid
            <span className="btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={[
            "lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300",
            solid
              ? "border-[color:var(--color-border)] text-[color:var(--color-ink)]"
              : "border-white/40 text-white",
          ].join(" ")}
          aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
          aria-expanded={mobileOpen}
        >
          <span className="flex flex-col gap-[5px] w-4">
            <span
              className={
                "block h-px bg-current transition-all duration-300 " +
                (mobileOpen ? "translate-y-[6px] rotate-45" : "")
              }
            />
            <span
              className={
                "block h-px bg-current transition-all duration-300 " +
                (mobileOpen ? "opacity-0" : "opacity-100")
              }
            />
            <span
              className={
                "block h-px bg-current transition-all duration-300 " +
                (mobileOpen ? "-translate-y-[6px] -rotate-45" : "")
              }
            />
          </span>
          <span className="text-[11px] uppercase tracking-[0.24em]">{mobileOpen ? "Luk" : "Menu"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "lg:hidden overflow-hidden bg-white/98 backdrop-blur-xl border-t border-[color:var(--color-border)] transition-[max-height,opacity] duration-500 ease-out",
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 space-y-1">
          {navItems.map((item) => (
            <MobileNavLink
              key={item.url}
              href={item.url}
              label={item.title}
              childrenItems={item.children}
              onClick={() => setMobileOpen(false)}
            />
          ))}
          <div className="pt-5 mt-3 border-t border-[color:var(--color-border)] flex flex-col gap-2">
            <a
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="btn-gradient w-full"
            >
              Book tid
              <span className="btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
            <a
              href="/kontakt-os"
              onClick={() => setMobileOpen(false)}
              className="btn-outline w-full"
            >
              Kontakt klinikken
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  childrenItems,
  solid,
}: {
  href: string;
  label: string;
  childrenItems?: Array<{ title: string; url: string }>;
  solid: boolean;
}) {
  const to = href.startsWith("http") ? new URL(href).pathname : href;
  const hasChildren = !!childrenItems?.length;

  return (
    <div className="relative group">
      <a
        href={to}
        className={[
          "animated-link text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 inline-flex items-center gap-1.5",
          solid
            ? "text-[color:var(--color-ink)] hover:text-[color:var(--color-primary-dark)]"
            : "text-white/90 hover:text-white",
        ].join(" ")}
      >
        {label}
        {hasChildren && (
          <svg
            className="w-3 h-3 transition-transform group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </a>

      {hasChildren && (
        <div className="absolute left-0 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
          <div
            className="min-w-[320px] rounded-2xl border border-[color:var(--color-border)] bg-white shadow-[0_30px_60px_-30px_rgba(11,16,32,0.3)] p-2"
          >
            {childrenItems!.map((item) => {
              const childTo = item.url.startsWith("http")
                ? new URL(item.url).pathname
                : item.url;
              return (
                <a
                  key={item.url}
                  href={childTo}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface-dim)] transition-colors"
                >
                  <span>{item.title}</span>
                  <svg
                    className="w-3.5 h-3.5 text-[color:var(--color-text-muted)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavLink({
  href,
  label,
  childrenItems,
  onClick,
}: {
  href: string;
  label: string;
  childrenItems?: Array<{ title: string; url: string }>;
  onClick: () => void;
}) {
  const to = href.startsWith("http") ? new URL(href).pathname : href;
  const hasChildren = !!childrenItems?.length;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-[color:var(--color-border)] last:border-b-0">
      <div className="flex items-center">
        <a
          href={to}
          onClick={onClick}
          className="flex-1 block py-4 font-display text-xl text-[color:var(--color-ink)]"
        >
          {label}
        </a>
        {hasChildren && (
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label="Åbn undermenu"
            className="p-2"
          >
            <svg
              className={
                "w-4 h-4 transition-transform duration-300 " +
                (expanded ? "rotate-180" : "")
              }
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <div className="pl-2 pb-3 space-y-1">
          {childrenItems!.map((item) => {
            const childTo = item.url.startsWith("http")
              ? new URL(item.url).pathname
              : item.url;
            return (
              <a
                key={item.url}
                href={childTo}
                onClick={onClick}
                className="block px-3 py-2 rounded-lg text-[14px] text-[color:var(--color-text-muted)] hover:text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface-dim)] transition-colors"
              >
                {item.title}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
