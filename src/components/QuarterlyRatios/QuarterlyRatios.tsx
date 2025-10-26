import RatioCard from './RatioCard';
import { useDashboardData } from '../../hooks/useDashboardData';

const QuarterlyRatios = () => {
  const { monthlyTargets } = useDashboardData();
  
  // Calculate ratio using actual revenue data
  const revenuePerPlacement = monthlyTargets.totalRevenue.current;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-neutral">Quarterly Conversions & Ratios</h2>
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-neutral/70 font-medium">Period: This Quarter</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-neutral/70 font-medium">Current user</span>
          </div>
        </div>
      </div>

      {/* Ratio Cards Grid - Horizontal */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max lg:grid lg:grid-cols-4 lg:min-w-0">
          {/* 1st Interviews : Placements */}
          <div className="w-64 lg:w-auto">
            <RatioCard
              label="1st Interviews : Placements"
              numerator={8.8}
              denominator={1}
              icon={
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              color="primary"
            />
          </div>

          {/* Jobs Added : Placements */}
          <div className="w-64 lg:w-auto">
            <RatioCard
              label="Jobs Added : Placements"
              numerator={4.6}
              denominator={1}
              icon={
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              color="primary"
            />
          </div>

          {/* CVs Sent : 1st Interviews */}
          <div className="w-64 lg:w-auto">
            <RatioCard
              label="CVs Sent : 1st Interviews"
              numerator={1.32}
              denominator={1}
              icon={
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
              color="primary"
            />
          </div>

          {/* Total Revenue Booked : Total Placements - USING REAL DATA */}
          <div className="w-64 lg:w-auto">
            <RatioCard
              label="Total Revenue Booked : Total Placements"
              numerator={revenuePerPlacement}
              denominator={1}
              icon={
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              color="primary"
              formatAsCurrency={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuarterlyRatios;