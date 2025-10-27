import type { LeaderboardData, LeaderboardUser } from '../../types/leaderboard';
import LeaderboardCard from './LeaderboardCard';
import PresidentsClubCard from './PresidentClubCard';
import PresidentsClubLeaderboard from './PresidentClubLeaderboard';

const Leaderboards = () => {
  // Generate simulated users with avatars
  const generateUsers = (): LeaderboardUser[] => {
    const names = [
      'Lawson Hogan',
      'Lucie Espinoza',
      'Katrina Hayes',
      'Alana Bailey',
      'Mollie Wheeler',
      'Ava Mathis',
      'Rob Ingram',
      'Alexandra Cross',
      'Seth Vaughn',
      'Jordan Peters',
      'Taylor Morgan',
      'Cameron Lee',
      'Riley Bennett',
      'Casey Sullivan',
      'Jamie Fletcher',
      'Morgan Rivera',
      'Avery Cole',
      'Blake Anderson',
    ];

    const points = [1835, 1745, 1640, 1634, 1552, 1406, 1331, 1320, 273, 235, 198, 165, 132, 98, 75, 52, 38, 15];

    return names.map((name, index) => ({
      id: `user-${index + 1}`,
      name: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
      placements: 23 - index,
      target: 24,
      percentage: Math.round(((23 - index) / 24) * 100),
      points: points[index],
      position: index + 1,
    }));
  };

  const allUsers = generateUsers();
  const currentUserId = 'user-4'; // Alana Bailey (You)

  const ytdLeaderboard: LeaderboardData = {
    title: 'YTD Placements Leaderboard',
    users: allUsers.slice(0, 9),
    highlightedUserId: currentUserId,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral">Leaderboards</h2>
      </div>

      {/* All 3 Leaderboards in One Row - Horizontal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* YTD Placements Leaderboard */}
        <LeaderboardCard
          title={ytdLeaderboard.title}
          users={ytdLeaderboard.users}
          highlightedUserId={ytdLeaderboard.highlightedUserId}
          showPercentage={true}
        />

        {/* President's Club Spotlight - Now with pagination */}
        <PresidentsClubCard 
          topUser={allUsers[0]} 
          allUsers={allUsers}
          highlightedUserId={currentUserId}
        />

        {/* President's Club Leaderboard */}
        <PresidentsClubLeaderboard allUsers={allUsers} highlightedUserId={currentUserId} />
      </div>
    </div>
  );
};

export default Leaderboards;