import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateInput } from '@mantine/dates';
import { Box, Text } from '@mantine/core';

dayjs.extend(customParseFormat);

interface CalendarProps {
  label?: string;
}

export function Calendar({ label }: CalendarProps) {
  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Text >{label}</Text>
      <DateInput
        placeholder="Select date"
        valueFormat="YYYY-MM-DD"
        rightSection={
          <img
            src="icons/CalendarDots.svg"
            alt="calendar icon"
            style={{ width: 18, height: 18 }}
          />
        }
        rightSectionWidth={36} 
        styles={{
          input: { minWidth: 200 }, 
        }}
      />
    </Box>
  );
}
