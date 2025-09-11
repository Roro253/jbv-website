'use client';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { z } from 'zod';
import { Scenario } from "./types";
import Info from './Info';
import { marketCap, revenueMultiple } from '@/lib/returns/math';
interface Props {
  scenario: Scenario;
  setScenario: Dispatch<SetStateAction<Scenario>>;
}

const numberSchema = z.number().nonnegative();

export default function Overview({ scenario, setScenario }: Props) {
  const cap = marketCap(scenario.price, scenario.fdShares);
  const multiple = revenueMultiple(cap, scenario.ntmRevenue);
  useEffect(()=>{},[cap,multiple]);

  function handleChange(key: keyof Scenario) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const num = Number(val.replace(/,/g,''));
      if (!isNaN(num) && numberSchema.safeParse(num).success) {
        setScenario({ ...scenario, [key]: num });
      }
    };
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <label className="flex flex-col gap-1">
        <span className="text-sm">Investment Price (Share Price, $)<Info text="Entry share price"/></span>
        <input type="number" className="border rounded-md bg-background p-2" value={scenario.price} onChange={handleChange('price')} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Fully Diluted Shares<Info text="Total shares outstanding"/></span>
        <input type="number" className="border rounded-md bg-background p-2" value={scenario.fdShares} onChange={handleChange('fdShares')} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Last Funding Round<Info text="Text description"/></span>
        <input type="text" className="border rounded-md bg-background p-2" value={scenario.lastRound} onChange={(e)=> setScenario({...scenario, lastRound:e.target.value})} />
      </label>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Investment Market Cap<Info text="price × FD shares"/></span>
        <span className="text-lg font-medium">${(cap/1e6).toLocaleString(undefined,{maximumFractionDigits:1})}M</span>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm">NTM Revenue<Info text="Next twelve months revenue"/></span>
        <input type="number" className="border rounded-md bg-background p-2" value={scenario.ntmRevenue} onChange={handleChange('ntmRevenue')} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">2024 Growth Rate<Info text="Assumed growth rate"/></span>
        <input type="number" className="border rounded-md bg-background p-2" value={scenario.growthRate} onChange={handleChange('growthRate')} />
      </label>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Revenue Multiple (approx.)<Info text="MarketCap / NTM Revenue"/></span>
        <span className="text-lg font-medium">{multiple.toFixed(1)}×</span>
        <span className="text-xs text-muted-foreground">approx. EV/NTM (ignores net debt)</span>
      </div>
    </div>
  );
}
