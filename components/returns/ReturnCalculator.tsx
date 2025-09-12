'use client';
import { useState, Dispatch, SetStateAction } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueProjection, sharesPurchased, exitMarketCap, exitSharePrice, moic, approxIRR } from '@/lib/returns/math';
import { Scenario } from "./types";

interface Props {
  scenario: Scenario;
  setScenario: Dispatch<SetStateAction<Scenario>>;
}

export default function ReturnCalculator({ scenario, setScenario }: Props) {
  const [results, setResults] = useState<any>(null);

  const revProj = revenueProjection(scenario.ntmRevenue, scenario.growthRate, scenario.horizon)
    .map((v,i)=>({ year:i, rev:v }));

  function compute() {
    const shares = sharesPurchased(scenario.investment, scenario.price);
    const exitRev = revProj[revProj.length-1].rev;
    const low = scenario.lowMultiple;
    const high = scenario.highMultiple;
    const mid = (low+high)/2;
    const caps = [low, mid, high].map(m=> exitMarketCap(exitRev, m));
    const prices = caps.map(c=> exitSharePrice(c, scenario.fdShares));
    const values = prices.map(p=> p*shares);
    const moics = values.map(v=> moic(v, scenario.investment));
    const irrs = moics.map(m=> approxIRR(m, scenario.horizon));
    setResults({shares, exitRev, caps, prices, values, moics, irrs});
  }

  const handleNumber = (key:keyof Scenario) => (e:React.ChangeEvent<HTMLInputElement>)=>{
    setScenario({...scenario,[key]:Number(e.target.value)});
  };

  const download = () => {
    if(!results) return;
    const blob = new Blob([JSON.stringify({scenario, results}, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url; a.download='scenario.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 min-w-0">
        <label className="flex flex-col text-sm min-w-0">
          Investment Amount ($)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.investment} onChange={handleNumber('investment')} />
        </label>
        <label className="flex flex-col text-sm min-w-0">
          Share Price ($)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.price} onChange={handleNumber('price')} />
        </label>
        <label className="flex flex-col text-sm min-w-0">
          2025 NTM Revenue ($)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.ntmRevenue} onChange={handleNumber('ntmRevenue')} />
        </label>
        <label className="flex flex-col text-sm min-w-0">
          Growth Rate (%)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.growthRate} onChange={handleNumber('growthRate')} />
        </label>
        <label className="flex flex-col text-sm min-w-0">
          Horizon (years)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.horizon} onChange={handleNumber('horizon')} />
        </label>
        <label className="flex flex-col text-sm min-w-0">
          Fully Diluted Shares
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.fdShares} onChange={handleNumber('fdShares')} />
        </label>
        <label className="flex flex-col text-sm min-w-0">
          Lower Bound Multiple
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.lowMultiple} onChange={handleNumber('lowMultiple')} />
        </label>
        <label className="flex flex-col text-sm min-w-0">
          Higher Bound Multiple
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.highMultiple} onChange={handleNumber('highMultiple')} />
        </label>
      </div>
      <div className="min-w-0 overflow-visible" style={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revProj} margin={{ top: 8, right: 24, bottom: 32, left: 72 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tickMargin={8} />
            <YAxis tickMargin={8} />
            <Tooltip />
            <Line type="monotone" dataKey="rev" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-2 min-w-0">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md" onClick={compute}>Calculate Returns</button>
        <button className="px-4 py-2 border rounded-md" onClick={download}>Download scenario (JSON)</button>
      </div>
      {results && (
        <div className="grid gap-4 sm:grid-cols-3 min-w-0">
          {['Low','Mid','High'].map((label,idx)=>(
            <div key={label} className="border rounded-md p-2 min-w-0">
              <div className="font-medium">{label}</div>
              <div className="text-sm">Exit Price: ${results.prices[idx].toFixed(2)}</div>
              <div className="text-sm">Portfolio Value: ${results.values[idx].toFixed(2)}</div>
              <div className="text-sm">MOIC: {results.moics[idx].toFixed(4)}×</div>
              <div className="text-sm">IRR: {(results.irrs[idx]*100).toFixed(2)}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
