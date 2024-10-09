import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import Box, { BoxProps } from '@mui/material/Box';
import styles from './Card.module.scss';

interface CardProps extends BoxProps {
  link?: string;
  head?: string | JSX.Element;
  children: React.ReactNode;
  height?: number | string;
  hasError?: boolean;
}

export default function Card({
  link = '',
  head,
  children,
  height,
  hasError,
  ...boxProps
}: CardProps) {
  const Wrapper = link ? Link : Box;

  return (
    <Wrapper
      href={link}
      className={classnames(styles.container, {
        [styles.hasError]: hasError,
      })}
    >
      <Box height={height} width="100%" {...boxProps}>
        {head && <Box className={styles.head}>{head}</Box>}
        <Box className={styles.body}>{children}</Box>
      </Box>
    </Wrapper>
  );
}
