import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { WidgetConfigProvider, useWidgetConfig } from './WidgetConfigContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('WidgetConfigContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <WidgetConfigProvider>{children}</WidgetConfigProvider>
  );

  describe('Context Provider', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useWidgetConfig());
      }).toThrow('useWidgetConfig must be used within WidgetConfigProvider');

      consoleSpy.mockRestore();
    });

    it('should provide default configuration on mount', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      expect(result.current.config).toBeDefined();
      expect(result.current.config.widgets).toBeDefined();
      expect(Object.keys(result.current.config.widgets)).toHaveLength(6);
    });

    it('should initialize all widgets as visible by default', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      expect(result.current.isWidgetVisible('monthly-targets')).toBe(true);
      expect(result.current.isWidgetVisible('quarterly-targets')).toBe(true);
      expect(result.current.isWidgetVisible('quarterly-ratios')).toBe(true);
      expect(result.current.isWidgetVisible('monthly-bd-activities')).toBe(true);
      expect(result.current.isWidgetVisible('leaderboards')).toBe(true);
      expect(result.current.isWidgetVisible('commission')).toBe(true);
    });

    it('should initialize all cards as visible by default', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      expect(result.current.isCardVisible('monthly-targets', 'outbound-calls')).toBe(true);
      expect(result.current.isCardVisible('monthly-targets', 'jobs-added')).toBe(true);
      expect(result.current.isCardVisible('quarterly-ratios', 'interviews-placements')).toBe(true);
    });
  });

  describe('toggleCardVisibility', () => {
    it('should toggle card visibility from visible to hidden', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleCardVisibility('monthly-targets', 'outbound-calls');
      });

      expect(result.current.isCardVisible('monthly-targets', 'outbound-calls')).toBe(false);
    });

    it('should toggle card visibility from hidden to visible', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleCardVisibility('monthly-targets', 'outbound-calls');
      });
      expect(result.current.isCardVisible('monthly-targets', 'outbound-calls')).toBe(false);

      act(() => {
        result.current.toggleCardVisibility('monthly-targets', 'outbound-calls');
      });
      expect(result.current.isCardVisible('monthly-targets', 'outbound-calls')).toBe(true);
    });

    it('should not affect other cards when toggling', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleCardVisibility('monthly-targets', 'outbound-calls');
      });

      expect(result.current.isCardVisible('monthly-targets', 'jobs-added')).toBe(true);
      expect(result.current.isCardVisible('monthly-targets', 'cvs-sent')).toBe(true);
    });

    it('should not affect cards in other widgets', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleCardVisibility('monthly-targets', 'outbound-calls');
      });

      expect(result.current.isCardVisible('quarterly-ratios', 'interviews-placements')).toBe(true);
    });

    it('should handle non-existent widget gracefully', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleCardVisibility('non-existent' as any, 'some-card');
      });

      // Should not throw error
      expect(result.current.config).toBeDefined();
    });
  });

  describe('toggleWidgetVisibility', () => {
    it('should toggle widget visibility from visible to hidden', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleWidgetVisibility('monthly-targets');
      });

      expect(result.current.isWidgetVisible('monthly-targets')).toBe(false);
    });

    it('should toggle widget visibility from hidden to visible', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleWidgetVisibility('monthly-targets');
      });
      expect(result.current.isWidgetVisible('monthly-targets')).toBe(false);

      act(() => {
        result.current.toggleWidgetVisibility('monthly-targets');
      });
      expect(result.current.isWidgetVisible('monthly-targets')).toBe(true);
    });

    it('should not affect other widgets when toggling', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleWidgetVisibility('monthly-targets');
      });

      expect(result.current.isWidgetVisible('quarterly-targets')).toBe(true);
      expect(result.current.isWidgetVisible('quarterly-ratios')).toBe(true);
    });

    it('should hide all cards when widget is hidden', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleWidgetVisibility('monthly-targets');
      });

      // Cards should report as not visible when widget is hidden
      expect(result.current.isCardVisible('monthly-targets', 'outbound-calls')).toBe(false);
      expect(result.current.isCardVisible('monthly-targets', 'jobs-added')).toBe(false);
    });
  });

  describe('getWidgetConfig', () => {
    it('should return widget configuration', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      const widgetConfig = result.current.getWidgetConfig('monthly-targets');

      expect(widgetConfig).toBeDefined();
      expect(widgetConfig?.id).toBe('monthly-targets');
      expect(widgetConfig?.label).toBe('Monthly Targets');
      expect(widgetConfig?.cards).toHaveLength(5);
    });

    it('should return undefined for non-existent widget', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      const widgetConfig = result.current.getWidgetConfig('non-existent' as any);

      expect(widgetConfig).toBeUndefined();
    });
  });

  describe('resetToDefaults', () => {
    it('should reset all configurations to default state', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      // Make some changes
      act(() => {
        result.current.toggleWidgetVisibility('monthly-targets');
        result.current.toggleCardVisibility('quarterly-ratios', 'interviews-placements');
      });

      expect(result.current.isWidgetVisible('monthly-targets')).toBe(false);
      expect(result.current.isCardVisible('quarterly-ratios', 'interviews-placements')).toBe(false);

      // Reset
      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.isWidgetVisible('monthly-targets')).toBe(true);
      expect(result.current.isCardVisible('quarterly-ratios', 'interviews-placements')).toBe(true);
    });
  });

  describe('localStorage persistence', () => {
    it('should save configuration to localStorage on change', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      act(() => {
        result.current.toggleCardVisibility('monthly-targets', 'outbound-calls');
      });

      const stored = localStorageMock.getItem('dashboard-widget-config');
      expect(stored).toBeDefined();

      const parsed = JSON.parse(stored!);
      expect(parsed.widgets['monthly-targets'].cards[0].visible).toBe(false);
    });

    it('should load configuration from localStorage on mount', () => {
      // Pre-populate localStorage
      const customConfig = {
        widgets: {
          'monthly-targets': {
            id: 'monthly-targets',
            label: 'Monthly Targets',
            visible: false,
            cards: [
              { id: 'outbound-calls', label: 'Outbound Calls', visible: false, order: 0 },
            ],
          },
        },
      };

      localStorageMock.setItem('dashboard-widget-config', JSON.stringify(customConfig));

      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      expect(result.current.isWidgetVisible('monthly-targets')).toBe(false);
    });
  });

  describe('Widget Configuration Structure', () => {
    it('should have correct card count for each widget', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      expect(result.current.getWidgetConfig('monthly-targets')?.cards).toHaveLength(5);
      expect(result.current.getWidgetConfig('quarterly-targets')?.cards).toHaveLength(4);
      expect(result.current.getWidgetConfig('quarterly-ratios')?.cards).toHaveLength(4);
      expect(result.current.getWidgetConfig('monthly-bd-activities')?.cards).toHaveLength(5);
      expect(result.current.getWidgetConfig('leaderboards')?.cards).toHaveLength(3);
      expect(result.current.getWidgetConfig('commission')?.cards).toHaveLength(3);
    });

    it('should have correct card IDs for monthly targets', () => {
      const { result } = renderHook(() => useWidgetConfig(), { wrapper });

      const widget = result.current.getWidgetConfig('monthly-targets');
      const cardIds = widget?.cards.map((c) => c.id);

      expect(cardIds).toEqual([
        'outbound-calls',
        'jobs-added',
        'cvs-sent',
        'first-interviews',
        'total-revenue',
      ]);
    });
  });
});