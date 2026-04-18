import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SubpageHeroProps {
  eyebrow: string;
  headline: ReactNode;
  body?: string;
  size?: "xxl" | "xl";
  children?: ReactNode;
}

export function SubpageHero({
  eyebrow,
  headline,
  body,
  size = "xxl",
  children,
}: SubpageHeroProps) {
  return (
    <section
      className="relative overflow-hidden isolate"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FAF8F2 60%, #F3EFE3 100%)",
      }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/3 left-1/4 w-[55%] h-[70%] rounded-full animate-blob"
          style={{
            background:
              "radial-gradient(circle, rgba(105,125,168,0.2) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-40 pb-24 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow mb-6"
        >
          {eyebrow}
        </motion.p>

        <h1
          className={`${size === "xxl" ? "display-xxl" : "display-xl"} text-[color:var(--color-ink)] max-w-[18ch]`}
        >
          {headline}
        </h1>

        {body && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="mt-10 text-[17px] leading-[1.75] text-[color:var(--color-text-muted)] max-w-xl"
          >
            {body}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}
