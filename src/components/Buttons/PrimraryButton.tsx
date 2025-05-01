import { Button } from '@mantine/core';
import { ReactNode, CSSProperties } from 'react';
import { useMantineTheme } from '@mantine/core';
import styles from './PrimraryButton.module.css';

interface buttonProps {
  onClick: () => void;
  children: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  width?: number | string;
  disabled?: boolean;
  style?: CSSProperties;
}

export function PrimraryButton({
  onClick,
  children,
  leftSection,
  rightSection,
  style,
  width,
  disabled,
}: buttonProps) {
  const theme = useMantineTheme();

  return (
    <Button
      onClick={onClick}
      leftSection={leftSection}
      rightSection={rightSection}
      disabled={disabled}
      styles={{
        root: {
          backgroundColor: disabled ? theme.colors.brand[2] : theme.colors.brand[5],
          fontFamily: theme.fontFamily,
          fontSize: theme.headings.sizes.h5.fontSize,
          color: disabled ? theme.colors.brand[4] : '#FFFFFF',
          width: width ?? 'auto',
          ...style,
        },
        section: { },
      }}
      classNames={{
        root: `${styles.buttonRoot} ${disabled ? styles.disabled : styles.enabled}`,
        section: styles.sectionIcon,
      }}
    >
      {children}
    </Button>
  );
}
