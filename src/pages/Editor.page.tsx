import { Box, Flex, Text } from '@mantine/core';
import EditCard from '@/components/Cards/EditCard';
import EditClasses from '@/components/Cards/EditCard.module.css';
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown';
import TextEditor from '@/components/TextEditor/TextEditor';
import EditorStyle from '@/styles/Editor.module.css';

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

  const options = [
    'Introduction',
    'Rising Action',
    'Conflict',
    'Climax',
    'Falling Action',
    'Conclusion',
  ];

  return (
    <Box maw={'44.187rem'} m="auto">
      <Flex direction="column" justify="center" align="center" gap={'1rem'}>
        <Text size="xl">Story title goes here or some shit</Text>

        {testData.map((story, index) => {
          return <EditCard linkNumber={(index + 1).toString()} linkContent={story.content} />;
        })}

        <Flex direction="column">
          <Box className={EditorStyle.dropDown}>
            <SelectDropdown label="Stage" options={options} />
          </Box>
          <Box className={EditorStyle.textContainer}>
            <Text className={EditClasses.numberText}>{testData.length + 1}</Text>
            <TextEditor />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
