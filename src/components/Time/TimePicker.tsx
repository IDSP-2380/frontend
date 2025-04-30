import { TimeInput } from '@mantine/dates';
import { Box } from '@mantine/core';
import TimeClass from './TimePicker.module.css'

export function TimePicker() {
  return (
 <Box className={TimeClass.timeWrapper} >
  <TimeInput
    withSeconds        
    rightSection={
          <img
            src="icons/Alarm.svg"
            alt="alarm icon"

            className={TimeClass.alarmIcon}
          />
        }/>
</Box>
        )
}