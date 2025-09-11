'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Overview from '@/components/returns/Overview';
import AnalysisSummary from '@/components/returns/AnalysisSummary';
const DriversChart = dynamic(() => import('@/components/returns/DriversChart'), { ssr: false });
const ReturnCalculator = dynamic(() => import('@/components/returns/ReturnCalculator'), { ssr: false });
const PowerLawMini = dynamic(() => import('@/components/returns/PowerLawMini'), { ssr: false });
import { Scenario } from "@/components/returns/types";

const lensPresets = {
  AI: { growthDefault:45, driversR2:[42,31,21], xminExit:50e6, alpha:1.6, hitRatePct:12 },
  SaaS: { growthDefault:35, driversR2:[38,34,20], xminExit:30e6, alpha:1.7, hitRatePct:10 },
  Tech: { growthDefault:25, driversR2:[32,30,18], xminExit:20e6, alpha:1.8, hitRatePct:8 }
} as const;

export default function ReturnsEstimatorPage(){
  const [accepted, setAccepted] = useState(false);
  const [lens, setLens] = useState<keyof typeof lensPresets>('AI');
  const [drivers, setDrivers] = useState<number[]>([...lensPresets.AI.driversR2]);
  const [scenario, setScenario] = useState<Scenario>({
    price:5.17,
    fdShares:270_517_628,
    lastRound:'July 2024',
    ntmRevenue:165_000_000,
    growthRate:lensPresets.AI.growthDefault,
    investment:100_000,
    horizon:3,
    lowMultiple:10.0,
    highMultiple:16.5,
  });

  useEffect(()=>{
    const preset=lensPresets[lens];
    setScenario(s=>({...s,growthRate:preset.growthDefault}));
    setDrivers([...preset.driversR2]);
  },[lens]);

  const blurCls = accepted?'' : 'pointer-events-none blur-sm select-none';

  return (
    <div className="container-6xl py-6 space-y-6">
      {!accepted && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-background border rounded-2xl p-6 max-w-lg mx-4 space-y-4 text-sm">
            <h2 className="text-lg font-semibold">Educational Only</h2>
            <p>
              This tool is for educational and illustrative purposes only. It does not represent actual or expected results, and is not investment advice, a recommendation, or an offer to sell or solicitation to buy any security or interest in any fund. Hypothetical simulations have inherent limitations and do not reflect fees, expenses, timing of cash flows, or risk. Past performance is not indicative of future results.
            </p>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} />
              I understand and agree.
            </label>
          </div>
        </div>
      )}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Returns Estimator</h1>
        <p className="text-muted-foreground">Educational, illustrative models for public vs. private tech — AI / SaaS / General.</p>
        <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Educational Only</span>
      </header>

      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b py-2 flex gap-4 text-sm">
        <select value={lens} onChange={e=>setLens(e.target.value as any)} className="border rounded-md bg-background p-1">
          <option value="AI">AI</option>
          <option value="SaaS">SaaS</option>
          <option value="Tech">Tech (General)</option>
        </select>
        <div>Capital Commitment: ${scenario.investment.toLocaleString()}</div>
        <div>Horizon: {scenario.horizon} yrs</div>
      </div>

      <div className="space-y-6">
        <div className={blurCls+" space-y-6"}>
          <div className="border rounded-2xl p-6 shadow-sm bg-background">
            <h2 className="text-xl font-semibold mb-4">Investment Overview</h2>
            <Overview scenario={scenario} setScenario={setScenario} />
          </div>
          <div className="border rounded-2xl p-6 shadow-sm bg-background">
            <h2 className="text-xl font-semibold mb-4">Analysis – Market Multiple Summary</h2>
            <AnalysisSummary growth={scenario.growthRate} ntm={scenario.ntmRevenue} />
          </div>
          <div className="border rounded-2xl p-6 shadow-sm bg-background">
            <h2 className="text-xl font-semibold mb-4">What Drives Software Valuation</h2>
            <DriversChart drivers={drivers} setDrivers={setDrivers} />
          </div>
          <div className="border rounded-2xl p-6 shadow-sm bg-background">
            <h2 className="text-xl font-semibold mb-4">Investment Return Calculator</h2>
            <ReturnCalculator scenario={scenario} setScenario={setScenario} />
          </div>
          <div className="border rounded-2xl p-6 shadow-sm bg-background">
            <PowerLawMini initial={{deals:10, hitRate:lensPresets[lens].hitRatePct, alpha:lensPresets[lens].alpha, xmin:lensPresets[lens].xminExit, trials:1000}} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">For illustration only; models do not store data.</p>
      </div>
    </div>
  );
}
