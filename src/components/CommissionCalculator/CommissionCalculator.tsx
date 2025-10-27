import { useState, useEffect, useCallback } from 'react';
import type { CommissionCalculationResult } from '../../types/commission.types';
import { calculateCommissionAPI } from '../../services/commissionService';
import { parseInputValue } from '../../utils/formatters';
import CommissionInput from './CommissionInput';
import CommissionBreakdown from './CommissionBreakdown';

/**
 * Main Commission Calculator Widget Component
 * 
 * Provides an interactive interface for calculating commission based on revenue input.
 * Matches the OneUp dashboard widget design style.
 */
const CommissionCalculator = () => {
  const [revenueInput, setRevenueInput] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<CommissionCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Debounced calculation function
   */
  const calculateCommission = useCallback(async (revenue: number) => {
    if (revenue <= 0) {
      setCalculationResult(null);
      setError(null);
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      const response = await calculateCommissionAPI({ revenue });

      if (response.success && response.data) {
        setCalculationResult(response.data);
      } else {
        setError(response.error || 'Failed to calculate commission');
        setCalculationResult(null);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setCalculationResult(null);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  /**
   * Effect to trigger calculation when input changes (with debounce)
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const revenue = parseInputValue(revenueInput);
      calculateCommission(revenue);
    }, 400); // 400ms debounce

    return () => clearTimeout(timeoutId);
  }, [revenueInput, calculateCommission]);

  /**
   * Handles input change with validation
   */
  const handleInputChange = (value: string) => {
    setRevenueInput(value);
  };

  return (
    <div className="card bg-base-100 shadow-md rounded-lg h-full">
      <div className="card-body p-6">
        {/* Widget Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-neutral">
            Commission Calculator
          </h2>
        </div>

        {/* Revenue Input */}
        <CommissionInput
          value={revenueInput}
          onChange={handleInputChange}
          isCalculating={isCalculating}
          error={error}
        />

        {/* Calculation Results */}
        {calculationResult && !error && (
          <CommissionBreakdown
            result={calculationResult}
            isCalculating={isCalculating}
          />
        )}

        {/* Empty State */}
        {!calculationResult && !error && !isCalculating && revenueInput === '' && (
          <div className="text-center py-12 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm font-medium">
              Enter a revenue amount to calculate your commission
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionCalculator;