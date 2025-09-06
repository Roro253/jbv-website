"use client";
import React from "react";

export default function OpenAICardArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl [isolation:isolate]">
      <div
        className="absolute inset-0 opacity-75 will-change-transform animate-[spin_28s_linear_infinite] motion-reduce:animate-none"
        style={{ background: "conic-gradient(from 180deg at 50% 50%, #0F1024, #1B275A, #29C6B7, #0F1024, #7E5CEF, #0F1024)" }}
      />
    </div>
  );
}

