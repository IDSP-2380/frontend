import { useNavigate } from 'react-router-dom';
import { api } from '@/api/axios';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import { useStoryConfigStore } from '@/stores/storyStore';

export default function useNewPublicStory() {
  const navigate = useNavigate();

  const { linkContent } = usePublicStoryStore();

  const { storyTitle, maxWordCount, numberOfLinks } = useStoryConfigStore();

  const submitStory = async () => {
    const data = {
      storyTitle,
      maxWordCount,
      numberOfLinks,
      linkContent,
    };

    try {
      await api.post('stories/create/story/public', {
        data,
      });
      navigate('/project');
      return true;
    } catch (err) {
      console.error('Failed to send to backend:', err);
      return false;
    }
  };

  return { submitStory };
}
