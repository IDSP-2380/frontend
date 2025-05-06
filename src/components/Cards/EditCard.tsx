import { Box, Flex } from '@mantine/core';
import EditClasses from './EditCard.module.css';

export default function EditCard() {
  return (
    <Box>
      <Flex>
        <h2 className={EditClasses.numberText}>1</h2>
        <Box className={EditClasses.cardBorder}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, est nam! Eaque ipsum,
          aperiam, illum voluptates tempora, tenetur hic ad aut molestiae qui sint consequuntur fuga
          veniam nostrum adipisci aliquam?
        </Box>
      </Flex>
    </Box>
  );
}
