'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

type Phase = {
  key: string;
  title: string;
  years: string;
  status: string;        // e.g., "Mature", "Consolidating", "40x Window", "Next 40x"
  value: number;         // numeric for bar sizing
  label: string;         // "$4.2T"
  companies: string[];
};

const PHASES: Phase[] = [
  {
    key: 'semis',
    title: 'Phase 1: Semiconductors',
    years: '2020–2025',
    status: 'Mature',
    value: 4.2e12,
    label: '$4.2T',
    companies: ['NVIDIA'],
  },
  {
    key: 'infra',
    title: 'Phase 2: Infrastructure',
    years: '2022–2026',
    status: 'Consolidating',
    value: 73e9,
    label: '$73B',
    companies: ['Scale AI', 'Databricks', 'CoreWeave'],
  },
  {
    key: 'models',
    title: 'Phase 3: Models',
    years: '2023–2027',
    status: '40x Window',
    value: 460e9,
    label: '$460B',
    companies: ['OpenAI', 'Anthropic', 'xAI'],
  },
  {
    key: 'apps',
    title: 'Phase 4: Applications',
    years: '2025–2030',
    status: 'Next 40x',
    value: 6.5e9,
    label: '$6.5B',
    companies: ['Harvey AI', 'Cursor', 'Character.AI'],
  },
];

const PROGRESSION = [
  { title: 'Phase 1: Foundation', years: '2020–2025', adoption: 'Pre → 2.5%', tag: 'Mature', note: 'NVIDIA dominance established. Power law complete.' },
  { title: 'Phase 2: Infrastructure', years: '2022–2026', adoption: '2.5% → 8%', tag: 'Consolidating', note: 'Power law forming. Early 40x window overlap.' },
  { title: 'Phase 3: Models', years: '2023–2027', adoption: '2.5% → 16%', tag: '40x Window', note: 'Current peak opportunity. Primary investment focus.' },
  { title: 'Phase 4: Applications', years: '2025–2030', adoption: '8% → 16%', tag: 'Next 40x', note: 'Future opportunity as models mature.' },
];

