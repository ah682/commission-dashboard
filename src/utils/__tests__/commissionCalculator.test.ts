import { describe, it, expect } from 'vitest';
import { calculateCommission, COMMISSION_BANDS } from '../commissionCalculator';

describe('commissionCalculator', () => {
  describe('COMMISSION_BANDS', () => {
    it('should have 5 commission bands', () => {
      expect(COMMISSION_BANDS).toHaveLength(5);
    });

    it('should have correct rate structure', () => {
      expect(COMMISSION_BANDS[0].rate).toBe(0);
      expect(COMMISSION_BANDS[1].rate).toBe(0.10);
      expect(COMMISSION_BANDS[2].rate).toBe(0.15);
      expect(COMMISSION_BANDS[3].rate).toBe(0.20);
      expect(COMMISSION_BANDS[4].rate).toBe(0.25);
    });

    it('should have correct band ranges', () => {
      expect(COMMISSION_BANDS[0]).toMatchObject({ min: 0, max: 5000 });
      expect(COMMISSION_BANDS[1]).toMatchObject({ min: 5000, max: 10000 });
      expect(COMMISSION_BANDS[2]).toMatchObject({ min: 10000, max: 15000 });
      expect(COMMISSION_BANDS[3]).toMatchObject({ min: 15000, max: 20000 });
      expect(COMMISSION_BANDS[4]).toMatchObject({ min: 20000, max: null });
    });
  });

  describe('calculateCommission', () => {
    it('should return zero commission for zero revenue', () => {
      const result = calculateCommission(0);
      
      expect(result.totalCommission).toBe(0);
      expect(result.totalRevenue).toBe(0);
      expect(result.effectiveRate).toBe(0);
      expect(result.breakdown).toHaveLength(0);
    });

    it('should return zero commission for revenue under £5k', () => {
      const result = calculateCommission(3000);
      
      expect(result.totalCommission).toBe(0);
      expect(result.totalRevenue).toBe(3000);
      expect(result.effectiveRate).toBe(0);
      expect(result.breakdown).toHaveLength(1);
      expect(result.breakdown[0].commission).toBe(0);
    });

    it('should calculate commission correctly for £8,000 (two bands)', () => {
      const result = calculateCommission(8000);
      
      // £0-5k: £5,000 × 0% = £0
      // £5k-8k: £3,000 × 10% = £300
      expect(result.totalCommission).toBe(300);
      expect(result.totalRevenue).toBe(8000);
      expect(result.effectiveRate).toBeCloseTo(3.75, 2);
      expect(result.breakdown).toHaveLength(2);
    });

    it('should calculate commission correctly for £12,000 (three bands)', () => {
      const result = calculateCommission(12000);
      
      // £0-5k: £5,000 × 0% = £0
      // £5k-10k: £5,000 × 10% = £500
      // £10k-12k: £2,000 × 15% = £300
      expect(result.totalCommission).toBe(800);
      expect(result.totalRevenue).toBe(12000);
      expect(result.effectiveRate).toBeCloseTo(6.67, 2);
      expect(result.breakdown).toHaveLength(3);
    });

    it('should calculate commission correctly for £18,000 (example from spec)', () => {
      const result = calculateCommission(18000);
      
      // £0-5k: £5,000 × 0% = £0
      // £5k-10k: £5,000 × 10% = £500
      // £10k-15k: £5,000 × 15% = £750
      // £15k-18k: £3,000 × 20% = £600
      expect(result.totalCommission).toBe(1850);
      expect(result.totalRevenue).toBe(18000);
      expect(result.effectiveRate).toBeCloseTo(10.28, 2);
      expect(result.breakdown).toHaveLength(4);
    });

    it('should calculate commission correctly for £25,000 (all bands)', () => {
      const result = calculateCommission(25000);
      
      // £0-5k: £5,000 × 0% = £0
      // £5k-10k: £5,000 × 10% = £500
      // £10k-15k: £5,000 × 15% = £750
      // £15k-20k: £5,000 × 20% = £1,000
      // £20k+: £5,000 × 25% = £1,250
      expect(result.totalCommission).toBe(3500);
      expect(result.totalRevenue).toBe(25000);
      expect(result.effectiveRate).toBe(14);
      expect(result.breakdown).toHaveLength(5);
    });

    it('should handle exact band boundaries correctly', () => {
      const result = calculateCommission(5000);
      
      // Should not trigger second band
      expect(result.totalCommission).toBe(0);
      expect(result.breakdown).toHaveLength(1);
    });

    it('should calculate breakdown correctly with proper band details', () => {
      const result = calculateCommission(12000);
      
      expect(result.breakdown[0].band.rate).toBe(0);
      expect(result.breakdown[0].revenue).toBe(5000);
      expect(result.breakdown[0].commission).toBe(0);
      
      expect(result.breakdown[1].band.rate).toBe(0.10);
      expect(result.breakdown[1].revenue).toBe(5000);
      expect(result.breakdown[1].commission).toBe(500);
      
      expect(result.breakdown[2].band.rate).toBe(0.15);
      expect(result.breakdown[2].revenue).toBe(2000);
      expect(result.breakdown[2].commission).toBe(300);
    });

    it('should handle large revenue amounts efficiently', () => {
      const result = calculateCommission(1000000);
      
      expect(result.totalCommission).toBeGreaterThan(0);
      expect(result.breakdown).toHaveLength(5);
      expect(result.breakdown[4].revenue).toBe(980000); // £20k+ band
    });

    it('should handle decimal revenue values', () => {
      const result = calculateCommission(16234.56);
      
      expect(result.totalRevenue).toBe(16234.56);
      expect(result.totalCommission).toBeGreaterThan(0);
      expect(result.effectiveRate).toBeGreaterThan(0);
    });
  });
});