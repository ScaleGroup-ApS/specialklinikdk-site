// Shared FAQ content.
// Used by both the FAQ page (/faq) and the front-page teaser so the
// answers stay identical across the site. "Hvornår er den bedste alder"
// is intentionally first, per the clinic's request.

export type FaqBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type FaqItem = {
  q: string;
  /** Simple single-paragraph answer. Ignored if `blocks` is set. */
  a?: string;
  /** Rich answer with paragraphs and/or lists. */
  blocks?: FaqBlock[];
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Hvornår er den bedste alder for omskæring?",
    blocks: [
      {
        type: "p",
        text: "Vi anbefaler, at omskæring udføres tidligt — helst når barnet er mellem 2 og 8 uger gammelt. På dette tidspunkt er indgrebet mest skånsomt, helingen går hurtigere, og erfaringsmæssigt oplever spædbarnet færre smerter.",
      },
      {
        type: "p",
        text: "Efterhånden som barnet vokser og bliver mere aktivt, kan indgrebet blive mere kompliceret. Det er ikke umuligt at omskære et ældre barn, men vi anbefaler altid at handle tidligt.",
      },
    ],
  },
  {
    q: "Hvor lang tid tager selve indgrebet?",
    blocks: [
      {
        type: "p",
        text: "Selve det kirurgiske indgreb er hurtigt overstået. Med ringmetoden tager det typisk 5–7 minutter, mens den klassiske metode tager cirka 10–15 minutter.",
      },
      {
        type: "p",
        text: "Regn med at være i klinikken i cirka 30 minutter i alt, da der afsættes tid til en indledende samtale, forberedelse af barnet samt ro og observation efter indgrebet.",
      },
    ],
  },
  {
    q: "Hvilke risici er forbundet med omskæring?",
    blocks: [
      {
        type: "p",
        text: "Omskæring er et veldokumenteret og sikkert indgreb, når det udføres korrekt. De hyppigste komplikationer er mindre blødning og infektion, som begge er sjældne og normalt lette at behandle. Alvorlige komplikationer forekommer meget sjældent.",
      },
      {
        type: "p",
        text: "Klinikken vejleder altid grundigt i, hvad I skal holde øje med efter indgrebet, og vi er tilgængelige, hvis I har spørgsmål eller bekymringer i helingsperioden.",
      },
    ],
  },
  {
    q: "Hvilken operationsmetode bruger I?",
    a: "Vi anvender to metoder afhængigt af barnets alder. Til børn under 2 år anvendes ringmetoden (Circumplast®), som er skånsom og velegnet til de mindste. Til børn over 2 år anvendes den klassiske metode.",
  },
  {
    q: "Hvor længe har barnet ondt efter omskæring?",
    blocks: [
      {
        type: "p",
        text: "De fleste børn oplever lette til moderate smerter de første 1–2 dage efter indgrebet. Smerterne er typisk størst den første dag og aftager gradvist. De kan som regel håndteres fint med Panodil Junior i de anbefalede doser.",
      },
      {
        type: "p",
        text: "Efter de første dage vil de fleste børn have det markant bedre, selvom området stadig kan være ømt i op til en uge. Har barnet fortsat kraftige smerter efter 3 dage, eller er I i tvivl om helingsforløbet, er I altid velkomne til at kontakte klinikken.",
      },
    ],
  },
  {
    q: "Hvor længe går der, før såret er helet?",
    blocks: [
      {
        type: "p",
        text: "Selve såret heler typisk i løbet af 1–2 uger. I de første dage vil der ofte være let hævelse og rødme omkring operationsområdet, hvilket er helt normalt og en naturlig del af helingsprocessen.",
      },
      {
        type: "p",
        text: "Let hævelse kan forekomme i op til 3–4 uger efter indgrebet. Det endelige kosmetiske resultat kan først vurderes efter cirka 6 uger, når området er fuldt helet og hævelsen er helt aftaget.",
      },
      {
        type: "p",
        text: "Er I bekymrede for helingsforløbet, eller opstår der tegn på infektion såsom tiltagende rødme, hævelse, pus eller feber, bedes I kontakte klinikken.",
      },
    ],
  },
  {
    q: "Mit barn er forkølet – skal jeg aflyse tiden?",
    blocks: [
      {
        type: "p",
        text: "En let forkølelse er ikke nødvendigvis grund til at aflyse. Er barnet derimod alment påvirket med feber, sløvhed eller nedsat appetit, bør I aflyse og booke en ny tid, når barnet er rask.",
      },
      {
        type: "p",
        text: "Er I i tvivl, er I altid velkomne til at kontakte klinikken inden jeres besøg.",
      },
    ],
  },
  {
    q: "Hvad skal jeg medbringe til klinikken?",
    a: "Husk at medbringe barnets sygesikringskort samt ekstra bleer og skiftetøj. Det kan også være en god idé at have sukkervand, modermælk eller modermælkserstatning med, da det kan hjælpe med at berolige barnet under indgrebet.",
  },
  {
    q: "Hvordan foregår betalingen?",
    a: "Betaling sker ved fremmøde i klinikken. Vi modtager alle betalingskort samt MobilePay.",
  },
  {
    q: "Skal begge forældre komme med i klinikken?",
    blocks: [
      {
        type: "p",
        text: "Vi anbefaler, at begge forældre møder op til indgrebet. Hvis kun den ene forælder kan være til stede, og I har fælles forældremyndighed, skal den fraværende forælder afgive skriftligt samtykke.",
      },
      { type: "p", text: "Samtykket skal formuleres som en kort erklæring, der indeholder:" },
      {
        type: "ul",
        items: [
          "Den fraværende forælders fulde navn og underskrift.",
          "Barnets fulde navn og CPR-nummer.",
          "En erklæring om, at den pågældende forælder samtykker til omskæring af barnet.",
        ],
      },
      { type: "p", text: "Erklæringen skal medbringes til klinikken på dagen for indgrebet." },
    ],
  },
  {
    q: "Er omskæring af drengebørn ulovligt?",
    a: "Omskæring af drengebørn er ikke ulovligt, når det foretages af autoriserede sundhedspersoner og efter gældende regler. D. 18.05.2021 nedstemte Folketinget et forslag om at forbyde ikke-terapeutisk omskæring af personer under 18 år.",
  },
];

/** First N items for the front-page teaser (same answers as the FAQ page). */
export const FRONTPAGE_FAQ: FaqItem[] = FAQ_ITEMS.slice(0, 4);
