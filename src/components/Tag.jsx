/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/react';
import {
  MONO_FONT,
  COMPLIMENT,
  s3,
  flex,
  s2,
  s0125,
  s075,
  s1,
  s00625,
  s05,
  ACCENT,
  BLACK,
  WHITE,
  PRIMARY20,
} from '../styles';

export const Tag = (props) => {
  const { textColor, background, children, label, css } = props;
  return (
    <div
      css={[
        flex('row', {
          alignItems: 'center',
          justifyContent: 'center',
        }),
        {
          textTransform: 'uppercase',
          fontSize: s075,
          fontFamily: MONO_FONT,
          letterSpacing: '0.05rem',
          whiteSpace: 'nowrap',

          minWidth: s3,
          width: '100%',
          maxWidth: 'min-content',

          minHeight: s2,
          padding: `${s0125} ${s1}`,
          color: textColor ?? WHITE,
          background: background ?? ACCENT,
          borderRadius: `${s00625} ${s05}`,
        },
        css,
      ]}
    >
      {children ?? label}
    </div>
  );
};

export const TopicTag = (props) => (
  <Tag textColor={BLACK} background={COMPLIMENT}>
    {props.children}
  </Tag>
);

export const CategoryTag = (props) => (
  <Tag textColor={BLACK} background={PRIMARY20}>
    {props.children}
  </Tag>
);
