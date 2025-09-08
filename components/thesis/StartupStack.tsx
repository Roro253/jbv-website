'use client';
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';

type Phase = {
  key: 'p1' | 'p2' | 'p3' | 'p4';
  title: string;
  subtitle: string;
  purpose: string;
  doNow: string;
  kpis: { label: string; note?: string }[];
  status: 'Mature' | 'Consolidating' | '40× Window' | 'Next 40×';
  adoption: string; // for the gauge copy
};

const PHASES: Phase[] = [
  {
    key: 'p1',
    title: 'Phase 1: Insight & Founders',
    subtitle: 'Foundation',
    purpose:
      'Earned, non-obvious thesis; founder–market fit; fast shipping culture.',
    doNow:
      '30–100 customer interviews; weekly demo cadence; recruit 2–3 design partners.',
    kpis: [
      { label: 'Time-to-first working demo < 4–6 weeks' },
      { label: 'Design partners signed 3–10' },
      { label: 'Shipping velocity weekly' },
    ],
    status: 'Mature',
    adoption: 'Pre-2.5% adoption',
  },
  {
    key: 'p2',
    title: 'Phase 2: Access & Distribution',
    subtitle: 'Go-to-Market Infrastructure',
    purpose:
      'A repeatable, low-cost way to reach the right users (one primary channel).',
    doNow:
      'Pick 1 channel (community, marketplace, partner/VAR, founder-led outbound, self-serve content) and tune activation.',
    kpis: [
      { label: 'Activation to first value > 20–40%' },
      { label: 'Cost to acquire first 100 users/logos ≈ $0–$1 (early)' },
      { label: 'Pipeline is ICP-true' },
    ],
    status: 'Consolidating',
    adoption: '≈ 2.5% → 8% adoption',
  },
  {
    key: 'p3',
    title: 'Phase 3: Product Engine & Habit',
    subtitle: 'Models',
    purpose:
      'Durable usage via a core loop (data flywheel, workflow lock-in, or network effects).',
    doNow:
      'Instrument the loop; remove setup friction; deliver one hero outcome; add 2–3 retention hooks (saved state, integrations, alerts).',
    kpis: [
      { label: '“Very disappointed” ≥ 40%' },
      { label: 'Cohort retention curve flattening' },
      { label: 'Weekly active design-partner usage; internal expansion' },
    ],
    status: '40× Window',
    adoption: '≈ 8% → 16% adoption',
  },
  {
    key: 'p4',
    title: 'Phase 4: Monetization, Moat & Scale',
    subtitle: 'Applications',
    purpose:
      'Translate usage into healthy unit economics and defensibility.',
    doNow:
      'Price tests (seat/usage/tiered), tighten ICP, measure LTV/CAC & payback; codify moat (data, workflow, network, compliance).',
    kpis: [
      { label: 'Payback < 12 months B2B / positive CM consumer' },
      { label: 'Net dollar retention > 100% (B2B)' },
      { label: 'Expansion without paid spend' },
    ],
    status: 'Next 40×',
    adoption: '16%+ adoption',
  },
];

const PROGRESSION = [
  { title: 'Phase 1: Foundation', adoption: 'Pre-2.5%', tag: 'Mature', note: 'Thesis, team, and demo cadence established. Everything above depends on this.' },
  { title: 'Phase 2: Infrastructure', adoption: '≈ 2.5% → 8%', tag: 'Consolidating', note: 'One acquisition channel and activation path become reliable. Early overlap with Phase 3 begins.' },
  { title: 'Phase 3: Models', adoption: '≈ 8% → 16%', tag: '40× Window', note: 'Core product loop retains; primary investment of time and capital here.' },
  { title: 'Phase 4: Applications', adoption: '16%+', tag: 'Next 40×', note: 'Scale motion, pricing, and moat strengthen as product matures.' },
];

export default function StartupStack() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Phase['key']>('p3'); // spotlight habit by default
  const phase = useMemo(() => PHASES.find(p => p.key === active)!, [active]);

  return (
    <section className="relative container mx-auto px-4 py-16">
      {/* holographic background */}
      <Backplate reduce={!!reduce} />

      <header className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Startup Power Law Emergence:{' '}
          <span className="text-[--jbv-accent]">Company-Building Stack</span>
        </h2>
      </header>

      <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Phase timeline + detail */}
        <div className="lg:col-span-7">
          <Timeline active={active} setActive={setActive} />
          <PhaseDetail phase={phase} />
        </div>

        {/* RIGHT: Gauge + progression + scorecard */}
        <aside className="lg:col-span-5 space-y-6">
          <AdoptionGauge phase={phase} />
          <ProgressionCards />
          <Insight />
          <Scorecard />
        </aside>
      </div>
    </section>
  );
}

