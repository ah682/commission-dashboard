import { describe, it, expect } from 'vitest';
import { calculateCommissionAPI } from './commissionService';

describe('commissionService', () => {
  describe('calculateCommissionAPI', () => {
    it('should calculate commission correctly for £18,000', async () => {
      const result = await calculateCommissionAPI({ revenue: 18000 });

      expect(result.success).toBe(true);
      expect(result.data?.totalRevenue).toBe(18000);
      expect(result.data?.totalCommission).toBe(1850);
    });

    it('should handle £0 revenue', async () => {
      const result = await calculateCommissionAPI({ revenue: 0 });

      expect(result.success).toBe(true);
      expect(result.data?.totalCommission).toBe(0);
    });

    it('should calculate correctly at band boundaries', async () => {
      // Test £5,000 (boundary between 0% and 10%)
      const result1 = await calculateCommissionAPI({ revenue: 5000 });
      expect(result1.data?.totalCommission).toBe(0);

      // Test £5,001 (just over boundary)
      const result2 = await calculateCommissionAPI({ revenue: 5001 });
      expect(result2.data?.totalCommission).toBeCloseTo(0.10, 2);

      // Test £10,000 (boundary between 10% and 15%)
      const result3 = await calculateCommissionAPI({ revenue: 10000 });
      expect(result3.data?.totalCommission).toBe(500);
    });

    it('should handle large amounts correctly', async () => {
      const result = await calculateCommissionAPI({ revenue: 50000 });

      expect(result.success).toBe(true);
      expect(result.data?.totalCommission).toBe(9000); // All bands applied
    });

    it('should return error for negative revenue', async () => {
      const result = await calculateCommissionAPI({ revenue: -100 });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Revenue cannot be negative');
    });

    it('should return error for non-numeric revenue', async () => {
      const result = await calculateCommissionAPI({ revenue: NaN });

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should provide correct breakdown for each band', async () => {
      const result = await calculateCommissionAPI({ revenue: 18000 });

      expect(result.data?.breakdown).toHaveLength(5);
      expect(result.data?.breakdown[0].commissionEarned).toBe(0); // 0% band
      expect(result.data?.breakdown[1].commissionEarned).toBe(500); // 10% band
      expect(result.data?.breakdown[2].commissionEarned).toBe(750); // 15% band
      expect(result.data?.breakdown[3].commissionEarned).toBe(600); // 20% band
      expect(result.data?.breakdown[4].commissionEarned).toBe(0); // 25% band (no revenue)
    });

    it('should include timestamp in result', async () => {
      const result = await calculateCommissionAPI({ revenue: 10000 });

      expect(result.data?.calculatedAt).toBeInstanceOf(Date);
    });
  });
});