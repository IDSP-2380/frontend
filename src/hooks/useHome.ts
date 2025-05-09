import { useEffect, useState } from 'react';
import { api } from '@/api/axios';
import { useHomeStore } from '@/stores/homeStore';
import { IStory } from '@/stores/storyStore';

export default function useHome() {
  const { activeTab, search, select, stories, setStories } = useHomeStore();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get<IStory[]>('stories/filter', {
          params: {
            activeTab,
            search,
            select,
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
