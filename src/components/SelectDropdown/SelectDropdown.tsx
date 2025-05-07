import { useState } from 'react';
import { Select } from '@mantine/core';

interface SelectDropdownProps {
  label: string;
  options: string[];
}

export default function SelectDropdown({ label, options }: SelectDropdownProps) {
  const [value, setValue] = useState<string | null>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <Select
      label={label}
      onDropdownOpen={() => setIsActive(true)}
      onDropdownClose={() => setIsActive(false)}
      onOptionSubmit={setValue}
      defaultValue={'Recently Updated'}
      data={options}
      withCheckIcon={false}
      rightSection={
        isActive ? (
          <img src="/icons/CaretUp_active.svg" alt="active dropdown icon" />
        ) : (
          <img src="/icons/CaretDown_inactive.svg" alt="active dropdown icon" />
        )
      }
    />
  );
}
