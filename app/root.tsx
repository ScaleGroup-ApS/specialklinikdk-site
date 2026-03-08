import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@8..144,100..1000&display=swap"
          onLoad={(e) => {
            const link = e.currentTarget as HTMLLinkElement;
            link.onload = null;
            link.rel = "stylesheet";
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@8..144,100..1000&display=swap"
          />
        </noscript>
        <script
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("consent", "default", {
                ad_storage: "denied",
                analytics_storage: "denied",
                functionality_storage: "denied",
                personalization_storage: "denied",
                security_storage: "granted",
                wait_for_update: 500,
              });
              gtag("set", "ads_data_redaction", true);
              gtag("set", "url_passthrough", true);
            `,
          }}
        />
        <script
          type="text/javascript"
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="6112a7b2-a31a-484a-ac22-5ea85e43ef52"
          data-culture="DA"
          data-blockingmode="auto"
          async
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ES7V2VYL1D" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ES7V2VYL1D');
              gtag('config', 'AW-11172242203');
              var _paq = window._paq = window._paq || [];
              window.addEventListener('load', function () {
                _paq.push(['trackPageView']);
                _paq.push(['enableLinkTracking']);
                var u="https://scaleweb.matomo.cloud/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '44']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src='https://cdn.matomo.cloud/scaleweb.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
              });
            `,
          }}
        />
        <style>{`img#wpstats{display:none}`}</style>
      </head>
      <body className="min-h-screen bg-surface text-text antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Der opstod en uventet fejl.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `Fejl ${error.status}`;
    details =
      error.status === 404
        ? "Siden blev ikke fundet."
        : error.statusText || details;
  } else if (error instanceof Error) {
    if (import.meta.env.DEV) {
      details = error.message;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-dim">
      <div className="text-center max-w-md mx-auto px-6 py-16">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-secondary mb-3">{message}</h1>
          <p className="text-text-muted text-lg">{details}</p>
        </div>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          ← Gå til forsiden
        </a>
      </div>
    </main>
  );
}
