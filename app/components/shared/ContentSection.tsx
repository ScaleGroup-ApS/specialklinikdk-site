import type { ReactNode } from "react";

const BG_MAP = {
  white: "bg-white",
  ivory: "bg-[color:var(--color-surface-dim)]",
  dark: "bg-[color:var(--color-ink)] text-[color:var(--color-text-on-dark)]",
} as const;

interface ContentSectionProps {
  bg?: "white" | "ivory" | "dark";
  className?: string;
  children: ReactNode;
  narrow?: boolean;
}

export function ContentSection({
  bg = "white",
  className = "",
  children,
  narrow,
}: ContentSectionProps) {
  return (
    <section className={`relative ${BG_MAP[bg]} ${className}`}>
      {(bg === "ivory" || bg === "dark") && (
        <div
          aria-hidden
          className={`absolute inset-0 grain ${bg === "dark" ? "grain-dark" : ""} pointer-events-none`}
        />
      )}
      <div
        className={`relative ${narrow ? "max-w-3xl" : "max-w-[1400px]"} mx-auto px-6 lg:px-10 py-24 md:py-32`}
      >
        {children}
      </div>
    </section>
  );
}
