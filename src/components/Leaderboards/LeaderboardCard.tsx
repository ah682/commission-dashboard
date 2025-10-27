import type { LeaderboardUser } from '../../types/leaderboard';

interface LeaderboardCardProps {
  title: string;
  users: LeaderboardUser[];
  highlightedUserId?: string;
  showPercentage?: boolean;
  showPoints?: boolean;
}

const LeaderboardCard = ({
  title,
  users,
  highlightedUserId,
  showPercentage = true,
  showPoints = false,
}: LeaderboardCardProps) => {
  const getMedalIcon = (position: number) => {
    if (position === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-sm">
          1
        </div>
      );
    }
    if (position === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">
          2
        </div>
      );
    }
    if (position === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm">
          3
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm">
        {position}
      </div>
    );
  };

  const isHighlighted = (userId: string): boolean => {
    return userId === highlightedUserId;
  };

  return (
    <div className="card bg-base-100 shadow-md rounded-lg border border-base-300">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral">{title}</h3>
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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

        {/* Leaderboard List */}
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isHighlighted(user.id)
                  ? 'bg-warning/20 border-2 border-warning'
                  : 'hover:bg-base-200'
              }`}
            >
              {/* Medal/Position */}
              <div className="flex-shrink-0">{getMedalIcon(user.position)}</div>

              {/* Avatar */}
              <div className="avatar flex-shrink-0">
                <div className="w-10 h-10 rounded-full">
                  <img src={user.avatar} alt={user.name} />
                </div>
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral text-sm truncate">
                  {user.name}
                  {isHighlighted(user.id) && (
                    <span className="ml-2 text-xs text-warning">(You)</span>
                  )}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {showPercentage && (
                  <div className="text-right">
                    <div className="font-bold text-neutral text-sm">
                      {user.percentage}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.placements}/{user.target}
                    </div>
                  </div>
                )}
                {showPoints && (
                  <div className="text-right">
                    <div className="font-bold text-neutral text-sm">
                      {user.points?.toLocaleString()} pts
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;