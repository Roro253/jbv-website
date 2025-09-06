import { randomBytes, createHash, randomUUID } from 'node:crypto';

export type OneTimeToken = {
  token: string; // raw token (returned to caller, not stored)
  tokenHash: string; // sha256 base64url
  jti: string;
  expiresAt: Date;
};

function base64url(buf: Buffer) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function sha256base64url(input: string): string {
  const hash = createHash('sha256').update(input).digest();
  return base64url(hash);
}

export function createOneTimeToken(ttlMinutes = 15): OneTimeToken {
  const secret = base64url(randomBytes(32));
  const jti = randomUUID();
  const token = `${jti}.${secret}`;
  const tokenHash = sha256base64url(token);
  const expiresAt = new Date(Date.now() + ttlMinutes * 60_000);
  return { token, tokenHash, jti, expiresAt };
}

