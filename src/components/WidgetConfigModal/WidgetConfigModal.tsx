import { useState } from 'react';
import { useWidgetConfig } from '../../contexts/widgetConfigStore';
import type { WidgetId } from '../../types/widgetConfig.types';

interface WidgetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WidgetConfigModal = ({ isOpen, onClose }: WidgetConfigModalProps) => {
  const {
    config,
    toggleWidgetVisibility,
    toggleCardVisibility,
    resetToDefaults,
  } = useWidgetConfig();

  const [activeTab, setActiveTab] = useState<WidgetId>('monthly-targets');

  if (!isOpen) return null;

  const widgetIds: WidgetId[] = [
    'commission',
    'quarterly-ratios',
    'monthly-targets',
    'quarterly-targets',
    'monthly-bd-activities',
    'leaderboards',
  ];

  const activeWidget = config.widgets[activeTab];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-base-100 rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-base-300">
            <div>
              <h2 className="text-2xl font-bold text-neutral">
                Configure Dashboard Widgets
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Customize which sections and cards appear on your dashboard
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar - Widget List */}
            <div className="w-64 border-r border-base-300 overflow-y-auto">
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  Sections
                </p>
                <div className="space-y-1">
                  {widgetIds.map((widgetId) => {
                    const widget = config.widgets[widgetId];
                    const isActive = activeTab === widgetId;

                    return (
                      <button
                        key={widgetId}
                        onClick={() => setActiveTab(widgetId)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                          isActive
                            ? 'bg-primary text-primary-content'
                            : 'hover:bg-base-200 text-neutral'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={widget.visible}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleWidgetVisibility(widgetId);
                          }}
                          className="checkbox checkbox-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-sm font-medium flex-1">
                          {widget.label}
                        </span>
                        <span className="text-xs opacity-70">
                          {widget.cards.filter((c) => c.visible).length}/{widget.cards.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content - Card Configuration */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeWidget ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-neutral mb-2">
                      {activeWidget.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Select which cards to display in this section
                    </p>
                  </div>

                  {!activeWidget.visible && (
                    <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-warning flex-shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-warning">
                            This section is hidden
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Enable this section in the sidebar to show it on your dashboard
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeWidget.cards.map((card) => (
                      <label
                        key={card.id}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          card.visible
                            ? 'border-primary bg-primary/5 hover:bg-primary/10'
                            : 'border-base-300 hover:bg-base-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={card.visible}
                          onChange={() => toggleCardVisibility(activeTab, card.id)}
                          className="checkbox checkbox-primary"
                          disabled={!activeWidget.visible}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-neutral text-sm">
                            {card.label}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-6 border-t border-base-300">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                      Quick Actions
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          activeWidget.cards.forEach((card) => {
                            if (!card.visible) {
                              toggleCardVisibility(activeTab, card.id);
                            }
                          });
                        }}
                        className="btn btn-sm btn-outline"
                        disabled={!activeWidget.visible}
                      >
                        Show All
                      </button>
                      <button
                        onClick={() => {
                          activeWidget.cards.forEach((card) => {
                            if (card.visible) {
                              toggleCardVisibility(activeTab, card.id);
                            }
                          });
                        }}
                        className="btn btn-sm btn-outline"
                        disabled={!activeWidget.visible}
                      >
                        Hide All
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-sm">Select a section to configure</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-base-300">
            <button
              onClick={() => {
                if (confirm('Reset all widgets to default configuration?')) {
                  resetToDefaults();
                }
              }}
              className="btn btn-ghost btn-sm"
            >
              Reset to Defaults
            </button>
            <div className="flex gap-2">
              <button onClick={onClose} className="btn btn-primary">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetConfigModal;