'use client';
import { useState, Dispatch, SetStateAction } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-sm">
          Investment Amount ($)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.investment} onChange={handleNumber('investment')} />
        </label>
        <label className="flex flex-col text-sm">
          Share Price ($)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.price} onChange={handleNumber('price')} />
        </label>
        <label className="flex flex-col text-sm">
          2025 NTM Revenue ($)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.ntmRevenue} onChange={handleNumber('ntmRevenue')} />
        </label>
        <label className="flex flex-col text-sm">
          Growth Rate (%)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.growthRate} onChange={handleNumber('growthRate')} />
        </label>
        <label className="flex flex-col text-sm">
          Horizon (years)
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.horizon} onChange={handleNumber('horizon')} />
        </label>
        <label className="flex flex-col text-sm">
          Fully Diluted Shares
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.fdShares} onChange={handleNumber('fdShares')} />
        </label>
        <label className="flex flex-col text-sm">
          Lower Bound Multiple
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.lowMultiple} onChange={handleNumber('lowMultiple')} />
        </label>
        <label className="flex flex-col text-sm">
          Higher Bound Multiple
          <input type="number" className="border rounded-md bg-background p-2" value={scenario.highMultiple} onChange={handleNumber('highMultiple')} />
        </label>
      </div>
      <LineChart width={300} height={200} data={revProj}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="rev" stroke="#8884d8" />
      </LineChart>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md" onClick={compute}>Calculate Returns</button>
        <button className="px-4 py-2 border rounded-md" onClick={download}>Download scenario (JSON)</button>
      </div>
      {results && (
        <div className="grid gap-4 sm:grid-cols-3">
          {['Low','Mid','High'].map((label,idx)=>(
            <div key={label} className="border rounded-md p-2">
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
