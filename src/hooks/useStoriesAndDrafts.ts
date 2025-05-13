import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { api } from '@/api/axios';
import { useFilterStoriesStore } from '@/stores/filterStoriesStore';
import { IStory } from '@/stores/storyStore';

export default function useStoriesAndDrafts() {
  const { activeTab, search, select, stories, setStories } = useFilterStoriesStore();
  const { user } = useUser();

  const username = user?.username;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get<IStory[]>('stories/stories-and-drafts', {
          params: {
            activeTab,
            search,
            select,
            username,
          },
        });
        setStories(response.data);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };

    fetchStories();
  }, [activeTab, search, select]);
  return { activeTab, stories };
}
