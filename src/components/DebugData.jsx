import React from 'react';
import { jsx } from '@emotion/react';
import { isDevEnv, isUnderContruction } from '../utils/environment';

export const DebugData = (props) => {
  return (
    isDevEnv && <pre>{JSON.stringify(props.children || props, null, 2)}</pre>
  );
};
