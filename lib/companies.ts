export type Company = {
  name: string;
  sector: "AI" | "Biotech" | "Consumer" | "Crypto" | "Enterprise" | "Fintech" | "Frontier Tech" | "Healthcare" | "Insurance";
  stage: "Pre-Seed" | "Seed" | "Series A" | "Series B" | "Series C";
  url?: string;
  note?: string;
  featured?: boolean;
};

export const sectors = ["All","AI","Biotech","Consumer","Crypto","Enterprise","Fintech","Frontier Tech","Healthcare","Insurance"] as const;

export const companies: Company[] = [
  {
    name: "OpenAI",
    sector: "AI",
    stage: "Series C",
    url: "https://openai.com",
    note: "Foundational AI · ~$300B val · 2025E ~$13B",
    featured: true
  },
  {
    name: "Anthropic",
    sector: "AI",
    stage: "Series C",
    url: "https://www.anthropic.com",
    note: "Foundational AI · ~$183B val · 2025E ~$5B"
  },
  {
    name: "Lovable",
    sector: "AI",
    stage: "Seed",
    url: "https://lovable.dev",
    note: "No-code AI apps · ~$1.8B val (2025)"
  },
  {
    name: "Perplexity",
    sector: "AI",
    stage: "Series B",
    url: "https://www.perplexity.ai",
    note: "AI search · ~$18B val (2025)"
  },
  {
    name: "Databricks",
    sector: "Enterprise",
    stage: "Series C",
    url: "https://www.databricks.com",
    note: "Lakehouse platform · ~$62B val · 2025 ARR ~$3.7B",
    featured: true
  },
  {
    name: "Placer.ai",
    sector: "Enterprise",
    stage: "Series C",
    url: "https://www.placer.ai",
    note: "Location analytics platform delivering competitive insights",
    featured: true
  },
  {
    name: "Genway.ai",
    sector: "AI",
    stage: "Seed",
    url: "https://www.genway.ai",
    note: "AI-native life sciences data and discovery tools"
  },
  {
    name: "Leela.ai",
    sector: "AI",
    stage: "Series A",
    url: "https://leela.ai",
    note: "Visual intelligence for manufacturing and industrial operations"
  }
];
