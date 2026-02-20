# Design: Medical Minimalism — specialklinik.dk
**Dato:** 2026-02-20
**Projekt:** ABB Medical Aps (specialklinik.dk)
**Status:** Godkendt

---

## Kontekst

Implementering af "Medical Minimalism" design-brief for specialklinik.dk. Målet er en digital front-end der udstråler spidskompetence, diskret luksus og klinisk præcision — benchmarked mod Awwwards/FWA-niveau sites.

**Eksisterende fundament:**
- React Router v7 (SSR), TypeScript, Tailwind CSS v4, Framer Motion 12
- Design-tokens allerede i `app/app.css` (farver, fonte, CSS utilities)
- WordPress REST API som CMS-backend
- Eksisterende: Header, Footer, WpContent, JsonLd komponenter

---

## Arkitektur

**Tilgang:** Feature-baserede komponenter (Approach B)

```
app/
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── SocialProof.tsx
│   │   ├── ServicesSection.tsx
│   │   └── Testimonials.tsx
│   └── priser/
│       ├── PricingHero.tsx
│       └── PricingCards.tsx
├── routes/
│   ├── index.tsx               (opdateres: hybrid custom + WP)
│   └── priser.tsx              (ny dedikeret route)
└── app.css                     (evt. mesh gradient animation)
```

---

## Forsiden (`/`) — Hybrid tilgang

Custom React-sektioner + WordPress-indhold fallback.

### 1. HeroSection
- **Layout:** 100vh, animeret CSS mesh gradient (teal/slate animated blobs)
- **Overlay:** `rgba(15, 23, 42, 0.4)` for tekstkontrast
- **Video-ready:** Komponent kan modtage `videoUrl` prop — swappes fra CSS til `<video>` når video er klar
- **Indhold:** H1 med gradient på nøgleord, subheader, primær CTA-knap
- **Animation:** Framer Motion page-load sequence:
  1. Logo fade-in (500ms)
  2. Logo animerer op til header
  3. H1 linje 1 fade+slideUp
  4. H1 linje 2 fade+slideUp (150ms stagger)
  5. Subheader fade+slideUp
  6. CTA fade+slideUp

### 2. SocialProof
- **Layout:** Smal sektion, `#F8FAFC` baggrund
- **Indhold:** "Anerkendt af branchen" label (uppercase Inter), 4-5 monokrome logoer
- **Interaction:** `grayscale(100%) opacity(0.6)` → fuld farve ved hover (transition 300ms)

### 3. ServicesSection
- **Baggrund:** Animeret CSS mesh gradient (blobs i teal og lys blå, kraftigt sløret)
- **Layout:** 2×2 glassmorphism-kort grid (desktop), 1 kolonne (mobil)
- **Kort:** `background: rgba(255,255,255,0.7)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(255,255,255,0.2)`
- **Hover:** `scale(1.03)` + teal glow `box-shadow`
- **Animation:** Scroll-triggered fade-up via Framer Motion `whileInView`
- **Placeholder services:**
  - Hudterapi
  - Sportsskader & Fysioterapi
  - Kirurgisk Vejledning
  - Præventiv Medicin

### 4. Testimonials
- **Layout:** Asymmetrisk — citat venstre, navn/info højre
- **Baggrund:** Surface Gradient
- **Typografi:** Lora italic 32px citat, dekorativt `"` med lav opacitet
- **Navigation:** Framer Motion carousel med dot-navigation
- **Animation:** Fade-transition mellem citater

---

## Priser (`/priser`)

Ny dedikeret route med fuld SSR og SEO.

### 1. PricingHero
- **Layout:** `padding-top: 160px; padding-bottom: 96px`
- **Baggrund:** Surface Gradient (`#FFFFFF` → `#F8FAFC`)
- **Indhold:** Centreret H1 "Priser & Forløb", subheader max-width 600px

### 2. PricingCards
- **Baggrund:** `#F8FAFC`
- **Layout:** 3-kolonne grid (desktop) → 1 kolonne (mobil)
- **Kort struktur:**
  1. Pakkenavn (H3, Lora)
  2. Pris (H2, Lora, weight 300)
  3. Feature-liste med teal check-circle ikoner
  4. CTA-knap
- **Fremhævet kort (midten):**
  - Gradient border: `1px` padding-wrapper med Main Gradient baggrund
  - "Mest Populære" badge øverst
  - Primær gradient CTA-knap
- **Standard kort:** 1px `#E2E8F0` border, outline CTA-knap
- **Animation:** Scroll-triggered stagger (150ms mellem kort)

### 3. SEO
- `buildMeta()` + `buildPageJsonLd()` + `JsonLd` — samme mønster som eksisterende ruter

---

## Animationssystem

**Framer Motion throughout:**

| Element | Animation |
|---------|-----------|
| Page load hero | Logo → Header → H1 stagger → CTA |
| Sektioner scroll-in | `opacity:0 y:30` → `opacity:1 y:0`, 0.8s ease-out |
| Glassmorphism kort | Stagger fade-up, 100ms delay per kort |
| Priskort | Stagger fade-up, 150ms delay per kort |
| Knapper hover | `translateY(-3px)` + box-shadow |
| Links hover | `::after` scaleX 0→1 underline animation |
| Billeder/kort hover | `scale(1.03)` |
| Logoer (SocialProof) | grayscale→color transition |

---

## Design Tokens (eksisterende, ingen ændringer nødvendige)

```css
--color-primary: #4FD1C5
--color-secondary: #0F172A
--color-surface: #FFFFFF
--color-surface-dim: #F8FAFC
--color-border: #E2E8F0
--font-heading: "Lora"
--font-body: "Inter"
```

**CSS utilities (eksisterende):**
- `.btn-gradient`, `.btn-outline`, `.glass-card`, `.gradient-text`, `.animated-link`

---

## Data & Indhold

Al data placeres som konstanter øverst i komponentfilerne (nemt at udskifte med WP API):

```typescript
const SERVICES = [
  { title: 'Hudterapi', desc: '...', icon: 'sparkles' },
  // ...
]

const PRICING = [
  { name: 'Konsultation', price: '595 kr.', featured: false, features: [...] },
  { name: 'Behandlingsforløb', price: '2.495 kr.', featured: true, features: [...] },
  { name: 'Komplet Pakke', price: '4.995 kr.', featured: false, features: [...] },
]
```

---

## Beslutninger

| Spørgsmål | Beslutning |
|-----------|-----------|
| Forsidestrategi | Hybrid: Custom sektioner + WP-indhold |
| Hero baggrund | CSS animated mesh gradient (video-ready) |
| Indhold | Realistisk placeholder i konstanter |
| Animationer | Fuldt Framer Motion system |
| Komponentstruktur | Feature-baserede mapper |
