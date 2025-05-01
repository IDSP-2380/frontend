import AlarmIcon from '@/assets/icons/Alarm.svg?react';

export function Test() {
    console.log(typeof AlarmIcon)
  return (
    <div style={{ color: 'red' }}>
      <AlarmIcon style={{ width: 40, height: 40 }} />
    </div>
  );
}