# Medical Minimalism — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the homepage custom sections (Hero, SocialProof, Services, Testimonials) and the /priser pricing page per the Medical Minimalism design brief.

**Architecture:** Feature-based component folders (`components/home/`, `components/priser/`). Homepage uses a hybrid approach: custom React sections + optional WordPress content below. /priser is a dedicated route with SSR and SEO.

**Tech Stack:** React Router v7 (SSR), TypeScript, Tailwind CSS v4, Framer Motion 12, Google Fonts (Lora + Inter)

---

## Pre-flight

Design tokens, CSS utilities, font loading, and Framer Motion are **already in place**. No new packages or CSS tokens needed. Key existing utilities to use:
- `.btn-gradient` — teal gradient button with hover lift
- `.btn-outline` — bordered button
- `.glass-card` — `backdrop-filter: blur(20px)` glassmorphism
- `.gradient-text` — teal gradient text via `background-clip`
- `.animated-link` — animated underline on hover
- `.animate-blob`, `.animate-blob-2`, `.animate-blob-3` — CSS keyframe blob float animations

Tailwind color utilities from `@theme` in `app/app.css`: `text-primary`, `text-secondary`, `text-text-muted`, `bg-surface-dim`, etc.

---

## Task 1: HeroSection component

**Files:**
- Create: `app/components/home/HeroSection.tsx`

**Step 1: Create the component**

```tsx
// app/components/home/HeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0" style={{ background: "var(--color-secondary)" }}>
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full animate-blob"
          style={{
            background: "radial-gradient(circle, rgba(79,209,197,0.35) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle, rgba(126,232,226,0.2) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full animate-blob-3"
          style={{
            background: "radial-gradient(circle, rgba(58,138,131,0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15, 23, 42, 0.4)" }}
      />

      {/* Content — 7/12 column width on desktop */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-44 w-full">
        <div className="max-w-[700px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
          >
            ABB Medical Aps
          </motion.p>

          <h1
            className="font-heading text-5xl md:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block"
            >
              Specialiseret behandling,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block gradient-text"
            >
              bygget på tillid.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg md:text-xl leading-[1.7] mb-12"
            style={{ color: "rgba(241,245,249,0.8)", maxWidth: "560px" }}
          >
            ABB Medical er din private specialklinik i København, hvor avanceret
            teknologi møder personlig omsorg.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Link to="/behandlinger" className="btn-gradient">
              Se Vores Behandlinger
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
```

**Step 2: Verify TypeScript compiles**

```bash
cd /c/Users/Jonas/Work/Scaleweb/specialklinikdk-site && bun run typecheck 2>&1 | tail -20
```
Expected: No errors for this file.

**Step 3: Commit**

```bash
git add app/components/home/HeroSection.tsx
git commit -m "feat: add HeroSection with animated mesh gradient and Framer Motion stagger"
```

---

## Task 2: SocialProof component

**Files:**
- Create: `app/components/home/SocialProof.tsx`

**Step 1: Create the component**

```tsx
// app/components/home/SocialProof.tsx
import { motion } from "framer-motion";

const LOGOS = [
  { name: "Sundhedsstyrelsen", abbr: "SST" },
  { name: "Dansk Medicinsk Selskab", abbr: "DMS" },
  { name: "Region Hovedstaden", abbr: "RH" },
  { name: "ISO 9001:2015", abbr: "ISO" },
  { name: "GDPR Compliant", abbr: "GDPR" },
];

export function SocialProof() {
  return (
    <section className="py-12" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-8"
        >
          Anerkendt af branchen
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.abbr}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-default"
              title={logo.name}
            >
              <div
                className="px-5 py-2.5 rounded-lg border font-semibold text-sm tracking-wide transition-all duration-300"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-muted)",
                  filter: "grayscale(1) opacity(0.6)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.filter = "grayscale(0) opacity(1)";
                  el.style.borderColor = "var(--color-primary)";
                  el.style.color = "var(--color-primary-dark)";
                  el.style.boxShadow = "0 4px 12px rgba(79,209,197,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.filter = "grayscale(1) opacity(0.6)";
                  el.style.borderColor = "var(--color-border)";
                  el.style.color = "var(--color-text-muted)";
                  el.style.boxShadow = "none";
                }}
              >
                {logo.abbr}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/home/SocialProof.tsx
git commit -m "feat: add SocialProof section with grayscale-to-color logo hover"
```

