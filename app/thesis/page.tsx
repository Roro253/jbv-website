'use client';

import { useState, useRef } from 'react';
import { PhaseList, PhaseCard, AdoptionDonut, ProgressionSection, Scorecard, SourcesDisclosure, phases } from './ThesisSections';

export default function ThesisPage() {
  const [active, setActive] = useState(2);
  const refs = phases.map(() => useRef<HTMLDivElement | null>(null));

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
        Startup Power Law Emergence: Company-Building Stack
      </h1>
      <div className="mt-6 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7 space-y-8">
          <PhaseList active={active} setActive={setActive} refs={refs} />
          {phases.map((p, i) => (
            <PhaseCard key={p.id} phase={p} highlighted={active === i} ref={refs[i]} />
          ))}
        </div>
        <aside className="md:col-span-5 space-y-8">
          <AdoptionDonut phase={active} />
          <ProgressionSection />
          <Scorecard />
        </aside>
      </div>
      <SourcesDisclosure />
    </main>
  );
}
