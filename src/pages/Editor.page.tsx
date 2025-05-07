import { Box, Flex, Text } from '@mantine/core';
import EditCard from '@/components/Cards/EditCard';
import TextEditor from '@/components/TextEditor/TextEditor';

export function EditorPage() {
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

  return (
    <Box maw={'44.187rem'} m="auto">
      <Flex direction="column" justify="center" align="center" gap={'1rem'}>
        <Text size="xl">Story title goes here or some shit</Text>

        {testData.map((story, index) => {
          return <EditCard linkNumber={(index + 1).toString()} linkContent={story.content} />;
        })}

        <TextEditor />
      </Flex>
    </Box>
  );
}
