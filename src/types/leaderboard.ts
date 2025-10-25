export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  placements: number;
  target: number;
  percentage: number;
  points?: number;
  position: number;
}

export interface LeaderboardData {
  title: string;
  users: LeaderboardUser[];
  highlightedUserId?: string;
}