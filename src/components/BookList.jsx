/** @jsx jsx */
import { jsx } from '@emotion/react';
import { base160, grid, onTabletMedia, s1 } from '../styles';
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
        gridTemplateColumns: 'repeat(4,1fr)',
        placeItems: 'end center',
        gridColumn: '1 / -1',
      }),
    ]}
    {...props}
  >
    {children}
  </List>
);
