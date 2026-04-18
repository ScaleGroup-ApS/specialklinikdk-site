import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface AccordionListProps {
  items: { q: string; a: string }[];
  defaultOpen?: number;
}

export function AccordionList({ items, defaultOpen = 0 }: AccordionListProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <ul className="divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-5">
                <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-text-muted)] pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-[1.2] tracking-tight text-[color:var(--color-ink)]">
                  {item.q}
                </span>
              </span>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="shrink-0 w-9 h-9 rounded-full border border-[color:var(--color-border-strong)] flex items-center justify-center text-[color:var(--color-ink)] group-hover:bg-[color:var(--color-ink)] group-hover:text-white transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 5v14M5 12h14"
                  />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pl-14 pb-8 pr-10 text-[15px] leading-[1.8] text-[color:var(--color-text-muted)] max-w-prose">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
