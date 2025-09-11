'use client';
import { useState } from 'react';
import { z } from 'zod';

export interface Scenario {
  capital: number;
  years: number;
  lens: 'AI' | 'SaaS' | 'Tech';
}

interface Props {
  value: Scenario;
  onChange: (v: Scenario) => void;
}

const numberSchema = z.number().min(1).max(1e12);

export default function ScenarioControls({ value, onChange }: Props) {
  const update = (patch: Partial<Scenario>) => onChange({ ...value, ...patch });
  return (
    <div className="border rounded-lg p-4 mb-6">
      <h2 className="font-semibold mb-4">Scenario Controls</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col text-sm">
          Capital Commitment ($)
          <input
            type="number"
            className="mt-1 rounded border p-2"
            value={value.capital}
            onChange={(e) => {
              const parsed = numberSchema.safeParse(Number(e.target.value));
              update({ capital: parsed.success ? parsed.data : value.capital });
            }}
          />
        </label>
        <label className="flex flex-col text-sm">
          Horizon (years)
          <input
            type="number"
            className="mt-1 rounded border p-2"
            value={value.years}
            onChange={(e) => {
              const parsed = numberSchema.safeParse(Number(e.target.value));
              update({ years: parsed.success ? parsed.data : value.years });
            }}
          />
        </label>
        <div className="flex flex-col text-sm">
          Focus Lens
          <div className="mt-1 flex rounded overflow-hidden border">
            {(['AI','SaaS','Tech'] as const).map((k) => (
              <button
                key={k}
                className={`flex-1 px-3 py-2 ${value.lens===k? 'bg-primary text-white':'bg-background'}`}
                onClick={() => update({ lens: k })}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
