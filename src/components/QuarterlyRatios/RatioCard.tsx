

import type { ReactElement } from 'react';

interface RatioCardProps {
  label: string;
  numerator: number;
  denominator: number;
  icon: ReactElement;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
  formatAsCurrency?: boolean;
}

const RatioCard = ({ 
  label, 
  numerator, 
  denominator, 
  icon, 
  color,
  formatAsCurrency = false
}: RatioCardProps) => {
  const calculateRatio = (): string => {
    if (denominator === 0) return '0 : 1';
    
    // FIX: Don't calculate ratio for currency, just display the numbers
    if (formatAsCurrency) {
      return `£${numerator.toLocaleString()} : ${denominator}`;
    }
    
    // For regular ratios, just display the numerator : denominator
    return `${numerator} : ${denominator}`;
  };

  return (
    <div className="card bg-base-100 shadow-sm rounded-lg border border-base-300 hover:shadow-md transition-shadow">
      <div className="card-body p-6">
        {/* Header with Icon and Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center text-${color}`}>
            {icon}
          </div>
          <h3 className="font-semibold text-neutral text-sm flex-1">
            {label}
          </h3>
        </div>

        {/* Large Ratio Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-neutral">
            {calculateRatio()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatioCard;