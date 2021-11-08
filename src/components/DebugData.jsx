import React from 'react';
import { jsx } from '@emotion/react';

export const DebugData = (props) => {
  return <pre>{JSON.stringify(props.children || props, null, 2)}</pre>;
};
