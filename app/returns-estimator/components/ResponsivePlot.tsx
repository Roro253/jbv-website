'use client';

import dynamic from 'next/dynamic';

// Load Plotly only on the client to avoid server-side bundle issues
const Plot = dynamic(
  async () => {
    const Plotly = await import('plotly.js-basic-dist');
    const createPlotlyComponent = (await import('react-plotly.js/factory')).default;
    return createPlotlyComponent(Plotly);
  },
  { ssr: false }
);

export default function ResponsivePlot(props: any) {
  return (
    <Plot
      {...props}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
      config={{ displayModeBar: false, ...(props as any).config }}
    />
  );
}
