import { create } from 'zustand';

interface StoryConfigState {
    storyTitle: string;
    maxWordCount: string | number;
    numberOfLinks: string | number;
    status: string,
    setStoryTitle: (title: string) => void;
    setMaxWordCount: (count: string | number) => void;
    setNumberOfLinks: (count: string | number) => void;
    setStatus: (status: string) => void;
};

export const useStoryConfigStore = create<StoryConfigState>((set) => ({
  storyTitle: '',
  maxWordCount: '',
  numberOfLinks: '',
  status: '',
  setStoryTitle: (title: string) => set({ storyTitle: title}),
  setMaxWordCount: (count: string | number) => set({ maxWordCount: count}),
  setNumberOfLinks: (count: string | number) => set({ numberOfLinks: count}),
  setStatus: (status: string) => set({ status: status })
}));
