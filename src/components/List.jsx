/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { flex } from '../styles';

export function List(props) {
  const { children, ordered = false } = props;
  const LIST_TYPE = ordered ? 'ol' : 'ul';

  return (
    <LIST_TYPE {...props}>
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </LIST_TYPE>
  );
}

export const TagList = (props) => (
  <List
    css={[
      flex('row', {
        flexWrap: 'wrap',
      }),
      { listStyle: 'none' },
    ]}
  >
    {props.children}
  </List>
);
