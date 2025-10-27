import { describe, it, expect } from 'vitest';
import {
  isValidPositiveNumber,
  parseInputValue,
  formatCurrency,
  formatPercentage,
} from '../formatters';

describe('formatters', () => {
  describe('isValidPositiveNumber', () => {
    it('should accept valid positive integers', () => {
      expect(isValidPositiveNumber('123')).toBe(true);
      expect(isValidPositiveNumber('0')).toBe(true);
      expect(isValidPositiveNumber('999999')).toBe(true);
    });

    it('should accept valid positive decimals', () => {
      expect(isValidPositiveNumber('123.45')).toBe(true);
      expect(isValidPositiveNumber('0.5')).toBe(true);
      expect(isValidPositiveNumber('1234.56789')).toBe(true);
    });

    it('should accept numbers with leading zeros', () => {
      expect(isValidPositiveNumber('0123')).toBe(true);
      expect(isValidPositiveNumber('00.5')).toBe(true);
    });

    it('should reject negative numbers', () => {
      expect(isValidPositiveNumber('-123')).toBe(false);
      expect(isValidPositiveNumber('-0.5')).toBe(false);
    });

    it('should reject non-numeric strings', () => {
      expect(isValidPositiveNumber('abc')).toBe(false);
      expect(isValidPositiveNumber('12a34')).toBe(false);
      expect(isValidPositiveNumber('£123')).toBe(false);
    });

    it('should reject multiple decimal points', () => {
      expect(isValidPositiveNumber('12.34.56')).toBe(false);
    });

    it('should reject empty strings', () => {
      expect(isValidPositiveNumber('')).toBe(false);
    });
  });

  describe('parseInputValue', () => {
    it('should parse valid number strings', () => {
      expect(parseInputValue('123')).toBe(123);
      expect(parseInputValue('123.45')).toBe(123.45);
      expect(parseInputValue('0.5')).toBe(0.5);
    });

    it('should return 0 for empty string', () => {
      expect(parseInputValue('')).toBe(0);
    });

    it('should return 0 for invalid inputs', () => {
      expect(parseInputValue('abc')).toBe(0);
      expect(parseInputValue('£123')).toBe(0);
    });

    it('should handle leading/trailing whitespace', () => {
      expect(parseInputValue('  123  ')).toBe(123);
      expect(parseInputValue('  123.45  ')).toBe(123.45);
    });

    it('should handle very large numbers', () => {
      expect(parseInputValue('999999999')).toBe(999999999);
    });
  });

  describe('formatCurrency', () => {
    it('should format integers with pound symbol', () => {
      expect(formatCurrency(1000)).toBe('£1,000');
      expect(formatCurrency(5000)).toBe('£5,000');
      expect(formatCurrency(100000)).toBe('£100,000');
    });

    it('should format decimals to 2 decimal places', () => {
      expect(formatCurrency(1234.56)).toBe('£1,234.56');
      expect(formatCurrency(99.99)).toBe('£99.99');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('£0.00');
    });

    it('should include thousands separators', () => {
      expect(formatCurrency(1000000)).toBe('£1,000,000.00');
      expect(formatCurrency(12345678)).toBe('£12,345,678.00');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-1000)).toBe('-£1,000.00');
    });

    it('should round to 2 decimal places', () => {
      expect(formatCurrency(1234.567)).toBe('£1,234.57');
      expect(formatCurrency(1234.564)).toBe('£1,234.56');
    });
  });

  describe('formatPercentage', () => {
    it('should format decimals as percentages with default precision', () => {
      expect(formatPercentage(0.5)).toBe('50%');
      expect(formatPercentage(0.25)).toBe('25%');
      expect(formatPercentage(1)).toBe('100%');
    });

    it('should handle custom precision', () => {
      expect(formatPercentage(0.12345, 2)).toBe('12.35%');
      expect(formatPercentage(0.12345, 3)).toBe('12.345%');
      expect(formatPercentage(0.12345, 0)).toBe('12%');
    });

    it('should handle zero', () => {
      expect(formatPercentage(0)).toBe('0%');
    });

    it('should handle values over 1', () => {
      expect(formatPercentage(1.5)).toBe('150%');
      expect(formatPercentage(2.2)).toBe('220%');
    });

    it('should handle very small percentages', () => {
      expect(formatPercentage(0.001)).toBe('0.1%');
      expect(formatPercentage(0.0001, 2)).toBe('0.01%');
    });

    it('should round appropriately', () => {
      expect(formatPercentage(0.12349, 2)).toBe('12.35%');
      expect(formatPercentage(0.12344, 2)).toBe('12.34%');
    });
  });
});