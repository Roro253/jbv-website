import AssistantChat from "@/components/AssistantChat";

export const metadata = {
  title: "JBV Assistant",
  description: "Ask about JBV, portfolio, and the latest from our ecosystem.",
};

export default function AssistantPage() {
  return (
    <main className="container-6xl py-10">
      <div className="max-w-3xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-semibold">JBV Assistant</h1>
        <p className="mt-2 text-slate-600">Ask about JBV, portfolio, and the latest from our ecosystem.</p>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl border border-black/10 bg-white/60 backdrop-blur p-4 md:p-6 shadow-sm">
        <AssistantChat />
      </div>
    </main>
  );
}

