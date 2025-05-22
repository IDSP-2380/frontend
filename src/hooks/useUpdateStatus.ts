import { useEffect, useState } from 'react';
import { api } from '@/api/axios';
import { IStory } from '@/stores/storyStore';

export function useUpdateStatus(story: IStory | null) {
  const [isCompleted, setIsCompleted] = useState(false);

  
  useEffect(() => {
    if (story) {
      const requiredLinks = story?.numberOfLinks;
      
      const currentLinkCount = story?.chains[0]?.links.length || 0;
      
      const completed: boolean = requiredLinks ? currentLinkCount >= requiredLinks : false;
      
      setIsCompleted(completed);
    }
  }, [story]);

  
  useEffect(() => {
    const updateStoryStatus = async () => {
      if (isCompleted && story && story.status !== 'Completed') {
        try {
          const id = story._id;

          const response = await api.post('stories/update', { id });

        } catch (error: any) {
          console.error('Error updating story status:', error);
          console.error('Full error details:', {
            message: error.message,
            stack: error.stack
          });
        }
      }
    };

    updateStoryStatus();
  }, [isCompleted, story?._id, story?.status]);

  return { isCompleted };
}