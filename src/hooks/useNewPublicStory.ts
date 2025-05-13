import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/axios';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import { useStoryConfigStore } from '@/stores/storyStore';

export default function useNewPublicStory() {
  const navigate = useNavigate();

  const { linkContent } = usePublicStoryStore();

  const { storyTitle, maxWordCount, numberOfLinks } = useStoryConfigStore();

  const { getToken } = useAuth();
  const submitStory = async () => {
    const data = {
      storyTitle,
      maxWordCount,
      numberOfLinks,
      linkContent,
    };

    try {
      const token = await getToken();
      console.log('before api');
      const story = await api.post('stories/create/story/public', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const id = story.data.theStory._id
      console.log('after api');
      navigate(`/story/${id}`);
      return true;
    } catch (err) {
      console.error('Failed to send to backend:', err);
      return false;
    }
  };

  return { submitStory };
}
