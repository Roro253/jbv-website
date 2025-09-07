"use client";
import React, { useEffect, useRef } from "react";

// Lightweight pseudo-sphere with Canvas 2D points (no external deps)
export default function ParticleSphere({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf = 0; const DPR = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    const resize = () => { const r = canvas.getBoundingClientRect(); canvas.width = r.width*DPR; canvas.height = r.height*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);} ;
    resize();
    const ACCENT = getComputedStyle(document.documentElement).getPropertyValue('--jbv-accent')?.trim() || '#f97316';

    // generate points on a sphere
    const points: {x:number;y:number;z:number}[] = [];
    const rings = 28, seg = 48, R = 120;
    for (let i=0;i<=rings;i++){
      const phi = Math.PI * (i / rings);
      for (let j=0;j<seg;j++){
        const theta = 2*Math.PI*(j/seg);
        const x = R*Math.sin(phi)*Math.cos(theta);
        const y = R*Math.cos(phi);
        const z = R*Math.sin(phi)*Math.sin(theta);
        points.push({x,y,z});
      }
    }
    let t = 0;
    const draw = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0,0,r.width,r.height);
      ctx.save();
      ctx.translate(r.width/2, r.height/2);
      const rotY = t*0.002, rotX = t*0.0015;
      const cosY=Math.cos(rotY), sinY=Math.sin(rotY); const cosX=Math.cos(rotX), sinX=Math.sin(rotX);
      for(const p of points){
        // rotate around Y then X
        let x = p.x*cosY + p.z*sinY; let z = -p.x*sinY + p.z*cosY; let y = p.y*cosX - z*sinX; z = p.y*sinX + z*cosX;
        const depth = (z+R*2)/(R*3);
        const sx = x; const sy = y;
        const alpha = 0.25 + 0.75*depth;
        ctx.fillStyle = ACCENT + Math.floor(alpha*255).toString(16).padStart(2,'0');
        ctx.beginPath(); ctx.arc(sx, sy, 1.5+depth*1.5, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
      t+=1; raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    const onResize=()=>resize();
    window.addEventListener('resize', onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  },[]);

  return <canvas ref={ref} className={className} />
}
