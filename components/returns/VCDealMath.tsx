'use client';
import { useState } from 'react';
import { ownershipAfterRounds } from '@/lib/returns/math';
import { Scenario } from './ScenarioControls';

interface Props {
  scenario: Scenario;
  accepted: boolean;
}

export default function VCDealMath({ scenario, accepted }: Props) {
  const [inputs, setInputs] = useState({
    investment: 250000,
    pre: 5000000,
    dilA: 0.2,
    dilB: 0.2,
    dilC: 0.2,
    proRata: 0,
    exit: 500000000,
    years: scenario.years,
  });
  const own = ownershipAfterRounds(inputs.pre, inputs.investment, inputs.dilA, inputs.dilB, inputs.dilC, inputs.proRata);
  const proceeds = inputs.exit * own.own3;
  const moic = proceeds / inputs.investment;
  const irr = Math.pow(moic, 1 / inputs.years) - 1;
  return (
    <div className={accepted ? '' : 'pointer-events-none opacity-50'}>
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">VC Math (Deal)</h3>
        <p className="text-sm mb-2">Final Ownership: {(own.own3 * 100).toFixed(2)}%</p>
        <p className="text-sm mb-2">Gross Proceeds: {proceeds.toFixed(2)}</p>
        <p className="text-sm mb-2">MOIC: {moic.toFixed(2)}</p>
        <p className="text-sm">IRR Approx: {(irr * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
}
