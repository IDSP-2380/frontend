import { TimeInput,DatesProvider  } from '@mantine/dates';
import { Box } from '@mantine/core';
import TimeClass from './TimePicker.module.css';
import { useMantineTheme } from '@mantine/core';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const theme = useMantineTheme();

  return (
<DatesProvider settings={{ locale: 'en-GB' }}>
    <Box className={TimeClass.timeWrapper}>
      <TimeInput
        withSeconds
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
       rightSection={
          <img
            src="icons/Alarm.svg"
            alt="alarm icon"
            className={TimeClass.alarmIcon}
          />
        }
        styles={{
          input: {
            borderRadius: theme.radius.lg,
          },
        }}
      />
    </Box>
</DatesProvider>
  );
}
