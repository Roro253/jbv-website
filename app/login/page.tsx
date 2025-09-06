"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const hasError = !!params.get('error');

  useEffect(() => {
    if (hasError) setSent(false);
  }, [hasError]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSent(true);
    } catch (_) {
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container-6xl py-10">
      <div className="max-w-md">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
          {!sent && (
            <form onSubmit={onSubmit} className="space-y-3">
              {hasError && <p className="text-sm text-red-600">Something went wrong. Please request a new link.</p>}
              <label className="block text-sm">
                <span className="block mb-1">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                  placeholder="you@company.com"
                />
              </label>
              <button disabled={submitting} className="rounded-xl bg-brand-600 text-white px-4 py-2 disabled:opacity-60">
                {submitting ? 'Sending…' : 'Send magic link'}
              </button>
            </form>
          )}
          {sent && (
            <p className="prose-muted">Check your email for a secure link. It expires in 15 minutes.</p>
          )}
        </div>
      </div>
    </main>
  );
}

