/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { onTabletMedia, flex, s05, grid } from '../styles';
import { List } from '../components/List';

export const TagList = (props) => (
  <List
    css={[
      { listStyle: 'none' },
      { ...flex('row', { flexWrap: 'wrap', gap: s05 }) },
      onTabletMedia({
        ...grid({
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
          // gridAutoRows: `min-content`,
        }),
      }),
    ]}
    {...props}
  >
    {props.children}
  </List>
);
