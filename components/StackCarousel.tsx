"use client";
import React, { useEffect, useRef, useState } from "react";

type Card = { title: string; body: string };
const CARDS: Card[] = [
  { title: "SaaS", body: "Workflow software with bottoms‑up adoption and clear ROI." },
  { title: "AI", body: "Applied copilots, retrieval, agents; evaluated on utility and retention." },
  { title: "Infra", body: "Compute, orchestration, eval tooling, data systems for scale." },
  { title: "Dev Tools", body: "SDKs, CLIs, platforms that reduce toil and unlock velocity." },
];

export default function StackCarousel() {
  const [idx, setIdx] = useState(0);
  const wrap = (n: number) => (n + CARDS.length) % CARDS.length;
  const next = () => setIdx((i) => wrap(i + 1));
  const prev = () => setIdx((i) => wrap(i - 1));

  // Swipe handlers
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    startX.current = null;
  };

  return (
    <div className="relative select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="overflow-hidden rounded-2xl border border-black/10">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {CARDS.map((c, i) => (
            <Card key={i} title={c.title} body={c.body} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button onClick={prev} className="px-3 py-1.5 rounded-full border border-black/10 bg-white hover:bg-sky-50">←</button>
        <div className="flex gap-1">
          {CARDS.map((_, i) => (
            <span key={i} className={`h-1.5 w-5 rounded-full ${i === idx ? 'bg-[var(--jbv-accent,#2563eb)]' : 'bg-slate-300'}`} />
          ))}
        </div>
        <button onClick={next} className="px-3 py-1.5 rounded-full border border-black/10 bg-white hover:bg-sky-50">→</button>
      </div>
    </div>
  );
}

function Card({ title, body }: Card) {
  return (
    <div className="min-w-full p-6 bg-white relative">
      {/* animated abstract dots canvas */}
      <DotField />
      <div className="relative">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-700 max-w-md">{body}</p>
      </div>
    </div>
  );
}

function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf = 0; const DPR = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    const resize = () => { const r = canvas.getBoundingClientRect(); canvas.width = r.width*DPR; canvas.height = r.height*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);} ;
    resize();
    const dots: {x:number;y:number;vx:number;vy:number}[] = [];
    const init = () => { dots.length=0; const r = canvas.getBoundingClientRect(); for(let i=0;i<80;i++){ dots.push({ x: Math.random()*r.width, y: Math.random()*r.height, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5}); } };
    init();
    const draw = () => {
      const r = canvas.getBoundingClientRect(); ctx.clearRect(0,0,r.width,r.height);
      // lines
      ctx.strokeStyle = 'rgba(37,99,235,0.15)'; ctx.lineWidth = 1;
      for(let i=0;i<dots.length;i++){
        for(let j=i+1;j<dots.length && j<i+8;j++){
          const a=dots[i], b=dots[j]; const dx=a.x-b.x, dy=a.y-b.y; const d=Math.hypot(dx,dy); if(d<80){ ctx.globalAlpha=0.12*(1-d/80); ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
        }
      }
      ctx.globalAlpha=1; ctx.fillStyle='rgba(15,23,42,0.7)';
      for(const d of dots){ d.x+=d.vx; d.y+=d.vy; if(d.x<0||d.x>r.width) d.vx*=-1; if(d.y<0||d.y>r.height) d.vy*=-1; ctx.beginPath(); ctx.arc(d.x,d.y,1.6,0,Math.PI*2); ctx.fill(); }
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    const onResize=()=>{ resize(); init(); };
    window.addEventListener('resize', onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  },[]);
  return <canvas ref={ref} className="absolute inset-0 -z-10" />
}
