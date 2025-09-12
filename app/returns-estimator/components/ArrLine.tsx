'use client';
import ResponsivePlot from './ResponsivePlot';

const history = {
  x: ['2019 Q1', '2020 Q1', '2021 Q1', '2022 Q1', '2023 Q4', '2024 Q4'],
  y: [4_000_000, 12_000_000, 36_000_000, 60_000_000, 100_000_000, 138_400_000],
};

export default function ArrLine() {
  const data = [
    {
      type: 'scatter',
      mode: 'lines+markers',
      x: history.x,
      y: history.y,
      line: { color: '#3b82f6' },
      marker: { color: '#3b82f6' },
      hovertemplate: '%{x}<br>$%{y:,.0f}<extra></extra>',
    },
  ];
  const annotations: any[] = [
    { x: '2019 Q1', y: 4_000_000, text: 'Launch', showarrow: true, arrowhead: 2, ay: -30 },
    { x: '2021 Q1', y: 36_000_000, text: '3\u00d7 YoY', showarrow: true, arrowhead: 2, ay: -30 },
    { x: '2023 Q4', y: 100_000_000, text: '$100M+ ARR', showarrow: true, arrowhead: 2, ay: -30 },
    { x: '2024 Q4', y: 138_400_000, text: 'Current', showarrow: true, arrowhead: 2, ay: -30 },
  ];
  const layout: any = {
    margin: { l: 60, r: 20, t: 20, b: 40 },
    yaxis: { tickformat: '$,.0f' },
    xaxis: { type: 'category' },
    height: 260,
    annotations,
  };
  return <ResponsivePlot data={data} layout={layout} />;
}
