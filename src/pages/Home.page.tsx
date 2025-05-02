import { useState } from 'react';
import { DatePicker } from '@/components/Calendar/DatePicker';
import { Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';
import { SetTimer } from '@/components/Time/SetTimer';
import { ButtonBase } from '@/components/Buttons/ButtonBase';


export function HomePage() {
  const [startDate, setStartDate] = useState<DateValue>(null);
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string | undefined>(undefined);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

const isFormComplete = startDate && endDate && days >= 1;

const validate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  if (!startDate || !endDate) {
    setError('Both dates must be selected');
  } else if (startDate < today) {
    setError('Start date must be today or later');
  } else if (startDate > endDate) {
    setError('Start date must be before end date');
  } else {
    setError(null);
  }
};



  return (
    <>
      <DatePicker label="Start Date" value={startDate} onChange={setStartDate} />
      <DatePicker label="End Date" value={endDate} onChange={setEndDate} />
      {error && <Text c="red">{error}</Text>}
 <SetTimer
        days={days}
        hours={hours}
        minutes={minutes}
        onChange={(d, h, m) => {
          setDays(d);
          setHours(h);
          setMinutes(m);
        }}
      />
      <ButtonBase disabled={!isFormComplete} onClick={validate} buttonType="secondarySquare"  rightSection={isFormComplete ? <img  src='/icons/CaretRight.svg' alt="icon" />: <img  src='/icons/CaretRightDisabled.svg' alt="icon" />}>Edit</ButtonBase >
    </>
  );
}
