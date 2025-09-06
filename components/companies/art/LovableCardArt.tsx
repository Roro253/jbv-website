"use client";
import React from "react";

export default function LovableCardArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl [isolation:isolate]">
      <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, #FFE5F0 0%, #E9F6FF 50%, #F4E9FF 100%)" }} />
      {/* floating blobs */}
      <div className="absolute -left-10 top-4 w-52 h-52 rounded-full opacity-60 blur-2xl motion-reduce:animate-none animate-[float_10s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle at 30% 30%, #FF7AB3, transparent 60%)" }} />
      <div className="absolute right-0 -bottom-8 w-56 h-56 rounded-full opacity-60 blur-2xl motion-reduce:animate-none animate-[float_12s_ease-in-out_infinite_reverse]" style={{ background: "radial-gradient(circle at 70% 70%, #7ACBFF, transparent 60%)" }} />
      {/* sparkles */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <radialGradient id="lov-spark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {[
          [100,120],[260,80],[420,150],[580,60],[760,110],[940,90],
          [180,260],[340,300],[520,280],[700,260],[880,320],[1060,300],
          [120,460],[300,420],[480,480],[660,440],[840,460],[1020,420]
        ].map(([x,y],i)=> (
          <circle key={i} cx={x} cy={y} r={2.5} fill="url(#lov-spark)" className={`twinkle t${i}`} />
        ))}
      </svg>
      <style jsx>{`
        @keyframes float { 0%,100%{ transform: translateY(0)} 50%{ transform: translateY(-8px)} }
        @media (prefers-reduced-motion: no-preference) {
          .twinkle { animation: twinkle 3.6s ease-in-out infinite; }
        }
        @keyframes twinkle { 0%,100%{ opacity:.2; transform: scale(1)} 50%{ opacity:.9; transform: scale(1.35)} }
      `}</style>
    </div>
  );
}
