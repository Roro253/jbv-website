import { NextRequest, NextResponse } from "next/server";
import { toolHandlers } from "@/lib/tools";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const ASSISTANT_ID = process.env.ASSISTANT_ID || "";

async function oi(path: string, init?: RequestInit) {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY env var");
  }
  return fetch(`https://api.openai.com/v1/${path}`, {
    ...init,
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v2",
      ...(init?.headers || {}),
    },
  });
}

type RunStatus = "queued" | "in_progress" | "requires_action" | "completed" | "failed" | "cancelled" | "expired";

function extractAssistantText(msg: any): string | undefined {
  if (!msg) return undefined;
  const content = msg.content || [];
  for (const c of content) {
    // v2 may use output_text or text
    if (c.type === "output_text" && c.text?.value) return String(c.text.value);
    if (c.type === "text" && c.text?.value) return String(c.text.value);
  }
  // Fallback: concatenate any string-like values
  try {
    return JSON.stringify(content);
  } catch {
    return undefined;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null) as { message?: string } | null;
    const message = (body?.message || "").trim();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (!ASSISTANT_ID) {
      return NextResponse.json({ error: "Missing ASSISTANT_ID env var" }, { status: 500 });
    }

    // 1) Create thread
    const threadRes = await oi("threads", { method: "POST" });
    if (!threadRes.ok) throw new Error(`Create thread failed: ${threadRes.status}`);
    const thread = await threadRes.json();
    const threadId: string = thread.id;

    // 2) Append user message
    const msgRes = await oi(`threads/${encodeURIComponent(threadId)}/messages`, {
      method: "POST",
      body: JSON.stringify({ role: "user", content: message }),
    });
    if (!msgRes.ok) throw new Error(`Append message failed: ${msgRes.status}`);

    // 3) Create run
    const runRes = await oi(`threads/${encodeURIComponent(threadId)}/runs`, {
      method: "POST",
      body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
    });
    if (!runRes.ok) throw new Error(`Create run failed: ${runRes.status}`);
    const run = await runRes.json();
    const runId: string = run.id;

    // 4) Poll run status
    async function getRun() {
      const r = await oi(`threads/${encodeURIComponent(threadId)}/runs/${encodeURIComponent(runId)}`, { method: "GET" });
      if (!r.ok) throw new Error(`Get run failed: ${r.status}`);
      return r.json();
    }

    // Tool-call handling loop
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const current = await getRun();
      const status: RunStatus = current.status;

      if (status === "requires_action") {
        const calls = current.required_action?.submit_tool_outputs?.tool_calls || [];
        const tool_outputs: Array<{ tool_call_id: string; output: string }> = [];
        for (const call of calls) {
          try {
            const fn = call.function?.name as string | undefined;
            const rawArgs = call.function?.arguments as string | undefined;
            const args = rawArgs ? JSON.parse(rawArgs) : {};
            if (fn && toolHandlers[fn]) {
              const output = await toolHandlers[fn](args);
              tool_outputs.push({ tool_call_id: call.id, output: String(output ?? "") });
            } else {
              tool_outputs.push({ tool_call_id: call.id, output: JSON.stringify({ error: `No handler for ${fn}` }) });
            }
          } catch (e: any) {
            tool_outputs.push({ tool_call_id: call.id, output: JSON.stringify({ error: e?.message || "Tool error" }) });
          }
        }
        const submitRes = await oi(`threads/${encodeURIComponent(threadId)}/runs/${encodeURIComponent(runId)}/submit_tool_outputs`, {
          method: "POST",
          body: JSON.stringify({ tool_outputs }),
        });
        if (!submitRes.ok) throw new Error(`Submit tool outputs failed: ${submitRes.status}`);
        await new Promise((r) => setTimeout(r, 600));
        continue;
      }

      if (status === "completed") break;
      if (status === "failed" || status === "cancelled" || status === "expired") {
        const reason = current.last_error?.message || status;
        throw new Error(`Run ${status}: ${reason}`);
      }
      await new Promise((r) => setTimeout(r, 600));
    }

    // 5) Fetch latest assistant message
    const listRes = await oi(`threads/${encodeURIComponent(threadId)}/messages?limit=10&order=desc`, { method: "GET" });
    if (!listRes.ok) throw new Error(`List messages failed: ${listRes.status}`);
    const list = await listRes.json();
    const messages: any[] = Array.isArray(list.data) ? list.data : [];
    const assistantMsg = messages.find((m) => m.role === "assistant");
    const text = extractAssistantText(assistantMsg) || "(no response)";

    return NextResponse.json({ text }, { status: 200 });
  } catch (e: any) {
    const msg = e?.message || "Assistant error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
