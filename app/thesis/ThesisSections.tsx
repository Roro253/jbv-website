'use client';

import { useState, useRef, MutableRefObject } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { sources } from './sources';

export type Phase = {
  id: number;
  title: string;
  why: string;
  do: string;
  benchmarks: { label: string; note?: string }[];
  adoption: string;
};

export const phases: Phase[] = [
  {
    id: 0,
    title: 'Phase 1 — Insight & Founders (Foundation)',
    why: 'Teams with a non-obvious insight and fast ship cadence compound advantage in every later layer.',
    do: '30–100 customer interviews; weekly demo cadence; recruit 2–3 design partners.',
    benchmarks: [
      { label: 'time-to-first working demo ≤ 4–6 weeks' },
      { label: '3–10 design partners' },
    ],
    adoption: 'pre-2.5% adoption',
  },
  {
    id: 1,
    title: 'Phase 2 — Access & Distribution (Go-to-Market Infrastructure)',
    why: 'One repeatable low-cost channel beats three mediocre ones.',
    do: 'Pick one primary channel; instrument activation; weekly funnel reviews.',
    benchmarks: [
      { label: 'CAC payback trending to category norms; improving MoM' },
    ],
    adoption: '≈ 2.5% → 8% adoption',
  },
  {
    id: 2,
    title: 'Phase 3 — Product Engine & Habit (Models)',
    why: 'Durable usage via a core loop (flywheel/lock-in/network effects) is the engine of power laws.',
    do: 'Reduce setup friction; deliver one hero outcome; add 2–3 retention hooks (saved state, integrations, alerts).',
    benchmarks: [
      { label: 'Sean Ellis PMF signal ≥ 40% “very disappointed"' },
      { label: 'cohort retention curve flattening' },
    ],
    adoption: '≈ 8% → 16% adoption',
  },
  {
    id: 3,
    title: 'Phase 4 — Monetization, Moat & Scale (Applications)',
    why: 'With habit formed, pricing power and defensibility appear; then you scale responsibly.',
    do: 'Price testing; payback discipline; moat building (data advantage, integrations, ecosystem).',
    benchmarks: [
      { label: 'positive payback at small scale' },
      { label: 'churn ↓; NRR ↑; margins expand' },
    ],
    adoption: '16%+ adoption',
  },
];

