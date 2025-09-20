import ThesisHero from "@/components/thesis/ThesisHero";
import StackPhases from "@/components/thesis/StackPhases";
import JourneyTracker from "@/components/thesis/JourneyTracker";
import AITimeline from "@/components/thesis/AITimeline";
import Glossary from "@/components/thesis/Glossary";
import PovClosing from "@/components/thesis/PovClosing";

export const dynamic = "force-dynamic";

export default function ThesisPage() {
  return (
    <main className="bg-sky-50 pb-24 pt-16 text-slate-900">
      <div className="container-6xl space-y-24">
        <ThesisHero />
        <StackPhases />
        <JourneyTracker />
        <AITimeline />
        <Glossary />
        <PovClosing />
      </div>
    </main>
  );
}
