'use client';

export default function ResponsivePlot(props: any) {
  if (typeof window === 'undefined') return null;
  const Plotly = require('plotly.js-basic-dist');
  const createPlotlyComponent = require('react-plotly.js/factory');
  const Plot = createPlotlyComponent(Plotly);
  return (
    <Plot
      {...props}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
      config={{ displayModeBar: false, ...props.config }}
    />
  );
}
