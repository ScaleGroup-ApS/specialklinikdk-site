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

export function Header({ siteName = "Specialklinik Taastrup", menuItems = [], lightBg = false }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = menuItems.length > 0 ? menuItems : [
    {
      title: "Omskæring",
      url: "/omskaering",
      children: [
        { title: "Om omskæring", url: "/omskaering" },
        { title: "Forberedelse inden omskæring", url: "/forberedelse-inden-omskaering" },
        { title: "Klassisk metode", url: "/omskaering-med-klassisk-metode" },
        { title: "Ringmetoden", url: "/omskaering-med-ringmetoden" },
        { title: "Omskæring med fuld bedøvelse", url: "/omskaering-med-fuld-bedoevelse" },
      ],
    },
    { title: "Om os", url: "/om-os" },
    { title: "FAQ", url: "/faq" },
    { title: "Priser", url: "/priser" },
    { title: "Kontakt os", url: "/kontakt-os" },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || lightBg
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="inline-flex items-center">
          <img
            src="/images/Specialklinik-Taastrup-1%20(2).svg"
            alt={siteName}
            className="h-10 md:h-11 w-auto rounded-md bg-white/95 p-1 shadow-sm"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              href={item.url}
              label={item.title}
              childrenItems={item.children}
              scrolled={scrolled || lightBg}
            />
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="/booking"
            className="btn-gradient text-sm"
            style={{ padding: "0.625rem 1.5rem", borderRadius: "0.5rem" }}
          >
            Book tid online
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={[
            "md:hidden p-2 rounded-lg transition-colors",
            scrolled || lightBg ? "hover:bg-slate-100" : "hover:bg-white/10",
          ].join(" ")}
          aria-label="Åbn menu"
        >
          <svg
            className={["w-6 h-6 transition-colors", scrolled || lightBg ? "text-secondary" : "text-white"].join(" ")}
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
                childrenItems={item.children}
                onClick={() => setMobileOpen(false)}
              />
            ))}
            <div className="pt-3 border-t border-slate-100 mt-3">
              <a
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="btn-gradient w-full justify-center"
                style={{ borderRadius: "0.5rem" }}
              >
                Book tid online
              </a>
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
  childrenItems,
  scrolled,
}: {
  href: string;
  label: string;
  childrenItems?: Array<{ title: string; url: string }>;
  scrolled: boolean;
}) {
  const to = href.startsWith("http") ? new URL(href).pathname : href;
  const hasChildren = !!childrenItems?.length;
  const isOmskaeringMenu = label === "Omskæring" && hasChildren;

  return (
    <div className="relative group">
      <a
        href={to}
        className={[
          "animated-link text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1",
          scrolled ? "text-slate-600 hover:text-secondary" : "text-white/80 hover:text-white",
        ].join(" ")}
      >
        {label}
        {hasChildren && (
          <svg className="w-3.5 h-3.5 mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </a>

      {hasChildren && (
        <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
          <div
            className={[
              "rounded-xl border border-slate-200 bg-white shadow-xl",
              isOmskaeringMenu ? "w-[680px] p-4" : "min-w-[280px] p-2",
            ].join(" ")}
          >
            {isOmskaeringMenu ? (
              <div className="grid grid-cols-3 gap-3">
                {childrenItems!.map((item) => {
                  const childTo = item.url.startsWith("http") ? new URL(item.url).pathname : item.url;
                  return (
                    <a
                      key={item.url}
                      href={childTo}
                      className="block rounded-lg border border-slate-100 p-3 hover:bg-slate-50 hover:border-slate-200 transition-colors"
                    >
                      <p className="text-sm font-semibold text-secondary">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Læs mere om behandling, forløb og praktisk information.
                      </p>
                    </a>
                  );
                })}
                <a
                  href="/booking"
                  className="col-span-3 mt-1 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors"
                  style={{ background: "#697DA8" }}
                >
                  Book tid online
                </a>
              </div>
            ) : (
              childrenItems!.map((item) => {
                const childTo = item.url.startsWith("http") ? new URL(item.url).pathname : item.url;
                return (
                  <a
                    key={item.url}
                    href={childTo}
                    className="block px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-secondary transition-colors"
                  >
                    {item.title}
                  </a>
                );
              })
            )}
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

  return (
    <div className="rounded-xl border border-slate-100">
      <a
        href={to}
        onClick={onClick}
        className="block px-4 py-3 text-secondary hover:bg-slate-50 rounded-t-xl transition-colors font-medium text-[15px]"
      >
        {label}
      </a>
      {hasChildren && (
        <div className="pb-2">
          {childrenItems!.map((item) => {
            const childTo = item.url.startsWith("http") ? new URL(item.url).pathname : item.url;
            return (
              <a
                key={item.url}
                href={childTo}
                onClick={onClick}
                className="block px-6 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
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
