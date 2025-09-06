import { Resend } from 'resend';

const FROM = 'access@jbv.com';

export async function sendMagicLink(email: string, url: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('RESEND_API_KEY not set; skipping email send');
    return { id: 'dev-noop' } as const;
  }
  const resend = new Resend(key);
  const html = `
  <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
    <h1 style="font-size:20px;margin:0 0 12px">Your JBV access link</h1>
    <p style="margin:0 0 16px">Click the button below to sign in. This link expires in 15 minutes and can be used only once.</p>
    <p style="margin:16px 0">
      <a href="${url}" style="display:inline-block;background:#0A84FF;color:#fff;text-decoration:none;padding:10px 16px;border-radius:10px">Sign in to JBV</a>
    </p>
    <p style="font-size:12px;color:#555;margin:16px 0 8px">If the button doesn’t work, copy and paste this URL:</p>
    <p style="font-size:12px;color:#555;margin:0;word-break:break-all">${url}</p>
    <p style="font-size:12px;color:#777;margin-top:16px">If you didn’t request this, you can safely ignore this email.</p>
  </div>`;
  return await resend.emails.send({
    from: `JBV Access <${FROM}>`,
    to: email,
    subject: 'Your JBV access link',
    html,
    headers: { 'List-Unsubscribe': '<mailto:unsubscribe@jbv.com>' },
  });
}

