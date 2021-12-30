/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { a, p, headings, s1, PRIMARY } from '../styles';

export function RichText({ html, ...props }) {
  return (
    <div
      className="RichText"
      dangerouslySetInnerHTML={{ __html: html }}
      css={{
        ...headings,
        a: {
          ...a,
          color: PRIMARY,
          textDecoration: 'underline',
        },
        p,
        'ol, ul': {
          paddingLeft: '1.3rem',
          listStylePosition: 'outside',
        },
      }}
      {...props}
    ></div>
  );
}

export default RichText;