---

## Task 3: ServicesSection component

**Files:**
- Create: `app/components/home/ServicesSection.tsx`

**Step 1: Create the component**

```tsx
// app/components/home/ServicesSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

const SERVICES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Hudterapi",
    description:
      "Avanceret behandling af hudlidelser med dokumenterede metoder og det nyeste medicinske udstyr.",
    href: "/behandlinger",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Sportsskader & Fysioterapi",
    description:
      "Specialiseret genoptræning og skadesbehandling for aktive mennesker på alle niveauer.",
    href: "/behandlinger",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Kirurgisk Vejledning",
    description:
      "Professionel rådgivning og vejledning før og efter kirurgiske indgreb med fokus på tryghed.",
    href: "/behandlinger",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Præventiv Medicin",
    description:
      "Proaktive sundhedstjek og forebyggende behandlinger for et langt og sundt liv.",
    href: "/behandlinger",
  },
];

export function ServicesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--color-surface-dim)" }}
      >
        <div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full animate-blob"
          style={{
            background: "radial-gradient(circle, rgba(79,209,197,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] w-[420px] h-[420px] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle, rgba(126,232,226,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            Vores specialer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-medium text-secondary leading-[1.2]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Behandlinger med{" "}
            <span className="gradient-text">faglig dybde</span>
          </motion.h2>
        </div>

        {/* 2×2 glassmorphism grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link to={service.href} className="block h-full group">
                <div
                  className="glass-card p-8 h-full transition-shadow duration-300 group-hover:shadow-[0_20px_60px_rgba(79,209,197,0.15)]"
                >
                  <div className="text-primary mb-6">{service.icon}</div>
                  <h3
                    className="font-heading text-2xl font-semibold text-secondary mb-4 leading-[1.3]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-[1.7] text-base mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    Læs mere
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/home/ServicesSection.tsx
git commit -m "feat: add ServicesSection with glassmorphism cards and mesh gradient background"
```

---

## Task 4: Testimonials component

**Files:**
- Create: `app/components/home/Testimonials.tsx`

**Step 1: Create the component**

