"use client";
import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { getField, logoFromFields, safeUrl, formatPct, formatMoneyString } from "@/components/companies/utils";
import { deriveLogoUrl } from "@/components/companies/logo";
import { STATIC_DESCRIPTIONS } from "@/components/companies/staticDescriptions";
import { companyThemes, canonicalKey } from "@/components/companies/companyThemes";
import OpenAICover from "@/components/companyCovers/OpenAICover";
import AnthropicCover from "@/components/companyCovers/AnthropicCover";
import PerplexityCover from "@/components/companyCovers/PerplexityCover";
import DatabricksCover from "@/components/companyCovers/DatabricksCover";
import LovableCover from "@/components/companyCovers/LovableCover";
import LeelaCover from "@/components/companyCovers/LeelaCover";
import GenwayCover from "@/components/companyCovers/GenwayCover";
import DefaultCover from "@/components/companyCovers/DefaultCover";

type RecordType = { id: string; fields: Record<string, any>; logoUrl?: string };

function coverFor(record: RecordType): ReactNode {
  const fields = record.fields || {};
  const name = (getField<string>(fields, "Name", "Company", "Title") || record.id).toString().toLowerCase();
  const slug = (getField<string>(fields, "Slug") || name).toString().toLowerCase();
  const key = `${slug} ${name}`;
  if (key.includes("openai")) return <OpenAICover />;
  if (key.includes("anthropic")) return <AnthropicCover />;
  if (key.includes("perplex")) return <PerplexityCover />;
  if (key.includes("databrick")) return <DatabricksCover />;
  if (key.includes("genway")) return <GenwayCover />;
  if (key.includes("lovable")) return <LovableCover />;
  if (key.includes("leela")) return <LeelaCover />;
  return <DefaultCover />;
}

export default function CompanyModalA16z({ record, onClose }: { record: RecordType | null; onClose: () => void }) {
  const open = !!record;
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    const handleScroll = () => { document.body.style.overflow = "hidden"; };
    document.addEventListener("keydown", handleKey);
    handleScroll();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [open, onClose]);

  const name = useMemo(() => {
    if (!record) return "";
    return (
      getField<string>(record.fields, "Name", "Company", "Title") || record.id
    ).toString();
  }, [record]);

  const resolvedLogo = record ? (record.logoUrl ?? deriveLogoUrl(record) ?? logoFromFields(record.fields)) : undefined;
  const isAnthropic = (name || "").trim().toLowerCase() === "anthropic";
  const [logoSrc, setLogoSrc] = useState<string | undefined>(resolvedLogo);
  useEffect(() => { setLogoSrc(resolvedLogo); }, [resolvedLogo]);
  const website = record ? safeUrl(getField<string>(record.fields, "Website")) : undefined;

  const descFallbackKey = name.trim().toLowerCase();
  function pickStaticDescription(n: string): string | undefined {
    const norm = n.trim().toLowerCase();
    for (const key of Object.keys(STATIC_DESCRIPTIONS)) {
      if (key.trim().toLowerCase() === norm) return STATIC_DESCRIPTIONS[key];
    }
    return undefined;
  }

  const description = record
    ? getField<string>(record.fields, "Description") || pickStaticDescription(name)
    : undefined;

  function linksFromFields(fields: Record<string, any>): string[] {
    const raw = getField<any>(fields, "News", "Links");
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw.map(String).slice(0, 3);
    }
    if (typeof raw === "string") {
      return raw
        .split(/,|\n|\r/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);
    }
    return [];
  }

  if (!open || !record) return null;
  const key = canonicalKey({ slug: getField<string>(record.fields as any, "Slug"), name });
  const theme = companyThemes[key];
  const cover = coverFor(record);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="company-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative h-full w-full overflow-y-auto p-4 md:p-8">
        <div ref={panelRef} className="mx-auto max-w-5xl rounded-2xl shadow-2xl focus:outline-none relative overflow-hidden">
          {cover ? (
            <div aria-hidden className="absolute inset-0">
              {cover}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
            </div>
          ) : null}
          {theme?.ModalArt ? <theme.ModalArt /> : null}
          {theme?.ModalArt ? (
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(0,0,0,0.25),transparent_60%)]" />
          ) : null}

          <div className="relative p-6 md:p-8">
            {/* Header */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-14 w-14 rounded-full bg-white ring-1 ring-black/5 flex items-center justify-center overflow-hidden">
                  {(() => {
                  const src = isAnthropic ? (logoSrc || "/logos/claude.png") : logoSrc;
                  return src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt=""
                      className="h-12 w-12 object-contain"
                      onError={() => { if (isAnthropic && src !== "/logos/anthropic.png") setLogoSrc("/logos/anthropic.png"); }}
                    />
                  ) : (
                    <span className="text-sm text-slate-500">{name.charAt(0)}</span>
                  );
                })()}
              </div>
              <h2 id="company-modal-title" className={`text-xl font-semibold truncate ${theme?.modalClass ? "text-white" : ""}`}>{name}</h2>
            </div>
            <button
              onClick={onClose}
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-black/10 hover:bg-slate-50"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Milestones */}
          <div className="mt-6">
            <h3 className="text-xs uppercase tracking-widest text-slate-500">Milestones</h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {renderKV("Status", getField<string>(record.fields, "Status"))}
              {renderKV("Valuation", formatMoneyString(getField<string>(record.fields, "Valuation")))}
              {renderKV("2024 Revenue (Est)", formatMoneyString(getField<string>(record.fields, "2024 Revenue (Est)")))}
              {renderKV("2025E (Est)", formatMoneyString(getField<string>(record.fields, "2025E (Est)")))}
              {renderKV("Growth Rate", formatPct(getField<string | number>(record.fields, "Growth Rate") as any))}
              {renderKV("Category", getField<string>(record.fields, "Category"))}
              {renderKV("% Target Investment", formatPct(getField<string | number>(record.fields, "% Target Investment") as any))}
            </div>
          </div>

          {/* Company Profile */}
          {(description && description.trim().length > 0) && (
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-widest text-slate-500">Company Profile</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700 whitespace-pre-line">{description}</p>
            </div>
          )}

          {/* Quick Links */}
          {website && (
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-widest text-slate-500">Quick Links</h3>
              <div className="mt-3">
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-black/10 text-sm font-medium hover:bg-slate-50"
                >
                  Visit Website →
                </a>
              </div>
            </div>
          )}

          {/* News / Press */}
          {(() => {
            const links = linksFromFields(record.fields)
              .map((u) => safeUrl(u))
              .filter(Boolean) as string[];
            if (links.length === 0) return null;
            return (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-widest text-slate-500">News / Press</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {links.slice(0, 3).map((u, i) => (
                    <li key={i}>
                      <a href={u} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-900 underline">
                        {u}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  </div>
  );
}

function renderKV(label: string, value?: string) {
  if (!value) return null;
  return (
    <div className="rounded-lg border border-black/5 p-3">
      <div className="text-[11px] uppercase tracking-widest text-slate-500">{label}</div>
      <div className="mt-1 text-slate-800">{value}</div>
    </div>
  );
}
