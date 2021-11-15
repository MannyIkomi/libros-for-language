/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

export const Heading = ({ level = 1, children, ...props }) => {
  const Level = `h${level || 1}`;

  switch (level) {
    case 1:
      return <Level {...props}>{children}</Level>;
    case 2:
      return <Level {...props}>{children}</Level>;
    case 3:
      return <Level {...props}>{children}</Level>;
    case 4:
      return <Level {...props}>{children}</Level>;
    case 5:
      return <Level {...props}>{children}</Level>;

    default:
      throw new Error(`Missing heading level 1-5, recieved: "${level}"`);
  }
};
