"use client";
export default function PerplexityCardArt(){
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl [isolation:isolate]">
      <div className="absolute inset-0" style={{background:"radial-gradient(900px 500px at 20% 20%, #0C1B36, #050A17 70%)"}} />
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <g stroke="rgba(160,190,255,.35)" strokeWidth="1">
          <line x1="120" y1="180" x2="320" y2="240" />
          <line x1="320" y1="240" x2="560" y2="180" />
          <line x1="560" y1="180" x2="860" y2="260" />
          <line x1="860" y1="260" x2="1040" y2="140" />
        </g>
        <g fill="#BFD1FF">
          {[ [120,180],[320,240],[560,180],[860,260],[1040,140] ].map(([x,y],i)=> (
            <circle key={i} cx={x} cy={y} r="2.5" className="star" />
          ))}
        </g>
        <circle cx="600" cy="300" r="260" stroke="rgba(140,200,255,.25)" strokeWidth="2" fill="none" className="scan" />
      </svg>
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .star { animation: pulse 3.5s ease-in-out infinite; }
          .scan { transform-origin: 600px 300px; animation: rotate 24s linear infinite; }
        }
        @keyframes pulse { 0%,100%{ opacity:.4 } 50%{ opacity:1 } }
        @keyframes rotate { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
