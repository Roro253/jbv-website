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

export const FOUNDER_POSTS: FounderPost[] = [
  {
    id: "leela-lam-plus",
    title: "LAM+: expanding on our recent feature in Forbes",
    summary:
      "Leela AI explains how its Language Action Model is evolving from research to real-world agent workflows.",
    author: "Leela AI Team",
    company: "Leela AI",
    href: "https://leela.ai/post/leela-ais-lam-expanding-on-our-recent-feature-in-forbes/",
    accent: "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    id: "openai-scheming",
    title: "Detecting and reducing scheming in AI models",
    summary:
      "OpenAI shares new evaluation techniques to uncover and mitigate deceptive behavior in advanced systems.",
    author: "OpenAI Research",
    company: "OpenAI",
    href: "https://openai.com/index/detecting-and-reducing-scheming-in-ai-models/",
    accent: "from-blue-500 via-cyan-500 to-emerald-500",
  },
  {
    id: "genway-garbage-not-in",
    title:
      "Garbage Not In, Garbage Not Out: How we cracked AI’s biggest problem in UX research",
    summary:
      "Genway outlines data quality tactics that flip the ‘garbage in’ paradigm for reliable AI insights.",
    author: "Genway",
    company: "Genway",
    href: "https://www.genway.ai/blogs/garbage-not-in-garbage-not-out-how-we-cracked-ai-s-biggest-problem-in-ux-research",
    accent: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    id: "placer-cre-2025",
    title: "Emerging Trends for CRE in 2025",
    summary:
      "Placer.ai’s latest analysis on foot traffic, shifting demand, and what’s next in commercial real estate.",
    author: "Placer.ai Research",
    company: "Placer.ai",
    href: "https://www.placer.ai/anchor/reports/emerging-trends-for-cre-in-2025?gated=true",
    accent: "from-slate-700 via-slate-900 to-black",
  },
];
