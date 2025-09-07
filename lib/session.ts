import { getIronSession, type IronSessionOptions } from 'iron-session';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export type SessionData = { email?: string };

const secret = process.env.SESSION_SECRET || 'insecure_dev_secret_change_me________________';

export const ironOptions: IronSessionOptions = {
  cookieName: 'jbv_session',
  password: secret,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
  ttl: 60 * 60 * 24 * 7, // 7 days
};

export async function getSession(_req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(cookies(), ironOptions);
  return { session, res } as const;
}
