import { COMMISSION_SCHEME } from '../constants/commissionScheme';
import type { CommissionBandBreakdown } from '../types/commission.types';

/** Round the number's decimal representation to pennies, with ties rounded up. */
function revenueInPence(revenue: number): bigint {
  if (typeof revenue !== 'number') throw new Error('Revenue must be a number');
  if (!Number.isFinite(revenue)) throw new Error('Revenue must be a valid number');
  if (revenue < 0) throw new Error('Revenue cannot be negative');
  if (revenue > Number.MAX_SAFE_INTEGER / 100) {
    throw new Error('Revenue exceeds the supported currency range');
  }
  const [coefficient, exponent = '0'] = revenue.toString().split('e');
  const [whole, fraction = ''] = coefficient.split('.');
  const digits = BigInt(whole + fraction);
  const scale = 2 + Number(exponent) - fraction.length;
  const divisor = scale < 0 ? 10n ** BigInt(-scale) : 1n;
  const pence = scale < 0
    ? (digits + divisor / 2n) / divisor
    : digits * 10n ** BigInt(scale);
  if (pence > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error('Revenue exceeds the supported currency range');
  }
  return pence;
}

export function normalizeRevenue(revenue: number): number {
  return Number(revenueInPence(revenue)) / 100;
}

/** The single calculation used by the dashboard and simulated API.
 * Normalize revenue, round each band's commission half-up, then sum pennies.
 */
export function calculateCommissionAmounts(revenue: number) {
  const pence = revenueInPence(revenue);
  let remaining = pence;
  let total = 0n;
  const breakdown: CommissionBandBreakdown[] = [];

  for (const band of COMMISSION_SCHEME) {
    if (remaining <= 0n) break;
    const capacity = band.max === null ? remaining : BigInt((band.max - band.min) * 100);
    const amount = remaining < capacity ? remaining : capacity;
    const commission = (amount * BigInt(Math.round(band.rate * 100)) + 50n) / 100n;
    total += commission;
    breakdown.push({ band, revenueInBand: Number(amount) / 100, commissionEarned: Number(commission) / 100 });
    remaining -= amount;
  }
  return { totalRevenue: Number(pence) / 100, totalCommission: Number(total) / 100, breakdown };
}
