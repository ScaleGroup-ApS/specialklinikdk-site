// app/components/home/HeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0" style={{ background: "var(--color-secondary)" }}>
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full animate-blob"
          style={{
            background: "radial-gradient(circle, rgba(79,209,197,0.35) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle, rgba(126,232,226,0.2) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full animate-blob-3"
          style={{
            background: "radial-gradient(circle, rgba(58,138,131,0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15, 23, 42, 0.4)" }}
      />

      {/* Content — 7/12 column width on desktop */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-44 w-full">
        <div className="max-w-[700px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
          >
            ABB Medical Aps
          </motion.p>

          <h1
            className="font-heading text-5xl md:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block"
            >
              Specialiseret behandling,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block gradient-text"
            >
              bygget på tillid.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg md:text-xl leading-[1.7] mb-12"
            style={{ color: "rgba(241,245,249,0.8)", maxWidth: "560px" }}
          >
            ABB Medical er din private specialklinik i København, hvor avanceret
            teknologi møder personlig omsorg.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Link to="/behandlinger" className="btn-gradient">
              Se Vores Behandlinger
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
