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

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border shadow-sm p-6 space-y-2">
        <div>
          <h3 className="text-xs text-muted-foreground">FMV per share</h3>
          <p className="text-sm font-semibold leading-tight">{currencyFmt.format(fmvPrice)}</p>
        </div>
        <div>
          <h3 className="text-xs text-muted-foreground">Fair Value Market Cap</h3>
          <p className="text-sm font-semibold leading-tight">{currencyFmt.format(fmvCap)}</p>
        </div>
        <div>
          <h3 className="text-xs text-muted-foreground">Market Cap / NTM Revenue</h3>
          <p className="text-sm font-semibold leading-tight">{mcapMultiple.toFixed(1)}×</p>
        </div>
      </div>
      <div className="rounded-2xl border shadow-sm p-6 space-y-2">
        <div>
          <h3 className="text-xs text-muted-foreground">Investment Price</h3>
          <p className="text-sm font-semibold leading-tight">
            {currencyFmt.format(investPrice)}<DeltaBadge delta={priceDelta} />
          </p>
        </div>
        <div>
          <h3 className="text-xs text-muted-foreground">Investment Market Cap</h3>
          <p className="text-sm font-semibold leading-tight">
            {currencyFmt.format(investCap)}<DeltaBadge delta={capDelta} />
          </p>
        </div>
        <div>
          <h3 className="text-xs text-muted-foreground">Investment Multiple</h3>
          <p className="text-sm font-semibold leading-tight">
            {investMultiple.toFixed(1)}×<DeltaBadge delta={multDelta} />
          </p>
        </div>
      </div>
      <div className="rounded-2xl border shadow-sm p-6 space-y-2">
        <div>
          <h3 className="text-xs text-muted-foreground">Fully Diluted Shares</h3>
          <p className="text-sm font-semibold leading-tight">{numberFmt.format(shares)}</p>
        </div>
        <div>
          <h3 className="text-xs text-muted-foreground">NTM Revenue</h3>
          <p className="text-sm font-semibold leading-tight">{currencyFmt.format(ntmRev)}</p>
        </div>
      </div>
      <div className="rounded-2xl border shadow-sm p-6 space-y-2">
        <div>
          <h3 className="text-xs text-muted-foreground">Last Funding Round</h3>
          <p className="text-sm font-semibold leading-tight">{data.lastFundingRoundLabel}</p>
        </div>
        <div>
          <h3 className="text-xs text-muted-foreground">Current Growth Rate</h3>
          <p className="text-sm font-semibold leading-tight">{percentFmt.format(data.currentGrowthPct)}</p>
        </div>
      </div>
    </div>
  );
}
