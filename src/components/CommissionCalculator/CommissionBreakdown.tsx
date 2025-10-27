import type { CommissionCalculationResult } from '../../types/commission.types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface CommissionBreakdownProps {
  result: CommissionCalculationResult;
  isCalculating: boolean;
}

/**
 * Commission Breakdown Component
 * 
 * Displays the total commission and detailed breakdown by band
 * Styled to match OneUp dashboard widgets
 */
const CommissionBreakdown = ({
  result,
  isCalculating,
}: CommissionBreakdownProps) => {
  return (
    <div
      className={`transition-opacity duration-200 ${
        isCalculating ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Total Commission Display - Large and Prominent */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 mb-6 border border-primary/10">
        <div className="text-xs uppercase tracking-wide text-gray-600 mb-2 font-semibold">
          Total Commission
        </div>
        <div className="text-5xl font-bold text-primary mb-2">
          {formatCurrency(result.totalCommission)}
        </div>
        <div className="text-sm text-gray-600">
          on {formatCurrency(result.totalRevenue)} revenue
        </div>
      </div>

      {/* Band Breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-neutral mb-4 uppercase tracking-wide">
          Commission Breakdown
        </h3>

        <div className="space-y-3">
          {result.breakdown.map((item, index) => {
            const bandLabel =
              item.band.max === null
                ? `${formatCurrency(item.band.min)}+`
                : `${formatCurrency(item.band.min)} - ${formatCurrency(
                    item.band.max
                  )}`;

            const isZeroCommission = item.commissionEarned === 0;
            const hasRevenue = item.revenueInBand > 0;

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  isZeroCommission
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : hasRevenue
                    ? 'bg-white border-primary/20 shadow-sm'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Band Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-neutral">
                      {bandLabel}
                    </span>
                    <span
                      className={`badge badge-sm ${
                        isZeroCommission
                          ? 'badge-ghost'
                          : 'badge-primary badge-outline'
                      }`}
                    >
                      {formatPercentage(item.band.rate)}
                    </span>
                  </div>

                  {/* Revenue in Band */}
                  {hasRevenue && (
                    <div className="text-xs text-gray-500 font-medium">
                      {formatCurrency(item.revenueInBand)} in this band
                    </div>
                  )}
                </div>

                {/* Commission Earned */}
                <div className="text-right ml-4">
                  <div
                    className={`text-lg font-bold ${
                      isZeroCommission
                        ? 'text-gray-400'
                        : 'text-success'
                    }`}
                  >
                    {formatCurrency(item.commissionEarned)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Effective Rate</span>
          <span className="font-bold text-neutral text-base">
            {formatPercentage(
              result.totalRevenue > 0
                ? result.totalCommission / result.totalRevenue
                : 0,
              2
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommissionBreakdown;