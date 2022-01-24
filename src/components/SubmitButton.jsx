/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { secondaryActionStyle } from '../styles';

export function SubmitButton({ children, style, ...props }) {
  return (
    <button
      type="submit"
      css={[{ border: 0 }, secondaryActionStyle, style]}
      {...props}
    >
      {children || 'Submit'}
    </button>
  );
}
