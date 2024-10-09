import { ReactNode } from 'react';
import classnames from 'classnames';
import Box, { BoxProps } from '@mui/material/Box';
import styles from './ContentSection.module.scss';

interface ContentSectionProp extends BoxProps {
  children: ReactNode;
  maxWidth?: number | undefined;
  compressed?: boolean;
  noPaddingTop?: boolean;
  noPaddingBottom?: boolean;
  noPadding?: boolean;
}

export default function ContentSection({
  children,
  maxWidth,
  compressed,
  noPaddingTop,
  noPaddingBottom,
  noPadding,
  ...boxProps
}: ContentSectionProp) {
  return (
    <Box
      {...boxProps}
      className={classnames(styles.container, {
        [styles.isCompressed]: compressed,
        [styles.noPaddingTop]: noPaddingTop,
        [styles.noPaddingBottom]: noPaddingBottom,
        [styles.noPadding]: noPadding,
      })}
    >
      <Box className={styles.body} style={{ maxWidth }}>
        {children}
      </Box>
    </Box>
  );
}
