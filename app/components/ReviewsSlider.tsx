// app/components/ReviewsSlider.tsx
// Unified review slider — surfaces reviews from Google and Trustpilot with a
// per-review source badge, drag/keyboard/arrow/dot navigation.
//
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";

const EASE = [0.22, 1, 0.36, 1] as const;

export type ReviewSource = "google" | "trustpilot";

export type Review = {
  source: ReviewSource;
  name: string;
  date?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  context?: string;
};

// Real reviews from Trustpilot + Google, sorted newest first.
const REVIEWS: Review[] = [
  {
    source: "google",
    name: "Hasan Za",
    date: "maj 2026",
    rating: 5,
    quote:
      "Mottagningen erbjuder professional behandling, och läkaren var informativ under hela behandlingen. Väldigt trevligt bemötande och hjälpsamma.",
  },
  {
    source: "trustpilot",
    name: "Zeno Jaff",
    date: "8. maj 2026",
    rating: 5,
    quote:
      "Vi var velinformeret og følte os tryg. Man er i gode hænder hos Amin.",
  },
  {
    source: "trustpilot",
    name: "Haidar Nadem",
    date: "26. apr. 2026",
    rating: 5,
    quote:
      "Vi havde en rigtig god oplevelse. Alt i alt en positiv oplevelse, som vi varmt kan anbefale. 5 stjerner herfra.",
  },
  {
    source: "trustpilot",
    name: "Faiga Sahebzadeh",
    date: "16. apr. 2026",
    rating: 5,
    quote:
      "Meget nemt at booke tid. Fantastisk og dygtig læge og assistent samt god og grundig information mundtligt og skriftligt. Og smertefri operation.",
  },
  {
    source: "trustpilot",
    name: "Jalle",
    date: "9. apr. 2026",
    rating: 5,
    quote:
      "Vi havde en rigtig god oplevelse med klinikken, der udførte omskæringen af vores søn. Alt forløb helt uden problemer, og vi følte os trygge fra start til slut. Personalet var yderst professionelt, imødekommende og tog sig god tid til at forklare hele processen samt besvare vores spørgsmål. Selve indgrebet blev udført med stor omhu, og opfølgningen efterfølgende var også meget betryggende. Vi oplevede ingen komplikationer, og vores søn kom sig hurtigt. Vi kan varmt anbefale klinikken til andre forældre, der ønsker et trygt og professionelt forløb.",
  },
  {
    source: "trustpilot",
    name: "Maria Rasmussen",
    date: "1. apr. 2026",
    rating: 5,
    quote:
      "Alt gik bedre end forventet. En meget nervøs mor der forestillede sig det værste. Amin tog hånd om det og forklarede alt før, under og efter — og han svarede med det samme på SMS, hvis man var i tvivl om noget efter behandlingen.",
  },
  {
    source: "trustpilot",
    name: "Philip",
    date: "28. mar. 2026",
    rating: 5,
    quote:
      "Som dansk familie uden religiøs baggrund var det vigtigt for os at finde den helt rette klinik til vores søns omskæring. Vi startede med en konsultation hos Amin på Specialklinik for at se omgivelserne og møde lægen, og vi følte os trygge fra første minut. Amin og hans sygeplejerske er utroligt dygtige, rare og professionelle. Vi har sat stor pris på den lynhurtige svarfrist på vores mange opfølgende spørgsmål, hvilket gav os stor ro i processen. En fantastisk oplevelse fra start til slut.",
  },
  {
    source: "google",
    name: "dada bakayoko",
    date: "mar. 2026",
    rating: 5,
    quote:
      "It was an amazing experience at Specialklinik Taastrup. The doctors are nice and our baby was treated so well. Though we are still in the healing process, we are happy with everything.",
  },
  {
    source: "google",
    name: "Maj-Brit L.",
    date: "mar. 2026",
    rating: 5,
    quote:
      "Havde en god oplevelse med indgrebet. Vores dreng var 8 uger. Der var god information inden fra hjemmesiden og uddybende og fyldestgørende information før, under og efter indgrebet.",
    context: "Ringmetoden · 8 uger",
  },
  {
    source: "trustpilot",
    name: "EB",
    date: "6. mar. 2026",
    rating: 5,
    quote:
      "Vores søn blev omskåret hos Amin for en uge siden. Vi havde en rigtig god oplevelse. Hele forløbet gik rigtig godt, og vi følte os trygge. Vi er meget tilfredse og kan varmt anbefale klinikken.",
  },
  {
    source: "trustpilot",
    name: "Ra 19",
    date: "2. mar. 2026",
    rating: 5,
    quote:
      "Super flinke og super fint arbejde. De tog imod os professionelt, og resultatet blev rigtig flot. Kan varmt anbefales.",
  },
  {
    source: "trustpilot",
    name: "Maj-Brit Lützhøft",
    date: "2. mar. 2026",
    rating: 4,
    quote:
      "En god oplevelse med højt informationsniveau. Vi følte os trygge under indgrebet, og der blev givet tydelige instrukser og informationer om tiden efter. Desuden oplevede jeg, at der var hurtig respons på mails med de spørgsmål og bekymringer, der var i de første dage. Vi kan godt anbefale specialklinikken.",
  },
  {
    source: "trustpilot",
    name: "Rezan Ibrahim",
    date: "20. jan. 2026",
    rating: 5,
    quote:
      "Professionelt personale. Amin er en meget dygtig læge. Alt gik som det skal. Vi var rigtig glade for, at vi besøgte klinikken.",
  },
  {
    source: "trustpilot",
    name: "Adis Palic",
    date: "13. jan. 2026",
    rating: 5,
    quote:
      "Jeg var meget tilfreds med klinikken og hele forløbet omkring min søns omskæring. Personalet var yderst professionelle og gav en grundig og tryg forklaring både før og under proceduren. Det var tydeligt, at de var velforberedte på alle tænkelige situationer, hvilket gav stor ro som forælder. Kommunikation og vejledning undervejs var betryggende og meget værdsat. Jeg kan varmt anbefale klinikken.",
  },
  {
    source: "trustpilot",
    name: "Mohamad Farid Yaqubi",
    date: "2. jan. 2026",
    rating: 5,
    quote:
      "Fra første kontakt med Specialklinik i Taastrup blev vi mødt med en professionalisme udover det sædvanlige. Hele forløbet fra booking til operation og den efterfølgende vejledning var præget af høj faglighed og empati. Resultatet blev rigtig flot, og det er vi taknemlige for. Klinikken står til rådighed ved mindste bekymring — også i ferien. Det har vi aldrig oplevet andre steder. Tusind tak for en virkelig god behandling.",
  },
  {
    source: "trustpilot",
    name: "Hossein",
    date: "30. dec. 2025",
    rating: 5,
    quote:
      "Min søn på 6 år blev omskåret hos Amin for en uge siden i fuld narkose. Vi havde en rigtig tryg og positiv oplevelse. Amin og hans team er professionelt og tog sig god tid til at forklare hele forløbet. Han leverer gode resultater og er nem at kontakte gennem hele forløbet. Vores søn kom igennem forløbet UDEN smerter, hvilket er fremragende. 10/10.",
    context: "Fuld bedøvelse · 6 år",
  },
  {
    source: "trustpilot",
    name: "Nazli Gøktas",
    date: "27. dec. 2025",
    rating: 5,
    quote:
      "Vi fik vores søn på 2 mdr. omskåret her, og det var den mest beroligende oplevelse. Hvis man ønsker at føle sig tryg, skal man helt klart komme her. De var så gode og søde ved min søn. Tak for det!",
    context: "Ringmetoden · 2 mdr.",
  },
  {
    source: "google",
    name: "Ali Mahmoud",
    date: "nov. 2025",
    rating: 5,
    quote:
      "Super god oplevelse hos klinikken fra start til slut. Lægen og assistenten var super professionelle og rare og gav masser information undervejs.",
  },
  {
    source: "trustpilot",
    name: "Mustafa Güler",
    date: "17. nov. 2025",
    rating: 5,
    quote: "Perfekt oplevelse hele vejen igennem.",
  },
  {
    source: "trustpilot",
    name: "Musa",
    date: "30. okt. 2025",
    rating: 5,
    quote:
      "Alt gik godt fra start til slut, og de var hurtige til at svare på beskeder, hvis man havde spørgsmål eller bekymringer ift. omskæringen.",
  },
  {
    source: "google",
    name: "Michala Bromberg",
    date: "okt. 2025",
    rating: 5,
    quote:
      "Rigtig fint forløb! Vi kom ind til Amin og hans medarbejder, som udførte omskæringen. De var begge meget professionelle, og proceduren var ren og steril udført.",
  },
  {
    source: "trustpilot",
    name: "Anonym kunde",
    date: "6. sep. 2025",
    rating: 5,
    quote:
      "Hurtig og enkel omskæring. De er professionelle, hvilket skabte tryghed hos mig og min mand. Mange tak.",
  },
  {
    source: "trustpilot",
    name: "Yasmin Al Malla",
    date: "18. aug. 2025",
    rating: 5,
    quote: "De udfører arbejdet til UG. Søde og smilende på samme tid.",
  },
  {
    source: "trustpilot",
    name: "Consumer",
    date: "8. jul. 2025",
    rating: 5,
    quote:
      "En fantastisk og professionel forløb! I skaber en tryg atmosfære og et godt forløb fra start til slut. Amin leverer gode resultater og er nem at kontakte gennem hele forløbet. Man bliver grundigt informeret inden indgrebet og vejledes efterfølgende om pleje mm. Kan varmt anbefales!",
  },
  {
    source: "trustpilot",
    name: "Michelle",
    date: "26. jun. 2025",
    rating: 5,
    quote:
      "Vi har haft en virkelig god oplevelse i forbindelse med omskæringen af vores søn. Hele forløbet har været super professionelt fra start til slut. Vi følte os meget trygge og godt informeret hele vejen igennem — både før, under og efter indgrebet. Personalet var imødekommende, rolige og kompetente, og vi oplevede en rigtig fin og omsorgsfuld tilgang til både barn og forældre. Nu, cirka en uge efter indgrebet, er det gået rigtig godt. Helingen forløber helt som den skal, og vi er så lettede og taknemmelige. Vi kan varmt anbefale klinikken til andre forældre, der står overfor samme beslutning.",
  },
  {
    source: "google",
    name: "m.bachir lghali",
    date: "jun. 2025",
    rating: 5,
    quote: "God service. Alt gik rigtig godt. Tak.",
  },
  {
    source: "google",
    name: "Camilla Jensen",
    date: "maj 2025",
    rating: 5,
    quote:
      "Vi havde et godt og trygt forløb fra start til slut. Amin og hans assistent er yderst dygtige og professionelle, hvilket hans resultater bestemt vidner om. Derudover er han hurtig til at besvare mails og vurdere, når man skriver til ham.",
  },
  {
    source: "google",
    name: "Burhan Filikci",
    date: "maj 2025",
    rating: 5,
    quote:
      "Meget professionel behandling. Kan varmt anbefales. En dygtig læge og en dygtig assistent. De var rigtig imødekommende overfor børnene.",
  },
  {
    source: "google",
    name: "Memet Simsir",
    date: "maj 2025",
    rating: 5,
    quote: "Venligt personale. Ønsker dem alt det bedste.",
  },
  {
    source: "google",
    name: "Walid Husein",
    date: "maj 2025",
    rating: 5,
    quote: "Han er meget dygtig, og mange tak for hjælpen.",
  },
  {
    source: "google",
    name: "Huda Jassem Al-Mandy",
    date: "maj 2025",
    rating: 5,
    quote:
      "Mange tak for et fantastisk forløb! Vi blev taget godt imod og velinformeret om omskæringsforløbet. Det var en yderst professionel behandling, og vi var trygge hele vejen igennem.",
  },
  {
    source: "google",
    name: "Zehra S",
    date: "maj 2025",
    rating: 5,
    quote:
      "En stor tak til Specialklinik Taastrup! Mine to sønner blev omskåret her, og vi oplevede en yderst professionel og tryg behandling. Amin og hans dygtige team gjorde forløbet trygt for hele familien.",
  },
  {
    source: "google",
    name: "Patricia Gambula Larsen",
    date: "2024",
    rating: 5,
    quote:
      "Glad for resultatet. Jeg var meget nervøs for min søn både før og efter indgrebet. Amin var professionel og har været god til at svare på mine spørgsmål og berolige mig i helingsprocessen — det har været meget betryggende.",
  },
  {
    source: "google",
    name: "Oguzhan Demir",
    date: "2024",
    rating: 5,
    quote:
      "Det er altid et ømt punkt, når det omhandler ens barn, og man er derfor ekstra nervøs. Det klarede klinikken super godt. Vi blev mødt af super professionelle medarbejdere.",
  },
  {
    source: "google",
    name: "Zeinab Naz",
    date: "2024",
    rating: 5,
    quote:
      "Meget tilfreds med omskæring af vores søn hos Specialklinik Taastrup. Amin er meget dygtig, og hele forløbet tog max 15 min. Vores søn havde ingen gener efterfølgende, god heling og rigtig flot resultat. Varmeste anbefaling herfra.",
  },
  {
    source: "google",
    name: "Christina Schoop",
    date: "2024",
    rating: 5,
    quote:
      "Fantastisk sød og dygtig læge. Alt gik godt, og det var nemt at kommunikere med klinikken, hvis der var tvivl og spørgsmål.",
  },
  {
    source: "google",
    name: "Owaid Qasem",
    date: "2024",
    rating: 5,
    quote: "Fantastisk dygtig læge. Alt gik godt og nemt.",
  },
  {
    source: "google",
    name: "Omer Salahadeen",
    date: "2024",
    rating: 5,
    quote: "Super service, dygtig læge — stor anbefaling herfra!",
  },
];

