/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { PRIMARY40, PRIMARY80 } from '../styles';

export function HorizontalRule(props) {
  return (
    <hr
      css={{ borderColor: PRIMARY80, borderStyle: 'solid', width: '100%' }}
      {...props}
    />
  );
}
