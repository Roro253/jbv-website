export function getField<T = any>(fields: Record<string, any>, ...names: string[]): T | undefined {
  for (const n of names) {
    if (fields && Object.prototype.hasOwnProperty.call(fields, n)) {
      const v = fields[n];
      if (v !== undefined && v !== null && v !== "") return v as T;
    }
  }
  return undefined;
}

export function safeUrl(u?: string): string | undefined {
  if (!u || typeof u !== "string") return undefined;
  try {
    const url = new URL(u, u.startsWith("/") ? "http://localhost" : undefined);
    if (url.protocol === "http:" || url.protocol === "https:") return u;
  } catch {}
  return undefined;
}

export function formatPct(v?: string | number): string | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const s = String(v).trim();
  return s.endsWith("%") ? s : `${s}%`;
}

export function formatMoneyString(v?: string): string | undefined {
  if (!v) return undefined;
  return v.trim();
}

export function logoFromFields(fields: Record<string, any>): string | undefined {
  const att = getField<any[]>(fields, "Company Logo", "Logo", "Image");
  if (Array.isArray(att) && att.length > 0) {
    const first = att[0];
    if (first && typeof first.url === "string") return first.url;
  }
  return undefined;
}

