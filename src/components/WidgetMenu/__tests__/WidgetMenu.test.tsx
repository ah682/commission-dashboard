import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import WidgetMenu from '../WidgetMenu';
import { WidgetConfigProvider } from '../../../contexts/WidgetConfigContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <WidgetConfigProvider>{children}</WidgetConfigProvider>
);

describe('WidgetMenu', () => {
  it('should render three-dot button', () => {
    render(<WidgetMenu widgetId="monthly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    expect(button).toBeInTheDocument();
  });

  it('should open dropdown menu when button is clicked', () => {
    render(<WidgetMenu widgetId="monthly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('Show/Hide Cards')).toBeInTheDocument();
  });

  it('should display all cards for the widget', () => {
    render(<WidgetMenu widgetId="monthly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('Outbound Calls')).toBeInTheDocument();
    expect(screen.getByText('Jobs Added')).toBeInTheDocument();
    expect(screen.getByText('CVs Sent')).toBeInTheDocument();
    expect(screen.getByText('1st Interviews Arranged')).toBeInTheDocument();
    expect(screen.getByText('Total Revenue Booked')).toBeInTheDocument();
  });

  it('should have all checkboxes checked by default', () => {
    render(<WidgetMenu widgetId="monthly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it('should toggle card visibility when checkbox is clicked', () => {
    render(<WidgetMenu widgetId="monthly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('should close menu when clicking outside', async () => {
    render(<WidgetMenu widgetId="monthly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('Show/Hide Cards')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Show/Hide Cards')).not.toBeInTheDocument();
    });
  });

  it('should close menu when Done button is clicked', () => {
    render(<WidgetMenu widgetId="monthly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    expect(screen.queryByText('Show/Hide Cards')).not.toBeInTheDocument();
  });

  it('should render different cards for different widgets', () => {
    render(<WidgetMenu widgetId="quarterly-ratios" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('1st Interviews : Placements')).toBeInTheDocument();
    expect(screen.getByText('Jobs Added : Placements')).toBeInTheDocument();
    expect(screen.getByText('CVs Sent : 1st Interviews')).toBeInTheDocument();
  });

  it('should handle quarterly targets widget', () => {
    render(<WidgetMenu widgetId="quarterly-targets" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('Quarterly Revenue Target')).toBeInTheDocument();
  });

  it('should handle monthly BD activities widget', () => {
    render(<WidgetMenu widgetId="monthly-bd-activities" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('Client Meetings')).toBeInTheDocument();
  });

  it('should handle leaderboards widget', () => {
    render(<WidgetMenu widgetId="leaderboards" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('YTD Placements Leaderboard')).toBeInTheDocument();
  });

  it('should handle commission widget', () => {
    render(<WidgetMenu widgetId="commission" />, { wrapper });

    const button = screen.getByLabelText('Widget options');
    fireEvent.click(button);

    expect(screen.getByText('Commission Earnings')).toBeInTheDocument();
    expect(screen.getByText('Commission Calculator')).toBeInTheDocument();
    expect(screen.getByText('Commission Scheme')).toBeInTheDocument();
  });
});