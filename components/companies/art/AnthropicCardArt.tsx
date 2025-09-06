"use client";
import React from "react";

export default function AnthropicCardArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl [isolation:isolate]">
      <div
        className="absolute inset-0 opacity-70 will-change-transform animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #0E0E13 0%, #0E0E13 22%, #C99A73 32%, #0E0E13 48%, #0E0E13 70%, #C99A73 78%, #0E0E13 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: "linear-gradient(#ffffff22 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="anth-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C99A73" />
            <stop offset="100%" stopColor="#F3EFEA" />
          </linearGradient>
        </defs>
        <g stroke="url(#anth-stroke)" strokeWidth="1.25" fill="none">
          <path d="M-50,80 C200,120 400,20 600,80 800,140 1000,60 1250,110" />
          <path d="M-50,260 C180,220 420,300 640,220 860,140 1080,220 1250,180" />
          <path d="M-50,440 C160,500 420,410 660,470 900,530 1120,430 1250,480" />
        </g>
      </svg>
    </div>
  );
}

