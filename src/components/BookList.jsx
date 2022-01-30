/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  base160,
  grid,
  onDesktopMedia,
  onTabletMedia,
  s1,
  s2,
  s3,
} from '../styles';
import { List } from './List';

export const BookList = ({ children, ...props }) => (
  <List
    css={[
      { listStyle: 'none' },
      grid({
        gridTemplateColumns: '1fr 1fr',
        gridGap: s1,
        placeItems: 'end center',
      }),
      onTabletMedia({
        width: '100%',
        gridGap: s2,
        gridTemplateColumns: 'repeat(4, 1fr)',
        // placeItems: 'end center',
      }),
      onDesktopMedia({
        gridGap: s3,
      }),
    ]}
    {...props}
  >
    {children}
  </List>
);
