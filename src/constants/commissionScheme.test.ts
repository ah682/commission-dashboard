import { describe, it, expect } from 'vitest';
import { COMMISSION_SCHEME, CURRENCY_SYMBOL, CURRENCY_CODE } from './commissionScheme';

describe('commissionScheme', () => {
  it('should have 5 commission bands', () => {
    expect(COMMISSION_SCHEME).toHaveLength(5);
  });

  it('should have correct band structure', () => {
    expect(COMMISSION_SCHEME[0]).toEqual({ min: 0, max: 5000, rate: 0 });
    expect(COMMISSION_SCHEME[1]).toEqual({ min: 5000, max: 10000, rate: 0.10 });
    expect(COMMISSION_SCHEME[2]).toEqual({ min: 10000, max: 15000, rate: 0.15 });
    expect(COMMISSION_SCHEME[3]).toEqual({ min: 15000, max: 20000, rate: 0.20 });
    expect(COMMISSION_SCHEME[4]).toEqual({ min: 20000, max: null, rate: 0.25 });
  });

  it('should have no gaps between bands', () => {
    for (let i = 0; i < COMMISSION_SCHEME.length - 1; i++) {
      const currentBand = COMMISSION_SCHEME[i];
      const nextBand = COMMISSION_SCHEME[i + 1];
      expect(currentBand.max).toBe(nextBand.min);
    }
  });

  it('should have ascending rates', () => {
    for (let i = 0; i < COMMISSION_SCHEME.length - 1; i++) {
      const currentRate = COMMISSION_SCHEME[i].rate;
      const nextRate = COMMISSION_SCHEME[i + 1].rate;
      expect(nextRate).toBeGreaterThanOrEqual(currentRate);
    }
  });

  it('should have correct currency configuration', () => {
    expect(CURRENCY_SYMBOL).toBe('£');
    expect(CURRENCY_CODE).toBe('GBP');
  });
});