export const dynamic = "force-dynamic";

import ThesisHero from '@/components/thesis/ThesisHero';
import StackPhases from '@/components/thesis/StackPhases';
import JourneyTracker from '@/components/thesis/JourneyTracker';
import AITimeline from '@/components/thesis/AITimeline';
import Glossary from '@/components/thesis/Glossary';
import PovClosing from '@/components/thesis/PovClosing';

export default function ThesisPage() {
  return (
    <main className="bg-white text-slate-900">
      <ThesisHero />
      <StackPhases />
      <JourneyTracker />
      <AITimeline />
      <Glossary />
      <PovClosing />
    </main>
  );
}