export function PhaseList({ active, setActive, refs }: { active: number; setActive: (n: number) => void; refs: MutableRefObject<HTMLDivElement | null>[]; }) {
  const reduce = useReducedMotion();
  return (
    <div role="radiogroup" aria-label="Phase list" className="flex flex-wrap gap-2">
      {phases.map((p, i) => (
        <motion.button
          key={p.id}
          role="radio"
          aria-checked={active === i}
          aria-label={`Select ${p.title}`}
          onClick={() => {
            setActive(i);
            refs[i]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={clsx(
            'rounded-full px-4 py-2 text-sm border transition-colors',
            active === i
              ? 'bg-[--jbv-accent] text-white border-[--jbv-accent]'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          )}
          initial={false}
          animate={active === i && !reduce ? { scale: [1.02, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Phase {i + 1}
        </motion.button>
      ))}
    </div>
  );
}

export const PhaseCard = motion<{ phase: Phase; highlighted: boolean }>(
  ({ phase, highlighted }, ref) => {
    const reduce = useReducedMotion();
    return (
      <motion.article
        ref={ref as any}
        id={`phase-${phase.id}`}
        className={clsx(
          'rounded-2xl shadow-lg p-6 md:p-8 bg-white',
          highlighted && 'ring-2 ring-[--jbv-accent]'
        )}
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold">{phase.title}</h3>
        <div className="mt-4 space-y-4 text-sm text-slate-700">
          <div>
            <h4 className="font-medium">Why it matters:</h4>
            <p className="mt-1">{phase.why}</p>
          </div>
          <div>
            <h4 className="font-medium">Do now:</h4>
            <p className="mt-1">{phase.do}</p>
          </div>
          <div>
            <h4 className="font-medium">Benchmarks:</h4>
            <div className="mt-2 space-y-2">
              {phase.benchmarks.map((b) => (
                <KPIBar key={b.label} label={b.label} note={b.note} />
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }
);

export function KPIBar({ label, note }: { label: string; note?: string }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex items-center gap-1 text-sm">
        <span>{label}</span>
        {note && (
          <span className="cursor-help text-slate-400" title={note} aria-label="Benchmark note">
            &#9432;
          </span>
        )}
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[--jbv-accent] to-[--jbv-accent-2]"
          initial={{ width: 0 }}
          whileInView={reduce ? { width: '100%' } : { width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.8 }}
        />
      </div>
    </div>
  );
}

export function AdoptionDonut({ phase }: { phase: number }) {
  const reduce = useReducedMotion();
  const progress = (phase + 1) / phases.length;
  return (
    <div className="sticky top-6 ml-auto w-40" aria-label="Adoption band">
      <svg viewBox="0 0 120 120" className="mx-auto" width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#e2e8f0"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          stroke="url(#donut)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 60 60)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: reduce ? progress : progress }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2 }}
        />
        <defs>
          <linearGradient id="donut" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--jbv-accent)" />
            <stop offset="100%" stopColor="var(--jbv-accent-2)" />
          </linearGradient>
        </defs>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-600">
        {phases[phase].adoption} · Progress through the company-building stack
      </p>
    </div>
  );
}

export function ProgressionSection() {
  const reduce = useReducedMotion();
  const items = [
    {
      title: 'Phase 1: Semiconductors (2020–2025)',
      body: 'NVIDIA establishes AI accelerator dominance; capex wave begins.',
    },
    {
      title: 'Phase 2: Infrastructure (2022–2026)',
      body: 'Data-center/network build accelerates; energy becomes a constraint.',
    },
    {
      title: 'Phase 3: Models (2023–2027)',
      body: 'Foundation/domain models commercialize; tooling/ops mature.',
    },
    {
      title: 'Phase 4: Applications (2025–2030)',
      body: 'Moats shift to workflow, distribution, and data; next 40× opportunities in verticals.',
    },
  ];
  return (
    <div className="space-y-6">
      <div className="rounded-2xl shadow-lg p-6 md:p-8 bg-white">
        <h3 className="text-lg font-semibold">Stack Building Insight (AI):</h3>
        <p className="mt-2 text-sm text-slate-700">
          Power concentrates bottom-up. Semiconductors → infrastructure → models → applications. The binding constraint is increasingly physical (compute, power, supply chain). Winners scale infra reliably and translate it into compounding product loops.
        </p>
      </div>
      <div className="rounded-2xl shadow-lg p-6 md:p-8 bg-white">
        <h3 className="text-lg font-semibold">AI Power Law Emergence: Tech Stack Evolution</h3>
        <div className="mt-4 space-y-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-slate-700">{it.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Scorecard() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const total = a + b + c + d;
  const label = total < 9 ? 'iterate with focus' : 'looking good';
  return (
    <div className="rounded-2xl shadow-lg p-6 md:p-8 bg-white space-y-4">
      <h3 className="text-lg font-semibold">Quick Scorecard (monthly, 0–3)</h3>
      <Slider label="Thesis & speed" value={a} setValue={setA} />
      <Slider label="Distribution" value={b} setValue={setB} />
      <Slider label="Product loop" value={c} setValue={setC} />
      <Slider label="Economics" value={d} setValue={setD} />
      <div className="flex items-center justify-between pt-2">
        <span className="text-base font-medium">Total: {total} / 12</span>
        <button className="px-3 py-1 rounded-md bg-[--jbv-accent] text-white text-sm" aria-label="scorecard action">{label}</button>
      </div>
    </div>
  );
}

function Slider({ label, value, setValue }: { label: string; value: number; setValue: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label className="font-medium" htmlFor={label}>{label}</label>
        <span className="tabular-nums">{value}</span>
      </div>
      <input
        id={label}
        type="range"
        min={0}
        max={3}
        step={1}
        value={value}
        onChange={(e) => setValue(parseInt(e.currentTarget.value))}
        className="w-full accent-[--jbv-accent]"
        aria-label={label}
      />
    </div>
  );
}

export function SourcesDisclosure() {
  return (
    <details className="mt-16 text-xs text-muted-foreground">
      <summary className="cursor-pointer">Sources & further reading</summary>
      <ul className="mt-2 space-y-1 list-disc pl-4">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {s.title}
            </a>{' '}
            — {s.publisher} ({s.yearOrDate})
          </li>
        ))}
      </ul>
    </details>
  );
}

