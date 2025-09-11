'use client';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
  drivers: number[]; // [growth, fcf, scale]
  setDrivers: (v: number[]) => void;
};

export default function DriversChart({ drivers, setDrivers }: Props) {
  const data = [
    { name: 'Growth Rate', value: drivers[0] },
    { name: 'FCF Margins', value: drivers[1] },
    { name: 'Revenue Scale', value: drivers[2] }
  ];

  const handle = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = [...drivers];
    next[idx] = Number(e.target.value);
    setDrivers(next);
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground space-y-1">
        <div>~3.4× per +10% growth</div>
        <div>~1.0× per +10% FCF margin</div>
        <div>~0.6× per +$10B revenue</div>
      </div>
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0,60]} />
        <Tooltip />
        <Bar dataKey="value" fill="var(--jbv-accent)" />
      </BarChart>
      <div className="grid gap-2 sm:grid-cols-3">
        {data.map((d, idx) => (
          <label key={d.name} className="text-sm flex flex-col">
            <span>{d.name} {drivers[idx]}%</span>
            <input type="range" min={0} max={60} value={drivers[idx]} onChange={handle(idx)} />
          </label>
        ))}
      </div>
    </div>
  );
}
