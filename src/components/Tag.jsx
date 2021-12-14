/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  MONO_FONT,
  s3,
  flex,
  s2,
  s0125,
  s075,
  s1,
  s00625,
  s05,
  BLACK,
  WHITE,
  PRIMARY40,
  COMPLIMENT40,
  PRIMARY,
  PRIMARY20,
  PRIMARY_WHITE,
} from '../styles';
import { boxShadowLg } from '../styles/shadow';

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
          ...boxShadowLg,
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
          background: background ?? PRIMARY,
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
  <Tag textColor={BLACK} background={COMPLIMENT40}>
    {props.children}
  </Tag>
);

export const CategoryTag = (props) => (
  <Tag textColor={BLACK} background={PRIMARY40}>
    {props.children}
  </Tag>
);

export const TextStructureTag = (props) => (
  <Tag textColor={BLACK} background={COMPLIMENT40}>
    {props.children}
  </Tag>
);

export const FilterTag = (props) => (
  <Tag
    textColor={BLACK}
    background={PRIMARY_WHITE}
    {...props}
    css={{ border: `${s0125} solid ${PRIMARY}` }}
  >
    {props.children}
  </Tag>
);

export const SearchTag = ({ tag, removeButtonText, onDelete }) => {
  return (
    <button
      type="button"
      title={removeButtonText}
      onClick={onDelete}
      css={{
        border: ' none',
      }}
    >
      <Tag>{tag.name}</Tag>
    </button>
  );
};
