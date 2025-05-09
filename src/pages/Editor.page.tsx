import { ClerkDegraded } from '@clerk/clerk-react';
import { Box, Flex, Text } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import EditCard from '@/components/Cards/EditCard';
import EditClasses from '@/components/Cards/EditCard.module.css';
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown';
import TextEditor from '@/components/TextEditor/TextEditor';
import { useStory } from '@/hooks/useStory';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import EditorStyle from '@/styles/Editor.module.css';

export function EditorPage({ storyId }: { storyId: string }) {
  const testData = [
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
  ];

  const options = [
    'Introduction',
    'Rising Action',
    'Conflict',
    'Climax',
    'Falling Action',
    'Conclusion',
  ];

  const { linkContent, setLinkContent } = usePublicStoryStore();

  const testId = '681d2dcc9e9f42f406593dc4';
  const { story, loading } = useStory(testId);

  console.log(story);

  return (
    <Box maw={'44.187rem'} m="auto">
      <Flex direction="column" justify="center" align="center" gap={'1rem'}>
        {story && <Text size="xl">{story.title}</Text>}

        {story?.chains.map((chain, chainIndex) =>
          chain.links.map((link, linkIndex: number) => (
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
            <Text className={EditClasses.numberText}>{story?.chains.length! + 1}</Text>
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
  );
}
