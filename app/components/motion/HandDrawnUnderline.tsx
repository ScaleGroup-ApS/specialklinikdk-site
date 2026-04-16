// app/components/motion/HandDrawnUnderline.tsx
// A playful SVG stroke that "draws in" the first time it scrolls into view.
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  color?: string;
  strokeWidth?: number;
  delay?: number;
  /** "wave" draws a relaxed curve, "scribble" a single arc. */
  variant?: "wave" | "scribble";
  className?: string;
}

export function HandDrawnUnderline({
  color = "var(--color-accent-warm)",
  strokeWidth = 2,
  delay = 0.3,
  variant = "wave",
  className,
}: Props) {
  const reduce = useReducedMotion();

  const path =
    variant === "scribble"
      ? "M4 10 C 50 2, 150 2, 196 10"
      : "M4 8 C 40 2, 70 14, 110 6 S 180 14, 196 6";

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className={className}
      style={{ overflow: "visible" }}
    >
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </svg>
  );
}