export function ReviewsSlider({ reviews = REVIEWS }: { reviews?: Review[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = reviews.length;
  const intervalRef = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % total) + total) % total;
      setDirection(next > index ? 1 : -1);
      setIndex(wrapped);
    },
    [index, total],
  );

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Auto-advance every 7s; pause on user interaction
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDirection(1);
      setIndex((p) => (p + 1) % total);
    }, 7500);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [total]);

  const pause = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  // Keyboard arrows
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        pause();
        next();
      }
      if (e.key === "ArrowLeft") {
        pause();
        prev();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const dragX = useMotionValue(0);
  const cardOpacity = useTransform(dragX, [-200, 0, 200], [0.4, 1, 0.4]);
  const cardRotate = useTransform(dragX, [-200, 0, 200], [-2, 0, 2]);

  const r = reviews[index];

  const counts = reviews.reduce(
    (acc, rv) => {
      acc[rv.source] += 1;
      return acc;
    },
    { google: 0, trustpilot: 0 } as Record<ReviewSource, number>,
  );

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Label column */}
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-3">
              <span className="sticker sticker-warm">
                <span className="text-base leading-none">💬</span>
                Forældre fortæller
              </span>
            </div>
            <h2 className="display-xl text-[color:var(--color-ink)] leading-[1.02]">
              <AnimatedWords as="span" mode="inView" text="Ord fra" className="block" />{" "}
              <span className="relative inline-block">
                <span className="font-display italic font-light">familier</span>
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={0.7}
                />
              </span>{" "}
              der har været hos os.
            </h2>

            {/* Source meta */}
            <div className="mt-10 grid grid-cols-2 gap-3 max-w-sm">
              <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-4">
                <div className="flex items-center gap-2">
                  <GoogleMark className="w-5 h-5" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
                    Google
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-light text-[color:var(--color-ink)]">
                  {counts.google}
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] mt-1">
                  Anmeldelser
                </p>
              </div>
              <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-4">
                <div className="flex items-center gap-2">
                  <TrustpilotMark className="w-5 h-5" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
                    Trustpilot
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-light text-[color:var(--color-ink)]">
                  {counts.trustpilot}
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] mt-1">
                  Anmeldelser
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => {
                  pause();
                  prev();
                }}
                aria-label="Forrige anmeldelse"
                className="group inline-flex items-center justify-center w-11 h-11 rounded-full border border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-ink)] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  pause();
                  next();
                }}
                aria-label="Næste anmeldelse"
                className="group inline-flex items-center justify-center w-11 h-11 rounded-full border border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-ink)] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <span className="ml-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-text-muted)]">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Quote column */}
          <div
            ref={containerRef}
            tabIndex={0}
            className="lg:col-span-8 relative outline-none"
          >
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.22, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="absolute -top-16 -left-4 select-none font-display text-[color:var(--color-accent-warm-soft)]"
              style={{ fontSize: "clamp(8rem, 16vw, 14rem)", lineHeight: 0.8 }}
            >
              &ldquo;
            </motion.span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                style={{ x: dragX, opacity: cardOpacity, rotate: cardRotate }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) {
                    pause();
                    next();
                  } else if (info.offset.x > 80) {
                    pause();
                    prev();
                  }
                }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                {/* Source badge */}
                <div className="mb-6 flex items-center gap-3">
                  <SourceBadge source={r.source} />
                  <Stars rating={r.rating} />
                  {r.date && (
                    <span className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-text-muted)]">
                      {r.date}
                    </span>
                  )}
                </div>

                <blockquote className="font-display italic font-light leading-[1.25] tracking-tight text-[color:var(--color-ink)] text-[clamp(1.5rem,2.6vw,2.4rem)] max-w-[36ch]">
                  {r.quote}
                </blockquote>

                <figcaption className="mt-10 flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                      {r.name}
                    </p>
                    {r.context && (
                      <p className="text-[13px] text-[color:var(--color-text-muted)] mt-0.5">
                        {r.context}
                      </p>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Dots */}
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    pause();
                    goTo(idx);
                  }}
                  aria-label={`Vis anmeldelse ${idx + 1}`}
                  className="group flex items-center"
                >
                  <span
                    className="block h-px transition-all duration-500"
                    style={{
                      width: idx === index ? "2.25rem" : "0.75rem",
                      background:
                        idx === index
                          ? "var(--color-ink)"
                          : "var(--color-border-strong)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} ud af 5 stjerner`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill={i < rating ? "#F5A623" : "none"}
          stroke={i < rating ? "#F5A623" : "currentColor"}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.47L12 14.77 7.06 17.37 8 11.9 4 8l5.61-1.16L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function SourceBadge({ source }: { source: ReviewSource }) {
  if (source === "google") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[color:var(--color-border)] shadow-[0_4px_12px_-6px_rgba(11,16,32,0.15)]">
        <GoogleMark className="w-4 h-4" />
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-ink)]">
          Google
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[color:var(--color-border)] shadow-[0_4px_12px_-6px_rgba(11,16,32,0.15)]">
      <TrustpilotMark className="w-4 h-4" />
      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-ink)]">
        Trustpilot
      </span>
    </span>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function TrustpilotMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#00B67A" d="M12 1.5l2.755 8.483H23.5l-7.122 5.176 2.755 8.483L12 18.466l-7.133 5.176 2.755-8.483L.5 9.983h8.745z" />
    </svg>
  );
}
