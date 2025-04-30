import DateClass from './DatePicker.module.css';
import { DateInput } from '@mantine/dates';
import { Box, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

interface CalendarProps {
  label?: string;
  value: DateValue;
  onChange: (date: DateValue) => void;
}

export function DatePicker({ label, value, onChange, }: CalendarProps) {
  return (
    <Box className={DateClass.calendarWrapper}>
      <Text>{label}</Text>
      <DateInput
        placeholder="Select date"
        value={value}
        onChange={onChange}
        valueFormat="YYYY-MM-DD"
        minDate={new Date()}
        rightSection={
          <img
            src="icons/CalendarDots.svg"
            alt="calendar icon"
            className={DateClass.calendarIcon}
          />
        }
        classNames={{
            input: DateClass.input         
        }}
        popoverProps={{
            classNames: { dropdown: DateClass.dropdown }, 
        }}
        rightSectionWidth={36}
      />
    </Box>
  );
}

