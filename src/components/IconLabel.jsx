import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { notoSans, s05, s075 } from '../styles/index';
export function IconLabel({ children, ...props }) {
  return (
    <span css={{ fontSize: s05, ...notoSans }} {...props}>
      {children}
    </span>
  );
}

export default IconLabel;
