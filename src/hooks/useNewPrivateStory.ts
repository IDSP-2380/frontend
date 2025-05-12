import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/axios';
import { usePrivateStoryStore, User } from '@/stores/privateStoryStore';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import { useStoryConfigStore } from '@/stores/storyStore';

export default function useNewPrivateStory() {
  const navigate = useNavigate();

  const { storyTitle, maxWordCount, numberOfLinks } = useStoryConfigStore();

  const { contributors, startDate, endDate, days, hours, minutes, setUsers } =
    usePrivateStoryStore();

  const submitStory = async () => {
    const data = {
      storyTitle,
      contributors,
      maxWordCount,
      numberOfLinks,
      startDate,
      endDate,
      days,
      hours,
      minutes,
    };

    try {
      const storyCreated = await api.post('stories/create/story/private', {
        data,
      });

      console.log(storyCreated.data.data)
      navigate(`/newStoryCreation/${storyCreated.data.data._id}`);

      return true;
    } catch (err) {
      console.error('Failed to send to backend:', err);
      return false;
    }
  };

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const res = await api.get('user/get-all-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = res.data.users.data as User[];

        setUsers(usersData);
      } catch (err) {
        console.error('Failed to fetch protected data', err);
      }
    };

    fetchUserData();
  }, [getToken]);

  return { submitStory };
}
