/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { h1, h2, h3, h4, h5 } from '../styles';

export const Heading = ({ level = 1, children, ...props }) => {
  const Level = `h${level || 1}`;

  switch (level) {
    case 1:
      return (
        <Level css={h1} {...props}>
          {children}
        </Level>
      );
    case 2:
      return (
        <Level css={h2} {...props}>
          {children}
        </Level>
      );
    case 3:
      return (
        <Level css={h3} {...props}>
          {children}
        </Level>
      );
    case 4:
      return (
        <Level css={h4} {...props}>
          {children}
        </Level>
      );
    case 5:
      return (
        <Level css={h5} {...props}>
          {children}
        </Level>
      );

    default:
      throw new Error(`Missing heading level 1-5, recieved: "${level}"`);
  }
};
