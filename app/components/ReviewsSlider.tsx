// app/components/ReviewsSlider.tsx
// Unified review slider — surfaces reviews from Google and Trustpilot with a
// per-review source badge, drag/keyboard/arrow/dot navigation.
//
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";

const EASE = [0.22, 1, 0.36, 1] as const;

// Public profile pages the stat cards link out to. Leave a value empty to
// render that card as plain text (no link) instead of a broken anchor.
const TRUSTPILOT_URL = "https://dk.trustpilot.com/review/specialklinik.dk";
const GOOGLE_URL = "https://www.google.com/maps?cid=16535002851184095999";

// Total public review counts shown on the stat cards. The slider rotates a
// curated subset, so these track the live profile totals rather than the
// number of quotes in REVIEWS — keep them in sync when checking the profiles.
const GOOGLE_TOTAL = 44;
const TRUSTPILOT_TOTAL = 45;

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
    source: "trustpilot",
    name: "Zainab Khan",
    date: "28. okt. 2026",
    rating: 5,
    quote:
      "Tusind tak! Vi har haft en rigtig god oplevelse med Amin hos Specialklinik Taastrup i forbindelse med vores søns omskæring med ringmetoden (Circumplast). Hele forløbet var præget af professionalisme, omsorg og tryghed. Ved spørgsmål eller bekymringer fik jeg altid hurtige og beroligende svar. En stor tak og mine varmeste anbefalinger!",
    context: "Ringmetoden",
  },
  {
    source: "google",
    name: "afraa boumediane",
    date: "okt. 2026",
    rating: 5,
    quote:
      "I would like to express my sincere gratitude to Dr. Amin and the nurse who assisted him. They were both absolutely wonderful — kind, professional, and always smiling.",
  },
  {
    source: "trustpilot",
    name: "Murat Kutlu",
    date: "10. okt. 2026",
    rating: 5,
    quote:
      "Meget god oplevelse for os som forældre og vores lille søn på 3 mdr. Kan helt klart anbefales.",
    context: "3 mdr.",
  },
  {
    source: "google",
    name: "Sonia Sega",
    date: "okt. 2026",
    rating: 5,
    quote:
      "An experience I will always be grateful for. Choosing a clinic for my baby's circumcision was not an easy decision. After researching carefully and communicating with Specialklinik Taastrup, I felt more and more confident that we had made the right choice. Having gone through the entire experience, I can honestly say that I am extremely and overwhelmingly satisfied.",
  },
  {
    source: "google",
    name: "Biwar Hessin",
    date: "sep. 2026",
    rating: 5,
    quote:
      "Meget professionel håndtering af både patient og forældre. De er rigtig gode til at informere, og man føler sig i trygge hænder.",
  },
  {
    source: "trustpilot",
    name: "Mahmoud Ghneim",
    date: "21. sep. 2026",
    rating: 4,
    quote:
      "Rigtig god og tryg oplevelse. Personalet var professionelle, venlige og tog sig godt af os hele vejen igennem. Man følte sig i gode hænder, og alt blev håndteret roligt og kompetent. Kan anbefales.",
  },
  {
    source: "trustpilot",
    name: "Nadeen Als",
    date: "20. sep. 2026",
    rating: 5,
    quote:
      "Vi er meget tilfredse med forløbet hos Specialklinik Taastrup i forbindelse med vores søns omskæring. Amin er yderst kompetent og professionel. Vi oplevede hele vejen igennem en høj grad af tryghed og professionalisme. Amin tog sig tid til at forklare hele forløbet grundigt — før, under og efter — og indgrebet blev udført med stor omhu og faglighed, hvilket gav os tryghed som forældre. Vi kan i høj grad anbefale klinikken til andre forældre, som ønsker et trygt og professionelt forløb. Kæmpe ros til Amin og sygeplejersken.",
  },
  {
    source: "trustpilot",
    name: "Ali",
    date: "30. aug. 2026",
    rating: 5,
    quote:
      "Vi er rigtig glade for vores oplevelse hos klinikken. Fra første kontakt følte vi os trygge og godt informeret, og personalet var både professionelle, venlige og omsorgsfulde over for vores søn. Vi kom fra Sverige for at få vores søn omskåret, og hele forløbet var nemt og trygt. Vi fik god vejledning både før og efter behandlingen, og personalet tog sig tid til at besvare vores spørgsmål og bekymringer. Vi valgte Circumplast-metoden, og samlet set har det været et rigtig godt forløb. Vi kan varmt anbefale klinikken — også til familier, der bor i Sverige og overvejer at tage til Danmark for omskæring. Vi følte os i trygge hænder hele vejen igennem.",
    context: "Circumplast",
  },
  {
    source: "google",
    name: "Fisk",
    date: "aug. 2026",
    rating: 5,
    quote:
      "100% stedet man skal vælge. Vi har ikke fortrudt et sekund. Perfekt resultat for den lille. Rutinen må gøre, at de ved, hvad de laver bedst. Kan kun anbefale.",
  },
  {
    source: "google",
    name: "Iman Khazen",
    date: "aug. 2026",
    rating: 5,
    quote:
      "Jeg kan varmt anbefale denne klinik. Jeg havde min søn med til omskæring, og vi havde en rigtig god oplevelse fra start til slut. Både lægen og assistenten var meget professionelle, venlige og omsorgsfulde.",
  },
  {
    source: "google",
    name: "Ant",
    date: "aug. 2026",
    rating: 5,
    quote:
      "Kan klart anbefales. God og klar kommunikation i efterspillet af indgrebet.",
  },
  {
    source: "google",
    name: "Fahad Baragzai",
    date: "jul. 2026",
    rating: 5,
    quote:
      "We live in Sweden (Malmö), and many of our friends recommended different clinics here. However, none of them offered circumcision under general anesthesia, which was very important to us. That is why we found this clinic.",
    context: "Fuld bedøvelse",
  },
  {
    source: "google",
    name: "Abdul Sabor Yousefi",
    date: "jul. 2026",
    rating: 5,
    quote:
      "Salam Alaikum. Jeg takker kirurgen fra mit hjerte. Min søn blev omskåret sidste uge, uden nogen komplikationer, alhamdulillah.",
  },
  {
    source: "trustpilot",
    name: "Samir Ghazal",
    date: "18. jul. 2026",
    rating: 5,
    quote:
      "Dygtige mennesker, og man sendes hjem med al den information, man har behov for.",
  },
  {
    source: "trustpilot",
    name: "Ala Kamel",
    date: "13. jul. 2026",
    rating: 5,
    quote:
      "Jeg er meget glad på min søns vegne. Jeg kunne tydeligt mærke, at han ikke græd nær så meget, som min ældste gjorde, da han blev omskåret et andet sted. Her på klinikken var jeg rigtig glad for forløbet. Hilsen en glad mor.",
  },
  {
    source: "google",
    name: "Jonathan Iyamu",
    date: "jun. 2026",
    rating: 5,
    quote:
      "It was seamless. They are experienced doctors. They communicate the whole process with you.",
  },
  {
    source: "google",
    name: "Kamran Ahmed",
    date: "jun. 2026",
    rating: 5,
    quote:
      "We recently had our twin boys circumcised at Specialklinik Taastrup, and I cannot recommend the clinic highly enough.",
    context: "Tvillinger",
  },
  {
    source: "trustpilot",
    name: "Zokar Hasra",
    date: "20. jun. 2026",
    rating: 4,
    quote:
      "Godt forløb fra start til slut med god information om omskæringen undervejs.",
  },
  {
    source: "trustpilot",
    name: "Nassima",
    date: "9. jun. 2026",
    rating: 5,
    quote:
      "Tryg og professionel oplevelse. Hele vejen igennem god stemning og løbende information. Både Amin og hans assistent er behagelige og omhyggelige. Hurtig procedure, og vores lille gut på 4 uger har ikke mærket det store til det efterfølgende. Anbefaler klart klinikken.",
    context: "4 uger",
  },
  {
    source: "trustpilot",
    name: "Seco",
    date: "8. jun. 2026",
    rating: 5,
    quote:
      "Min søn på 4 mdr. blev omskåret af Amin. Det var en god oplevelse, og han havde ikke de store gener efterfølgende. Selve operationen var smertefri og hurtigt overstået. Både Amin og hans assistent var super dygtige og behagelige. Amin har derudover været super hurtig til at besvare spørgsmål på mail — inden for få minutter — hvilket har været virkelig beroligende for os som forældre. Vi vil klart anbefale specialklinikken.",
    context: "4 mdr.",
  },
  {
    source: "trustpilot",
    name: "Sarah Nielsen",
    date: "3. jun. 2026",
    rating: 5,
    quote:
      "10/10 behandling, der var styr på tingene. Vi som forældre var i lige så trygge hænder, som vores søn var. Han havde ingen smerter efterfølgende og har ikke mærket til omskæringen på noget tidspunkt. Vi har virkelig været glade for forløbet — under og efter — og for valget af klinik.",
  },
  {
    source: "trustpilot",
    name: "Tareq",
    date: "1. jun. 2026",
    rating: 5,
    quote:
      "God og tryg oplevelse hos Amin. Høj faglighed og god information hele vejen igennem. Derudover er Amin super hurtig til at svare. Vi fik en hurtig tid, efter at vi havde skrevet os op på ventelisten.",
  },
  {
    source: "google",
    name: "Silja Eriksen",
    date: "maj 2026",
    rating: 5,
    quote:
      "Virkelig søde, tålmodige og dygtige mennesker. Var gode til at svare hurtigt på spørgsmål over mail både inden og efter, og gav en god gennemgang af det hele, mens man var der. Kan kun anbefale denne klinik.",
  },
  {
    source: "google",
    name: "Saad Khan",
    date: "maj 2026",
    rating: 5,
    quote:
      "Rigtig kompetent og tryghedsskabende personale. Det blev til en rigtig fin oplevelse for vores søn.",
  },
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
              <SourceStatCard
                source="google"
                label="Google"
                count={GOOGLE_TOTAL}
                href={GOOGLE_URL}
              />
              <SourceStatCard
                source="trustpilot"
                label="Trustpilot"
                count={TRUSTPILOT_TOTAL}
                href={TRUSTPILOT_URL}
              />
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

function SourceStatCard({
  source,
  label,
  count,
  href,
}: {
  source: ReviewSource;
  label: string;
  count: number;
  href?: string;
}) {
  const Mark = source === "google" ? GoogleMark : TrustpilotMark;
  const inner = (
    <>
      <div className="flex items-center gap-2">
        <Mark className="w-5 h-5" />
        <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
          {label}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-light text-[color:var(--color-ink)]">
        {count}
      </p>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] mt-1">
        Anmeldelser
      </p>
    </>
  );

  if (!href) {
    return (
      <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-4">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-[color:var(--color-border)] bg-white p-4 transition-colors hover:border-[color:var(--color-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]"
    >
      {inner}
      <span className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-muted)] transition-colors group-hover:text-[color:var(--color-ink)]">
        Se alle
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>
    </a>
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
