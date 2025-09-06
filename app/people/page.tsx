'use client';
import { useState } from "react";

export default function PeoplePage() {
  // Content data (easily editable)
  const PROFILE = {
    name: "Jeffrey Bazar",
    role: "Founder & Managing Partner",
    backstory:
      `Jeffrey started JBV Capital with a simple idea: exceptional founders create the future by compounding small, correct decisions. Before JBV, he partnered with technical teams across infrastructure, data, and applied AI—helping products find their earliest believers. He loves messy zero-to-one problems, crisp product taste, and distribution that looks “non-obvious” at first—until it isn’t.`,
    lookout: [
      "Foundational & Infrastructure AI: model tooling, safety, evaluation, inference, data engines.",
      "Applied AI with clear wedge: vertical workflows where latency, privacy, or unit economics matter.",
      "Distribution advantage: founder-market fit, unique channels, or community-driven motion.",
      "Earned secrets: technical insight that makes the solution 10× better—not 10% better.",
      "Early evidence of pull: design partners, repeat usage, strong retention—or clear plan to get there.",
      "Teams that ship: fast iteration, story-driven product, and taste in the details.",
    ],
    investments: ["OpenAI", "Anthropic", "Databricks", "Perplexity", "Lovable"],
    email: "jb@jbv.com",
  } as const;

  const [heroOk, setHeroOk] = useState(true);

  return (
    <main className="container-6xl py-10">
      {/* JBV: TEAM PAGE START */}
      {/* Hero: full-bleed visual banner with subtle motion accents */}
      <section className="relative h-[56vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700" />
        {/* Optional hero image if present */}
        {heroOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/people/lead.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            onError={() => setHeroOk(false)}
          />
        )}
        {/* Overlay for legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.5))]" />

        {/* Animated accent orbs */}
        <div className="absolute -top-10 left-16 h-28 w-28 rounded-full bg-indigo-400/20 blur-xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 right-16 h-24 w-24 rounded-full bg-emerald-400/20 blur-xl animate-[float_10s_ease-in-out_infinite_reverse]" />

        {/* Title overlay */}
        <div className="relative h-full">
          <div className="h-full max-w-5xl mx-auto px-6 md:px-8 flex items-end md:items-center">
            <div className="pb-10 md:pb-0 text-white">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{PROFILE.name}</h1>
              <p className="mt-2 text-white/80 text-lg">{PROFILE.role}</p>
            </div>
          </div>
        </div>

        {/* Keyframes (minimal, inline) */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .animate-[float_8s_ease-in-out_infinite], .animate-[float_10s_ease-in-out_infinite_reverse] { animation: none !important; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* Bio card */}
      <section className="relative -mt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="rounded-3xl bg-white shadow-xl ring-1 ring-black/5 p-6 md:p-8 opacity-0 translate-y-2 animate-[fadeInUp_500ms_ease-out_forwards]">
            {/* Header row */}
            <div className="flex items-start gap-4">
              {heroOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/images/people/lead.jpg" alt="" className="h-16 w-16 rounded-full object-cover ring-1 ring-black/10" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-slate-100 ring-1 ring-black/10 flex items-center justify-center text-slate-600 font-semibold">JB</div>
              )}
              <div>
                <div className="text-xl font-semibold text-slate-900">{PROFILE.name}</div>
                <div className="text-sm text-slate-600">{PROFILE.role}</div>
              </div>
              <div className="ml-auto hidden md:block">
                <a href={`mailto:${PROFILE.email}`} className="text-sm text-slate-700 hover:text-slate-900 underline">Contact</a>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-6 space-y-8">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-slate-500">Backstory</h2>
                <p className="mt-3 text-slate-700 leading-7">{PROFILE.backstory}</p>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-widest text-slate-500">On the lookout for</h2>
                <ul className="mt-3 space-y-2 text-slate-700">
                  {PROFILE.lookout.map((item) => (
                    <li key={item} className="flex gap-3">
                      <svg className="h-5 w-5 text-slate-400 flex-none mt-[2px]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><circle cx="10" cy="10" r="4" /></svg>
                      <span className="leading-6">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selected investments (optional) */}
              <div>
                <h2 className="text-xs uppercase tracking-widest text-slate-500">Selected investments</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PROFILE.investments.map((c) => (
                    <a key={c} href="/companies" className="px-3 py-1.5 rounded-full border border-black/10 text-sm text-slate-700 hover:bg-slate-50">{c}</a>
                  ))}
                </div>
              </div>

              {/* Contact (mobile) */}
              <div className="md:hidden">
                <a href={`mailto:${PROFILE.email}`} className="text-sm text-slate-700 hover:text-slate-900 underline">Contact</a>
              </div>
            </div>
          </div>

          {/* Simple entrance keyframes */}
          <style>{`
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
        </div>
      </section>
      {/* JBV: TEAM PAGE END */}
    </main>
  );
}
