/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

export const Container = ({ children, ...props }) => {
  return (
    <div
      css={{
        width: '100%',
        maxWidth: '60rem',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
      {...props}
    >
      {children}
    </div>
  );
};
