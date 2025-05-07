import { CSSProperties, ReactNode } from 'react';
import { Button, useMantineTheme } from '@mantine/core';
import styles from './ButtonBase.module.css';

type buttonNames =
  | 'primary'
  | 'primaryBig'
  | 'primaryWhite'
  | 'primaryWhiteBig'
  | 'secondaryWhite'
  | 'secondaryDim'
  | 'secondarySquare'
  | 'secondaryNeutral';

const buttonClassMapping = {
  primary: styles.primary,
  primaryBig: styles.primaryBig,
  primaryWhite: styles.primaryWhite,
  primaryWhiteBig: styles.primaryWhiteBig,
  secondaryWhite: styles.secondaryWhite,
  secondaryDim: styles.secondaryDim,
  secondarySquare: styles.secondarySquare,
  secondaryNeutral: styles.secondaryNeutral,
};

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
  buttonType = 'primary',
}: buttonProps) {
  return (
    <Button
      onClick={onClick}
      leftSection={leftSection}
      rightSection={rightSection}
      disabled={disabled}
      className={buttonClassMapping[buttonType]}
      style={{ ...style }}
      type="submit"
      classNames={{
        root: `${styles.buttonRoot} ${disabled ? styles.disabled : styles.enabled}`,
        section: styles.sectionIcon,
      }}
    >
      {children}
    </Button>
  );
}
