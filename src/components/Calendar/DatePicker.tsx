import { Box, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import type { DateValue } from '@mantine/dates';
import FormClasses from '../StoryForm/Form.module.css';
import DateClass from './DatePicker.module.css';
import { usePrivateStoryStore } from '@/stores/privateStoryStore';

interface CalendarProps {
  label?: string;
  type: 'start' | 'end'
}

export function DatePicker({ label, type }: CalendarProps) {

  const {startDate, endDate, setStartDate, setEndDate} = usePrivateStoryStore()

  const value = type === 'start' ? startDate : endDate;
  const onChange = type === 'start' ? setStartDate : setEndDate;

  return (
    <Box className={DateClass.calendarWrapper} onClick={(event) => event.stopPropagation()}>
      {label && <Text className={FormClasses.calendarLabel}>{label}</Text>}

      <DateInput
        placeholder="Select date"
        value={value}
        onChange={onChange}
        valueFormat="YYYY-MM-DD"
        minDate={new Date()}
        className={DateClass.input}
        style={{ backgroundColor: 'white' }}
        rightSection={
          <img
            src="/icons/CalendarDots.svg"
            alt="calendar icon"
            className={DateClass.calendarIcon}
            style={{ backgroundColor: 'var(--neutral-white)' }}
          />
        }
        classNames={{
          input: DateClass.input,
        }}
        popoverProps={{
          classNames: { dropdown: DateClass.dropdown },
          withinPortal: true,
        }}
        rightSectionWidth={36}
      />
    </Box>
  );
}
