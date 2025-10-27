import CommissionCalculator from '../components/CommissionCalculator/CommissionCalculator';
import CommissionScheme from '../components/CommissionScheme/CommissionScheme';
import CommissionEarnings from '../components/CommissionEarnings/CommissionEarnings';
import MonthlyTargets from '../components/MonthlyTargets/MonthlyTargets';
import QuarterlyTargets from '../components/QuarterlyTargets/QuarterlyTargets';
import QuarterlyRatios from '../components/QuarterlyRatios/QuarterlyRatios';
import MonthlyBDActivities from '../components/MonthlyDBActivities/MonthlyDBActivities';
import Leaderboards from '../components/Leaderboards/Leaderboards';
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

      {/* Commission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CommissionEarnings />
        <CommissionCalculator />
        <CommissionScheme />
      </div>

      {/* Quarterly Conversions & Ratios - Full Width Horizontal */}
      <div className="mb-8">
        <QuarterlyRatios />
      </div>

      {/* Monthly Targets - Full Width Horizontal */}
      <div className="mb-8">
        <MonthlyTargets />
      </div>

      {/* Quarterly Targets - Full Width Horizontal */}
      <div className="mb-8">
        <QuarterlyTargets />
      </div>

      {/* Monthly Business Development Activites */}
      <div className='mb-8'>
        <MonthlyBDActivities />
      </div>

      {/* Leaderboards */}
      <div className='mb-8'>
        <Leaderboards />
      </div>
    </div>
  );
};

export default Home;