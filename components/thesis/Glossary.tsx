"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const glossary = [
  {
    term: "CAC Payback",
    definition: "Months to recover acquisition spend from gross margin.",
    why: "Faster = more shots on goal."
  },
  {
    term: "PMF",
    definition: "Users would be “very disappointed” without you (≥ 40%)."
  },
  {
    term: "Cohort Retention",
    definition: "Curve flattening = habit formation."
  },
  {
    term: "NRR",
    definition: "Expansion vs churn; >100% shows compounding value."
  },
  {
    term: "Moat",
    definition: "Durable advantage—data, network, workflows, ecosystem."
  }
] as const;

export default function Glossary() {
  const prefersReducedMotion = useReducedMotion();
  const headingMotion = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };
  return (
    <section className="mx-auto mt-24 max-w-6xl rounded-3xl bg-white/90 p-8 shadow-soft backdrop-blur" aria-labelledby="glossary-heading">
      <motion.div
        {...headingMotion}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <h2 id="glossary-heading" className="text-2xl font-semibold text-slate-900">
          Mini-Glossary
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Crisp definitions for the shorthand we use with founders—tap a chip to refresh the context.
        </p>
      </motion.div>
      <div className="mt-6 flex flex-wrap gap-3">
        {glossary.map((item, index) => (
          <Popover key={item.term}>
            <PopoverTrigger asChild>
              <motion.button
                type="button"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.05 }}
                className="rounded-full border border-sky-300 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm transition-colors hover:border-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {item.term}
              </motion.button>
            </PopoverTrigger>
            <PopoverContent align="start" className="max-w-xs">
              <p className="text-sm font-semibold text-slate-900">{item.term}</p>
              <p className="mt-2 text-sm text-slate-600">{item.definition}</p>
              {item.why && (
                <>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Why it matters</p>
                  <p className="mt-1 text-sm text-slate-600">{item.why}</p>
                </>
              )}
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </section>
  );
}
