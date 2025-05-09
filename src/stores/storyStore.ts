import { create } from 'zustand';

export interface ILink {
  _id: string;
  content: string;
  author: string;
  stage: string;
  createdAt: Date;
  updatedAt: Date;
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
  contributors: string[];
  status: 'Ongoing' | 'Completed' | 'Drafting';
  createdAt: Date;
  updatedAt: Date;
  chains: IChain[];
  maxWordCount: number;
  numberOfLinks: number;
  startDate?: Date;
  endDate?: Date;
  writingOrder?: string[];
  timePerTurn?: string;
}

interface StoryConfigState {
  storyTitle: string;
  maxWordCount: string | number;
  numberOfLinks: string | number;
  status: string;
  setStoryTitle: (title: string) => void;
  setMaxWordCount: (count: string | number) => void;
  setNumberOfLinks: (count: string | number) => void;
  setStatus: (status: string) => void;
}

export const useStoryConfigStore = create<StoryConfigState>((set) => ({
  storyTitle: '',
  maxWordCount: '',
  numberOfLinks: '',
  status: '',
  setStoryTitle: (title: string) => set({ storyTitle: title }),
  setMaxWordCount: (count: string | number) => set({ maxWordCount: count }),
  setNumberOfLinks: (count: string | number) => set({ numberOfLinks: count }),
  setStatus: (status: string) => set({ status: status }),
}));
