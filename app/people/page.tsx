'use client';
import { useState } from "react";

export default function PeoplePage() {
  // Content data (easily editable)
  const PROFILE = {
    name: "Jeffrey Bazar",
    role: "Founder & Managing Partner",
    backstory:
      `I’m Jeffrey Bazar. My journey in technology and venture investing has been shaped by curiosity, teamwork, and a passion for building solutions that push boundaries.
My story began with iPath Technologies, the company I co-founded and led as CEO. We built tools to simplify complex network challenges—and that effort paved the way for future achievements when iPath was acquired by Solunet. That experience taught me not only the thrill of building something from scratch but also the humility of collaborating toward a shared vision.
Since then, I've been fortunate to work alongside extraordinary teams across many transformative companies. At Cariden Technologies, where I played a role in strategic growth, the company ultimately became part of Cisco Systems. At Deepfield Networks, I worked closely on cloud-based network intelligence solutions before its acquisition by Nokia Systems. I also served as an investor or board member for Sinefa (acquired by Palo Alto Networks) and PathologyWatch (acquired by Sonic Healthcare). Each of these experiences reinforced a central belief: real innovation is born where technology, purpose, and opportunity intersect. 
JBV Capital
MarketScreener
In 2017, I founded JBV Capital in San Francisco, driven by a desire to help early-stage AI and infrastructure software founders navigate the journey—from idea to impact. Through JBV, I've been proud to support and invest in startups that combine technical rigor with a clear vision for how their platforms transform industries. 
askforfunding.com
Today, in addition to leading JBV Capital, I co-found and help steer Luna XIO, where we’re building open, secure, and scalable tracking systems for IoT—blending ingenuity with practical value. I also serve on the boards of Placer.ai and Leela.ai, working with teams delivering powerful analytics, location intelligence, and visual AI for improved business outcomes. 
JBV Capital
THE ORG
Luna XIO
Through these chapters, what remains constant is my commitment—to build thoughtfully, to listen deeply, and to partner with mission-driven founders who share the belief that better tools can empower better futures.`,
    lookout: [
      "I invest not for the sake of growth alone, but to find partners whose ambitions align with a clear, meaningful purpose.",
      "I look for entrepreneurs who are:",
      "Honestly Bold: Visionaries with big ideas but a grounded humility—who pair ambition with empathy, resilience, and a readiness to adapt.",
      "Trustworthy & Transparent: In high-stakes decisions, the way you communicate matters as much as what you build. I value founders who invite transparency, embrace honest feedback, and cultivate openness with their teams—and with investors.",
      "Founder-Led, Founder-First: Those who deeply understand their users and their product, and who lead with both technical mastery and emotional intelligence.",
      "Mission-Aligned: I’m most excited by companies that don’t just chase market share but want to solve real problems, whether that’s improving medical diagnostics, enhancing operational efficiency in supply chains, or rethinking how workplaces function in an AI-enabled era.",
      "Long-Term Thinkers: Building great companies takes time, grit, and patience. I back founders who envision enduring impact—they’re in it for the right reasons, not just for quick returns.",
      "Ultimately, I view myself less as a traditional investor and more as a partner in possibility—someone who’s committed to helping you navigate uncertainty, scale responsibly, and stay true to the values that got you started.",
      "So if you're building something with intention, something you believe deserves to be more than just a product, I’m here to listen, support, and invest in ideas that matter",
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
