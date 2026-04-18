// app/components/motion/MagneticButton.tsx
// Tasteful magnetic hover — the child drifts toward the cursor.
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import {
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Pull strength (px). Keep small for restraint. */
  strength?: number;
}

export function MagneticButton({ children, strength = 10, className, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.6 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * strength * 2);
    y.set(((e.clientY - cy) / r.height) * strength * 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
