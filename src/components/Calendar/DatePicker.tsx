import { useState } from 'react';
import DateClass from './DatePicker.module.css';
import { DateInput } from '@mantine/dates';
import { Box, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

interface CalendarProps {
  label?: string;
}

export function DatePicker({ label }: CalendarProps) {
  const [date, setDate] = useState<DateValue>(null);

  return (
    <Box className={DateClass.calendarWrapper} >
      <Text>{label}</Text>
      <DateInput
        placeholder="Select date"
        value={date}
        valueFormat="YYYY-MM-DD"
        rightSection={
          <img
            src="icons/CalendarDots.svg"
            alt="calendar icon"
            className={DateClass.calendarIcon}
          />
        }
        rightSectionWidth={36}
      />
    </Box>
  );
}
