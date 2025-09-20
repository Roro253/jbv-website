"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const bullets = [
  "We underwrite loops, not just features.",
  "We prefer one repeatable channel over noisy multi-channel hacks.",
  "We look for evidence that habits precede pricing power."
] as const;

export default function PovClosing() {
  const prefersReducedMotion = useReducedMotion();
  const listMotion = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section className="mx-auto mt-24 max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 px-8 py-12 text-slate-100 shadow-soft" aria-labelledby="pov-heading">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <h2 id="pov-heading" className="text-3xl font-semibold leading-tight">
            How we invest against these loops
          </h2>
          <p className="mt-3 text-sm text-sky-100/80">
            Two frameworks, one POV: compound loops turn insight into durable economics.
          </p>
          <motion.ul
            {...listMotion}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="mt-6 space-y-3 text-sm"
          >
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-sky-300" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur"
        >
          <p className="text-sm text-slate-100/80">
            Building something that compounds these loops? We want to hear from you.
          </p>
          <Link
            href="mailto:jb@jbv.com?subject=JBV%20Thesis%20%7C%20Share%20your%20build"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-sky-800 transition hover:translate-y-0.5 hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Share your build with us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
