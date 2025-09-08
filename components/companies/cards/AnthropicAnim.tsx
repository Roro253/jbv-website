'use client';
import { useEffect, useRef } from 'react';

export default function AnthropicAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext('2d')!;
    let w=0,h=0, raf=0, dpr=Math.min(window.devicePixelRatio||1,2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = reduce ? 18 : 44;
    const pts = Array.from({length:N}, ()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-0.5)*0.002,vy:(Math.random()-0.5)*0.002}));
    const ro = new ResizeObserver(()=>{ w=c.clientWidth; h=c.clientHeight; c.width=w*dpr; c.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);});
    ro.observe(c);
    const left = (y:number)=> 30 + Math.sin(y*6.28)*12;
    const right= (y:number)=> w-30 + Math.cos(y*6.28)*12;
    function step(){
      ctx.clearRect(0,0,w,h);
      // rails
      ctx.strokeStyle = 'rgba(10,104,255,0.25)'; ctx.lineWidth=3; ctx.beginPath(); for(let i=0;i<=100;i++){const t=i/100; ctx.lineTo(left(t), t*h);} ctx.stroke();
      ctx.strokeStyle = 'rgba(167,139,250,0.25)'; ctx.beginPath(); for(let i=0;i<=100;i++){const t=i/100; ctx.lineTo(right(t), t*h);} ctx.stroke();
      // particles
      for(const p of pts){
        p.x+=p.vx; p.y+=p.vy;
       if(p.y<0||p.y>1) p.vy*=-1;
       const lx=left(p.y)/w, rx=right(p.y)/w;
       if(p.x<lx||p.x>rx) p.vx*=-1;
       ctx.fillStyle='rgba(0,0,0,0.65)'; ctx.beginPath(); ctx.arc(p.x*w,p.y*h,1.8,0,6.28); ctx.fill();
      }
      if(!reduce) raf=requestAnimationFrame(step);
    }
    if(!reduce) raf=requestAnimationFrame(step);
    return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); };
  },[]);
  return <canvas ref={ref} className="absolute inset-0"/>;
}

