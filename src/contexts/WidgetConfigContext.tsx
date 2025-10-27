import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { DashboardConfig, WidgetId, CardId, WidgetConfig } from '../types/widgetConfig.types';

interface WidgetConfigContextType {
  config: DashboardConfig;
  toggleCardVisibility: (widgetId: WidgetId, cardId: CardId) => void;
  toggleWidgetVisibility: (widgetId: WidgetId) => void;
  isCardVisible: (widgetId: WidgetId, cardId: CardId) => boolean;
  isWidgetVisible: (widgetId: WidgetId) => boolean;
  getWidgetConfig: (widgetId: WidgetId) => WidgetConfig | undefined;
  resetToDefaults: () => void;
}

const WidgetConfigContext = createContext<WidgetConfigContextType | undefined>(undefined);

const DEFAULT_CONFIG: DashboardConfig = {
  widgets: {
    'monthly-targets': {
      id: 'monthly-targets',
      label: 'Monthly Targets',
      visible: true,
      cards: [
        { id: 'outbound-calls', label: 'Outbound Calls', visible: true, order: 0 },
        { id: 'jobs-added', label: 'Jobs Added', visible: true, order: 1 },
        { id: 'cvs-sent', label: 'CVs Sent', visible: true, order: 2 },
        { id: 'first-interviews', label: '1st Interviews Arranged', visible: true, order: 3 },
        { id: 'total-revenue', label: 'Total Revenue Booked', visible: true, order: 4 },
      ],
    },
    'quarterly-targets': {
      id: 'quarterly-targets',
      label: 'Quarterly Targets',
      visible: true,
      cards: [
        { id: 'quarterly-revenue', label: 'Quarterly Revenue Target', visible: true, order: 0 },
        { id: 'quarterly-team-revenue', label: 'Quarterly Team Revenue Target', visible: true, order: 1 },
        { id: 'quarterly-jobs', label: 'Quarterly Jobs Added Target', visible: true, order: 2 },
        { id: 'quarterly-bd-calls', label: 'Quarterly BD Calls Target', visible: true, order: 3 },
      ],
    },
    'quarterly-ratios': {
      id: 'quarterly-ratios',
      label: 'Quarterly Conversions & Ratios',
      visible: true,
      cards: [
        { id: 'interviews-placements', label: '1st Interviews : Placements', visible: true, order: 0 },
        { id: 'jobs-placements', label: 'Jobs Added : Placements', visible: true, order: 1 },
        { id: 'cvs-interviews', label: 'CVs Sent : 1st Interviews', visible: true, order: 2 },
        { id: 'revenue-placements', label: 'Total Revenue Booked : Total Placements', visible: true, order: 3 },
      ],
    },
    'monthly-bd-activities': {
      id: 'monthly-bd-activities',
      label: 'Monthly Business Development Activities',
      visible: true,
      cards: [
        { id: 'client-meetings', label: 'Client Meetings', visible: true, order: 0 },
        { id: 'jobs-added-bd', label: 'Jobs Added', visible: true, order: 1 },
        { id: 'bd-calls', label: 'BD Calls', visible: true, order: 2 },
        { id: 'bd-emails', label: 'BD Emails', visible: true, order: 3 },
        { id: 'bd-activity', label: 'BD Activity', visible: true, order: 4 },
      ],
    },
    'leaderboards': {
      id: 'leaderboards',
      label: 'Leaderboards',
      visible: true,
      cards: [
        { id: 'ytd-placements', label: 'YTD Placements Leaderboard', visible: true, order: 0 },
        { id: 'president-club-spotlight', label: "President's Club Spotlight", visible: true, order: 1 },
        { id: 'president-club-list', label: "President's Club Leaderboard", visible: true, order: 2 },
      ],
    },
    'commission': {
      id: 'commission',
      label: 'Commission',
      visible: true,
      cards: [
        { id: 'earnings', label: 'Commission Earnings', visible: true, order: 0 },
        { id: 'calculator', label: 'Commission Calculator', visible: true, order: 1 },
        { id: 'scheme', label: 'Commission Scheme', visible: true, order: 2 },
      ],
    },
  },
};

const STORAGE_KEY = 'dashboard-widget-config';

export const WidgetConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<DashboardConfig>(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored config:', error);
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const toggleCardVisibility = (widgetId: WidgetId, cardId: CardId) => {
    setConfig((prev) => {
      const widget = prev.widgets[widgetId];
      if (!widget) return prev;

      const updatedCards = widget.cards.map((card) =>
        card.id === cardId ? { ...card, visible: !card.visible } : card
      );

      return {
        ...prev,
        widgets: {
          ...prev.widgets,
          [widgetId]: {
            ...widget,
            cards: updatedCards,
          },
        },
      };
    });
  };

  const toggleWidgetVisibility = (widgetId: WidgetId) => {
    setConfig((prev) => {
      const widget = prev.widgets[widgetId];
      if (!widget) return prev;

      return {
        ...prev,
        widgets: {
          ...prev.widgets,
          [widgetId]: {
            ...widget,
            visible: !widget.visible,
          },
        },
      };
    });
  };

  const isCardVisible = (widgetId: WidgetId, cardId: CardId): boolean => {
    const widget = config.widgets[widgetId];
    if (!widget || !widget.visible) return false;

    const card = widget.cards.find((c) => c.id === cardId);
    return card?.visible ?? false;
  };

  const isWidgetVisible = (widgetId: WidgetId): boolean => {
    return config.widgets[widgetId]?.visible ?? false;
  };

  const getWidgetConfig = (widgetId: WidgetId): WidgetConfig | undefined => {
    return config.widgets[widgetId];
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <WidgetConfigContext.Provider
      value={{
        config,
        toggleCardVisibility,
        toggleWidgetVisibility,
        isCardVisible,
        isWidgetVisible,
        getWidgetConfig,
        resetToDefaults,
      }}
    >
      {children}
    </WidgetConfigContext.Provider>
  );
};

export const useWidgetConfig = () => {
  const context = useContext(WidgetConfigContext);
  if (!context) {
    throw new Error('useWidgetConfig must be used within WidgetConfigProvider');
  }
  return context;
};