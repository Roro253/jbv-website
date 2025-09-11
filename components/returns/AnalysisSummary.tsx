'use client';
import { useMemo } from 'react';

type Props = {
  growth: number;
  ntm: number;
};

export default function AnalysisSummary({ growth, ntm }: Props) {
  const rangeLow = 10.0;
  const rangeHigh = 16.5;
  const bullets = useMemo(() => [
    'Growth rate is a strong driver of revenue multiples (~3.4× per +10% growth; illustrative).',
    `Current inputs support a ${rangeLow.toFixed(1)}×–${rangeHigh.toFixed(1)}× range given growth ${growth}% and scale $${ntm.toLocaleString()} NTM.`,
    'Limited public comps with >30% growth often support premium multiples (illustrative).',
    'Cash flow neutrality earlier tends to compress discount; execution risk widens range.'
  ], [growth, ntm]);

  return (
    <div className="space-y-2 text-sm">
      <ul className="list-disc pl-4">
        {bullets.map((b,i)=>(<li key={i}>{b}</li>))}
      </ul>
      <p className="text-xs text-muted-foreground">Heuristics are illustrative only; not a pricing model.</p>
    </div>
  );
}
