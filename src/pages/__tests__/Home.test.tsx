import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import Home from '../Home';
import { WidgetConfigProvider } from '../../contexts/WidgetConfigContext';
import * as useDashboardDataModule from '../../hooks/useDashboardData';

// Mock hooks
vi.mock('../../hooks/useDashboardData');

const wrapper = ({ children }: { children: ReactNode }) => (
  <WidgetConfigProvider>{children}</WidgetConfigProvider>
);

describe('Home Page', () => {
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

  it('should render page header', () => {
    render(<Home />, { wrapper });

    expect(screen.getByText('Recruiter Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Track your progress and calculate commission earnings/i)).toBeInTheDocument();
  });

  it('should render all dashboard sections', () => {
    render(<Home />, { wrapper });

    expect(screen.getByText('Quarterly Conversions & Ratios')).toBeInTheDocument();
    expect(screen.getByText('Monthly Targets')).toBeInTheDocument();
    expect(screen.getByText('Quarterly Targets')).toBeInTheDocument();
    expect(screen.getByText('Monthly Business Development Activities')).toBeInTheDocument();
  });

  it('should render commission section at top', () => {
    render(<Home />, { wrapper });

    expect(screen.getByText('Your Commission Earnings')).toBeInTheDocument();
    expect(screen.getByText('Commission Calculator')).toBeInTheDocument();
    expect(screen.getByText('Commission Scheme')).toBeInTheDocument();
  });

  it('should render leaderboards section', () => {
    render(<Home />, { wrapper });

    expect(screen.getByText("President's Club")).toBeInTheDocument();
  });
});