export type WidgetId = 
  | 'monthly-targets'
  | 'quarterly-targets'
  | 'quarterly-ratios'
  | 'monthly-bd-activities'
  | 'leaderboards'
  | 'commission';

export type CardId = string; // e.g., 'outbound-calls', 'jobs-added', etc.

export interface CardConfig {
  id: CardId;
  label: string;
  visible: boolean;
  order: number;
}

export interface WidgetConfig {
  id: WidgetId;
  label: string;
  visible: boolean;
  cards: CardConfig[];
}

export interface DashboardConfig {
  widgets: Record<WidgetId, WidgetConfig>;
}