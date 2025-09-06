"use client";
export default function DatabricksCardArt(){
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl [isolation:isolate]">
      <div className="absolute inset-0" style={{background:"linear-gradient(180deg, #1A0E0A 0%, #0A0706 100%)"}} />
      <div className="absolute inset-0 opacity-10" style={{backgroundImage:"linear-gradient(30deg, #FF794A22 1px, transparent 1px), linear-gradient(150deg, #FF794A22 1px, transparent 1px)", backgroundSize:"22px 22px, 22px 22px"}} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <radialGradient id="spark-db" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8F5C" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle r="2" fill="url(#spark-db)" className="spark" cx={80} cy={620} />
        <circle r="3" fill="url(#spark-db)" className="spark" cx={150} cy={620} />
        <circle r="1.5" fill="url(#spark-db)" className="spark" cx={230} cy={620} />
        <circle r="2.5" fill="url(#spark-db)" className="spark" cx={320} cy={620} />
        <circle r="2" fill="url(#spark-db)" className="spark" cx={420} cy={620} />
        <circle r="1.8" fill="url(#spark-db)" className="spark" cx={520} cy={620} />
        <circle r="2.2" fill="url(#spark-db)" className="spark" cx={640} cy={620} />
        <circle r="2.6" fill="url(#spark-db)" className="spark" cx={760} cy={620} />
        <circle r="1.7" fill="url(#spark-db)" className="spark" cx={860} cy={620} />
        <circle r="2.4" fill="url(#spark-db)" className="spark" cx={940} cy={620} />
        <circle r="2" fill="url(#spark-db)" className="spark" cx={1020} cy={620} />
        <circle r="1.6" fill="url(#spark-db)" className="spark" cx={1120} cy={620} />
      </svg>
      <style jsx>{`@media (prefers-reduced-motion: no-preference) { .spark { animation: rise 7s linear infinite; } } @keyframes rise { 0% { transform: translateY(0); opacity:.15 } 60%{opacity:.9} 100% { transform: translateY(-700px); opacity:0 } }`}</style>
    </div>
  );
}
