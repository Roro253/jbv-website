'use client';
import { useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';

type Params = {
  deals: number;
  hitRate: number; // percent
  alpha: number;
  xmin: number;
  trials: number;
};

function pareto(alpha:number, xmin:number){
  return xmin/Math.pow(Math.random(),1/alpha);
}

export default function PowerLawMini({ initial }: { initial: Params }) {
  const [params, setParams] = useState<Params>(initial);
  const [data, setData] = useState<any[]>([]);

  const handle = (key:keyof Params)=>(e:React.ChangeEvent<HTMLInputElement>)=>{
    setParams({...params,[key]:Number(e.target.value)});
  };

  function run(){
    const outcomes:number[]=[];
    for(let t=0;t<params.trials;t++){
      let total=0;
      for(let i=0;i<params.deals;i++){
        if(Math.random()<params.hitRate/100){
          total+=pareto(params.alpha, params.xmin);
        }
      }
      outcomes.push(total);
    }
    outcomes.sort((a,b)=>b-a);
    const top=outcomes.slice(0,5);
    setData(top.map((v,i)=>({name:`#${i+1}`, value:v})));
  }

  return (
    <details className="border rounded-md p-2">
      <summary className="cursor-pointer">Outlier Impact (Power-Law)</summary>
      <div className="mt-2 space-y-2 text-sm">
        <div className="grid gap-2 sm:grid-cols-2">
          <label>Deals<input type="number" className="border rounded-md bg-background p-1" value={params.deals} onChange={handle('deals')} /></label>
          <label>Hit Rate %<input type="number" className="border rounded-md bg-background p-1" value={params.hitRate} onChange={handle('hitRate')} /></label>
          <label>alpha<input type="number" className="border rounded-md bg-background p-1" value={params.alpha} onChange={handle('alpha')} /></label>
          <label>xmin ($)<input type="number" className="border rounded-md bg-background p-1" value={params.xmin} onChange={handle('xmin')} /></label>
          <label>trials<input type="number" className="border rounded-md bg-background p-1" value={params.trials} onChange={handle('trials')} /></label>
        </div>
        <button className="px-2 py-1 bg-primary text-primary-foreground rounded" onClick={run}>Simulate</button>
        {data.length>0 && (
          <BarChart width={300} height={200} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="var(--jbv-accent)" />
          </BarChart>
        )}
        <p className="text-xs text-muted-foreground">Power-law concentration is typical in startup outcomes; these parameters are illustrative only.</p>
      </div>
    </details>
  );
}
