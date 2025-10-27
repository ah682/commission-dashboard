import { useState } from 'react';
import type { LeaderboardUser } from '../../types/leaderboard';

interface PresidentClubLeaderboardProps {
  allUsers: LeaderboardUser[];
  highlightedUserId?: string;
}

const PresidentClubLeaderboard = ({ allUsers, highlightedUserId }: PresidentClubLeaderboardProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 9;

  // Calculate pagination
  const totalPages = Math.ceil(allUsers.length / usersPerPage);
  const startIndex = currentPage * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = allUsers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

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

  const getPositionSuffix = (position: number): string => {
    if (position % 10 === 1 && position !== 11) return 'st';
    if (position % 10 === 2 && position !== 12) return 'nd';
    if (position % 10 === 3 && position !== 13) return 'rd';
    return 'th';
  };

  const isHighlighted = (userId: string): boolean => {
    return userId === highlightedUserId;
  };

  return (
    <div className="card bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-md rounded-lg border border-yellow-300">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="btn btn-ghost btn-sm btn-circle disabled:opacity-30"
            >
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
            <span className="badge badge-sm">
              {currentPage + 1}/{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="btn btn-ghost btn-sm btn-circle disabled:opacity-30"
            >
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

        {/* Leaderboard List */}
        <div className="space-y-2">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isHighlighted(user.id)
                  ? 'bg-white border-2 border-yellow-600'
                  : 'bg-white/50 hover:bg-white/70'
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
                    <span className="ml-2 text-xs text-amber-700">(You)</span>
                  )}
                </p>
              </div>

              {/* Points */}
              <div className="flex-shrink-0">
                <div className="text-right">
                  <div className="font-bold text-neutral text-sm">
                    {user.points?.toLocaleString()} pts
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresidentClubLeaderboard;