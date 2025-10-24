import type {
  CalculateCommissionRequest,
  CalculateCommissionResponse,
  CommissionCalculationResult,
  CommissionBandBreakdown,
} from '../types/commission.types';
import { COMMISSION_SCHEME } from '../constants/commissionScheme';

/**
 * Simulated API delay to mimic real backend behavior
 */
const API_DELAY_MS = 300;

/**
 * Calculates commission based on revenue input and commission scheme
 * 
 * This function implements a progressive/tiered commission structure
 * similar to tax brackets, where each band only applies to the revenue
 * that falls within that specific range.
 * 
 * @param revenue - Total revenue amount
 * @returns Commission calculation result with breakdown
 */
const calculateCommission = (revenue: number): CommissionCalculationResult => {
  if (revenue < 0) {
    throw new Error('Revenue cannot be negative');
  }

  if (!isFinite(revenue)) {
    throw new Error('Revenue must be a valid number');
  }

  const breakdown: CommissionBandBreakdown[] = [];
  let totalCommission = 0;
  let remainingRevenue = revenue;

  // Process each band in order
  for (const band of COMMISSION_SCHEME) {
    if (remainingRevenue <= 0) break;

    // Calculate the size of this band
    const bandSize = band.max === null 
      ? Infinity 
      : band.max - band.min;

    // Determine how much revenue falls in this band
    const revenueInBand = Math.min(remainingRevenue, bandSize);

    // Calculate commission for this band
    const commissionEarned = revenueInBand * band.rate;

    // Add to breakdown
    breakdown.push({
      band,
      revenueInBand,
      commissionEarned,
    });

    // Update totals
    totalCommission += commissionEarned;
    remainingRevenue -= revenueInBand;
  }

  return {
    totalRevenue: revenue,
    totalCommission,
    breakdown,
    calculatedAt: new Date(),
  };
};

/**
 * Simulates an API call to calculate commission
 * 
 * In a production environment, this would make an HTTP request to a backend service.
 * For this demo, we simulate the API behavior with a delay and local calculation.
 * 
 * @param request - Commission calculation request
 * @returns Promise resolving to commission calculation response
 */
export const calculateCommissionAPI = async (
  request: CalculateCommissionRequest
): Promise<CalculateCommissionResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));

  try {
    // Validate input
    if (typeof request.revenue !== 'number') {
      return {
        success: false,
        error: 'Revenue must be a number',
      };
    }

    if (request.revenue < 0) {
      return {
        success: false,
        error: 'Revenue cannot be negative',
      };
    }

    if (!isFinite(request.revenue)) {
      return {
        success: false,
        error: 'Revenue must be a valid number',
      };
    }

    // Calculate commission
    const result = calculateCommission(request.revenue);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Export for testing purposes
 * @internal
 */
export { calculateCommission };