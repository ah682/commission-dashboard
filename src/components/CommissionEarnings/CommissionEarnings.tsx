import { useDashboardData } from '../../hooks/useDashboardData';
import { calculateCommission } from '../../utils/commissionCalculator';

const CommissionEarnings = () => {
  const { monthlyTargets } = useDashboardData();
  const revenue = monthlyTargets.totalRevenue.current;
  const commissionResult = calculateCommission(revenue);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBandColor = (rate: number): string => {
    if (rate === 0) return 'bg-gray-100 border-gray-300 text-gray-700';
    if (rate === 0.10) return 'bg-blue-50 border-blue-200 text-blue-700';
    if (rate === 0.15) return 'bg-green-50 border-green-200 text-green-700';
    if (rate === 0.20) return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-purple-50 border-purple-200 text-purple-700';
  };

  return (
    <div className="card bg-base-100 shadow-md rounded-lg border border-base-300">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-neutral">Your Commission Earnings</h3>
            <p className="text-xs text-gray-500">Based on current revenue</p>
          </div>
        </div>

        {/* Total Commission - Large Display */}
        <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-6 mb-6 border-2 border-success/20">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Total Commission Earned</p>
            <p className="text-5xl font-bold text-success mb-2">
              {formatCurrency(commissionResult.totalCommission)}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-600">
                From {formatCurrency(commissionResult.totalRevenue)} revenue
              </span>
              <span className="badge badge-success badge-sm">
                {commissionResult.effectiveRate.toFixed(2)}% effective rate
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown by Band */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-neutral mb-3">Commission Breakdown</p>
          {commissionResult.breakdown.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${getBandColor(
                item.band.rate
              )}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{item.band.label}</span>
                  <span className="badge badge-sm opacity-70">
                    {(item.band.rate * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {formatCurrency(item.revenue)} in this band
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  {formatCurrency(item.commission)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        {commissionResult.totalRevenue < 20000 && (
          <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/30">
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-info flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-info mb-1">
                  Reach £20k for maximum commission rate
                </p>
                <p className="text-xs text-gray-600">
                  You need {formatCurrency(20000 - commissionResult.totalRevenue)} more to unlock the
                  25% commission tier on additional revenue.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionEarnings;