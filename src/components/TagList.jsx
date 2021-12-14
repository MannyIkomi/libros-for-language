/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { onTabletMedia, flex, s05, grid, s1, s2 } from '../styles';
import { List } from '../components/List';

export const TagList = (props) => (
  <List
    css={[
      { listStyle: 'none' },
      { ...flex('row', { flexWrap: 'wrap', gap: s1 }) },
      // onTabletMedia({
      //   ...grid({
      //     gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
      //   }),
      // }),
    ]}
    {...props}
  >
    {props.children}
  </List>
);
