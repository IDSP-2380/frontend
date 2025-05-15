import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/axios';
import { useHomeStore } from '@/stores/homeStore';
import { usePublicStoryStore } from '@/stores/publicStoryStore';

export default function useEdit(id: string | undefined, linkId: string | undefined) {
  const navigate = useNavigate();
  const { linkContent } = usePublicStoryStore();
  const { select } = useHomeStore();
  const { getToken } = useAuth();

  const editLink = async () => {
    const data = { linkContent, select };

    try {
      const token = await getToken();

      await api.post(`stories/create/story/link/${id}/${linkId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/story/${id}`);
      return true;
    } catch (err) {
      console.error('Failed to send to backend:', err);
      return false;
    }
  };

  return { editLink };
}
