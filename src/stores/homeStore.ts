import { create } from 'zustand';
import { IStory } from './storyStore';

interface HomeState {
  stories: IStory[];
  setStories: (content: IStory[]) => void;

  select: string;
  setSelect: (select: string) => void;

  search: string;
  setSearch: (search: string) => void;

  activeTab: string | null;
  setActiveTab: (activeTab: string | null) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  stories: [],
  setStories: (stories: IStory[]) => set({ stories: stories }),

  select: 'Recently Updated',
  setSelect: (select: string) => set({ select: select }),

  search: '',
  setSearch: (search: string) => set({ search: search }),

  activeTab: 'All',
  setActiveTab: (activeTab: string | null) => set({ activeTab: activeTab }),
}));
