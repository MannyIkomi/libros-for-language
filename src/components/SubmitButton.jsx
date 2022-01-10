/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { secondaryActionStyle } from '../styles';

export function SubmitButton(props) {
  const { style, children } = props;
  return (
    <button type="submit" css={[{ border: 0 }, secondaryActionStyle, style]}>
      {children || 'Submit'}
    </button>
  );
}
