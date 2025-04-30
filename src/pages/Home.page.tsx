import { HeaderMenu } from '@/components/Welcome/HeaderMenu';
import { DatePicker } from '@/components/Calendar/DatePicker';
import { TimePicker } from '@/components/Time/TimePicker';

export function HomePage() {
  return (
    <>
      <DatePicker />
      <TimePicker />
    </>
  );
}
