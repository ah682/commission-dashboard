import { COMMISSION_SCHEME } from '../constants/commissionScheme';
import { calculateCommissionAmounts } from './commissionEngine';

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

export const COMMISSION_BANDS: CommissionBand[] = COMMISSION_SCHEME.map((band) => ({
  ...band,
  label: band.max === null ? `£${band.min / 1000}k+` : `${band.min === 0 ? '£0' : `£${band.min / 1000}k`} → £${band.max / 1000}k`,
}));

export const calculateCommission = (revenue: number): CommissionResult => {
  const result = calculateCommissionAmounts(revenue);
  const { totalRevenue, totalCommission } = result;
  const breakdown = result.breakdown.map((row, index) => ({
    band: COMMISSION_BANDS[index], revenue: row.revenueInBand, commission: row.commissionEarned,
  }));
  const effectiveRate = totalRevenue > 0 ? (totalCommission * 100) / totalRevenue : 0;

  return {
    totalRevenue,
    totalCommission,
    breakdown,
    effectiveRate,
  };
};
