'use client';
import AuroraRibbons from './AuroraRibbons';
import HoloGrid from './HoloGrid';
import AetherField from './AetherField';

export default function ThesisBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none select-none">
      {/* Order matters: grid under, ribbons middle, particles on top */}
      <HoloGrid />
      <AuroraRibbons />
      <AetherField />
    </div>
  );
}

