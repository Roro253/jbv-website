'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Stage = {
  id: 'semis' | 'infra' | 'models' | 'apps';
  title: string;
  range: string;
  summary: string;
  detail: string;
  constraint: string;
  constraintDetail: string;
};

const stages: Stage[] = [
  {
    id: 'semis',
    title: 'Phase 1 — Semiconductors',
    range: '2020–2025',
    summary: 'AI accelerators concentrate compute.',
    detail: 'Foundry and packaging innovation drive availability of specialized silicon.',
    constraint: 'Constraint: supply and advanced packaging',
    constraintDetail: 'Scarce advanced packaging capacity and supplier concentration set the tempo—reserve capacity early.'
  },
  {
    id: 'infra',
    title: 'Phase 2 — Infrastructure',
    range: '2022–2026',
    summary: 'Data-center/network build accelerates.',
    detail: 'Energy planning, cooling, and reliability become the gating variables.',
    constraint: 'Constraint: energy and reliability',
    constraintDetail: 'Availability of power and resilient networking determines where workloads can scale.'
  },
  {
    id: 'models',
    title: 'Phase 3 — Models',
    range: '2023–2027',
    summary: 'Foundation/domain models commercialize; tooling/ops mature.',
    detail: 'Model choice, fine-tuning, and evals dominate engineering conversations.',
    constraint: 'Constraint: inference cost & latency',
    constraintDetail: 'Inference budgets and latency ceilings shape product UX and margin structure.'
  },
  {
    id: 'apps',
    title: 'Phase 4 — Applications',
    range: '2025–2030',
    summary: 'Moats shift to workflow, distribution, and data; verticals compound.',
    detail: 'Embedding into daily work and owning distribution are the new defensibility levers.',
    constraint: 'Constraint: switching costs & embeddedness',
    constraintDetail: 'Retain advantage by owning the workflow, data feedback, and the surrounding ecosystem.'
  }
];

const annotationCopy: Record<Stage['id'], string> = {
  semis: 'Semis/Infra: partner with reliable providers; design for cost per token/job.',
  infra: 'Semis/Infra: partner with reliable providers; design for cost per token/job.',
  models: 'Models: focus on task performance and latency budgets; evaluate retrievability and evals.',
  apps: 'Apps: own workflow and distribution; build data advantage; embed where work happens.'
};

export default function AITimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeStage, setActiveStage] = useState<Stage['id']>('semis');

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (shouldReduceMotion) return;
    const idx = Math.min(stages.length - 1, Math.floor(value * stages.length + 0.001));
    const next = stages[idx].id;
    setActiveStage((prev) => (prev === next ? prev : next));
  });

  const annotation = useMemo(() => annotationCopy[activeStage], [activeStage]);

  return (
    <TooltipProvider delayDuration={120}>
      <section ref={containerRef} className="relative bg-white py-20">
        <div className="container-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="relative rounded-[32px] border border-brand-500/15 bg-white/85 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur">
              <div className="absolute left-6 right-6 top-1/2 hidden h-px bg-brand-200/40 lg:block" aria-hidden />
              <motion.div
                className="absolute left-6 top-1/2 hidden h-px origin-left rounded-full bg-brand-500/70 lg:block"
                style={{ scaleX: shouldReduceMotion ? 1 : progress }}
              />
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4">
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.05 }}
                    className="relative rounded-[26px] border border-brand-500/15 bg-white/90 p-5 shadow-sm"
                    onMouseEnter={() => setActiveStage(stage.id)}
                    onFocus={() => setActiveStage(stage.id)}
                    tabIndex={0}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-600/70">
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700/80">{stage.range}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900">{stage.title}</h4>
                      <p className="text-sm leading-6 text-slate-600">{stage.summary}</p>
                      <p className="text-sm leading-6 text-slate-500">{stage.detail}</p>
                    </div>
                    <div className="mt-5">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-50/70 px-3 py-1 text-xs font-semibold text-brand-700 transition hover:border-brand-500/40 hover:bg-brand-100/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                            aria-label={`${stage.constraint} — learn what this means`}
                          >
                            {stage.constraint}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-left leading-5">
                          {stage.constraintDetail}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <aside className="relative rounded-[28px] border border-brand-500/15 bg-gradient-to-br from-white via-brand-50/40 to-brand-100/50 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur lg:sticky lg:top-24">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">What this means for builders</p>
                <motion.p
                  key={annotation}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="text-base leading-7 text-slate-700"
                  aria-live="polite"
                >
                  {annotation}
                </motion.p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

