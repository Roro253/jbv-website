"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getField, safeUrl } from "@/components/companies/utils";
// JBV: BEGIN imports for logo + styles
import { deriveLogoUrl } from "@/components/companies/logo";
import { tileClasses } from "@/components/companies/tileStyles";
// JBV: END imports for logo + styles
import { companyThemes } from "@/components/companies/companyThemes";

type RecordType = { id: string; fields: Record<string, any>; logoUrl?: string };

export default function CompanyCardA16z({ record, onOpen }: { record: RecordType; onOpen: (id: string) => void }) {
  const fields = record.fields || {};
  const name = (getField<string>(fields, "Name", "Company", "Title") || record.id).toString();
  const summary = (getField<string>(fields, "Description", "Category") ?? "").toString();
  const website = safeUrl(getField<string>(fields, "Website"));
  // JBV: BEGIN card header graphics
  const category = (fields?.["Category"] ?? "").toString();
  const t = tileClasses(category, name);
  // JBV: END card header graphics
  const isAnthropic = name.trim().toLowerCase() === "anthropic";
  function canonicalKey(): string {
    const raw = (getField<string>(fields, "Slug") || name || "").toString().toLowerCase();
    if (raw.includes("openai")) return "openai";
    if (raw.includes("anthropic")) return "anthropic";
    if (raw.includes("lovable")) return "lovable";
    if (raw.includes("perplex")) return "perplexity";
    if (raw.includes("databrick")) return "databricks";
    return raw.replace(/[^\w]+/g, "-");
  }
  const theme = companyThemes[canonicalKey()];

  const [imgSrc, setImgSrc] = useState<string | undefined>(() => deriveLogoUrl(record));
  useEffect(() => { setImgSrc(deriveLogoUrl(record)); }, [record]);

  return (
    <button
      type="button"
      onClick={() => onOpen(record.id)}
      className={`group w-full text-left rounded-2xl border hover:shadow-lg transition overflow-hidden relative ${theme?.cardClass ?? (isAnthropic ? "border-transparent bg-[#0A0F1E] text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]" : "border-black/10 bg-white")}`}
      aria-label={`Open details for ${name}`}
    >
      {theme?.Art ? <theme.Art /> : null}
      {/* JBV: BEGIN card header graphics */}
      <div className={`h-16 ${t.header}`}>
        <div className={t.pattern} />
      </div>
      {/* JBV: END card header graphics */}
      <div className={isAnthropic ? "relative p-4" : "p-4"}>
        {/* Anthropic-only background layers within the body */}
        {isAnthropic && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_20%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(500px_200px_at_80%_80%,rgba(255,255,255,0.08),transparent_55%)]" />
            <div
              className="absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage: "url('/logos/claude.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "220px",
                backgroundPosition: "center",
              }}
            />
          </div>
        )}
        <div className="relative flex items-start gap-3">
          {/* JBV: BEGIN card logo usage */}
          {(() => {
            const logo = deriveLogoUrl(record);
            return (isAnthropic ? (imgSrc || "/logos/claude.png") : logo) ? (
              <Image
                src={isAnthropic ? (imgSrc || "/logos/claude.png") : (logo as string)}
                alt={`${name} logo`}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full bg-white object-contain ring-1 ring-black/5"
                priority={false}
                onError={() => {
                  if (isAnthropic) {
                    // fallback to alternative path if primary missing
                    if (imgSrc !== "/logos/anthropic.png") setImgSrc("/logos/anthropic.png");
                  }
                }}
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-slate-100 ring-1 ring-black/5 flex items-center justify-center text-slate-500 font-semibold">
                {name?.[0]?.toUpperCase() ?? "•"}
              </div>
            );
          })()}
          {/* JBV: END card logo usage */}
          <div className="min-w-0">
            <div className={`text-base font-semibold truncate ${theme?.titleClass ?? (isAnthropic ? "text-white" : "text-slate-900")}`}>{name}</div>
            <div className={`${theme?.bodyClass ?? (isAnthropic ? "text-white/80" : "text-slate-600")} text-sm truncate`} title={summary}>{summary}</div>
          </div>
        </div>
        {website && (
          <Link
            href={website}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm font-medium ${theme?.linkClass ?? (isAnthropic ? "text-white/90 hover:text-white" : "text-slate-700 hover:text-slate-900")}`}
            aria-label={`Visit ${name} website`}
          >
            Visit website →
          </Link>
        )}
      </div>
    </button>
  );
}
