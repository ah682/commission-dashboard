/**
 * Represents a single band in a commission scheme
 */
export interface CommissionBand {
  /** Minimum revenue for this band (inclusive) */
  min: number;
  /** Maximum revenue for this band (exclusive, null for unlimited) */
  max: number | null;
  /** Commission rate as a decimal (e.g., 0.10 for 10%) */
  rate: number;
}

/**
 * Breakdown of commission earned in a specific band
 */
export interface CommissionBandBreakdown {
  /** The band configuration */
  band: CommissionBand;
  /** Revenue amount that falls within this band */
  revenueInBand: number;
  /** Commission earned from this band */
  commissionEarned: number;
}

/**
 * Complete commission calculation result
 */
export interface CommissionCalculationResult {
  /** Total revenue input */
  totalRevenue: number;
  /** Total commission earned across all bands */
  totalCommission: number;
  /** Breakdown of commission per band */
  breakdown: CommissionBandBreakdown[];
  /** Timestamp of calculation */
  calculatedAt: Date;
}

/**
 * API request shape for commission calculation
 */
export interface CalculateCommissionRequest {
  revenue: number;
}

/**
 * API response shape for commission calculation
 */
export interface CalculateCommissionResponse {
  success: boolean;
  data?: CommissionCalculationResult;
  error?: string;
}