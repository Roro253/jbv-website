'use client';
import { useState, useEffect } from 'react';

interface Props {
  accepted: boolean;
  onChange: (v: boolean) => void;
}

export default function DisclaimerGate({ accepted, onChange }: Props) {
  return (
    <div className="mb-6">
      <div className="border rounded-lg p-4 bg-muted/50">
        <p className="font-bold mb-2">Educational Only</p>
        <p className="text-sm mb-4">
          This tool is for <strong>educational and illustrative purposes only</strong>. It does <strong>not</strong> represent actual or expected results, and is <strong>not investment advice</strong>, a recommendation, or an offer to sell or solicitation to buy any security or interest in any fund. Hypothetical simulations have <strong>inherent limitations</strong> and do not reflect fees, expenses, timing of cash flows, or risk. Past performance is <strong>not</strong> indicative of future results.
        </p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => onChange(e.target.checked)}
          />
          I understand and agree.
        </label>
      </div>
    </div>
  );
}
