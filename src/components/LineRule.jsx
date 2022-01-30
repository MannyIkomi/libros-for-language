/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { PRIMARY, s0125 } from '../styles';

export function LineRule({ ...props }) {
  return (
    <div
      css={{ borderTop: `solid ${s0125} ${PRIMARY}`, width: '100%' }}
      {...props}
    />
  );
}
