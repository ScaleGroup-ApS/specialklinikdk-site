// app/components/motion/CountUp.tsx
// Animate a numeric string up to its final value when the element enters view.
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  /** Final text to display (e.g. "1000+", "4.9", "100%") */
  value: string;
  duration?: number;
  className?: string;
}

// Parse leading numeric portion + prefix/suffix so "1000+" or "4.9" both work.
function parse(value: string) {
  const match = value.match(/^([^\d-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value, decimals: 0 };
  const [, prefix, raw, suffix] = match;
  const normalized = raw.replace(",", ".");
  const decimals = normalized.includes(".")
    ? normalized.split(".")[1].length
    : 0;
  return { prefix, num: Number(normalized), suffix, decimals };
}

export function CountUp({ value, duration = 1.8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const { prefix, num, suffix, decimals } = parse(value);
  const formatted = useTransform(mv, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(num);
      return;
    }
    const ctrl = animate(mv, num, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => ctrl.stop();
  }, [inView, num, duration, reduce, mv]);

  useEffect(() => {
    const unsub = formatted.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return () => unsub();
  }, [formatted]);

  const initial = `${prefix}${(0).toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {initial}
    </span>
  );
}
