import { create } from 'zustand';

interface StoryConfigState {
    storyTitle: string;
    maxWordCount: string | number;
    numberOfLinks: string | number;
    setStoryTitle: (title: string) => void;
    setMaxWordCount: (count: string | number) => void;
    setNumberOfLinks: (count: string | number) => void;
};

export const useStoryConfigStore = create<StoryConfigState>((set) => ({
  storyTitle: '',
  maxWordCount: '',
  numberOfLinks: '',
  setStoryTitle: (title: string) => set({ storyTitle: title}),
  setMaxWordCount: (count: string | number) => set({ maxWordCount: count}),
  setNumberOfLinks: (count: string | number) => set({ numberOfLinks: count}),
}));
