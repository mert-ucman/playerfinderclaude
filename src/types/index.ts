export interface FilterState {
  [key: string]: Set<string>;
}

export interface MatchData {
  game?: string; rank?: string; size?: string; style?: string;
  lang?: string; mic?: string; time?: string; age?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  rank: string;
  region: string;
  primaryGame: string;
  games: string[];
  bio: string;
  createdAt: string;
}

export interface Listing {
  id: string;
  userId: string;
  username: string;
  userRank: string;
  game: string;
  rank: string;
  style: string;
  size: string;
  lang: string;
  mic: string;
  timeSlot: string;
  description: string;
  createdAt: string;
}

export interface Message {
  id: string;
  fromUserId: string;
  fromUsername: string;
  toUserId: string;
  toUsername: string;
  content: string;
  createdAt: string;
  read: boolean;
  listingId?: string;
}
