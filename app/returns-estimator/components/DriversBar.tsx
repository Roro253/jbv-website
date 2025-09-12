'use client';
import ResponsivePlot from './ResponsivePlot';

export default function DriversBar() {
  const data = [
    {
      type: 'bar',
      orientation: 'h',
      x: [0.42, 0.31, 0.21],
      y: ['Growth Rate', 'FCF Margins', 'Revenue Scale'],
      text: ['42% R\u00b2', '31% R\u00b2', '21% R\u00b2'],
      textposition: 'outside',
      marker: { color: '#3b82f6' },
    },
  ];
  const layout: any = {
    xaxis: { range: [0, 0.5], tickformat: '.0%', title: 'R\u00b2', gridcolor: '#e5e7eb' },
    margin: { l: 120, r: 20, t: 20, b: 40 },
    height: 260,
  };
  return (
    <div className="space-y-4">
      <ResponsivePlot data={data} layout={layout} />
      <ul className="text-xs text-muted-foreground space-y-1">
        <li>Growth Rate: ~ +3.4\u00d7 per +10% growth</li>
        <li>FCF Margins: ~ +1.0\u00d7 per +10% margin</li>
        <li>Revenue Scale: ~ +0.6\u00d7 per +$10B revenue</li>
      </ul>
    </div>
  );
}
