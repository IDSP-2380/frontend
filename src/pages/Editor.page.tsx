import { useParams } from 'react-router-dom';
import { Box, Flex, Text } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import EditCard from '@/components/Cards/EditCard';
import EditClasses from '@/components/Cards/EditCard.module.css';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown';
import TextEditor from '@/components/TextEditor/TextEditor';
import useEdit from '@/hooks/useEdit';
import { useStory } from '@/hooks/useStory';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import { ILink } from '@/stores/storyStore';
import EditorStyle from '@/styles/Editor.module.css';

export function EditorPage() {
  const { id, linkId } = useParams();
  const { editLink } = useEdit(id, linkId);

  const options = [
    'Introduction',
    'Rising Action',
    'Conflict',
    'Climax',
    'Falling Action',
    'Conclusion',
  ];

  const { linkContent, setLinkContent } = usePublicStoryStore();

  const { story, loading } = useStory(id!);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await editLink();
  };

  return (
    <>
      <HeaderMenu />
      <form onSubmit={handleSubmit} method="post">
        {' '}
        <Box maw={'44.187rem'} m="auto">
          <Flex direction="column" justify="center" align="center" gap={'1rem'}>
            {story && <Text size="xl">{story.title}</Text>}

            {linkId && story?.chains[0].links.length === 1
              ? ''
              : story?.chains.map((chain, chainIndex) =>
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
                  {linkId && story?.chains[0].links.length === 1
                    ? 1
                    : story?.chains[0].links.length! + 1}
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
    </>
  );
}
