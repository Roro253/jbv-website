"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

const EXAMPLES = [
  "What does JBV invest in?",
  "Who is on the JBV team?",
  "Show latest from OpenAI",
  "What’s new at Anthropic about safety?",
];

export default function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(() => !loading && input.trim().length > 0, [loading, input]);

  useEffect(() => {
    // Auto-scroll to bottom on update
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const doSend = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setError(null);
    const now = Date.now();
    setMessages((m) => [...m, { role: "user", content: trimmed, ts: now }]);
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setMessages((m) => [...m, { role: "assistant", content: String(data.text || "(no response)"), ts: Date.now() }]);
      setInput("");
    } catch (e: any) {
      setError(e?.message || "Failed to contact assistant");
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (canSend) doSend(input);
  }, [canSend, doSend, input]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) doSend(input);
    }
  }, [canSend, doSend, input]);

  const copy = useCallback(async (txt: string) => {
    try { await navigator.clipboard.writeText(txt); } catch {}
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {error && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div>
      )}

      {/* Example chips */}
      <div className="mb-3 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className="px-3 py-1.5 rounded-full border border-black/10 text-sm hover:bg-slate-50"
            onClick={() => doSend(ex)}
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="h-[70vh] w-full rounded-2xl border border-black/10 bg-white/70 backdrop-blur overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`${m.role === "user" ? "bg-slate-900 text-white" : "bg-gradient-to-br from-slate-50 to-white text-slate-900 border"} relative max-w-[85%] rounded-2xl px-4 py-3 border-black/10 shadow-sm`}
                 title={new Date(m.ts).toLocaleString()}>
              <div className="whitespace-pre-wrap leading-6 text-sm">{m.content}</div>
              {m.role === "assistant" && (
                <button
                  onClick={() => copy(m.content)}
                  className="absolute -top-2 -right-2 h-7 w-7 rounded-full border border-black/10 bg-white/80 backdrop-blur text-slate-700 hover:bg-white text-xs"
                  aria-label="Copy message"
                >
                  ⧉
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="relative max-w-[85%] rounded-2xl px-4 py-3 bg-gradient-to-br from-slate-50 to-white text-slate-900 border border-black/10 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="inline-block h-2 w-2 rounded-full bg-slate-400 animate-pulse" />
                Typing…
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask anything about JBV or our ecosystem…"
          className="flex-1 min-h-[46px] max-h-40 rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="h-[46px] px-4 rounded-xl bg-slate-900 text-white disabled:opacity-50"
        >
          {loading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}

