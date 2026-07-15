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
  const [draft, setDraft] = useState<ConsentChoice>({ statistics: false, marketing: false });

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      applyConsent(stored);
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
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookiesamtykke"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-[color:var(--color-border)] bg-white shadow-[0_30px_80px_-30px_rgba(11,16,32,0.4)] p-6 sm:p-7">
        <p className="font-heading text-[16px] font-medium text-[color:var(--color-ink)] mb-2">
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
          <div className="mt-5 space-y-3 border-t border-[color:var(--color-border)] pt-5">
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

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => save({ statistics: true, marketing: true })}
            className="btn-gradient justify-center"
          >
            Accepter alle
          </button>
          {expanded ? (
            <button
              type="button"
              onClick={() => save(draft)}
              className="btn-outline justify-center"
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
              className="btn-outline justify-center"
            >
              Indstillinger
            </button>
          )}
          <button
            type="button"
            onClick={() => save({ statistics: false, marketing: false })}
            className="btn-ghost justify-center text-[13px] font-medium"
          >
            Afvis ikke-nødvendige
          </button>
        </div>
      </div>
    </div>
  );
}
