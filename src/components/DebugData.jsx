import React from 'react';
import { jsx } from '@emotion/react';
import { isDevEnv, showUnderContruction } from '../utils/environment';

export const DebugData = (props) => {
  return (
    isDevEnv && <pre>{JSON.stringify(props.children || props, null, 2)}</pre>
  );
};
