"use client";
import React, { useEffect, useRef } from "react";

export default function HeroBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    const onResize = () => resize();
    resize();
    window.addEventListener("resize", onResize);

    const ACCENT = getComputedStyle(document.documentElement)
      .getPropertyValue("--jbv-accent")?.trim() || "#2563eb"; // fallback blue

    let t = 0;
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(t * 0.002);

      // Concentric rotating arcs
      for (let r = Math.min(width, height) * 0.15; r < Math.max(width, height) * 0.7; r += 60) {
        ctx.beginPath();
        const start = (t * 0.001 + r * 0.002) % (Math.PI * 2);
        ctx.arc(0, 0, r, start, start + Math.PI * 0.8);
        ctx.strokeStyle = ACCENT + "33"; // translucent
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();

      t += 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} />;
}

