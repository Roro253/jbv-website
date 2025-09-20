'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const bullets = [
  {
    lead: 'We underwrite',
    emphasis: 'loops',
    tail: ', not just features.'
  },
  {
    lead: 'We prefer',
    emphasis: 'one repeatable channel',
    tail: ' over noisy multi-channel hacks.'
  },
  {
    lead: 'We look for evidence that',
    emphasis: 'habits precede pricing power',
    tail: '.'
  }
];

export default function PovClosing() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-brand-50/70 via-white to-transparent" />
      <div className="container-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="rounded-[32px] border border-brand-500/15 bg-white/90 p-8 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur"
        >
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">JBV POV</p>
              <h3 className="mt-2 text-3xl font-semibold text-slate-900">How we invest against these frameworks</h3>
            </div>
            <ul className="grid gap-3 text-base leading-7 text-slate-700 md:grid-cols-2">
              {bullets.map((item) => (
                <li key={item.emphasis} className="rounded-2xl border border-brand-500/10 bg-white/80 p-4 shadow-sm">
                  <span>{item.lead} </span>
                  <span className="font-semibold text-brand-700">{item.emphasis}</span>
                  <span>{item.tail}</span>
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Share your build with us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

