import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CommissionCalculator from './CommissionCalculator';
import * as commissionService from '../../services/commissionService';

// Mock the service
vi.mock('../../services/commissionService');

describe('CommissionCalculator', () => {
  it('should render the component', () => {
    render(<CommissionCalculator />);
    expect(screen.getByText('Commission Calculator')).toBeInTheDocument();
  });

  it('should show empty state initially', () => {
    render(<CommissionCalculator />);
    expect(screen.getByText(/enter a revenue amount/i)).toBeInTheDocument();
  });

  it('should calculate commission when user enters value', async () => {
    const user = userEvent.setup();

    // Mock successful calculation
    vi.mocked(commissionService.calculateCommissionAPI).mockResolvedValue({
      success: true,
      data: {
        totalRevenue: 18000,
        totalCommission: 1850,
        breakdown: [],
        calculatedAt: new Date(),
      },
    });

    render(<CommissionCalculator />);

    const input = screen.getByLabelText(/revenue amount/i);
    await user.type(input, '18000');

    await waitFor(() => {
      expect(screen.getByText('£1,850.00')).toBeInTheDocument();
    });
  });

  it('should show an error returned by the service', async () => {
    const user = userEvent.setup();

    // Mock error response
    vi.mocked(commissionService.calculateCommissionAPI).mockResolvedValue({
      success: false,
      error: 'Revenue cannot be negative',
    });

    render(<CommissionCalculator />);

    const input = screen.getByLabelText(/revenue amount/i);
    await user.type(input, '100');

    await waitFor(() => {
      expect(screen.getByText(/revenue cannot be negative/i)).toBeInTheDocument();
    });
  });

  it('should show loading state during calculation', async () => {
    const user = userEvent.setup();

    // Mock delayed response
    vi.mocked(commissionService.calculateCommissionAPI).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000))
    );

    render(<CommissionCalculator />);

    const input = screen.getByLabelText(/revenue amount/i);
    await user.type(input, '1000');

    // Should show loading spinner
    expect(await screen.findByRole('status')).toHaveAccessibleName('Calculating commission');
  });
  it('does not restore an obsolete result after the input is cleared', async () => {
    const user = userEvent.setup();
    let resolve!: (value: Awaited<ReturnType<typeof commissionService.calculateCommissionAPI>>) => void;
    vi.mocked(commissionService.calculateCommissionAPI).mockImplementation(() => new Promise((done) => { resolve = done; }));
    render(<CommissionCalculator />);
    const input = screen.getByLabelText(/revenue amount/i);
    await user.type(input, '18000');
    await waitFor(() => expect(resolve).toBeDefined());
    await user.clear(input);
    await act(async () => { resolve({ success: true, data: {
      totalRevenue: 18000, totalCommission: 1850, breakdown: [], calculatedAt: new Date(),
    } }); });
    expect(screen.queryByText('£1,850.00')).not.toBeInTheDocument();
    expect(screen.getByText(/enter a revenue amount/i)).toBeInTheDocument();
  });

});