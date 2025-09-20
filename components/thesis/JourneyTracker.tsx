'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from 'recharts';

type PhaseId = 'p1' | 'p2' | 'p3' | 'p4';
type FocusKey = 'insight' | 'distribution' | 'product' | 'economics';

const phaseOptions: { id: PhaseId; label: string; description: string }[] = [
  { id: 'p1', label: 'Phase 1', description: 'Insight & Founders' },
  { id: 'p2', label: 'Phase 2', description: 'Access & Distribution' },
  { id: 'p3', label: 'Phase 3', description: 'Product Engine & Habit' },
  { id: 'p4', label: 'Phase 4', description: 'Monetization, Moat & Scale' }
];

const focusAreas: {
  key: FocusKey;
  label: string;
  tone: string;
  copy: Record<PhaseId, string>;
}[] = [
  {
    key: 'insight',
    label: 'Insight',
    tone: 'from-brand-200/60 to-brand-400/30',
    copy: {
      p1: 'Phase 1: Insight is validated when founders can narrate the workflow cold.',
      p2: 'Phase 2: Keep interviewing new segments to refine which channel resonates.',
      p3: 'Phase 3: Insight fuels the roadmap—ship weekly based on loop telemetry.',
      p4: 'Phase 4: Sharpen the narrative so ROI proof underwrites pricing power.'
    }
  },
  {
    key: 'distribution',
    label: 'Distribution',
    tone: 'from-brand-200/60 to-brand-500/40',
    copy: {
      p1: 'Phase 1: Lightweight experiments point toward a repeatable path to users.',
      p2: 'Phase 2: Double down on the channel that delivers consistent activation.',
      p3: 'Phase 3: Distribution loops should reinforce retention, not just acquisition.',
      p4: 'Phase 4: Scale the winning motion with CAC payback guardrails.'
    }
  },
  {
    key: 'product',
    label: 'Product Loop',
    tone: 'from-brand-300/60 to-brand-600/40',
    copy: {
      p1: 'Phase 1: Ensure the hero outcome shows up in early sessions.',
      p2: 'Phase 2: Instrument core actions so habit signals are visible.',
      p3: 'Early traction is habit-forming when cohort curves flatten.',
      p4: 'Phase 4: Extend the loop into adjacent workflows without breaking trust.'
    }
  },
  {
    key: 'economics',
    label: 'Economics',
    tone: 'from-brand-200/60 to-brand-700/40',
    copy: {
      p1: 'Phase 1: Keep burn low while testing willingness to pay conversations.',
      p2: 'Phase 2: Track CAC payback trend even before monetization is mature.',
      p3: 'Phase 3: Usage data should reveal value metrics that anchor pricing.',
      p4: 'Phase 4: Durable economics show up as churn drops and NRR expands.'
    }
  }
];

const intensity: Record<PhaseId, Record<FocusKey, number>> = {
  p1: { insight: 80, distribution: 35, product: 40, economics: 30 },
  p2: { insight: 65, distribution: 75, product: 55, economics: 45 },
  p3: { insight: 55, distribution: 60, product: 85, economics: 60 },
  p4: { insight: 45, distribution: 65, product: 70, economics: 90 }
};

export default function JourneyTracker() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<PhaseId>('p1');
  const [selectedFocus, setSelectedFocus] = useState<FocusKey[]>(['insight', 'distribution', 'product', 'economics']);

  const focusSet = useMemo(() => new Set(selectedFocus), [selectedFocus]);

  const chartData = useMemo(
    () =>
      focusAreas.map((area) => ({
        subject: area.label,
        value: focusSet.has(area.key) ? intensity[phase][area.key] : 12,
        baseline: 12
      })),
    [focusSet, phase]
  );

  const toggleFocus = (key: FocusKey) => {
    setSelectedFocus((prev) => {
      if (prev.includes(key)) {
        if (prev.length === 1) return prev; // keep at least one focus active
        return prev.filter((item) => item !== key);
      }
      return [...prev, key];
    });
  };

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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Journey Tracker</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Where are you in the stack?</h3>
              </div>
              <div className="space-y-3" role="radiogroup" aria-label="Select your current phase">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Phase</p>
                <div className="flex flex-wrap gap-2">
                  {phaseOptions.map((option) => {
                    const isActive = option.id === phase;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => setPhase(option.id)}
                        className={clsx(
                          'flex flex-col rounded-2xl border px-4 py-3 text-left text-sm shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
                          isActive
                            ? 'border-brand-500/50 bg-brand-50 text-brand-700'
                            : 'border-brand-500/15 bg-white text-slate-600 hover:border-brand-500/30 hover:bg-brand-50/40'
                        )}
                      >
                        <span className="font-semibold">{option.label}</span>
                        <span className="text-xs text-slate-500">{option.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-3" role="group" aria-label="Highlight focus areas">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Focus</p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => {
                    const isActive = focusSet.has(area.key);
                    return (
                      <button
                        key={area.key}
                        type="button"
                        onClick={() => toggleFocus(area.key)}
                        aria-pressed={isActive}
                        className={clsx(
                          'rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
                          isActive
                            ? 'border-brand-500/50 bg-brand-50 text-brand-700 shadow-sm'
                            : 'border-brand-500/20 bg-white text-slate-600 hover:border-brand-500/40 hover:bg-brand-50/40'
                        )}
                      >
                        {area.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="relative h-[260px] w-full rounded-3xl border border-brand-500/15 bg-gradient-to-br from-white via-brand-50/40 to-brand-100/40 p-4">
                <ResponsiveContainer>
                  <RadarChart data={chartData} outerRadius="80%">
                    <PolarGrid stroke="rgba(41, 87, 163, 0.12)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#0f172a', fontSize: 12 }} tickLine={false} />
                    <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                    <Radar
                      dataKey="baseline"
                      stroke="rgba(88,138,230,0.2)"
                      fill="rgba(88,138,230,0.08)"
                      isAnimationActive={!shouldReduceMotion}
                    />
                    <Radar
                      dataKey="value"
                      stroke="rgba(47,114,255,0.85)"
                      fill="rgba(47,114,255,0.35)"
                      fillOpacity={0.4}
                      isAnimationActive={!shouldReduceMotion}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {focusAreas.map((area) => {
                  const isActive = focusSet.has(area.key);
                  return (
                    <div
                      key={area.key}
                      className={clsx(
                        'rounded-2xl border border-brand-500/15 bg-white/80 p-4 shadow-sm backdrop-blur transition',
                        isActive ? 'shadow-brand-900/5' : 'opacity-70'
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-800">{area.label}</span>
                        <span className={clsx('h-2 w-10 rounded-full bg-gradient-to-r', area.tone)} aria-hidden />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{area.copy[phase]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