/* ---------- Background plate ---------- */
function Backplate({ reduce }: { reduce: boolean }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-[2.5rem]">
      {/* soft grid */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(#00000010 1px, transparent 1px) 0 0 / 22px 22px',
        }}
        animate={reduce ? {} : { backgroundPosition: ['0px 0px', '22px 22px'] }}
        transition={reduce ? {} : { duration: 18, ease: 'linear', repeat: Infinity }}
      />
      {/* aurora ribbons */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-20 w-[65vmax] h-[65vmax] blur-3xl rounded-full"
        style={{ background: 'conic-gradient(from 180deg, var(--jbv-accent), transparent 150deg, var(--jbv-accent-2))', opacity: 0.2 }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? {} : { duration: 100, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -right-16 w-[70vmax] h-[70vmax] blur-3xl rounded-full"
        style={{ background: 'conic-gradient(from 0deg, var(--jbv-accent-2), transparent 160deg, white)', opacity: 0.15 }}
        animate={reduce ? {} : { rotate: -360 }}
        transition={reduce ? {} : { duration: 120, ease: 'linear', repeat: Infinity }}
      />
    </div>
  );
}

/* ---------- Timeline ---------- */
function Timeline({ active, setActive }: { active: Phase['key']; setActive: (k: Phase['key']) => void }) {
  const items = PHASES;
  return (
    <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur p-5">
      <div className="relative pl-6">
        {/* spine */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />
        <ul className="space-y-4">
          {items.map((p) => {
            const selected = p.key === active;
            return (
              <li key={p.key} className="relative">
                <button
                  onClick={() => setActive(p.key)}
                  className={clsx(
                    'w-full text-left rounded-xl px-4 py-3 transition',
                    selected ? 'bg-black/[0.06] dark:bg-white/[0.06]' : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                  )}
                  aria-pressed={selected}
                >
                  <div className="flex items-center gap-3">
                    <span className={clsx('inline-block size-2.5 rounded-full ring-2 ring-offset-2',
                      selected ? 'bg-[--jbv-accent] ring-[--jbv-accent] ring-offset-white/70 dark:ring-offset-black/40'
                               : 'bg-black/30 dark:bg-white/40 ring-black/10 dark:ring-white/10')} />
                    <div>
                      <div className="text-sm uppercase tracking-wide text-black/60 dark:text-white/60">{p.subtitle}</div>
                      <div className="font-medium">{p.title}</div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Phase Detail ---------- */
function PhaseDetail({ phase }: { phase: Phase }) {
  return (
    <motion.div
      key={phase.key}
      className="mt-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur p-6"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">{phase.subtitle} • {phase.adoption}</div>
          <h3 className="text-xl font-semibold">{phase.title}</h3>
        </div>
        <StatusChip status={phase.status} />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h4 className="font-medium">Purpose</h4>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">{phase.purpose}</p>
          <h4 className="mt-4 font-medium">Do now</h4>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">{phase.doNow}</p>
        </div>
        <div>
          <h4 className="font-medium">KPI bar</h4>
          <div className="mt-2 space-y-3">
            {phase.kpis.map((k) => <Kpi key={k.label} label={k.label} />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusChip({ status }: { status: Phase['status'] }) {
  const color =
    status === 'Mature' ? 'bg-emerald-500/80' :
    status === 'Consolidating' ? 'bg-sky-500/80' :
    status === '40× Window' ? 'bg-rose-500/80' :
    'bg-amber-500/80';
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-1 rounded-full text-white text-xs', color)}>
      {status}
    </span>
  );
}

function Kpi({ label }: { label: string }) {
  return (
    <div>
      <div className="text-sm">{label}</div>
      <div className="mt-1 h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--jbv-accent), var(--jbv-accent-2))' }}
          initial={{ width: 0 }}
          whileInView={{ width: ['0%','85%'] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9 }}
        />
      </div>
    </div>
  );
}

/* ---------- Gauge + progression ---------- */
function AdoptionGauge({ phase }: { phase: Phase }) {
  // map phase to a rough completion 0..1 (p1..p4)
  const pct = { p1: 0.25, p2: 0.5, p3: 0.75, p4: 1 }[phase.key] ?? 0.5;
  const C = 2 * Math.PI * 56;
  const offset = C * (1 - pct);
  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur p-5">
      <div className="flex items-center gap-4">
        <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden>
          <circle cx="70" cy="70" r="56" stroke="rgba(0,0,0,0.08)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="70" cy="70" r="56" stroke="url(#gaugeGrad)" strokeWidth="10" fill="none"
            strokeLinecap="round" transform="rotate(-90 70 70)"
            strokeDasharray={C} strokeDashoffset={C}
            animate={{ strokeDashoffset: offset }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--jbv-accent)" />
              <stop offset="100%" stopColor="var(--jbv-accent-2)" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">Adoption band</div>
          <div className="text-lg font-medium">{phase.adoption}</div>
          <div className="mt-1 text-sm text-black/70 dark:text-white/70">Progress through the company-building stack.</div>
        </div>
      </div>
    </div>
  );
}

function ProgressionCards() {
  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur p-5">
      <h3 className="text-base font-semibold">Stack Building Progression</h3>
      <div className="mt-3 space-y-3">
        {PROGRESSION.map((s) => (
          <motion.div
            key={s.title}
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4"
            initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{s.title}</div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">{s.tag}</span>
            </div>
            <div className="text-xs text-black/60 dark:text-white/60">{s.adoption}</div>
            <div className="mt-1 text-sm">{s.note}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Insight() {
  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur p-5">
      <h3 className="text-base font-semibold">Stack Building Insight</h3>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">
        Power concentrates from the bottom up. A strong foundation (insight, team, and access) creates the conditions
        for a compounding product loop; only then do economics and moats meaningfully appear. When in doubt, drop a layer and harden it.
      </p>
    </div>
  );
}

/* ---------- Scorecard ---------- */
function Scorecard() {
  const [thesis, setThesis] = useState(2);
  const [dist, setDist] = useState(2);
  const [loop, setLoop] = useState(2);
  const [econ, setEcon] = useState(2);
  const total = thesis + dist + loop + econ; // 0..12
  const verdict =
    total >= 10 ? { txt: 'raise / scale', cls: 'bg-emerald-500/90' } :
    total >= 7  ? { txt: 'iterate with focus', cls: 'bg-amber-500/90' } :
                  { txt: 'revisit thesis / ICP', cls: 'bg-rose-500/90' };
  const pct = total / 12;

  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur p-5">
      <h3 className="text-base font-semibold">Quick Scorecard (monthly)</h3>
      <div className="mt-3 grid grid-cols-1 gap-3">
        <Slider label="Thesis & speed" value={thesis} setValue={setThesis} hint="clear why now/why us?, weekly ship" />
        <Slider label="Distribution" value={dist} setValue={setDist} hint="one channel reliably activates ICPs" />
        <Slider label="Product loop" value={loop} setValue={setLoop} hint="retention flattening; ≥40% very disappointed" />
        <Slider label="Economics" value={econ} setValue={setEcon} hint="positive payback signals at small scale" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">Total</div>
          <div className="text-3xl font-semibold tabular-nums">{total} / 12</div>
        </div>
        <div className="relative w-40 h-20">
          <svg viewBox="0 0 100 50" className="absolute inset-0">
            <path d="M5 45 A45 45 0 0 1 95 45" stroke="rgba(0,0,0,0.1)" strokeWidth="8" fill="none"/>
            <motion.path
              d="M5 45 A45 45 0 0 1 95 45"
              stroke="url(#grad)"
              strokeWidth="8" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: pct }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            />
            <defs>
              <linearGradient id="grad" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--jbv-accent)" />
                <stop offset="100%" stopColor="var(--jbv-accent-2)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className={clsx('px-3 py-1 rounded-full text-white text-sm', verdict.cls)}>{verdict.txt}</span>
      </div>
    </div>
  );
}

function Slider({ label, value, setValue, hint }: { label: string; value: number; setValue: (n: number) => void; hint: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-medium">{label} <span className="ml-2 text-xs text-black/60 dark:text-white/60">(0–3)</span></div>
        <div className="text-sm tabular-nums">{value}</div>
      </div>
      <input
        type="range" min={0} max={3} step={1} value={value}
        onChange={(e) => setValue(parseInt(e.currentTarget.value))}
        className="w-full accent-[--jbv-accent]"
      />
      <div className="mt-1 text-xs text-black/60 dark:text-white/60">{hint}</div>
    </div>
  );
}

