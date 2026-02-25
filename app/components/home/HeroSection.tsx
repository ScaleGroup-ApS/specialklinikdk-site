// app/components/home/HeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated floating circles on light background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}
      >
        <div
          className="absolute top-[-12%] left-[-8%] w-[56%] h-[64%] rounded-full animate-blob"
          style={{
            background: "radial-gradient(circle, rgba(105,125,168,0.22) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[48%] h-[58%] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle, rgba(140,159,196,0.25) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-[44%] right-[18%] w-[36%] h-[36%] rounded-full animate-blob-3"
          style={{
            background: "radial-gradient(circle, rgba(105,125,168,0.16) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Mobile floating circles on sides */}
        <motion.div
          className="absolute md:hidden top-[22%] -left-7 w-16 h-16 rounded-full border"
          style={{ borderColor: "rgba(105,125,168,0.38)", background: "rgba(105,125,168,0.10)" }}
          animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute md:hidden top-[48%] -right-6 w-12 h-12 rounded-full border"
          style={{ borderColor: "rgba(105,125,168,0.36)", background: "rgba(105,125,168,0.10)" }}
          animate={{ y: [0, 9, 0], x: [0, -4, 0] }}
          transition={{ duration: 8.1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.div
          className="absolute md:hidden bottom-[18%] -left-5 w-10 h-10 rounded-full border"
          style={{ borderColor: "rgba(105,125,168,0.34)", background: "rgba(105,125,168,0.08)" }}
          animate={{ y: [0, -7, 0], x: [0, 3, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        />

      </div>

      {/* Content + hero image */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-44 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-[700px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
          >
            Tryghed hele vejen
          </motion.p>

          <h1
            className="font-heading text-5xl md:text-7xl font-medium text-secondary leading-[1.1] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block"
            >
              Velkommen til Specialklinik Taastrup
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg md:text-xl leading-[1.7] mb-12"
            style={{ color: "var(--color-text-muted)", maxWidth: "560px" }}
          >
            Professionel omskæring i trygge rammer. Vi udfører rituel omskæring af
            drengebørn med høj sikkerhed, faglig ekspertise og tydelig vejledning
            før, under og efter forløbet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/omskaering" className="btn-gradient">
              Læs om omskæring
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/priser"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-secondary hover:bg-slate-100 transition-colors"
            >
              Priser
            </Link>
          </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative w-full max-w-[520px]">
              <motion.div
                className="absolute -top-6 -left-6 w-16 h-16 rounded-full border z-10"
                style={{ borderColor: "rgba(105,125,168,0.45)", background: "rgba(105,125,168,0.10)" }}
                animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-5 -left-4 w-10 h-10 rounded-full border z-10"
                style={{ borderColor: "rgba(105,125,168,0.45)", background: "rgba(105,125,168,0.12)" }}
                animate={{ y: [0, -10, 0], x: [0, -8, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
              <motion.div
                className="absolute top-6 -right-6 w-14 h-14 rounded-full border z-10"
                style={{ borderColor: "rgba(105,125,168,0.42)", background: "rgba(105,125,168,0.10)" }}
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />

              <img
                src="/images/Forside-specialklinik-Taastrup%20(2).jpg"
                alt="Specialklinik Taastrup"
                className="relative z-20 w-full h-[360px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
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
          style={{ color: "rgba(31,41,55,0.55)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(31,41,55,0.45), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
