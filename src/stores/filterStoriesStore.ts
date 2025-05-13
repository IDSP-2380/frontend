import { create } from 'zustand';
import { IStory } from './storyStore';

interface filterStoriesState {
  stories: IStory[];
  setStories: (content: IStory[]) => void;

  select: string;
  setSelect: (select: string) => void;

  search: string;
  setSearch: (search: string) => void;

  activeTab: string | null;
  setActiveTab: (activeTab: string | null) => void;
}

export const useFilterStoriesStore = create<filterStoriesState>((set) => ({
  stories: [],
  setStories: (stories: IStory[]) => set({ stories: stories }),

  select: 'Recently Updated',
  setSelect: (select: string) => set({ select: select }),

  search: '',
  setSearch: (search: string) => set({ search: search }),

  activeTab: 'All',
  setActiveTab: (activeTab: string | null) => set({ activeTab: activeTab }),
}));
