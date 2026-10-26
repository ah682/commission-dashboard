import { createContext, useContext } from 'react';
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

export const WidgetConfigContext = createContext<WidgetConfigContextType | undefined>(undefined);

export const useWidgetConfig = () => {
  const context = useContext(WidgetConfigContext);
  if (!context) {
    throw new Error('useWidgetConfig must be used within WidgetConfigProvider');
  }
  return context;
};
