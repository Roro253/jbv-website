// JBV: BEGIN logo.ts
export function deriveLogoUrl(record: { fields: Record<string, any>, logoUrl?: string }) {
  if (record?.logoUrl) return record.logoUrl;

  // Special-case local override for OpenAI logo PNG placed in public/logos/openai.png
  const nameRaw = (record?.fields?.["Name"] || record?.fields?.["Company"] || "").toString().trim().toLowerCase();
  if (nameRaw === "openai") {
    return "/logos/openai.png";
  }
  // Special-case local override for Anthropic logo PNG placed in public/logos/claude.png
  if (nameRaw === "anthropic") {
    return "/logos/claude.png";
  }

  const fields = record?.fields || {};
  const keys = ["Company Logo", "Logo", "logo", "Image"];
  for (const k of keys) {
    const atts = (fields as any)[k];
    if (Array.isArray(atts) && atts.length && atts[0]?.url) return String(atts[0].url);
  }
  return undefined;
}
// JBV: END logo.ts
