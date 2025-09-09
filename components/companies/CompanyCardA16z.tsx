"use client";
import React, { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getField, safeUrl } from "@/components/companies/utils";
// JBV: BEGIN imports for logo + styles
import { deriveLogoUrl } from "@/components/companies/logo";
import { tileClasses } from "@/components/companies/tileStyles";
// JBV: END imports for logo + styles
import { companyThemes } from "@/components/companies/companyThemes";

type RecordType = { id: string; fields: Record<string, any>; logoUrl?: string };

export default function CompanyCardA16z({ record, onOpen, cover }: { record: RecordType; onOpen: (id: string) => void; cover?: ReactNode }) {
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
      {!cover && theme?.Art ? <theme.Art /> : null}
      {/* Animated cover area (brand-specific) or fallback header */}
      {cover ? (
        <div className="relative h-64 w-full overflow-hidden">
          {cover}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        </div>
      ) : (
        <div className={`h-24 ${t.header}`}>
          <div className={t.pattern} />
        </div>
      )}
      <div className="relative p-6 bg-white border-t border-black/10">
        <div className="relative flex items-start gap-4">
          {/* JBV: BEGIN card logo usage */}
          {(() => {
            const logo = deriveLogoUrl(record);
            return (isAnthropic ? (imgSrc || "/logos/claude.png") : logo) ? (
              <Image
                src={isAnthropic ? (imgSrc || "/logos/claude.png") : (logo as string)}
                alt={`${name} logo`}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full bg-white object-contain ring-1 ring-black/5"
                priority={false}
                onError={() => {
                  if (isAnthropic) {
                    // fallback to alternative path if primary missing
                    if (imgSrc !== "/logos/anthropic.png") setImgSrc("/logos/anthropic.png");
                  }
                }}
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-slate-100 ring-1 ring-black/5 flex items-center justify-center text-slate-500 font-semibold">
                {name?.[0]?.toUpperCase() ?? "•"}
              </div>
            );
          })()}
          {/* JBV: END card logo usage */}
          <div className="min-w-0">
            <div className="text-lg font-semibold truncate text-slate-900">{name}</div>
            <div className="text-slate-600 text-sm truncate" title={summary}>{summary}</div>
          </div>
        </div>
        {website && (
          <Link
            href={website}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-slate-900"
            aria-label={`Visit ${name} website`}
          >
            Visit website →
          </Link>
        )}
      </div>
    </button>
  );
}
