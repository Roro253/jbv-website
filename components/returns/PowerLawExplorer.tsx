'use client';
import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  accepted: boolean;
}

function paretoCDF(x: number, alpha: number, xmin: number) {
  if (x < xmin) return 0;
  return 1 - Math.pow(xmin / x, alpha);
}

export default function PowerLawExplorer({ accepted }: Props) {
  const [alpha, setAlpha] = useState(1.6);
  const [xmin, setXmin] = useState(50000000);

  const data = Array.from({ length: 20 }, (_, i) => {
    const x = xmin * (i + 1);
    return { x, cdf: paretoCDF(x, alpha, xmin) };
  });

  return (
    <div className={accepted ? '' : 'pointer-events-none opacity-50'}>
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Power-Law Explorer</h3>
        <div className="h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="x" tickFormatter={(v)=> (v/1e6).toFixed(0)+'M'} />
              <YAxis />
              <Tooltip />
              <Area dataKey="cdf" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm">Power-law distributions concentrate returns in a few outliers; parameters here are illustrative only.</p>
      </div>
    </div>
  );
}
