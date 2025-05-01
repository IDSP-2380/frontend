// import { TimePicker } from '@mantine/dates';
// import { Box, useMantineTheme } from '@mantine/core';
// import TimeClass from './SetTimer.module.css';

// interface SetTimerProps {
//   value: string | undefined;
//   onChange: (value: string) => void;
// }

// export function SetTimer({ value, onChange }: SetTimerProps) {
//   const theme = useMantineTheme();

//   return (
//     <Box className={TimeClass.timeWrapper}>
//       <TimePicker
//         withSeconds
//         value={value}
//         onChange={(val) => {
//           if (val) onChange(val);
//         }}
//         rightSection={
//           <img
//             src="icons/Alarm.svg"
//             alt="alarm icon"
//             className={TimeClass.alarmIcon}
//           />
//         }
//         styles={{
//           input: {
//             borderRadius: theme.radius.lg,
//           },
//         }}
//       />
//     </Box>
//   );
// }


import {
  Box,
  NumberInput,
  Text,
  useMantineTheme,
} from '@mantine/core';

interface SetTimerProps {
  days: number;
  hours: number;
  minutes: number;
  onChange: (days: number, hours: number, minutes: number) => void;
}

export function SetTimer({ days, hours, minutes, onChange }: SetTimerProps) {
  const theme = useMantineTheme();

  const unitStyles = {
    root: {
      minWidth: 40,          
    },
    input: {
      padding: 0,
      textAlign: 'center' as const,
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      whiteSpace: 'nowrap',  
      '&:focus': { outline: 'none', boxShadow: 'none' },
    },
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexWrap: 'nowrap',   
        alignItems: 'center',
        justifyContent: 'space-between',
        border: `1px solid ${theme.colors.gray[3]}`,
        borderRadius: 999,
        padding: '4px 12px',
        gap: theme.spacing.xs,
      }}
    >


      <Box ml="auto" style={{ display: 'flex', alignItems: 'center' }}>
      <NumberInput
        variant="unstyled"
        hideControls
        value={days}
        min={0}
        onChange={(d) =>
          onChange(
            typeof d === 'number' ? d : Number(d) || 0,
            hours,
            minutes
          )
        }
        styles={unitStyles}
        rightSection={<Text size="xs">d</Text>}
      />

      <Text size="sm" color="gray.6">:</Text>

      <NumberInput
        variant="unstyled"
        hideControls
        value={hours}
        min={0}
        max={23}
        onChange={(h) =>
          onChange(
            days,
            typeof h === 'number' ? h : Number(h) || 0,
            minutes
          )
        }
        styles={unitStyles}
        rightSection={<Text size="xs">h</Text>}
      />

      <Text size="sm" color="gray.6">:</Text>

      <NumberInput
        variant="unstyled"
        hideControls
        value={minutes}
        min={0}
        max={59}
        onChange={(m) =>
          onChange(
            days,
            hours,
            typeof m === 'number' ? m : Number(m) || 0
          )
        }
        styles={unitStyles}
        rightSection={<Text size="xs">m</Text>}
      />

      <Box ml="auto" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/icons/Alarm.svg"
          alt="alarm icon"
          width={24}
          height={24}
        />
      </Box>

      </Box>
    </Box>
  );
}

