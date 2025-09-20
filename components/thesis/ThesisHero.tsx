'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowUpRight, Castle, Lightbulb, Megaphone, Repeat } from 'lucide-react';

type PhaseSlice = {
  key: string;
  label: string;
  descriptor: string;
  Icon: typeof Lightbulb;
  accent: string;
};

const heroPhases: PhaseSlice[] = [
  {
    key: 'founders',
    label: 'Founders',
    descriptor: 'Insight',
    Icon: Lightbulb,
    accent: 'from-brand-100/70 via-white to-brand-200/60'
  },
  {
    key: 'distribution',
    label: 'Distribution',
    descriptor: 'Access',
    Icon: Megaphone,
    accent: 'from-brand-200/70 via-white to-brand-300/60'
  },
  {
    key: 'product',
    label: 'Product',
    descriptor: 'Habit loop',
    Icon: Repeat,
    accent: 'from-brand-200/70 via-white to-brand-400/60'
  },
  {
    key: 'scale',
    label: 'Scale',
    descriptor: 'Economics',
    Icon: Castle,
    accent: 'from-brand-300/70 via-white to-brand-500/60'
  }
];

const deepDiveLinks = [
  { label: 'Founder loops', href: '#' },
  { label: 'Distribution playbooks', href: '#' },
  { label: 'AI stack field notes', href: '#' }
];

export default function ThesisHero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end center']
  });

  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (shouldReduceMotion) return;
    const nextIndex = Math.min(heroPhases.length - 1, Math.floor(value * heroPhases.length + 0.001));
    setActive((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-sky-50" />
      <div className="container-6xl relative py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Thesis</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">The JBV Thesis</h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                Power concentrates where loops form. We back founders who move fast, earn distribution, and turn usage into habit...then into durable economics.
              </p>
            </div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Power accumulates where loops form: insight → access → habit → economics.</p>
            <div className="space-y-4">
              <div className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Read our deep dives</div>
              <div className="flex flex-wrap gap-3">
                {deepDiveLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white/80 px-4 py-2 text-sm font-medium text-brand-700 shadow-sm transition hover:border-brand-500/50 hover:bg-brand-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    aria-label={`${link.label} (deep dive coming soon)`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-x-6 -inset-y-4 rounded-[40px] bg-gradient-to-br from-white/40 via-brand-50/60 to-brand-100/40 blur-3xl" aria-hidden />
            <div className="relative rounded-[32px] border border-brand-500/10 bg-white/70 p-6 shadow-xl shadow-brand-900/5 backdrop-blur">
              <div className="flex flex-col gap-3">
                {heroPhases.map((phase, index) => {
                  const isActive = index === active || shouldReduceMotion;
                  return (
                    <motion.div
                      key={phase.key}
                      layout
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.45,
                        scale: isActive ? 1 : 0.96
                      }}
                      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      className={`group relative overflow-hidden rounded-3xl border border-brand-500/10 bg-gradient-to-r ${phase.accent} px-5 py-4`}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm"
                          animate={{
                            rotate: shouldReduceMotion
                              ? 0
                              : isActive
                                ? [0, 2, -2, 0]
                                : 0
                          }}
                          transition={{ duration: 2, repeat: isActive && !shouldReduceMotion ? Infinity : 0, ease: 'easeInOut' }}
                          aria-hidden
                        >
                          <phase.Icon className="h-6 w-6 text-brand-700" />
                          {!shouldReduceMotion && (
                            <motion.span
                              className="absolute inset-0 rounded-2xl bg-brand-200/20"
                              animate={{ scale: isActive ? [1, 1.08, 1] : 1, opacity: isActive ? [0.4, 0.6, 0.4] : 0 }}
                              transition={{ duration: 2.4, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                              aria-hidden
                            />
                          )}
                        </motion.div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium uppercase tracking-[0.32em] text-brand-700/80">{phase.descriptor}</p>
                          <p className="text-lg font-semibold text-slate-900">{phase.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

