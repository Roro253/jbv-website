import { z } from "zod";

export function compoundFV(capital: number, r: number, years: number): number {
  return capital * Math.pow(1 + r, years);
}

export function ownershipAfterRounds(
  pre: number,
  check: number,
  dilA: number,
  dilB: number,
  dilC: number,
  proRata: number,
) {
  const own0 = check / (pre + check);
  const own1 = own0 * (1 - dilA * (1 - proRata));
  const own2 = own1 * (1 - dilB * (1 - proRata));
  const own3 = own2 * (1 - dilC * (1 - proRata));
  return { own0, own1, own2, own3 };
}

// Simple seeded RNG
function rng(seed: number) {
  let x = seed % 2147483647;
  if (x <= 0) x += 2147483646;
  return function () {
    x = (x * 16807) % 2147483647;
    return (x - 1) / 2147483646;
  };
}

export interface SimulationParams {
  capital: number;
  years: number;
  deals: number;
  checkPerDeal: number;
  preMoney: number;
  dilA: number;
  dilB: number;
  dilC: number;
  proRata: number; // 0-1
  hitRate: number; // 0-1
  alpha: number;
  xminExit: number;
  sims?: number;
}

export interface SimulationStats {
  values: number[];
  moic: number[];
  median: number;
  p75: number;
  p95: number;
}

export function simulatePrivatePortfolio(params: SimulationParams): SimulationStats {
  const {
    capital,
    years,
    deals,
    checkPerDeal,
    preMoney,
    dilA,
    dilB,
    dilC,
    proRata,
    hitRate,
    alpha,
    xminExit,
    sims = 5000,
  } = params;
  const rnd = rng(42);
  const values: number[] = [];
  const moicArr: number[] = [];
  for (let s = 0; s < sims; s++) {
    let proceeds = 0;
    for (let d = 0; d < deals; d++) {
      const { own3 } = ownershipAfterRounds(preMoney, checkPerDeal, dilA, dilB, dilC, proRata);
      const u = rnd();
      let V = 0;
      if (u < hitRate) {
        const U = rnd();
        V = xminExit / Math.pow(U, 1 / alpha);
      }
      proceeds += V * own3;
    }
    values.push(proceeds);
    moicArr.push(proceeds / capital);
  }
  const sorted = [...moicArr].sort((a, b) => a - b);
  const idx = (p: number) => sorted[Math.floor(p * sorted.length)];
  const median = idx(0.5);
  const p75 = idx(0.75);
  const p95 = idx(0.95);
  return { values, moic: moicArr, median, p75, p95 };
}

if (process.env.NODE_ENV !== 'production') {
  // Acceptance Tests
  const fv = compoundFV(100000, 0.10, 10);
  console.assert(Math.abs(fv - 259374.25) < 0.5, 'Test1 FV', fv);
  const owns = ownershipAfterRounds(5000000, 250000, 0.2, 0.2, 0.2, 0);
  console.assert(Math.abs(owns.own0 - 0.047619) < 1e-6, 'Test2 own0', owns.own0);
  console.assert(Math.abs(owns.own3 - 0.0243809) < 1e-6, 'Test2 own3', owns.own3);
  const irrApprox = Math.pow(3, 1 / 10) - 1;
  console.assert(Math.abs(irrApprox - 0.1161) < 1e-4, 'Test3 irr', irrApprox);
}
