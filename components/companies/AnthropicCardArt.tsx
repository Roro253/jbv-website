// components/companies/AnthropicCardArt.tsx
"use client";
import React from "react";

export default function AnthropicCardArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl [isolation:isolate]">
      {/* Base deep gradient (rotates slowly) */}
      <div
        className="absolute inset-0 opacity-70 will-change-transform"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #0E0E13 0%, #0E0E13 22%, #C99A73 32%, #0E0E13 48%, #0E0E13 70%, #C99A73 78%, #0E0E13 100%)",
        }}
      />

      {/* Subtle watermark using claude.png */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: "url('/logos/claude.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px",
          backgroundPosition: "center",
        }}
      />

      {/* Radial light washes */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(900px 320px at 15% 10%, rgba(201,154,115,0.40), transparent 60%), radial-gradient(700px 260px at 85% 90%, rgba(243,239,234,0.25), transparent 55%)",
        }}
      />

      {/* Animated neural weave */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="anth-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C99A73" />
            <stop offset="100%" stopColor="#F3EFEA" />
          </linearGradient>
          <filter id="anth-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#anth-glow)" stroke="url(#anth-stroke)" strokeWidth="1.25" fill="none">
          <path className="dash1" d="M-50,80 C200,120 400,20 600,80 800,140 1000,60 1250,110" />
          <path className="dash2" d="M-50,260 C180,220 420,300 640,220 860,140 1080,220 1250,180" />
          <path className="dash3" d="M-50,440 C160,500 420,410 660,470 900,530 1120,430 1250,480" />
        </g>
      </svg>

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          /* spin base gradient */
          div.absolute.inset-0.opacity-70 { animation: spinGradient 24s linear infinite; }
          /* stroke dashes */
          .dash1 { stroke-dasharray: 10 14; animation: dash 14s linear infinite; }
          .dash2 { stroke-dasharray: 8 12;  animation: dash 18s linear infinite reverse; }
          .dash3 { stroke-dasharray: 12 16; animation: dash 22s linear infinite; }
        }
        @keyframes spinGradient { to { transform: rotate(360deg) scale(1.05); } }
        @keyframes dash { to { stroke-dashoffset: -1000; } }
      `}</style>
    </div>
  );
}

