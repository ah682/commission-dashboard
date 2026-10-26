import { describe, expect, it } from 'vitest';
import { calculateCommission as calculateDisplay } from '../commissionCalculator';
import { calculateCommission as calculateService, calculateCommissionAPI } from '../../services/commissionService';

describe('commission currency contract', () => {
  it.each([
    [0, 0], [4999.99, 0], [5000, 0], [5000.01, 0],
    [5000.05, 0.01], [10000, 500], [10000.10, 500.02],
    [15000, 1250], [15000.03, 1250.01], [20000, 2250],
    [20000.02, 2250.01], [25000, 3500], [16234.56, 1496.91],
  ])('returns GBP rounded to pence for revenue %s', (revenue, expected) => {
    expect(calculateDisplay(revenue).totalCommission).toBe(expected);
    expect(calculateService(revenue).totalCommission).toBe(expected);
  });

  it.each([-1, NaN, Infinity, -Infinity])('rejects invalid revenue %s at both entry points', (revenue) => {
    expect(() => calculateDisplay(revenue)).toThrow();
    expect(() => calculateService(revenue)).toThrow();
  });

  it('rounds incoming fractional pence half-up before allocating bands', () => {
    expect(calculateDisplay(5000.045).totalRevenue).toBe(5000.05);
    expect(calculateDisplay(5000.045).totalCommission).toBe(0.01);
    expect(calculateService(5000.045).totalRevenue).toBe(5000.05);
  });

  it('keeps the displayed rounded breakdown equal to its total', () => {
    const result = calculateDisplay(20000.02);
    expect(result.breakdown.map(row => row.commission)).toEqual([0, 500, 750, 1000, 0.01]);
    expect(result.totalCommission).toBe(2250.01);
  });

  it('returns the same rounded currency through the asynchronous API', async () => {
    const result = await calculateCommissionAPI({ revenue: 5000.05 });
    expect(result.success).toBe(true);
    expect(result.data?.totalCommission).toBe(0.01);
  });
});
