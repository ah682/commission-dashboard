import type { LeaderboardUser } from '../../types/leaderboard';

interface PresidentClubCardProps {
  topUser: LeaderboardUser;
  allUsers: LeaderboardUser[];
}

const PresidentClubCard = ({ topUser, allUsers }: PresidentClubCardProps) => {
  // Get stats for the top user
  const userStats = [
    { label: '1st Interviews Arranged', value: 990, unit: 'pts' },
    { label: 'Total Placements', value: 633, unit: 'pts' },
    { label: 'CVs Sent', value: 212, unit: 'pts' },
  ];

  return (
    <div className="card bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-md rounded-lg border border-yellow-300">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral">President's Club</h3>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm btn-circle">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="badge badge-sm">1/5</span>
            <button className="btn btn-ghost btn-sm btn-circle">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-sm btn-circle">
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-sm">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View
            </button>
            <button className="btn btn-ghost btn-sm btn-circle">
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
          </div>
        </div>

        {/* Top User Spotlight */}
        <div className="flex flex-col items-center py-6">
          {/* Avatar with Medal */}
          <div className="relative mb-4">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                <img src={topUser.avatar} alt={topUser.name} />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold shadow-lg">
              1
            </div>
          </div>

          {/* Name */}
          <h4 className="text-xl font-bold text-neutral mb-2">{topUser.name}</h4>

          {/* Position and Points */}
          <div className="flex items-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Position</p>
              <p className="text-lg font-bold text-neutral">1st</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Points</p>
              <p className="text-lg font-bold text-neutral">
                {topUser.points?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="w-full space-y-2">
            {userStats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-neutral">{stat.label}</span>
                </div>
                <span className="text-sm font-bold text-neutral">
                  {stat.value} {stat.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresidentClubCard;