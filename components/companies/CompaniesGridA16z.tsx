"use client";
import CompanyCardA16z from "@/components/companies/CompanyCardA16z";
import OpenAICover from "@/components/companyCovers/OpenAICover";
import AnthropicCover from "@/components/companyCovers/AnthropicCover";
import PerplexityCover from "@/components/companyCovers/PerplexityCover";
import DatabricksCover from "@/components/companyCovers/DatabricksCover";
import LovableCover from "@/components/companyCovers/LovableCover";
import LeelaCover from "@/components/companyCovers/LeelaCover";
import GenwayCover from "@/components/companyCovers/GenwayCover";
import DefaultCover from "@/components/companyCovers/DefaultCover";
import { getField } from "@/components/companies/utils";

type RecordType = { id: string; fields: Record<string, any>; logoUrl?: string };

function coverFor(record: RecordType) {
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

export default function CompaniesGridA16z({ items, onOpen }: { items: RecordType[]; onOpen: (id: string) => void }) {
  return (
    <section aria-label="Companies" className="px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
        {items.map((r) => (
          <CompanyCardA16z key={r.id} record={r} onOpen={onOpen} cover={coverFor(r)} />
        ))}
      </div>
    </section>
  );
}
