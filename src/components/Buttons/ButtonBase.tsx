
import { Button } from '@mantine/core';
import { ReactNode, CSSProperties } from 'react';
import { useMantineTheme } from '@mantine/core';
import styles from './PrimraryButton.module.css';

type buttonNames = 'primrary' | 'primraryBig'

const buttonClassMapping = {
    primrary: styles.primrary,
    primraryBig: styles.primraryBig
}

interface buttonProps {
  onClick: () => void;
  children: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  width?: number | string;
  disabled?: boolean;
  style?: CSSProperties;
  buttonType?: buttonNames;
}

export function ButtonBase({
  onClick,
  children,
  leftSection,
  rightSection,
  style,
  width,
  disabled,
  buttonType = 'primrary',
}: buttonProps) {
  return (
    <Button
      onClick={onClick}
      leftSection={leftSection}
      rightSection={rightSection}
      disabled={disabled}
      className={buttonClassMapping[buttonType]}
      style={{ width, ...style }}
    >
      {children}
    </Button>
  );
}
