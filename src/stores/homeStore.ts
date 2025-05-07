import { create } from 'zustand';

export interface Story {
  title: string;
  preview: string;
  contributors: number;
  chains: number;
  longestChain: number;
  chainLength: number;
  status: string;
  updated: string;
}

interface HomeState {
  stories: Story[];
  setStories: (content: Story) => void;
}

export const usePublicStoryStore = create<HomeState>((set) => ({
  stories: [],
  setStories: (story: Story) =>
    set((state) => ({
      stories: [...state.stories, story],
    })),
}));
