export interface MonthlyTargetData {
  outboundCalls: { current: number; target: number };
  jobsAdded: { current: number; target: number };
  cvsSent: { current: number; target: number };
  firstInterviews: { current: number; target: number };
  totalRevenue: { current: number; target: number };
}

export const useDashboardData = () => {
  // This would eventually come from an API or state management
  // For now, it's a centralized place for all dashboard data
  const monthlyTargets: MonthlyTargetData = {
    outboundCalls: { current: 8, target: 44 },
    jobsAdded: { current: 11, target: 5 },
    cvsSent: { current: 15, target: 35 },
    firstInterviews: { current: 7, target: 14 },
    totalRevenue: { current: 16200, target: 15000 },
  };

  return {
    monthlyTargets,
  };
};