import { useState } from 'react';
import { DatePicker } from '../components/Calendar/DatePicker';
import { Text, Button } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

export function HomePage() {
  const [startDate, setStartDate] = useState<DateValue>(null);
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [error, setError] = useState<string | null>(null);

const validate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time portion for comparison

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
      <Button onClick={validate}>Submit</Button>
    </>
  );
}
