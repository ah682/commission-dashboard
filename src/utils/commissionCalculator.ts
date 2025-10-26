export interface CommissionBand {
  min: number;
  max: number | null;
  rate: number;
  label: string;
}

export interface CommissionBreakdown {
  band: CommissionBand;
  revenue: number;
  commission: number;
}

export interface CommissionResult {
  totalRevenue: number;
  totalCommission: number;
  breakdown: CommissionBreakdown[];
  effectiveRate: number;
}

export const COMMISSION_BANDS: CommissionBand[] = [
  { min: 0, max: 5000, rate: 0, label: '£0 → £5k' },
  { min: 5000, max: 10000, rate: 0.10, label: '£5k → £10k' },
  { min: 10000, max: 15000, rate: 0.15, label: '£10k → £15k' },
  { min: 15000, max: 20000, rate: 0.20, label: '£15k → £20k' },
  { min: 20000, max: null, rate: 0.25, label: '£20k+' },
];

export const calculateCommission = (revenue: number): CommissionResult => {
  let remainingRevenue = revenue;
  const breakdown: CommissionBreakdown[] = [];
  let totalCommission = 0;

  for (const band of COMMISSION_BANDS) {
    if (remainingRevenue <= 0) break;

    const bandMax = band.max ?? Infinity;
    const bandSize = bandMax - band.min;
    const revenueInBand = Math.min(remainingRevenue, bandSize);

    if (revenueInBand > 0) {
      const commission = revenueInBand * band.rate;
      totalCommission += commission;

      breakdown.push({
        band,
        revenue: revenueInBand,
        commission,
      });

      remainingRevenue -= revenueInBand;
    }
  }

  const effectiveRate = revenue > 0 ? (totalCommission / revenue) * 100 : 0;

  return {
    totalRevenue: revenue,
    totalCommission,
    breakdown,
    effectiveRate,
  };
};