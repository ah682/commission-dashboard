import CommissionCalculator from '../components/CommissionCalculator/CommissionCalculator';
import MonthlyTargets from '../components/MonthlyTargets/MonthlyTargets';
import QuarterlyTargets from '../components/QuarterlyTargets/QuarterlyTargets';
import QuarterlyRatios from '../components/QuarterlyRatios/QuarterlyRatios';
const Home = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral mb-2">
          Recruiter Dashboard
        </h2>
        <p className="text-gray-600 text-lg">
          Track your progress and calculate commission earnings in real-time
        </p>
      </div>
      
      {/* Quarterly Conversions & Ratios - Full Width Horizontal */}
      <div className="mb-8">
        <QuarterlyRatios/>
      </div>

      {/* Monthly Targets - Full Width Horizontal */}
      <div className="mb-8">
        <MonthlyTargets />
      </div>

      {/* Quarterly Targets - Full Width Horizontal */}
      <div className="mb-8">
        <QuarterlyTargets />
      </div>

      {/* Commission Calculator - Centered Below */}
      <div className="max-w-md mx-auto">
        <CommissionCalculator />
      </div>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md border-l-4 border-primary">
        <h3 className="text-lg font-semibold text-neutral mb-2">
          About This Dashboard
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          This dashboard helps you track your monthly and quarterly performance targets
          and calculate commission earnings in real-time. Monitor your progress across
          key metrics including revenue goals, jobs added, outbound calls, and business
          development activities.
        </p>
      </div>
    </div>
  );
};

export default Home;