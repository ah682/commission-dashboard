import type { CommissionBand } from '../types/commission.types';

/**
 * Static commission scheme as specified in the requirements
 * 
 * Bands work like tax brackets - each band only applies to the revenue
 * that falls within that specific range.
 * 
 * Example: £18,000 revenue
 * - £0-£5k: £0 (0% of £5,000)
 * - £5k-£10k: £500 (10% of £5,000)
 * - £10k-£15k: £750 (15% of £5,000)
 * - £15k-£18k: £600 (20% of £3,000)
 * Total: £1,850
 */
export const COMMISSION_SCHEME: CommissionBand[] = [
  {
    min: 0,
    max: 5000,
    rate: 0, // 0%
  },
  {
    min: 5000,
    max: 10000,
    rate: 0.10, // 10%
  },
  {
    min: 10000,
    max: 15000,
    rate: 0.15, // 15%
  },
  {
    min: 15000,
    max: 20000,
    rate: 0.20, // 20%
  },
  {
    min: 20000,
    max: null, // Unlimited
    rate: 0.25, // 25%
  },
];

/**
 * Currency symbol used throughout the application
 */
export const CURRENCY_SYMBOL = '£';

/**
 * Currency code for formatting
 */
export const CURRENCY_CODE = 'GBP';