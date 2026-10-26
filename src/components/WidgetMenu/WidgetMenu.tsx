import { useState, useRef, useEffect } from 'react';
import { useWidgetConfig } from '../../contexts/widgetConfigStore';
import type { WidgetId } from '../../types/widgetConfig.types';

interface WidgetMenuProps {
  widgetId: WidgetId;
}

const WidgetMenu = ({ widgetId }: WidgetMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { getWidgetConfig, toggleCardVisibility } = useWidgetConfig();

  const widgetConfig = getWidgetConfig(widgetId);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!widgetConfig) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Three-Dot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-sm btn-circle"
        aria-label="Widget options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-base-100 rounded-lg shadow-lg border border-base-300 z-50">
          <div className="p-3">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Show/Hide Cards
            </p>

            <div className="space-y-2">
              {widgetConfig.cards.map((card) => (
                <label
                  key={card.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-base-200 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={card.visible}
                    onChange={() => toggleCardVisibility(widgetId, card.id)}
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="text-sm text-neutral flex-1">{card.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-base-300"></div>

          {/* Footer Actions */}
          <div className="p-3">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-block"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetMenu;