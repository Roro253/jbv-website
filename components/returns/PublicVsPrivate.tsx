'use client';
import { useState, useEffect } from 'react';
import { compoundFV, simulatePrivatePortfolio } from '@/lib/returns/math';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Scenario } from './ScenarioControls';

interface Props {
  scenario: Scenario;
  accepted: boolean;
}

export default function PublicVsPrivate({ scenario, accepted }: Props) {
  const [pubInputs, setPubInputs] = useState({ expected: 8, dividend: 1.5 });
  const [privateInputs, setPrivateInputs] = useState({
    deals: 20,
    check: scenario.capital / 20,
    pre: 5000000,
    dilA: 0.2,
    dilB: 0.2,
    dilC: 0.2,
    proRata: 0,
    hitRate: 0.12,
    alpha: 1.6,
    xmin: 50000000,
  });

  useEffect(() => {
    if (scenario.lens === 'AI') setPrivateInputs((p) => ({ ...p, hitRate: 0.12, alpha: 1.6, xmin: 50000000 }));
    if (scenario.lens === 'SaaS') setPrivateInputs((p) => ({ ...p, hitRate: 0.10, alpha: 1.7, xmin: 30000000 }));
    if (scenario.lens === 'Tech') setPrivateInputs((p) => ({ ...p, hitRate: 0.08, alpha: 1.8, xmin: 20000000 }));
  }, [scenario.lens]);

  const r = (pubInputs.expected + pubInputs.dividend) / 100;
  const publicData = Array.from({ length: scenario.years + 1 }, (_, i) => ({
    year: i,
    value: compoundFV(scenario.capital, r, i),
  }));

  const privStats = simulatePrivatePortfolio({
    capital: scenario.capital,
    years: scenario.years,
    deals: privateInputs.deals,
    checkPerDeal: privateInputs.check,
    preMoney: privateInputs.pre,
    dilA: privateInputs.dilA,
    dilB: privateInputs.dilB,
    dilC: privateInputs.dilC,
    proRata: privateInputs.proRata,
    hitRate: privateInputs.hitRate,
    alpha: privateInputs.alpha,
    xminExit: privateInputs.xmin,
  });

  const histData = Array.from({ length: 20 }, (_, i) => ({
    bucket: i,
    value: privStats.values.filter((v) => v / scenario.capital >= i / 2 && v / scenario.capital < (i + 1) / 2).length,
  }));

  return (
    <div className={accepted ? '' : 'pointer-events-none opacity-50'}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Public Market</h3>
          <label className="block text-sm mb-2">Expected Annual Total Return (%)
            <input type="number" className="mt-1 w-full border rounded p-2" value={pubInputs.expected} onChange={(e)=>setPubInputs({...pubInputs,expected:Number(e.target.value)})} />
          </label>
          <label className="block text-sm mb-2">Dividend Yield (%)
            <input type="number" className="mt-1 w-full border rounded p-2" value={pubInputs.dividend} onChange={(e)=>setPubInputs({...pubInputs,dividend:Number(e.target.value)})} />
          </label>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={publicData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area dataKey="value" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-sm">Final Value: {publicData[publicData.length-1].value.toFixed(2)}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Private Portfolio (simulated)</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histData}>
                <XAxis dataKey="bucket" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-sm">Median MOIC: {privStats.median.toFixed(2)}</p>
          <p className="mt-1 text-sm">p75 MOIC: {privStats.p75.toFixed(2)}</p>
          <p className="mt-1 text-sm">p95 MOIC: {privStats.p95.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
