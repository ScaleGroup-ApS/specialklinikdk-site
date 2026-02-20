import { Link } from "react-router";
import { useState, useEffect } from "react";

interface HeaderProps {
  siteName?: string;
  menuItems?: Array<{
    title: string;
    url: string;
    children?: Array<{ title: string; url: string }>;
  }>;
}

export function Header({ siteName = "ABB Medical", menuItems = [] }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = menuItems.length > 0 ? menuItems : [
    { title: "Forside", url: "/" },
    { title: "Behandlinger", url: "/behandlinger" },
    { title: "Om os", url: "/om-os" },
    { title: "Priser", url: "/priser" },
    { title: "Kontakt", url: "/kontakt" },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={[
            "font-heading text-xl font-medium tracking-tight transition-colors duration-300",
            scrolled ? "text-secondary" : "text-white",
          ].join(" ")}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {siteName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.url} href={item.url} label={item.title} scrolled={scrolled} />
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/kontakt"
            className="btn-gradient text-sm"
            style={{ padding: "0.625rem 1.5rem", borderRadius: "0.5rem" }}
          >
            Book konsultation
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={[
            "md:hidden p-2 rounded-lg transition-colors",
            scrolled ? "hover:bg-slate-100" : "hover:bg-white/10",
          ].join(" ")}
          aria-label="Åbn menu"
        >
          <svg
            className={["w-6 h-6 transition-colors", scrolled ? "text-secondary" : "text-white"].join(" ")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200 shadow-xl">
          <nav className="max-w-7xl mx-auto px-6 py-5 space-y-1">
            {navItems.map((item) => (
              <MobileNavLink
                key={item.url}
                href={item.url}
                label={item.title}
                onClick={() => setMobileOpen(false)}
              />
            ))}
            <div className="pt-3 border-t border-slate-100 mt-3">
              <Link
                to="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="btn-gradient w-full justify-center"
                style={{ borderRadius: "0.5rem" }}
              >
                Book konsultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  label,
  scrolled,
}: {
  href: string;
  label: string;
  scrolled: boolean;
}) {
  const to = href.startsWith("http") ? new URL(href).pathname : href;

  return (
    <Link
      to={to}
      className={[
        "animated-link text-sm font-medium transition-colors duration-200",
        scrolled ? "text-slate-600 hover:text-secondary" : "text-white/80 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const to = href.startsWith("http") ? new URL(href).pathname : href;

  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-3 text-secondary hover:bg-slate-50 rounded-xl transition-colors font-medium text-[15px]"
    >
      {label}
    </Link>
  );
}
