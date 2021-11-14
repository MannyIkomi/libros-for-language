/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { maxViewWidth, MAX_VIEW_LENGTH, s1 } from '../styles';

export const Container = ({ children, ...props }) => {
  return (
    <div
      css={{
        width: '100%',
        ...maxViewWidth,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingLeft: s1,
        paddingRight: s1,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const TextContainer = (props) => (
  <Container
    css={{
      fontSize: base16,
      ...maxTypeWidth,
      alignItems: 'initial',
      padding: 0,
    }}
    {...props}
  >
    {props.children}
  </Container>
);
