import type { ReactNode } from "react";
import OpenAICardArt from "@/components/companies/art/OpenAICardArt";
import AnthropicCardArt from "@/components/companies/art/AnthropicCardArt";
import LovableCardArt from "@/components/companies/art/LovableCardArt";
import PerplexityCardArt from "@/components/companies/art/PerplexityCardArt";
import DatabricksCardArt from "@/components/companies/art/DatabricksCardArt";

export type CompanyTheme = {
  cardClass?: string;
  Art?: () => ReactNode;
  titleClass?: string;
  bodyClass?: string;
  linkClass?: string;
  modalClass?: string;
  ModalArt?: () => ReactNode;
};

export const companyThemes: Record<string, CompanyTheme> = {
  openai: {
    cardClass:
      "border-transparent text-white shadow-[0_18px_60px_-18px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_70px_-18px_rgba(0,0,0,0.6)]",
    Art: OpenAICardArt,
    titleClass: "text-white",
    bodyClass: "text-white/85",
    linkClass: "text-white underline-offset-2 hover:text-white/90",
  },
  anthropic: {
    cardClass:
      "border-transparent text-white shadow-[0_18px_60px_-18px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_70px_-18px_rgba(0,0,0,0.6)]",
    Art: AnthropicCardArt,
    titleClass: "text-white",
    bodyClass: "text-white/85",
    linkClass: "text-white underline-offset-2 hover:text-white/90",
  },
  lovable: {
    cardClass:
      "border-transparent text-neutral-900 shadow-[0_18px_60px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_22px_70px_-18px_rgba(0,0,0,0.3)]",
    Art: LovableCardArt,
    titleClass: "text-neutral-900",
    bodyClass: "text-neutral-800/80",
    linkClass: "text-neutral-900 underline-offset-2 hover:text-neutral-700",
  },
  perplexity: {
    cardClass:
      "border-transparent text-white shadow-[0_18px_60px_-18px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_70px_-18px_rgba(0,0,0,0.6)]",
    Art: PerplexityCardArt,
    titleClass: "text-white",
    bodyClass: "text-white/85",
    linkClass: "text-white underline-offset-2 hover:text-white/90",
  },
  databricks: {
    cardClass:
      "border-transparent text-white shadow-[0_18px_60px_-18px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_70px_-18px_rgba(0,0,0,0.6)]",
    Art: DatabricksCardArt,
    titleClass: "text-white",
    bodyClass: "text-white/85",
    linkClass: "text-white underline-offset-2 hover:text-white/90",
  },
};

export function canonicalKey(input: { slug?: string; name?: string }) {
  const raw = (input.slug || input.name || "").toLowerCase();
  if (raw.includes("openai")) return "openai";
  if (raw.includes("anthropic")) return "anthropic";
  if (raw.includes("lovable")) return "lovable";
  if (raw.includes("perplex")) return "perplexity";
  if (raw.includes("databrick")) return "databricks";
  return raw.replace(/[^\w]+/g, "-");
}
