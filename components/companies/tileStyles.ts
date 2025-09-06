// JBV: BEGIN tileStyles.ts
const PALETTES: Record<string, { from: string; to: string }> = {
  AI: { from: "from-indigo-100", to: "to-indigo-200" },
  "Foundational AI": { from: "from-sky-100", to: "to-sky-200" },
  "Infrastructure AI": { from: "from-emerald-100", to: "to-emerald-200" },
  "Data Workflow AI": { from: "from-amber-100", to: "to-amber-200" },
  Default: { from: "from-slate-100", to: "to-slate-200" },
};

export function tileClasses(category?: string, name?: string) {
  const pal = PALETTES[(category || "").trim()] ?? PALETTES.Default;
  const stripe = (name?.charCodeAt(0) ?? 65) % 6;

  const isOpenAI = (name || "").trim().toLowerCase() === "openai";
  if (isOpenAI) {
    // Futuristic OpenAI-themed header: emerald/cyan gradient with layered radial glows + fine grid
    return {
      header: `bg-gradient-to-br from-emerald-200 to-cyan-300 relative overflow-hidden`,
      pattern: `pointer-events-none absolute inset-0 opacity-40
                bg-[length:28px_28px]
                bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.30),transparent_45%),
                    radial-gradient(circle_at_80%_30%,rgba(6,182,212,0.28),transparent_45%),
                    radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.20),transparent_45%),
                    linear-gradient(45deg,rgba(0,0,0,0.08)_25%,transparent_25%),
                    linear-gradient(-45deg,rgba(0,0,0,0.08)_25%,transparent_25%),
                    linear-gradient(45deg,transparent_75%,rgba(0,0,0,0.08)_75%),
                    linear-gradient(-45deg,transparent_75%,rgba(0,0,0,0.08)_75%)]
                bg-[position:0_0,0_0,0_0,${stripe}px_${stripe}px,${stripe}px_${stripe}px,${14+stripe}px_${14+stripe}px,${14+stripe}px_${14+stripe}px]`,
    };
  }

  const isAnthropic = (name || "").trim().toLowerCase() === "anthropic";
  if (isAnthropic) {
    // Anthropic-themed header: sleek dark gradient with subtle grid + glow
    return {
      header: `bg-gradient-to-br from-[#0A0F1E] via-[#0E1630] to-[#0A0F1E] relative overflow-hidden`,
      pattern: `pointer-events-none absolute inset-0 opacity-35
                bg-[length:28px_28px]
                bg-[radial-gradient(560px_200px_at_15%_25%,rgba(255,255,255,0.08),transparent_60%),
                    radial-gradient(520px_200px_at_85%_75%,rgba(255,255,255,0.06),transparent_55%),
                    linear-gradient(45deg,rgba(255,255,255,0.06)_25%,transparent_25%),
                    linear-gradient(-45deg,rgba(255,255,255,0.06)_25%,transparent_25%),
                    linear-gradient(45deg,transparent_75%,rgba(255,255,255,0.06)_75%),
                    linear-gradient(-45deg,transparent_75%,rgba(255,255,255,0.06)_75%)]
                bg-[position:0_0,0_0,${stripe}px_${stripe}px,${stripe}px_${stripe}px,${14+stripe}px_${14+stripe}px,${14+stripe}px_${14+stripe}px]`,
    };
  }

  return {
    header: `bg-gradient-to-br ${pal.from} ${pal.to} relative overflow-hidden`,
    pattern: `pointer-events-none absolute inset-0 opacity-30
              bg-[length:28px_28px]
              bg-[linear-gradient(45deg,rgba(0,0,0,0.08)_25%,transparent_25%),
                  linear-gradient(-45deg,rgba(0,0,0,0.08)_25%,transparent_25%),
                  linear-gradient(45deg,transparent_75%,rgba(0,0,0,0.08)_75%),
                  linear-gradient(-45deg,transparent_75%,rgba(0,0,0,0.08)_75%)]
              bg-[position:${stripe}px_${stripe}px,${stripe}px_${stripe}px,${14+stripe}px_${14+stripe}px,${14+stripe}px_${14+stripe}px]`,
  };
}
// JBV: END tileStyles.ts
