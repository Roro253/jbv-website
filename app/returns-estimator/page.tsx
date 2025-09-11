'use client';
import { useState } from 'react';
import PublicVsPrivate from '@/components/returns/PublicVsPrivate';
import VCDealMath from '@/components/returns/VCDealMath';
import PowerLawExplorer from '@/components/returns/PowerLawExplorer';
import ScenarioControls, { Scenario } from '@/components/returns/ScenarioControls';
import DisclaimerGate from '@/components/returns/DisclaimerGate';

export default function ReturnsEstimatorPage() {
  const [tab, setTab] = useState<'pubpriv'|'deal'|'power'>('pubpriv');
  const [scenario, setScenario] = useState<Scenario>({ capital: 100000, years: 10, lens: 'AI' });
  const [accepted, setAccepted] = useState(false);
  return (
    <main className="container-6xl py-10">
      <h1 className="text-3xl font-semibold mb-2">Returns Estimator</h1>
      <p className="text-sm mb-4">Hypothetical educational calculators for exploring return scenarios.</p>
      <DisclaimerGate accepted={accepted} onChange={setAccepted} />
      <ScenarioControls value={scenario} onChange={setScenario} />
      <div className="flex gap-4 mb-6">
        <button onClick={()=>setTab('pubpriv')} className={`px-3 py-1 rounded ${tab==='pubpriv'?'bg-primary text-white':'border'}`}>Public vs. Private</button>
        <button onClick={()=>setTab('deal')} className={`px-3 py-1 rounded ${tab==='deal'?'bg-primary text-white':'border'}`}>VC Math (Deal)</button>
        <button onClick={()=>setTab('power')} className={`px-3 py-1 rounded ${tab==='power'?'bg-primary text-white':'border'}`}>Power-Law Explorer</button>
      </div>
      {tab==='pubpriv' && <PublicVsPrivate scenario={scenario} accepted={accepted} />}
      {tab==='deal' && <VCDealMath scenario={scenario} accepted={accepted} />}
      {tab==='power' && <PowerLawExplorer accepted={accepted} />}
      <footer className="mt-10 text-xs text-muted-foreground">
        This tool is for educational and illustrative purposes only and not investment advice.
      </footer>
    </main>
  );
}
