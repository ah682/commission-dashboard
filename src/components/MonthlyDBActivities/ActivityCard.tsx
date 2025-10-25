import type { ReactElement } from 'react';

interface ActivityCardProps {
  label: string;
  count: number;
  icon: ReactElement;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

const ActivityCard = ({ label, count, icon, color }: ActivityCardProps) => {
  return (
    <div className="card bg-base-100 shadow-sm rounded-lg border border-base-300 hover:shadow-md transition-shadow">
      <div className="card-body p-6">
        {/* Header with Icon and Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center text-${color}`}>
            {icon}
          </div>
          <h3 className="font-semibold text-neutral text-sm">
            {label}
          </h3>
        </div>

        {/* Large Count Display */}
        <div className="text-center">
          <div className="text-5xl font-bold text-neutral">
            {count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;