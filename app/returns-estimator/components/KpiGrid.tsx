'use client';
import { useEffect, useState } from 'react';
import { NormalizedData } from '../lib/dataAdapter';

interface Props {
  data: NormalizedData['kpis'];
}

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 600;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * progress);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

const currencyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const percentFmt = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 });
const numberFmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

function DeltaBadge({ delta }: { delta: number }) {
  const cls = delta >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  return <span className={`ml-2 px-2 py-0.5 rounded text-xs ${cls}`}>{percentFmt.format(delta)}</span>;
}

export default function KpiGrid({ data }: Props) {
  const fmvPrice = useCountUp(data.fmvPerShare);
  const fmvCap = useCountUp(data.fmvMarketCap);
  const mcapMultiple = useCountUp(data.mcapToNtmMultiple);
  const investPrice = useCountUp(data.investPrice);
  const investCap = useCountUp(data.investMktCap);
  const investMultiple = useCountUp(data.investMultiple);
  const shares = useCountUp(data.fullyDilutedShares);
  const ntmRev = useCountUp(data.ntmRevenue);

  const priceDelta = data.fmvPerShare ? (data.investPrice - data.fmvPerShare) / data.fmvPerShare : 0;
  const capDelta = data.fmvMarketCap ? (data.investMktCap - data.fmvMarketCap) / data.fmvMarketCap : 0;
  const multDelta = data.mcapToNtmMultiple ? (data.investMultiple - data.mcapToNtmMultiple) / data.mcapToNtmMultiple : 0;

  const metrics = [
    { label: 'FMV per share', value: <span className="tabular-nums break-all">{currencyFmt.format(fmvPrice)}</span> },
    { label: 'Fair Value Market Cap', value: <span className="tabular-nums break-all">{currencyFmt.format(fmvCap)}</span> },
    { label: 'Market Cap / NTM Revenue', value: <span className="tabular-nums break-all">{mcapMultiple.toFixed(1)}×</span> },
    {
      label: 'Investment Price',
      value: (
        <>
          <span className="tabular-nums break-all">{currencyFmt.format(investPrice)}</span>
          <DeltaBadge delta={priceDelta} />
        </>
      ),
    },
    {
      label: 'Investment Market Cap',
      value: (
        <>
          <span className="tabular-nums break-all">{currencyFmt.format(investCap)}</span>
          <DeltaBadge delta={capDelta} />
        </>
      ),
    },
    {
      label: 'Investment Multiple',
      value: (
        <>
          <span className="tabular-nums break-all">{investMultiple.toFixed(1)}×</span>
          <DeltaBadge delta={multDelta} />
        </>
      ),
    },
    { label: 'Fully Diluted Shares', value: <span className="tabular-nums break-all">{numberFmt.format(shares)}</span> },
    { label: 'NTM Revenue', value: <span className="tabular-nums break-all">{currencyFmt.format(ntmRev)}</span> },
    { label: 'Last Funding Round', value: data.lastFundingRoundLabel },
    { label: 'Current Growth Rate', value: <span className="tabular-nums break-all">{percentFmt.format(data.currentGrowthPct)}</span> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm overflow-hidden min-w-0 space-y-1"
        >
          <p className="text-xs md:text-[13px] text-muted-foreground leading-snug">{m.label}</p>
          <p className="text-base md:text-lg font-semibold tabular-nums leading-tight whitespace-normal break-words [word-break:break-word]">
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
}