function useDims<T extends HTMLElement>(ref: React.RefObject<T> | React.MutableRefObject<T | null>) {
  const [dims, setDims] = useState({ w: 800, h: 600 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        setDims({ w: Math.max(1, Math.floor(width)), h: Math.max(1, Math.floor(height)) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return dims;
}

export default function StackEvolution() {
  const prefersReduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { w: width, h: height } = useDims(wrapRef);
  // Ensure tall enough box on small screens via min-h class below; step derived from actual height
  const step = Math.min(Math.max(120, Math.floor(height * 0.25)), 180);
  const [hovered, setHovered] = useState<number | null>(null);

  const max = useMemo(() => Math.max(...PHASES.map((p) => p.value)), []);
  const [active, setActive] = useState<string>('models'); // default spotlight

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
        AI Power Law Emergence: <span className="text-[--jbv-accent]">Tech Stack Evolution</span>
      </h2>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Vertical drift stack (replaces orbital carousel) */}
        <div className="lg:col-span-7">
          <div
            ref={wrapRef}
            className="relative min-h-[420px] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur"
          >
            {/* background aura + grid */}
            <div
              aria-hidden
              className="absolute inset-0 [background:radial-gradient(closest-side,theme(colors.white/20),transparent_70%)] dark:[background:radial-gradient(closest-side,theme(colors.white/6),transparent_70%)]"
            />
            <div aria-hidden className="absolute inset-0 [background:radial-gradient(#0001_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* center nucleus */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-28 rounded-full"
              style={{ background: 'radial-gradient(circle at 30% 30%, var(--jbv-accent), transparent 60%)' }}
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            />

            {/* slow vertical drift (container translates on Y) */}
            <motion.div
              className="absolute inset-0 transform-gpu will-change-transform"
              animate={
                prefersReduced
                  ? {}
                  : hovered !== null
                    ? { y: 0 }
                    : { y: [-8, 8] }
              }
              transition={
                prefersReduced
                  ? {}
                  : hovered !== null
                    ? { duration: 0.4, ease: 'easeInOut' }
                    : { duration: 16, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
              }
            >
              {PHASES.map((p, i) => {
                const x = 0; // centered horizontally
                const y = (i - (PHASES.length - 1) / 2) * step;
                const selected = active === p.key;

                return (
                  <motion.button
                    key={p.key}
                    className={clsx(
                      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                      'rounded-2xl border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md',
                      'bg-white/80 dark:bg-black/50 backdrop-blur',
                      'px-4 py-3 text-left w-[min(72%,280px)] min-h-[84px] transform-gpu will-change-transform'
                    )}
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, zIndex: hovered === i ? 30 : (selected ? 20 : 10) }}
                    onClick={() => setActive(p.key)}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    whileTap={{ scale: 0.98 }}
                    aria-pressed={selected}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">{p.years}</div>
                        <div className="font-medium">{p.title}</div>
                      </div>
                      <span
                        className={clsx(
                          'text-xs px-2 py-0.5 rounded-full',
                          selected ? 'bg-[--jbv-accent] text-white' : 'bg-black/10 dark:bg-white/10'
                        )}
                      >
                        {p.status}
                      </span>
                    </div>
                    <ValueBar value={p.value} max={max} label={p.label} active={selected} />
                    <div className="mt-2 hidden md:flex flex-wrap gap-1.5">
                      {p.companies.map((c) => (
                        <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                          {c}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* focus ring aligned to selected item (tracks vertical grid) */}
            <FocusHaloVertical activeKey={active} step={step} />
          </div>

          {/* Insight + Legend */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/70 dark:bg-black/40 backdrop-blur">
              <div className="font-medium">Stack Building Insight</div>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                Power-law formation climbs the stack chronologically. Each layer compounds on the foundation below —
                opportunity rotates upward from Semiconductors → Infrastructure → Models → Applications.
              </p>
            </div>
            <Legend />
          </div>
        </div>

        {/* RIGHT: Progression panel */}
        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur p-5">
            <h3 className="text-xl font-semibold">Stack Building Progression</h3>
            <div className="mt-4 space-y-3">
              {PROGRESSION.map((s) => (
                <div key={s.title} className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium">{s.title}</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">{s.tag}</span>
                  </div>
                  <div className="text-xs text-black/60 dark:text-white/60">{s.years} • {s.adoption} Adoption</div>
                  <div className="mt-1 text-sm">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ValueBar({ value, max, label, active }: { value: number; max: number; label: string; active: boolean }) {
  const pct = Math.max(0.06, value / max); // ensure visible
  return (
    <div className="mt-3">
      <div className="h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--jbv-accent), var(--jbv-accent-2))' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(1, pct) * 100}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <div className={clsx('mt-1 text-[11px]', active ? 'text-[--jbv-accent]' : 'text-black/60 dark:text-white/60')}>
        {label}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="lg:col-span-5 rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/70 dark:bg-black/40 backdrop-blur">
      <div className="text-sm">Legend</div>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2">
          <i className="inline-block h-2.5 w-6 rounded-full" style={{ background: 'linear-gradient(90deg, var(--jbv-accent), var(--jbv-accent-2))' }} />
          <span className="text-xs text-black/60 dark:text-white/60">Relative value scale</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="inline-block size-3 rounded-full bg-[--jbv-accent]" />
          <span className="text-xs text-black/60 dark:text-white/60">Selected phase highlight</span>
        </span>
      </div>
    </div>
  );
}

function FocusHaloVertical({ activeKey, step }: { activeKey: string; step: number }) {
  const idx = PHASES.findIndex((p) => p.key === activeKey);
  if (idx < 0) return null;
  const x = 0;
  const y = (idx - (PHASES.length - 1) / 2) * step;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="size-6 rounded-full ring-4 ring-[--jbv-accent] ring-offset-2 ring-offset-white/70 dark:ring-offset-black/40" />
    </motion.div>
  );
}
