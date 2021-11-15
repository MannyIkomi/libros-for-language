/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import {
  maxViewWidth,
  MAX_VIEW_LENGTH,
  s1,
  flex,
  base16,
  maxTypeWidth,
} from '../styles';

export const Container = ({ children, ...props }) => {
  return (
    <div
      css={[
        flex('column', {
          alignItems: 'center',
        }),
        {
          width: '100%',
          ...maxViewWidth,
          // marginRight: 'auto',
          // marginLeft: 'auto',
          paddingLeft: s1,
          paddingRight: s1,
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export const TextContainer = ({ css, ...props }) => (
  <Container
    css={{
      fontSize: base16,
      ...maxTypeWidth,
      alignItems: 'initial',
      padding: 0,
      ...css,
    }}
    {...props}
  >
    {props.children}
  </Container>
);
