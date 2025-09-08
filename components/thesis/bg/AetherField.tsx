'use client';
import React, { useEffect, useRef } from 'react';

export default function AetherField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    let frame = 0, raf = 0;
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = !document.hidden;

    const N = reduce ? 24 : 60;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
    }));

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

   function step() {
      frame++;
      ctx.clearRect(0, 0, width, height);
      // dots
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const x = p.x * width, y = p.y * height;
        ctx.fillStyle = 'rgba(10, 104, 255, 0.14)'; // --jbv-accent-ish
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i], b = pts[j];
          const dx = (a.x - b.x) * width, dy = (a.y - b.y) * height;
          const d2 = dx*dx + dy*dy;
          if (d2 < 11000) {
            const aop = 1 - Math.min(1, d2 / 11000);
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.12 * aop})`; // --jbv-accent-2-ish
            ctx.beginPath(); ctx.moveTo(a.x * width, a.y * height); ctx.lineTo(b.x * width, b.y * height); ctx.stroke();
          }
        }
      }
      if (!reduce && visible) raf = requestAnimationFrame(step);
    }
    if (!reduce && visible) raf = requestAnimationFrame(step);

    function onVis() {
      visible = !document.hidden;
      if (visible && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
      }
    }
    document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        mixBlendMode: 'plus-lighter',
        opacity: 0.5,
        filter: 'blur(0.2px)',
      }}
    />
  );
}
