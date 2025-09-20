'use client';

import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const glossary = [
  {
    term: 'CAC Payback',
    definition: 'Months to recover acquisition spend from gross margin.',
    why: 'Faster = more shots on goal.'
  },
  {
    term: 'PMF',
    definition: 'Users would be “very disappointed” without you (≥ 40%).',
    why: '≥ 40% “very disappointed” signals product/market fit.'
  },
  {
    term: 'Cohort Retention',
    definition: 'Curve flattening = habit formation.',
    why: 'Curve flattening shows the loop is holding new users.'
  },
  {
    term: 'NRR',
    definition: 'Expansion vs churn; >100% shows compounding value.',
    why: '>100% shows compounding value from existing customers.'
  },
  {
    term: 'Moat',
    definition: 'Durable advantage—data, network, workflows, ecosystem.',
    why: 'Durable advantages protect loops from fast followers.'
  }
];

export default function Glossary() {
  return (
    <section className="relative bg-white py-20">
      <div className="container-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="rounded-[32px] border border-brand-500/15 bg-white/85 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Mini-Glossary</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Common loops, defined</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {glossary.map((item) => (
                <Popover key={item.term}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full border border-brand-500/20 bg-white/90 px-4 py-2 text-sm font-medium text-brand-700 shadow-sm transition hover:border-brand-500/40 hover:bg-brand-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    >
                      {item.term}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="max-w-sm rounded-3xl border-brand-500/20 bg-white/95 p-5">
                    <p className="text-sm font-semibold text-slate-800">{item.definition}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">Why it matters: {item.why}</p>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

