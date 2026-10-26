import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CommissionEarnings from '../CommissionEarnings';
import * as useDashboardDataModule from '../../../hooks/useDashboardData';

// Mock the hooks
vi.mock('../../../hooks/useDashboardData');

describe('CommissionEarnings', () => {
  const mockDashboardData = {
    monthlyTargets: {
      outboundCalls: { current: 8, target: 44 },
      jobsAdded: { current: 11, target: 5 },
      cvsSent: { current: 15, target: 35 },
      firstInterviews: { current: 7, target: 14 },
      totalRevenue: { current: 16200, target: 15000 },
    },
  };

  beforeEach(() => {
    vi.spyOn(useDashboardDataModule, 'useDashboardData').mockReturnValue(mockDashboardData);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render component header', () => {
    render(<CommissionEarnings />);

    expect(screen.getByText('Your Commission Earnings')).toBeInTheDocument();
    expect(screen.getByText('Based on current revenue')).toBeInTheDocument();
  });

  it('should display total commission for £16,200 revenue', () => {
    render(<CommissionEarnings />);

    // £16,200 commission calculation:
    // £0-5k: £0
    // £5k-10k: £500
    // £10k-15k: £750
    // £15k-16.2k: £240
    // Total: £1,490
    expect(screen.getByText(/£1,490/i)).toBeInTheDocument();
  });

  it('should display revenue amount', () => {
    render(<CommissionEarnings />);

    expect(screen.getByText(/From £16,200 revenue/i)).toBeInTheDocument();
  });

  it('should display effective commission rate', () => {
    render(<CommissionEarnings />);

    // Effective rate: 1490 / 16200 * 100 = 9.20%
    expect(screen.getByText(/9.20% effective rate/i)).toBeInTheDocument();
  });

  it('should display commission breakdown section', () => {
    render(<CommissionEarnings />);

    expect(screen.getByText('Commission Breakdown')).toBeInTheDocument();
  });

  it('should display all commission bands', () => {
    render(<CommissionEarnings />);

    expect(screen.getByText('£0 → £5k')).toBeInTheDocument();
    expect(screen.getByText('£5k → £10k')).toBeInTheDocument();
    expect(screen.getByText('£10k → £15k')).toBeInTheDocument();
    expect(screen.getByText('£15k → £20k')).toBeInTheDocument();
  });

  it('should display motivational tip when under £20k', () => {
    render(<CommissionEarnings />);

    expect(screen.getByText('Reach £20k for maximum commission rate')).toBeInTheDocument();
    expect(screen.getByText(/You need £3,800 more/i)).toBeInTheDocument();
  });

  it('should not display motivational tip when at or above £20k', () => {
    vi.spyOn(useDashboardDataModule, 'useDashboardData').mockReturnValue({
      monthlyTargets: {
        ...mockDashboardData.monthlyTargets,
        totalRevenue: { current: 25000, target: 15000 },
      },
    });

    render(<CommissionEarnings />);

    expect(screen.queryByText('Reach £20k for maximum commission rate')).not.toBeInTheDocument();
  });

  it('should handle zero revenue gracefully', () => {
    vi.spyOn(useDashboardDataModule, 'useDashboardData').mockReturnValue({
      monthlyTargets: {
        ...mockDashboardData.monthlyTargets,
        totalRevenue: { current: 0, target: 15000 },
      },
    });

    render(<CommissionEarnings />);

    expect(screen.getByText('£0', { exact: true })).toBeInTheDocument();
  });
});