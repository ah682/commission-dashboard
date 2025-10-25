import type { ReactElement } from 'react';

interface TargetCardProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  icon: ReactElement;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

const TargetCard = ({ label, current, target, unit, icon, color }: TargetCardProps) => {
  const calculateProgress = (): number => {
    return Math.min((current / target) * 100, 100);
  };

  const formatValue = (value: number): string => {
    if (unit === '£') {
      return `£${value.toLocaleString()}`;
    }
    return value.toString();
  };

  const getStatusColor = (percentage: number): string => {
    if (percentage >= 100) return 'success';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  const getStatusBadge = (): ReactElement => {
    const percentage = calculateProgress();
    const behind = target - current;

    if (percentage >= 100) {
      return (
        <div className="flex items-center gap-1 text-success text-xs font-semibold mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Completed
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 text-error text-xs font-semibold mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        {Math.abs(behind)} Behind ({Math.round(percentage)}%)
      </div>
    );
  };

  const percentage = calculateProgress();
  const statusColor = getStatusColor(percentage);

  // Calculate SVG circle properties for progress gauge
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="card bg-base-100 shadow-sm rounded-lg border border-base-300 hover:shadow-md transition-shadow">
      <div className="card-body p-6">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center text-${color}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-neutral text-base">
              {label}
            </h3>
          </div>
        </div>

        {/* Period Badge */}
        <div className="text-center mb-4">
          <span className="badge badge-sm badge-ghost text-gray-600 font-semibold">
            This Month
          </span>
        </div>

        {/* Current/Target Stats with Indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className={`badge ${
            percentage >= 100 ? 'badge-success' : percentage >= 50 ? 'badge-warning' : 'badge-error'
          } badge-sm`}>
            {formatValue(current)}
          </div>
          <span className="text-gray-400 text-sm font-semibold">/</span>
          <span className="text-gray-600 text-sm font-semibold">{formatValue(target)}</span>
          <span className={`ml-1 ${
            percentage >= 100 ? 'text-success' : percentage >= 50 ? 'text-warning' : 'text-error'
          }`}>
            {percentage >= 100 ? '✓' : '⚠'}
          </span>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex justify-center mb-4">
          <div className="relative w-48 h-48">
            {/* Background Circle */}
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                className="text-gray-200"
              />
              {/* Progress Circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={`${
                  statusColor === 'success'
                    ? 'text-success'
                    : statusColor === 'warning'
                    ? 'text-warning'
                    : 'text-error'
                } transition-all duration-500 ease-out`}
                strokeLinecap="round"
              />
            </svg>

            {/* Percentage in Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-5xl font-bold ${
                  statusColor === 'success'
                    ? 'text-success'
                    : statusColor === 'warning'
                    ? 'text-warning'
                    : 'text-error'
                }`}>
                  {Math.round(percentage)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          {getStatusBadge()}
        </div>
      </div>
    </div>
  );
};

export default TargetCard;