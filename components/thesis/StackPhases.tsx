'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Castle, Lightbulb, Megaphone, Repeat } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const phases = [
  {
    id: 'phase-1',
    title: 'Phase 1 — Insight & Founders (Foundation)',
    icon: Lightbulb,
    why: 'Earned, non-obvious insight + fast shipping compounds advantage later.',
    doNow: ['30–100 customer interviews', 'Weekly demos', '2–3 design partners'],
    benchmarks: ['Time-to-first working demo ≤ 4–6 weeks', '3–10 design partners'],
    accent: '#b7d6ff',
    loopTint: 'bg-brand-300/25'
  },
  {
    id: 'phase-2',
    title: 'Phase 2 — Access & Distribution (Go-to-Market)',
    icon: Megaphone,
    why: 'One repeatable low-cost channel beats three mediocre ones.',
    doNow: ['Pick a primary channel', 'Instrument activation', 'Weekly funnel reviews'],
    benchmarks: ['CAC payback trending to norms (SMB often < 12–18m; enterprise < 24m) and improving MoM'],
    accent: '#8bb8ff',
    loopTint: 'bg-brand-400/25'
  },
  {
    id: 'phase-3',
    title: 'Phase 3 — Product Engine & Habit (Loops)',
    icon: Repeat,
    why: 'Durable usage via a core loop (flywheel/lock-in/network effects) is the engine of power laws.',
    doNow: ['Reduce setup friction', 'Deliver one hero outcome', 'Add 2–3 retention hooks'],
    benchmarks: ['Sean Ellis PMF ≥ 40% “very disappointed”', 'Cohort retention curve flattening'],
    accent: '#5b95ff',
    loopTint: 'bg-brand-500/25'
  },
  {
    id: 'phase-4',
    title: 'Phase 4 — Monetization, Moat & Scale (Applications)',
    icon: Castle,
    why: 'With habit formed, pricing power and defensibility appear; then you scale responsibly.',
    doNow: ['Price testing', 'Payback discipline', 'Moat building (data, integrations, ecosystem)'],
    benchmarks: ['Positive payback at small scale', 'Churn ↓; NRR ↑; margins expand'],
    accent: '#2f72ff',
    loopTint: 'bg-brand-600/20'
  }
] as const;

export default function StackPhases() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center']
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <TooltipProvider delayDuration={120}>
      <section ref={sectionRef} className="relative bg-white py-20">
        <div className="container-6xl">
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Framework A</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Startup Company-Building Stack</h2>
              </div>
              <div className="hidden flex-col items-center gap-3 lg:flex">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Progress</span>
                <div className="relative h-48 w-1 overflow-hidden rounded-full bg-brand-100/60">
                  <motion.div
                    className="absolute inset-x-0 bottom-0 origin-bottom rounded-full bg-brand-500/70"
                    style={{ scaleY: shouldReduceMotion ? 1 : progress }}
                  />
                </div>
              </div>
              <div className="flex h-1 w-full overflow-hidden rounded-full bg-brand-100/70 lg:hidden">
                <motion.div
                  className="h-full origin-left rounded-full bg-brand-500/70"
                  style={{ scaleX: shouldReduceMotion ? 1 : progress }}
                />
              </div>
            </div>

            <div className="space-y-8">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.article
                    key={phase.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.04 }}
                    className="group relative overflow-hidden rounded-[28px] border border-brand-500/15 bg-white/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur"
                    style={{ borderLeftColor: phase.accent, borderLeftWidth: 6 }}
                  >
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-white/0 via-brand-100/0 to-brand-200/0"
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: 0, x: 0, y: 0 }}
                      whileHover={shouldReduceMotion ? undefined : { opacity: 0.4, x: 12, y: -12 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      aria-hidden
                    />
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100/80 text-brand-700 shadow-inner">
                          <Icon className="h-6 w-6" aria-hidden />
                        </div>
                        {!shouldReduceMotion && (
                          <motion.span
                            className={`pointer-events-none absolute -right-6 top-1/2 hidden h-20 w-20 -translate-y-1/2 rounded-full border border-brand-500/20 md:block ${phase.loopTint}`}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
                            aria-hidden
                          />
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{phase.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{phase.why}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">What to do now</h4>
                          <ul className="mt-2 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                            {phase.doNow.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-brand-400/80" aria-hidden />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-50/60 px-3 py-1 text-xs font-semibold text-brand-700 transition hover:border-brand-500/40 hover:bg-brand-100/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                                aria-label={`Benchmarks for ${phase.title}`}
                              >
                                Benchmarks
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-sm text-left">
                              <ul className="list-disc space-y-1 pl-5">
                                {phase.benchmarks.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                          <span className="text-xs text-slate-400">Hover or tap to reveal</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