```tsx
// app/components/home/Testimonials.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "ABB Medical har ændret mit liv. Den personlige omsorg og den faglige ekspertise er i en klasse for sig. Jeg ville ønske, jeg var startet her langt tidligere.",
    name: "Maria K.",
    info: "Patient, Hudterapi",
  },
  {
    quote:
      "Efter min sportsskade var jeg dybt frustreret. ABB Medicals team fik mig hurtigt tilbage på banen med en struktureret og professionel behandlingsplan.",
    name: "Thomas B.",
    info: "Patient, Sportsskader & Fysioterapi",
  },
  {
    quote:
      "Den diskrete og respektfulde tilgang til behandling gav mig tryghed fra første dag. Præventiv medicin har nu en helt ny betydning for mig.",
    name: "Anne-Sofie L.",
    info: "Patient, Præventiv Medicin",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section
      className="py-32"
      style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            Patientoplevelser
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-medium text-secondary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Hvad siger vores{" "}
            <span className="gradient-text">patienter</span>
          </motion.h2>
        </div>

        {/* Testimonial area */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[260px]">
            {/* Decorative large quote mark */}
            <div
              className="absolute top-0 left-0 select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "220px",
                lineHeight: 0.9,
                color: "var(--color-primary)",
                opacity: 0.06,
              }}
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative grid md:grid-cols-[1fr_200px] gap-12 items-center"
              >
                <blockquote>
                  <p
                    className="font-heading text-2xl md:text-3xl text-secondary italic leading-[1.55] mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-semibold text-secondary text-base">
                      {TESTIMONIALS[current].name}
                    </p>
                    <p className="text-text-muted text-sm mt-1">
                      {TESTIMONIALS[current].info}
                    </p>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Vis udtalelse ${i + 1}`}
                style={{
                  width: i === current ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "999px",
                  background:
                    i === current ? "var(--color-primary)" : "var(--color-border)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/home/Testimonials.tsx
git commit -m "feat: add Testimonials carousel with AnimatePresence and dot navigation"
```

---

## Task 5: Update routes/index.tsx

Replace the existing homepage route to use the new custom sections. The loader and meta functions stay unchanged; only the component body changes.

**Files:**
- Modify: `app/routes/index.tsx`

**Step 1: Replace full file content**

```tsx
/**
 * Homepage Route
 *
 * Hybrid: Custom React sections (Hero, SocialProof, Services, Testimonials)
 * + optional WordPress supplementary content below.
 */
import type { Route } from "./+types/index";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { WpContent } from "~/components/WpContent";
import { JsonLd } from "~/components/JsonLd";
import { HeroSection } from "~/components/home/HeroSection";
import { SocialProof } from "~/components/home/SocialProof";
import { ServicesSection } from "~/components/home/ServicesSection";
import { Testimonials } from "~/components/home/Testimonials";
import { getFrontPage, getSiteInfo } from "~/lib/wp-api";
import {
  buildMeta,
  buildWebsiteJsonLd,
  buildPageJsonLd,
  getFeaturedImageUrl,
  stripHtml,
} from "~/lib/seo";
import type { WpPage, WpSiteInfo } from "~/lib/wp-types";

// ── Loader ───────────────────────────────────────────────────────────────────

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;

  let page: WpPage | null = null;
  let siteInfo: WpSiteInfo | null = null;

  try {
    [page, siteInfo] = await Promise.all([
      getFrontPage().catch(() => null),
      getSiteInfo().catch(() => null),
    ]);
  } catch {
    // graceful degradation — custom sections always render
  }

  return { page, siteInfo, siteUrl };
}

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "ABB Medical" }];

  const { siteInfo, page, siteUrl } = data;
  const siteName = siteInfo?.name ?? "ABB Medical";
  const description = page?.excerpt?.rendered
    ? stripHtml(page.excerpt.rendered)
    : siteInfo?.description ??
      "Din private specialklinik i København — avanceret teknologi møder personlig omsorg.";

  return [
    ...buildMeta({
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      siteUrl,
      type: "website",
      image: page ? getFeaturedImageUrl(page) : undefined,
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: siteUrl },
  ];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Index({ loaderData }: Route.ComponentProps) {
  const { page, siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "ABB Medical";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} />

      {/* Structured Data */}
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />
      {page && <JsonLd data={buildPageJsonLd({ page, siteInfo, siteUrl })} />}

      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <ServicesSection />
        <Testimonials />

        {/* Supplementary WordPress content (rendered below the fold if configured) */}
        {page?.content?.rendered && (
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-6">
              <WpContent html={page.content.rendered} />
            </div>
          </section>
        )}
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
```

**Step 2: Verify TypeScript**

```bash
cd /c/Users/Jonas/Work/Scaleweb/specialklinikdk-site && bun run typecheck 2>&1 | tail -30
```
Expected: No errors.

**Step 3: Commit**

```bash
git add app/routes/index.tsx
git commit -m "feat: rebuild homepage with custom Medical Minimalism sections"
```

---

## Task 6: PricingHero component

**Files:**
- Create: `app/components/priser/PricingHero.tsx`

**Step 1: Create the component**

```tsx
// app/components/priser/PricingHero.tsx
import { motion } from "framer-motion";

export function PricingHero() {
  return (
    <section
      className="text-center"
      style={{
        paddingTop: "160px",
        paddingBottom: "96px",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
        >
          Transparente priser
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl md:text-6xl font-medium text-secondary leading-[1.1] tracking-tight mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Priser &{" "}
          <span className="gradient-text">Forløb</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-text-muted leading-[1.7] mx-auto"
          style={{ maxWidth: "600px" }}
        >
          Vi tror på fuld transparens. Her finder du en oversigt over vores
          priser. Kontakt os for et skræddersyet forløb.
        </motion.p>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/priser/PricingHero.tsx
git commit -m "feat: add PricingHero section"
```

---

## Task 7: PricingCards component

**Files:**
- Create: `app/components/priser/PricingCards.tsx`

**Step 1: Create the component**

The featured card uses a "gradient border" technique: a `1px` padding wrapper with `background: Main Gradient`, containing an inner `div` with a white background. This gives the impression of a gradient border.

```tsx
// app/components/priser/PricingCards.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

interface Plan {
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  featured: boolean;
  features: string[];
  cta: string;
  href: string;
}

const PLANS: Plan[] = [
  {
    name: "Konsultation",
    subtitle: "Kom godt i gang",
    price: "595",
    unit: "kr. / konsultation",
    featured: false,
    features: [
      "Individuel vurdering",
      "Faglig rådgivning",
      "Behandlingsplan",
      "Opfølgende mail-support",
    ],
    cta: "Book konsultation",
    href: "/kontakt",
  },
  {
    name: "Behandlingsforløb",
    subtitle: "Vores mest populære",
    price: "2.495",
    unit: "kr. / forløb",
    featured: true,
    features: [
      "Alt i Konsultation",
      "5 behandlingssessioner",
      "Løbende journalføring",
      "Prioriteret booking",
      "30-dages opfølgning",
      "Direkte adgang til behandler",
    ],
    cta: "Start dit forløb",
    href: "/kontakt",
  },
  {
    name: "Komplet Pakke",
    subtitle: "Fuld sundhedsomsorg",
    price: "4.995",
    unit: "kr. / kvartal",
    featured: false,
    features: [
      "Alt i Behandlingsforløb",
      "Ubegrænset konsultationer",
      "Kvartalsvise sundhedstjek",
      "Præventiv medicin",
      "VIP-adgang til klinikken",
    ],
    cta: "Kontakt os",
    href: "/kontakt",
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const inner = (
    <div
      className="flex flex-col h-full p-8"
      style={{
        background: "#FFFFFF",
        borderRadius: plan.featured ? "calc(1rem - 1px)" : "1rem",
        border: plan.featured ? "none" : "1px solid var(--color-border)",
        boxShadow: plan.featured
          ? "0 20px 60px rgba(79,209,197,0.12)"
          : "0 10px 30px rgba(15,23,42,0.05)",
      }}
    >
      {/* Badge */}
      {plan.featured && (
        <div className="mb-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #4FD1C5 0%, #3a8a83 100%)",
            }}
          >
            Mest Populære
          </span>
        </div>
      )}

      {/* Name */}
      <p className="text-text-muted text-sm font-medium mb-2">{plan.subtitle}</p>
      <h3
        className="font-heading text-2xl font-semibold text-secondary mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mb-8">
        <span
          className="font-heading text-5xl font-light text-secondary"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {plan.price}
        </span>
        <p className="text-text-muted text-sm mt-1">{plan.unit}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="text-primary mt-0.5">
              <CheckIcon />
            </span>
            <span className="text-sm text-text leading-[1.6]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={plan.href}
        className={plan.featured ? "btn-gradient justify-center" : "btn-outline justify-center"}
        style={{ width: "100%" }}
      >
        {plan.cta}
      </Link>
    </div>
  );

  if (plan.featured) {
    return (
      <div
        className="flex-1 rounded-2xl"
        style={{
          padding: "1px",
          background: "linear-gradient(135deg, #4FD1C5 0%, #3a8a83 100%)",
        }}
      >
        {inner}
      </div>
    );
  }

  return <div className="flex-1">{inner}</div>;
}

export function PricingCards() {
  return (
    <section className="py-24" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="flex"
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/priser/PricingCards.tsx
git commit -m "feat: add PricingCards with gradient-border featured card technique"
```

---

## Task 8: Create routes/priser.tsx + register route

**Files:**
- Create: `app/routes/priser.tsx`
- Modify: `app/routes.ts` (add route before catch-all)

**Step 1: Create the route file**

```tsx
// app/routes/priser.tsx
/**
 * /priser — Pricing Page
 * Dedicated route with SSR, SEO meta, and JSON-LD.
 */
import type { Route } from "./+types/priser";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { PricingHero } from "~/components/priser/PricingHero";
import { PricingCards } from "~/components/priser/PricingCards";
import { getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";
import type { WpSiteInfo } from "~/lib/wp-types";

// ── Loader ────────────────────────────────────────────────────────────────────

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

// ── Meta ──────────────────────────────────────────────────────────────────────

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Priser — ABB Medical" }];

  const { siteInfo, siteUrl } = data;
  const siteName = siteInfo?.name ?? "ABB Medical";

  return [
    ...buildMeta({
      title: `Priser & Forløb — ${siteName}`,
      description:
        "Se vores transparente priser for konsultationer og behandlingsforløb hos ABB Medical i København. Kontakt os for et skræddersyet tilbud.",
      url: `${siteUrl}/priser`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/priser` },
  ];
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Priser({ loaderData }: Route.ComponentProps) {
  const { siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "ABB Medical";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} />
      <JsonLd data={buildWebsiteJsonLd(siteInfo, siteUrl)} />

      <main className="flex-1">
        <PricingHero />
        <PricingCards />
      </main>

      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
```

**Step 2: Register route in routes.ts**

Add `route("priser", "routes/priser.tsx")` BEFORE the catch-all route. The order matters — React Router matches routes top-to-bottom.

Current `app/routes.ts`:
```ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
```

Updated `app/routes.ts`:
```ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("priser", "routes/priser.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
```

**Step 3: Verify TypeScript**

```bash
cd /c/Users/Jonas/Work/Scaleweb/specialklinikdk-site && bun run typecheck 2>&1 | tail -30
```
Expected: No errors. (Note: React Router generates `./+types/priser` automatically on build/dev start.)

**Step 4: Commit**

```bash
git add app/routes/priser.tsx app/routes.ts
git commit -m "feat: add /priser route with PricingHero and PricingCards"
```

---

## Task 9: Final verification

**Step 1: Start dev server and manually verify**

```bash
cd /c/Users/Jonas/Work/Scaleweb/specialklinikdk-site && bun dev
```

Visit:
- `http://localhost:5175/` — should show Hero (animated gradient bg), SocialProof, Services (glassmorphism), Testimonials
- `http://localhost:5175/priser` — should show PricingHero + 3 pricing cards with gradient-border on middle card

**Step 2: Typecheck one final time**

```bash
bun run typecheck 2>&1
```
Expected: `Found 0 errors`

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Medical Minimalism design implementation

- Homepage: HeroSection, SocialProof, ServicesSection, Testimonials
- Pricing page: /priser with hero and 3-tier pricing cards
- Framer Motion animations throughout (stagger, whileInView, AnimatePresence)
- Gradient border technique on featured pricing card
- Fully SSR-compatible, SEO meta on all routes"
```

---

## Notes for the implementer

- **Framer Motion SSR**: `motion` components are SSR-safe in Framer Motion 12. `whileInView` uses `IntersectionObserver` on client only. No `"use client"` directive needed in React Router v7.
- **Tailwind CSS v4**: Color utilities like `text-primary`, `bg-surface-dim` work because `@theme` in `app/app.css` registers them as CSS custom properties. Tailwind v4 auto-generates utilities from `@theme` variables.
- **Route ordering**: `/priser` must appear before `route("*", ...)` in `routes.ts` or it will never match.
- **Generated types**: React Router v7 generates `+types/priser.ts` automatically during `bun dev` or `bun run build`. TypeScript may show a missing-module error until you run dev once.
- **Placeholder content**: All `SERVICES`, `PLANS`, `TESTIMONIALS`, and `LOGOS` arrays are constants at the top of each component file — easy to update with real content or replace with WP API calls.
