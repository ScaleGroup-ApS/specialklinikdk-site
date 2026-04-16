// app/components/motion/AnimatedWords.tsx
// Stagger-reveal a headline word-by-word with a calm spring.
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Mode = "onLoad" | "inView";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /** Delay before the first word appears. */
  delay?: number;
  /** Per-word stagger in seconds. */
  stagger?: number;
  mode?: Mode;
  /** Optional trailing element (e.g. an animated italic or punctuation). */
  trailing?: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function AnimatedWords({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.05,
  mode = "onLoad",
  trailing,
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };
  const word = {
    hidden: { y: reduce ? 0 : "100%", opacity: reduce ? 1 : 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const Tag = motion[as] as typeof motion.span;
  const viewProps = mode === "inView"
    ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } as const }
    : { initial: "hidden", animate: "visible" };

  return (
    <Tag
      {...viewProps}
      variants={container}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-flex overflow-hidden align-[0.16em] leading-[1.15] pb-[0.05em]"
          aria-hidden
          style={{ lineHeight: "inherit" }}
        >
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
      {trailing}
    </Tag>
  );
}
