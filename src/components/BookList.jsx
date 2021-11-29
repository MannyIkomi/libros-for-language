/** @jsx jsx */
import { jsx } from '@emotion/react';
import { List } from './List';

export const BookList = ({ children, ...props }) => (
  <List css={{ listStyle: 'none' }} {...props}>
    {children}
  </List>
);
