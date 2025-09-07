import { getIronSession, type SessionOptions } from 'iron-session';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export type SessionData = { email?: string };

export const ironOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'jbv_session',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export async function getSession(_req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(cookies(), ironOptions);
  return { session, res } as const;
}
