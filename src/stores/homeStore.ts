import { create } from 'zustand';

export interface Story {
  title: string;
  preview: string;
  collaborators?: number;
  chains?: number;
  longestChain?: number;
  chainLength?: number;
  draftingLink?: number;
  currentTurn?: number;
  totalTurns?: number;
  status: string;
  statusIcon?: string;
  updated?: string;
  primaryPath: string;
  primaryButtonLabel: string;
  secondaryPath?: string;
  secondaryButtonLabel?: string;
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
