export type FounderPost = {
  id: string;
  title: string;
  summary: string;
  author: string;
  company: string;
  href: string;
  image?: string;
  accent?: string;
};

export const founderPosts: FounderPost[] = [
  {
    id: "leela-ai-lam-plus",
    title: "LAM+ : expanding on our Forbes feature",
    summary:
      "Leela AI Team expands on the LAM+ launch, sharing how the platform reframes enterprise copilots beyond the Forbes spotlight.",
    author: "Leela AI Team",
    company: "Leela AI",
    href: "https://leela.ai/post/leela-ais-lam-expanding-on-our-recent-feature-in-forbes/",
    accent: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    id: "openai-scheming-safety",
    title: "Detecting and reducing scheming in AI models",
    summary:
      "OpenAI Research outlines the interpretability probes and governance loops keeping frontier systems aligned in production.",
    author: "OpenAI Research",
    company: "OpenAI",
    href: "https://openai.com/index/detecting-and-reducing-scheming-in-ai-models/",
    accent: "from-blue-500 via-cyan-500 to-emerald-500",
  },
  {
    id: "genway-garbage-not-in",
    title: "Garbage Not In, Garbage Not Out",
    summary:
      "Genway founders walk through disciplined data rituals that unlock cleaner insights for UX research and AI discovery.",
    author: "Genway Founders",
    company: "Genway",
    href: "https://www.genway.ai/blogs/garbage-not-in-garbage-not-out-how-we-cracked-ai-s-biggest-problem-in-ux-research",
    accent: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    id: "placer-ai-cre-trends-2025",
    title: "Emerging Trends for CRE in 2025",
    summary:
      "Placer.ai Insights maps the foot-traffic and location shifts informing next year’s commercial real estate strategies.",
    author: "Placer.ai Insights",
    company: "Placer.ai",
    href: "https://www.placer.ai/anchor/reports/emerging-trends-for-cre-in-2025?gated=true",
    accent: "from-slate-700 via-slate-900 to-black",
  },
];
