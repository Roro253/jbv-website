export const dynamic = "force-dynamic";
import React from "react";
import nextDynamic from "next/dynamic";
const ThesisBackground = nextDynamic(() => import('@/components/anim/ThesisBackground'), { ssr: false });
const Reveal = nextDynamic(() => import('@/components/anim/Reveal'), { ssr: false });

export default function ThesisPage() {
  return (
    <main className="relative bg-white text-slate-900">
      <ThesisBackground className="-z-10" />
      {/* Futuristic light background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-sky-100 to-blue-200 animate-[float_24s_ease-in-out_infinite] motion-reduce:animate-none" />
        <div className="absolute -bottom-24 -right-16 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-blue-50 to-cyan-200 animate-[float_30s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />
        <div className="absolute inset-0 opacity-30" style={{backgroundImage:"radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), radial-gradient(rgba(15,23,42,0.04) 1px, transparent 1px)",backgroundSize:"26px 26px, 52px 52px",backgroundPosition:"0 0, 13px 13px",animation:"thesisDots 22s linear infinite"}} />
        <style>{`@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-16px) } } @keyframes thesisDots { from { transform: translateY(0) } to { transform: translateY(-26px) } }`}</style>
      </div>
      {/* Animated dot matrix background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px, 56px 56px",
          backgroundPosition: "0 0, 14px 14px",
          animation: "thesisDots 18s linear infinite"
        }} />
        <style>{`@keyframes thesisDots { from { transform: translateY(0) } to { transform: translateY(-28px) } }`}</style>
      </div>
      <section className="relative z-10 min-h-[56vh] flex items-center">
        <div className="container-6xl py-20">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Our Thesis</h1>
          </Reveal>
          <Reveal delay={0.08}><p className="mt-4 max-w-2xl text-slate-600 text-lg">
            We partner with founders from seed through early stages across AI, enterprise, fintech, consumer, and more.
          </p></Reveal>
        </div>
      </section>
      <section className="relative z-10 border-t border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="container-6xl py-16">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <Reveal><h2 className="text-xl font-semibold">What we do</h2></Reveal>
            </div>
            <div className="md:col-span-2">
              <Reveal delay={0.06}><p className="text-slate-600 leading-7 max-w-2xl">
                We partner with founders from seed through early stages across AI, enterprise, fintech, consumer, and more.
                This starter focuses on layout, navigation, and animation patterns—not content.
              </p></Reveal>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 border-t border-slate-200/60 bg-gradient-to-b from-white to-sky-50/40">
        <div className="container-6xl py-16">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <Reveal><h2 className="text-xl font-semibold">Approach</h2></Reveal>
            </div>
            <div className="md:col-span-2">
              <Reveal delay={0.06}><p className="text-slate-600 leading-7 max-w-2xl">
                We move early, back exceptional teams, and help them compound advantages—product, go-to-market, and talent—
                while staying focused on durable value creation.
              </p></Reveal>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 border-t border-slate-200/60 bg-white">
        <div className="container-6xl py-16">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <Reveal><h2 className="text-xl font-semibold">Focus Areas</h2></Reveal>
            </div>
            <div className="md:col-span-2">
              <Reveal delay={0.06}><ul className="grid sm:grid-cols-2 gap-3 text-slate-600">
                <li className="rounded-xl border border-slate-200 bg-sky-50/60 px-4 py-3">AI & Applied AI</li>
                <li className="rounded-xl border border-slate-200 bg-sky-50/60 px-4 py-3">Enterprise Software</li>
                <li className="rounded-xl border border-slate-200 bg-sky-50/60 px-4 py-3">Fintech & Infrastructure</li>
                <li className="rounded-xl border border-slate-200 bg-sky-50/60 px-4 py-3">Consumer & Community</li>
              </ul></Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
