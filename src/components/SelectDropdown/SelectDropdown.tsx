import { useState } from 'react';
import { Select } from '@mantine/core';
import { useHomeStore } from '@/stores/homeStore';
import SelectStyles from './SelectDropdown.module.css';

interface SelectDropdownProps {
  label: string;
  options: string[];
}

export default function SelectDropdown({ label, options }: SelectDropdownProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { select, setSelect } = useHomeStore();

  return (
    <Select
      className={SelectStyles.SelectBar}
      classNames={{
        input: SelectStyles.SelectInput,
        root: SelectStyles.RootClass,
        wrapper: SelectStyles.WrapperClass,
      }}
      label={label}
      onDropdownOpen={() => setIsActive(true)}
      onDropdownClose={() => setIsActive(false)}
      onOptionSubmit={setSelect}
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
      name="select"
    />
  );
}
