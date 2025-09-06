'use client';
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="container-6xl pt-16 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-semibold tracking-tight"
      >
        Finding Futures.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-6 max-w-2xl prose-muted"
      >
        We are a venture capital firm based in San Francisco. Sector-agnostic, seed and early stage.
        This starter recreates modern layout and motion patterns—without copying text, logos, or proprietary assets.
      </motion.p>
      <div className="mt-8 flex gap-3">
        <a href="/companies" className="rounded-xl bg-brand-600 text-white px-4 py-2">See companies</a>
        <a href="/people" className="rounded-xl border px-4 py-2">Meet the team</a>
      </div>
    </section>
  );
}
