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
    root: { minWidth: '1.8rem'},
    input: {
      padding: 0,
      textAlign: 'center' as const,
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      // '&:focus': { outline: 'none', boxShadow: 'none' },
    },
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${theme.colors.gray[3]}`,
        borderRadius: 12,
        padding: '4px 12px',
        maxWidth: '20rem'
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <Box style={{ display: 'flex', alignItems: 'center', }}>
        <Box style={{ width: 'min-content', display: 'flex', alignItems: 'center' }}>
        <NumberInput
          variant="unstyled"
          hideControls
          value={days}
          min={0}
          max={14}
          onChange={(d) =>
            onChange(typeof d === 'number' ? d : Number(d) || 0, hours, minutes)
          }
          styles={unitStyles}
          suffix="d"
        />

        <Text size="sm" c="gray.6">:</Text>
        </Box>

        <Box style={{ width: 'min-content', display: 'flex', alignItems: 'center' }}>
        <NumberInput
          variant="unstyled"
          hideControls
          value={hours}
          min={0}
          max={23}
          onChange={(h) =>
            onChange(days, typeof h === 'number' ? h : Number(h) || 0, minutes)
          }
          styles={unitStyles}
          suffix="h"
        />
        <Text size="sm" c="gray.6">:</Text>
        </Box>


        <Box style={{ width: 'min-content', display: 'flex', alignItems: 'center' }}>
        <NumberInput
          variant="unstyled"
          hideControls
          value={minutes}
          min={0}
          max={59}
          onChange={(m) =>
            onChange(days, hours, typeof m === 'number' ? m : Number(m) || 0)
          }
          styles={unitStyles}
          suffix="m"
        />
      </Box>
      </Box>


      <Box style={{display: 'flex', alignItems: 'center'}}>
        <img
          src="/icons/Alarm.svg"
          alt="alarm"
          width={24}
          height={24}
        />
      </Box>
    </Box>
  );
}

