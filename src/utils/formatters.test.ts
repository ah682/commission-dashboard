import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatPercentage,
  isValidPositiveNumber,
  parseInputValue,
} from './formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format positive numbers correctly', () => {
      expect(formatCurrency(1000)).toBe('£1,000.00');
      expect(formatCurrency(18000)).toBe('£18,000.00');
      expect(formatCurrency(1850.5)).toBe('£1,850.50');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('£0.00');
    });

    it('should format without symbol when specified', () => {
      expect(formatCurrency(1000, { showSymbol: false })).toBe('1,000.00');
    });

    it('should respect decimal places option', () => {
      expect(formatCurrency(1000.123, { decimals: 0 })).toBe('£1,000');
      expect(formatCurrency(1000.123, { decimals: 3 })).toBe('£1,000.123');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(0.1)).toBe('10%');
      expect(formatPercentage(0.15)).toBe('15%');
      expect(formatPercentage(0.25)).toBe('25%');
    });

    it('should handle zero', () => {
      expect(formatPercentage(0)).toBe('0%');
    });

    it('should respect decimal places', () => {
      expect(formatPercentage(0.1028, 2)).toBe('10.28%');
      expect(formatPercentage(0.333, 1)).toBe('33.3%');
    });
  });

  describe('isValidPositiveNumber', () => {
    it('should accept valid positive numbers', () => {
      expect(isValidPositiveNumber('100')).toBe(true);
      expect(isValidPositiveNumber('1000.50')).toBe(true);
      expect(isValidPositiveNumber('0')).toBe(true);
    });

    it('should accept empty string', () => {
      expect(isValidPositiveNumber('')).toBe(true);
    });

    it('should reject negative numbers', () => {
      expect(isValidPositiveNumber('-100')).toBe(false);
    });

    it('should reject non-numeric input', () => {
      expect(isValidPositiveNumber('abc')).toBe(false);
      expect(isValidPositiveNumber('12abc')).toBe(false);
    });

    it('should reject infinity', () => {
      expect(isValidPositiveNumber('Infinity')).toBe(false);
    });
  });

  describe('parseInputValue', () => {
    it('should parse valid numbers', () => {
      expect(parseInputValue('100')).toBe(100);
      expect(parseInputValue('1000.50')).toBe(1000.50);
    });

    it('should return 0 for empty string', () => {
      expect(parseInputValue('')).toBe(0);
    });

    it('should return 0 for invalid input', () => {
      expect(parseInputValue('abc')).toBe(0);
    });

    it('should handle edge cases', () => {
      expect(parseInputValue('0')).toBe(0);
      expect(parseInputValue('0.01')).toBe(0.01);
    });
  });
});