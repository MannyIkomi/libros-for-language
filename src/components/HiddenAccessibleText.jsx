/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { hiddenAccessible } from '../styles';

export function HiddenAccessibleText({ children, ...props }) {
  return (
    <span css={hiddenAccessible} {...props}>
      {props.children}
    </span>
  );
}
