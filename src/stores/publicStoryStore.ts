import { create } from "zustand"

interface PublicStoryState {
    linkContent: string;
    setLinkContent: (content: string) => void;
  }

export const usePublicStoryStore = create<PublicStoryState>((set) => ({
  linkContent: '',
  setLinkContent: (content: string) => set({ linkContent: content})
}))