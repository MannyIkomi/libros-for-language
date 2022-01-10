/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import { s1, s05, WHITE } from '../styles';
import { isDevEnv } from '../utils/environment';

export function GraphCMSPreviewIndicator() {
  return (
    isDevEnv && (
      <div
        css={{
          padding: `${s05} ${s1}`,
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: 999,
          textAlign: 'center',
          backgroundColor: `rgb(102, 51, 153)`,
          color: WHITE,
        }}
      >
        GraphCMS Draft Preview Site
      </div>
    )
  );
}
