/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { DEPRECATED_ACCENT, s1, s0125, boxShadowLg } from '../styles';

export const TagGroup = (props) => {
  const { background } = props;
  return (
    <section
      css={{
        padding: s1,

        background: background || DEPRECATED_ACCENT,
        borderRadius: `${s0125} ${s1}`,
        ...boxShadowLg,
      }}
      {...props}
    >
      {props.children}
    </section>
  );
};
