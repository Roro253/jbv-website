import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import StackCarousel from "@/components/StackCarousel";
import ParticleSphere from "@/components/ParticleSphere";
import FounderStorybook from "@/components/about/FounderStorybook";

export default function Home() {
  return (
    <main>
      {/* Full-screen hero inspired by CoreNest (light theme, blue accents) */}
      <section className="relative isolate overflow-hidden min-h-[100svh] bg-white">
        {/* Animated canvas arcs behind content */}
        <HeroBackground className="absolute inset-0 -z-10" />

        {/* Dotted pattern and decorative pluses */}
        <div aria-hidden className="absolute inset-0 -z-10 [background:radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:26px_26px]" />
        <div aria-hidden className="absolute left-4 top-32 text-slate-400">+</div>
        <div aria-hidden className="absolute right-6 bottom-40 text-slate-400">+</div>

        {/* Vertical label */}
        <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[11px] tracking-widest text-slate-500">
          HERO
        </div>

        {/* Content */}
        <div className="container-6xl relative pt-28 pb-24 md:pt-36 md:pb-36">
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              We back autonomy
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl">
              Early‑stage and AI — partnering with founders building leveraged systems,
              durable moats, and products people love.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/thesis" className="inline-flex items-center rounded-full bg-[var(--jbv-accent,#2563eb)] px-5 py-2.5 text-white shadow transition hover:shadow-md">
                Pitch&nbsp;Us&nbsp;→
              </Link>
              <Link href="/companies" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-slate-800 hover:bg-sky-50">
                Partner&nbsp;With&nbsp;Us
              </Link>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 right-6 text-slate-500 text-sm select-none">
            02/05
          </div>
        </div>
      </section>

      {/* Full-screen ‘begins’ slide with marquee logos */}
      <section className="relative isolate overflow-hidden min-h-[100svh] bg-white">
        {/* soft auras */}
        <div aria-hidden className="absolute -top-24 -left-24 h-[40vmax] w-[40vmax] rounded-full blur-3xl bg-gradient-to-br from-sky-100 to-blue-200 opacity-40" />
        <div aria-hidden className="absolute -bottom-24 -right-24 h-[45vmax] w-[45vmax] rounded-full blur-3xl bg-gradient-to-tr from-blue-50 to-cyan-200 opacity-30" />

        {/* dotted backdrop */}
        <div aria-hidden className="absolute inset-0 [background:radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:26px_26px]" />

        <div className="container-6xl relative py-24 md:py-36 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[11px] tracking-widest text-slate-500 mb-4">INTRO</div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">Where autonomy begins</h2>
            <p className="mt-5 text-slate-700 max-w-xl leading-7">
              Autonomy compounds when products earn trust. We back teams who combine technical depth with crisp product
              judgment—shipping faster than incumbents while building distribution that seems non‑obvious… until it isn’t.
              Our job is to accelerate that curve with first checks, design partners, and pragmatic help on GTM.
            </p>
          </div>
          <div className="relative">
            {/* two-row horizontal marquee of logos (static imgs) */}
            <div className="overflow-hidden">
              <div className="flex gap-10 animate-[marquee_22s_linear_infinite] will-change-transform">
                {Array.from({ length: 10 }).map((_, i) => (
                  <img key={i} src="/jbv-logo.png" alt="logo" className="h-10 w-auto opacity-80" />
                ))}
              </div>
            </div>
            <div className="mt-6 overflow-hidden">
              <div className="flex gap-10 animate-[marquee_28s_linear_infinite_reverse] will-change-transform">
                {Array.from({ length: 10 }).map((_, i) => (
                  <img key={i} src="/jbv-logo.png" alt="logo" className="h-10 w-auto opacity-80" />
                ))}
              </div>
            </div>
            <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
          </div>
        </div>
      </section>

      {/* Keep the existing informational section below */}
      <section className="container-6xl pb-16">
        <h2 className="text-xl font-semibold mb-4">What we do</h2>
        <p className="prose-muted max-w-2xl">
          We partner with founders from seed through early stages across AI, enterprise, fintech, consumer, and more.
          This starter focuses on layout, navigation, and animation patterns—not content.
        </p>
      </section>

      {/* The stack we back */}
      <section className="relative isolate overflow-hidden bg-white py-24 md:py-36">
        {/* Decorative label and progress */}
        <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[11px] tracking-widest text-slate-500">
          STACK
        </div>
        <div className="pointer-events-none absolute bottom-8 right-6 text-slate-500 text-sm select-none">03/05</div>
        <div aria-hidden className="absolute inset-0 [background:radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:26px_26px]" />

        <div className="container-6xl relative grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">The stack we back</h2>
            <p className="mt-5 text-slate-700 max-w-xl leading-7">
              We invest across the AI stack—from infra and tooling to vertical applications. We look for earned secrets,
              fast shipments, and distribution that compounds. Explore how this translates to our pillars.
            </p>
            <div className="mt-8">
              <Link href="/thesis" className="inline-flex items-center rounded-full bg-[var(--jbv-accent,#2563eb)] px-5 py-2.5 text-white shadow transition hover:shadow-md">
                See the Thesis&nbsp;→
              </Link>
            </div>
          </div>
          <div>
            {/* Right side carousel */}
            <StackCarousel />
          </div>
        </div>
      </section>

      {/* Vision aligned */}
      <section className="relative isolate overflow-hidden bg-white py-24 md:py-36">
        {/* Labels */}
        <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[11px] tracking-widest text-slate-500">VISION</div>
        <div className="pointer-events-none absolute bottom-8 right-6 text-slate-500 text-sm select-none">04/05</div>
        <div aria-hidden className="absolute inset-0 [background:radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:26px_26px]" />

        <div className="container-6xl relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">Vision aligned</h2>
            <p className="mt-5 text-slate-700 max-w-xl leading-7">
              We invest GP capital with conviction in founders building autonomous systems and leverage loops. Our bias is
              toward focused execution, clear ROI, and foundations that scale. When we partner, we bring deep craft and
              a pragmatic network to help you compound.
            </p>
            {/* Removed Partner With Us button per request */}
          </div>
          <div className="relative min-h-[320px]">
            <ParticleSphere className="absolute inset-0" />
          </div>
        </div>
      </section>

      <FounderStorybook />
    </main>
  );
}
