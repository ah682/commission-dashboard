import type {
  CalculateCommissionRequest,
  CalculateCommissionResponse,
  CommissionCalculationResult,
} from '../types/commission.types';
import { calculateCommissionAmounts } from '../utils/commissionEngine';

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
  return { ...calculateCommissionAmounts(revenue), calculatedAt: new Date() };
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