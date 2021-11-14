/** @jsx jsx */
import React from 'react';

import { Global, jsx } from '@emotion/react';
import HtmlHead from './HtmlHead';
import {
  SANS_FONT,
  headings,
  BLACK,
  WHITE,
  a,
  p,
  notoSans,
  colors,
} from '../styles';
import 'normalize.css/normalize.css';

export const GlobalLayout = ({ htmlHead, children }) => {
  return (
    <>
      <HtmlHead {...htmlHead} />
      <Global
        styles={{
          '*': {
            borderSize: 'border-box',
            color: BLACK,
            fontFamily: SANS_FONT,
            margin: 0,
            padding: 0,
          },
          body: {
            ...notoSans,
            backgroundColor: WHITE,
            color: '#1c2431',
            fontSize: '1rem',
            lineHeight: '1.2',
          },
          ...headings,
          ...a,
          ...p,
        }}
      />
      <div
        css={{
          backgroundColor: WHITE,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </>
  );
};
