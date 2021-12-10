/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { PRIMARY, notoMono, s05 } from '../styles';
import { Link } from './Link';

export const MonoFontLink = (props) => (
  <Link
    css={{
      ...notoMono,
      textDecoration: 'underline',
      color: PRIMARY,
      letterSpacing: '0.05rem',
      display: 'inline-block',
      padding: s05,
      marginBottom: s05,
      whiteSpace: 'nowrap',
    }}
    {...props}
  >
    {props.children}
  </Link>
);
