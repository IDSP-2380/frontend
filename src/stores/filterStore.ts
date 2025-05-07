import { create } from 'zustand';

export interface ILink {
  _id: string;
  content: string;
  author: string;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChain {
  _id: string;
  isComplete: boolean;
  links: ILink[];
}

export interface IStory {
  _id: string;
  title: string;
  isPublic: boolean;
  contributors: { userId: string; username: string }[];
  status: 'ongoing' | 'completed' | 'drafting';
  createdAt: string;
  updatedAt: string;
  chains: IChain[];
  maxWordCount: number;
  numberOfLinks: number;
  startDate?: string;
  endDate?: string;
  writingOrder?: string[];
  timePerTurn?: string;
}

interface FilterState {
  stories: IStory[];
  setStories: (content: IStory[]) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  stories: [],
  setStories: (stories: IStory[]) => set({ stories: stories }),
}));
