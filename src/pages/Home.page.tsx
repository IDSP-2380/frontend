import { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import { DatePicker } from '@/components/Calendar/DatePicker';
import { SetTimer } from '@/components/Time/SetTimer';

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

  // clerk sign out test
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut({ redirectUrl: '/sign-in' });
  };

  return (
    <>
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
      <ButtonBase
        disabled={!isFormComplete}
        onClick={validate}
        buttonType="secondarySquare"
        rightSection={
          isFormComplete ? (
            <img src="/icons/CaretRight.svg" alt="icon" />
          ) : (
            <img src="/icons/CaretRightDisabled.svg" alt="icon" />
          )
        }
      >
        Edit
      </ButtonBase>

      <ButtonBase
        onClick={handleSignOut}
        buttonType="primaryBig"
        rightSection={
          isFormComplete ? (
            <img src="/icons/CaretRight.svg" alt="icon" />
          ) : (
            <img src="/icons/CaretRightDisabled.svg" alt="icon" />
          )
        }
      >
        Sign out
      </ButtonBase>
    </>
  );
}
