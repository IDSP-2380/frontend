import { useEffect, useState } from 'react';
import { api } from '@/api/axios';
import { IStory } from '@/types/story';

export function useStory(storyId: string) {
  const [story, setStory] = useState<IStory | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const res = await api.get<IStory>(`stories/test/${storyId}`);
      setStory(res.data);
    } catch (err) {
      console.error('Failed to fetch story', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
  }, [storyId]);

  return { story, loading, refetch: fetchStory };
}
