import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ContentSection } from "./ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Titled content section used across the patient-information pages.
 * Renders an animated eyebrow + heading and constrains the body to a
 * readable measure by default.
 */
export function InfoSection({
  bg = "white",
  eyebrow,
  title,
  children,
  wide = false,
}: {
  bg?: "white" | "ivory" | "dark";
  eyebrow?: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <ContentSection bg={bg}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-4"
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="display-lg text-[color:var(--color-ink)] mb-10">
        <AnimatedWords as="span" mode="inView" text={title} className="block" />
      </h2>
      <div className={wide ? "" : "max-w-3xl"}>{children}</div>
    </ContentSection>
  );
}

/** Bulleted list with the warm accent dot. */
export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
          className="flex items-start gap-4"
        >
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent-warm)] shrink-0" />
          <p className="text-[16px] leading-[1.8] text-[color:var(--color-text-muted)]">
            {item}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/** Stacked paragraphs. */
export function Prose({ paragraphs }: { paragraphs: ReactNode[] }) {
  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
          className="text-[16px] leading-[1.8] text-[color:var(--color-text-muted)]"
        >
          {p}
        </motion.p>
      ))}
    </div>
  );
}

/** Highlighted call-out box with a warm left border. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mt-8 card-ivory p-8 rounded-[1.25rem] border-l-4 border-l-[color:var(--color-accent-warm)]"
    >
      <p className="text-[16px] leading-[1.8] text-[color:var(--color-text-muted)]">
        {children}
      </p>
    </motion.div>
  );
}

/** Small bold sub-heading used to label groups inside a section. */
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-heading text-lg font-medium text-[color:var(--color-ink)] mb-4">
      {children}
    </h3>
  );
}
