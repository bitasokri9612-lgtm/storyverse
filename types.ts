export type ViewState = 'HOME' | 'READ' | 'WRITE' | 'LEADERBOARD' | 'MY_PROFILE' | 'STORY_DETAIL' | 'PROFILE';

export enum StoryCategory {
  HORROR = 'Horror',
  LOVE = 'Love',
  COMEDY = 'Comedy',
  MOTIVATION = 'Motivation',
  FANTASY = 'Fantasy',
  REAL_LIFE = 'Real-Life',
  SCI_FI = 'Sci-Fi'
}

export interface ReactionCounts {
  love: number;
  like: number;
  laugh: number;
  cry: number;
  dislike: number;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  category: StoryCategory;
  coverImage?: string; // Optional cover image URL
  reactions: ReactionCounts;
  comments: Comment[];
  date: string;
  isAnimated: boolean; // Monthly winner status
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string; // Icon name
  color: string;
}

export interface Author {
  id: string;
  name: string;
  bio?: string; // Optional bio
  avatar: string; // URL
  coverImage?: string; // URL for profile background
  badges: UserBadge[];
  totalLikes: number;
}

export interface AIResponse {
  text: string;
  error?: string;
}