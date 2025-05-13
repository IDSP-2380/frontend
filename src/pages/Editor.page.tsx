import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Text } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import EditCard from '@/components/Cards/EditCard';
import EditClasses from '@/components/Cards/EditCard.module.css';
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown';
import TextEditor from '@/components/TextEditor/TextEditor';
import { useStory } from '@/hooks/useStory';
import { useHomeStore } from '@/stores/homeStore';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import { ILink } from '@/stores/storyStore';
import EditorStyle from '@/styles/Editor.module.css';
import { useParams } from 'react-router-dom';

export function EditorPage() {
  const navigate = useNavigate();

  const { id } = useParams();


  // if (id) {
  //   story = useStory(id);
  // }

  const options = [
    'Introduction',
    'Rising Action',
    'Conflict',
    'Climax',
    'Falling Action',
    'Conclusion',
  ];

  const { linkContent, setLinkContent } = usePublicStoryStore();

  const { story, loading, refetch } = useStory(id!);
  console.log(story);
  const { select } = useHomeStore();

  const { getToken } = useAuth();

  console.log(story?.chains[0].links.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { linkContent, select };

    console.log(linkContent + 'SADFKASDFASKDFJASJKDFAKJD');

    console.log(select);

    try {
      const token = await getToken();

      await axios.post(`http://localhost:3000/api/stories/create/story/link/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // await refetch();
      navigate('/project');
    } catch (err) {
      console.error('Failed to send to backend:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      {' '}
      <Box maw={'44.187rem'} m="auto">
        <Flex direction="column" justify="center" align="center" gap={'1rem'}>
          {story && <Text size="xl">{story.title}</Text>}

          {story?.chains.map((chain, chainIndex) =>
            chain.links.map((link: ILink, linkIndex: number) => (
              <EditCard
                key={`${chainIndex}-${linkIndex}`}
                linkNumber={(linkIndex + 1).toString()}
                linkContent={link.content}
              />
            ))
          )}

          <Flex direction="column">
            <Box className={EditorStyle.dropDown}>
              <SelectDropdown label="Stage" options={options} />
            </Box>
            <Box className={EditorStyle.textContainer}>
              <Text className={EditClasses.numberText}>
                {story?.chains[0].links.length ? story?.chains[0].links.length + 1 : 1}
              </Text>
              <TextEditor />
            </Box>
          </Flex>
          <Box className={EditorStyle.buttonContainer}>
            <ButtonBase
              onClick={() => {}}
              leftSection={<img src="/icons/CaretLeft.svg" alt="icon" />}
              buttonType="primaryWhite"
            >
              Back
            </ButtonBase>
            <ButtonBase
              disabled={!linkContent}
              onClick={() => {}}
              rightSection={
                linkContent ? (
                  <img src="/icons/CaretRight.svg" alt="icon" />
                ) : (
                  <img src="/icons/CaretRightDisabled.svg" alt="icon" />
                )
              }
              buttonType="primary"
            >
              Post Inklink
            </ButtonBase>
          </Box>
        </Flex>
      </Box>
    </form>
  );
}
