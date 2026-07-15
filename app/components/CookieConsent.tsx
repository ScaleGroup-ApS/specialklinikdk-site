import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    _paq?: unknown[];
  }
}

interface ConsentChoice {
  statistics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "specialklinik_cookie_consent";
const REOPEN_EVENT = "cookie-consent:open";

function readStoredConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      statistics: !!parsed.statistics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

function updateGoogleConsent(consent: ConsentChoice) {
  window.gtag?.("consent", "update", {
    analytics_storage: consent.statistics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

let matomoLoaded = false;
function loadMatomo() {
  if (matomoLoaded) return;
  matomoLoaded = true;
  const _paq = (window._paq = window._paq || []);
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  const u = "https://scaleweb.matomo.cloud/";
  _paq.push(["setTrackerUrl", u + "matomo.php"]);
  _paq.push(["setSiteId", "44"]);
  const d = document;
  const g = d.createElement("script");
  const s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = "https://cdn.matomo.cloud/scaleweb.matomo.cloud/matomo.js";
  s.parentNode?.insertBefore(g, s);
}

function applyConsent(consent: ConsentChoice) {
  updateGoogleConsent(consent);
  if (consent.statistics) loadMatomo();
}

/** Dispatch this from anywhere (e.g. a footer "cookie settings" link) to reopen the banner. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ statistics: false, marketing: false });

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      applyConsent(stored);
      setHasConsent(true);
    } else {
      setVisible(true);
    }

    const onReopen = () => {
      setDraft(readStoredConsent() ?? { statistics: false, marketing: false });
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  function save(consent: ConsentChoice) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    applyConsent(consent);
    setVisible(false);
    setExpanded(false);
    setHasConsent(true);
  }

  function reopen() {
    setDraft(readStoredConsent() ?? { statistics: false, marketing: false });
    setExpanded(true);
    setVisible(true);
  }

  if (!visible) {
    if (!hasConsent) return null;
    return (
      <button
        type="button"
        onClick={reopen}
        aria-label="Åbn cookieindstillinger"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[color:var(--color-border)] shadow-[0_15px_40px_-15px_rgba(11,16,32,0.4)] transition-transform hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" fill="var(--color-accent-warm)" stroke="var(--color-ink)" strokeWidth="0.5" />
          <circle cx="9" cy="9" r="1.2" fill="var(--color-ink)" />
          <circle cx="14.5" cy="8.5" r="1" fill="var(--color-ink)" />
          <circle cx="15.5" cy="13.5" r="1.2" fill="var(--color-ink)" />
          <circle cx="10" cy="15" r="1" fill="var(--color-ink)" />
          <circle cx="8" cy="12.5" r="0.8" fill="var(--color-ink)" />
        </svg>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookiesamtykke"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--color-ink)]/45 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[color:var(--color-border)] bg-white shadow-[0_40px_100px_-30px_rgba(11,16,32,0.5)] p-7 sm:p-9">
        <p className="font-heading text-[19px] font-medium text-[color:var(--color-ink)] mb-3">
          Vi bruger cookies
        </p>
        <p className="text-[14px] leading-[1.7] text-[color:var(--color-text-muted)]">
          Vi bruger cookies til at få siden til at fungere, til statistik og til
          markedsføring. Du kan læse mere i vores{" "}
          <a href="/cookiepolitik" className="animated-link text-[color:var(--color-ink)] font-medium">
            cookiepolitik
          </a>.
        </p>

        {expanded && (
          <div className="mt-6 space-y-4 border-t border-[color:var(--color-border)] pt-6">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-1 shrink-0"
              />
              <span className="text-[13px] text-[color:var(--color-ink)]">
                <span className="font-medium">Nødvendige</span> — kræves for at siden kan
                fungere. Kan ikke fravælges.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={draft.statistics}
                onChange={(e) => setDraft((d) => ({ ...d, statistics: e.target.checked }))}
                className="mt-1 shrink-0"
              />
              <span className="text-[13px] text-[color:var(--color-ink)]">
                <span className="font-medium">Statistik</span> — hjælper os med at forstå,
                hvordan hjemmesiden bruges (Google Analytics, Matomo).
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={draft.marketing}
                onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
                className="mt-1 shrink-0"
              />
              <span className="text-[13px] text-[color:var(--color-ink)]">
                <span className="font-medium">Marketing</span> — bruges til at måle
                effekten af annoncer (Google Ads).
              </span>
            </label>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => save({ statistics: true, marketing: true })}
            className="btn-gradient w-full justify-center"
          >
            Accepter alle
          </button>
          {expanded ? (
            <button
              type="button"
              onClick={() => save(draft)}
              className="btn-outline w-full justify-center"
            >
              Gem valg
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setDraft(readStoredConsent() ?? { statistics: false, marketing: false });
                setExpanded(true);
              }}
              className="btn-outline w-full justify-center"
            >
              Indstillinger
            </button>
          )}
          <button
            type="button"
            onClick={() => save({ statistics: false, marketing: false })}
            className="btn-ghost w-full justify-center text-[13px] font-medium"
          >
            Afvis ikke-nødvendige
          </button>
        </div>
      </div>
    </div>
  );
}
