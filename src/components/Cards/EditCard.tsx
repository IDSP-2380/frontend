import { Box, Flex, Text } from '@mantine/core';
import EditClasses from './EditCard.module.css';

interface EditCardProps {
  linkNumber: String;
  linkContent: string;
}

export default function EditCard({ linkNumber, linkContent }: EditCardProps) {
  return (
    <Box className={EditClasses.cardWidth}>
      <Flex>
        <Text className={EditClasses.numberText}>{linkNumber}</Text>
        <Box className={EditClasses.cardBorder}>{linkContent}</Box>
      </Flex>
    </Box>
  );
}
