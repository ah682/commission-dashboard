import { CURRENCY_CODE, CURRENCY_SYMBOL } from '../constants/commissionScheme';

/**
 * Formats a number as currency with proper thousands separators
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  options: {
    showSymbol?: boolean;
    decimals?: number;
  } = {}
): string => {
  const { showSymbol = true, decimals = 2 } = options;

  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  // Show Symbol
  if (!showSymbol) {
    return formatted.replace(CURRENCY_SYMBOL, '').trim();
  }

  return formatted;
};

/**
 * Formats a percentage with proper decimal places
 * @param rate - The rate as a decimal (e.g., 0.10 for 10%)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (rate: number, decimals?: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent', minimumFractionDigits: decimals ?? 0, maximumFractionDigits: decimals ?? 1,
  }).format(rate);
};

/**
 * Validates if a string can be parsed as a positive number
 * @param value - The string value to validate
 * @returns True if valid, false otherwise
 */
export const isValidPositiveNumber = (value: string): boolean => {
  return /^(?:\d+\.?\d*|\.\d+)$/.test(value) && Number.isFinite(Number(value));
};

/**
 * Parses a string input to a number, handling edge cases
 * @param value - The string value to parse
 * @returns Parsed number or 0 if invalid
 */
export const parseInputValue = (value: string): number => {
  const input = value?.trim() ?? '';
  return isValidPositiveNumber(input) ? Number(input) : 0;
};