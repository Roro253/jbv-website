import { z } from 'zod';

export const kpiSchema = z.object({
  fmvPerShare: z.number().nonnegative().default(0),
  fmvMarketCap: z.number().nonnegative().default(0),
  mcapToNtmMultiple: z.number().nonnegative().default(0),
  investPrice: z.number().nonnegative().default(0),
  investMktCap: z.number().nonnegative().default(0),
  investMultiple: z.number().nonnegative().default(0),
  fullyDilutedShares: z.number().nonnegative().default(0),
  ntmRevenue: z.number().nonnegative().default(0),
  lastFundingRoundLabel: z.string().default(''),
  currentGrowthPct: z.number().default(0),
});

const dataSchema = z.object({
  kpis: kpiSchema,
});

export type NormalizedData = z.infer<typeof dataSchema>;

const defaultData: NormalizedData = {
  kpis: {
    fmvPerShare: 0,
    fmvMarketCap: 0,
    mcapToNtmMultiple: 0,
    investPrice: 0,
    investMktCap: 0,
    investMultiple: 0,
    fullyDilutedShares: 0,
    ntmRevenue: 0,
    lastFundingRoundLabel: '',
    currentGrowthPct: 0,
  },
};

export async function loadInvestmentData(): Promise<NormalizedData> {
  try {
    // Placeholder data; replace with real fetch later
    const response = await Promise.resolve({
      kpis: {
        fmvPerShare: 5.5,
        fmvMarketCap: 1_500_000_000,
        mcapToNtmMultiple: 15,
        investPrice: 5.17,
        investMktCap: 1_400_000_000,
        investMultiple: 14,
        fullyDilutedShares: 270_517_628,
        ntmRevenue: 165_000_000,
        lastFundingRoundLabel: 'July 2024',
        currentGrowthPct: 0.45,
      },
    });

    const parsed = dataSchema.safeParse(response);
    if (parsed.success) {
      return {
        kpis: { ...defaultData.kpis, ...parsed.data.kpis },
      };
    }
  } catch {
    // ignore errors and fall through to default
  }
  return defaultData;
}
