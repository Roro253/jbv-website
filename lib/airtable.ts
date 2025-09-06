import Airtable from 'airtable';

const { AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_CONTACTS_TABLE, AIRTABLE_MAGIC_TABLE } = process.env;

if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
  // Do not throw in module scope to avoid crashing builds without env; APIs will validate.
}

function getBase() {
  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) throw new Error('Airtable env vars not set');
  Airtable.configure({ apiKey: AIRTABLE_PAT });
  return new Airtable({ apiKey: AIRTABLE_PAT }).base(AIRTABLE_BASE_ID);
}

const CONTACTS_TABLE = AIRTABLE_CONTACTS_TABLE || 'Contacts';
const MAGIC_TABLE = AIRTABLE_MAGIC_TABLE || 'MagicLinks';

export async function isAllowedEmail(email: string): Promise<boolean> {
  const base = getBase();
  const normalized = email.trim().toLowerCase();
  const filterByFormula = `LOWER({Email}) = '${normalized.replace(/'/g, "\\'")}'`;
  const records = await base(CONTACTS_TABLE).select({ filterByFormula, maxRecords: 1 }).firstPage();
  return records.length > 0;
}

type MagicCreate = {
  email: string;
  tokenHash: string;
  jti: string;
  expiresAt: string; // ISO
  ip?: string;
  ua?: string;
};

export async function createMagicRecord(payload: MagicCreate) {
  const base = getBase();
  const { email, tokenHash, jti, expiresAt, ip, ua } = payload;
  const created = await base(MAGIC_TABLE).create({
    Email: email,
    TokenHash: tokenHash,
    JTI: jti,
    ExpiresAt: expiresAt,
    Used: false,
    IP: ip || '',
    UA: ua || '',
  });
  return created.getId();
}

export async function countRecentRequests(email: string, withinMinutes = 60): Promise<number> {
  const base = getBase();
  const normalized = email.trim().toLowerCase();
  const sinceIso = new Date(Date.now() - withinMinutes * 60_000).toISOString();
  const filterByFormula = `AND(LOWER({Email}) = '${normalized.replace(/'/g, "\\'")}', CREATED_TIME() >= DATETIME_PARSE('${sinceIso}', 'YYYY-MM-DDTHH:mm:ss.SSSZ'))`;
  const records = await base(MAGIC_TABLE).select({ filterByFormula }).all();
  return records.length;
}

export async function getValidMagicRecord(email: string, tokenHash: string) {
  const base = getBase();
  const nowIso = new Date().toISOString();
  const normalized = email.trim().toLowerCase();
  const filterByFormula = `AND(LOWER({Email})='${normalized.replace(/'/g, "\\'")}', {TokenHash}='${tokenHash}', NOT({Used}), {ExpiresAt} >= DATETIME_PARSE('${nowIso}', 'YYYY-MM-DDTHH:mm:ss.SSSZ'))`;
  const rows = await base(MAGIC_TABLE).select({ filterByFormula, maxRecords: 1 }).firstPage();
  if (rows.length === 0) return null;
  const rec = rows[0];
  return { id: rec.getId() };
}

export async function markMagicUsed(recordId: string) {
  const base = getBase();
  await base(MAGIC_TABLE).update([{ id: recordId, fields: { Used: true, UsedAt: new Date().toISOString() } }]);
}

