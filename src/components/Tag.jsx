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
  base160,
  MIN_TOUCH_SIZE,
  COMPLIMENT20,
  COMPLIMENT_WHITE,
  COMPLIMENT,
  onHover,
  onFocus,
} from '../styles';
import { boxShadowLg } from '../styles/shadow';
import {
  GenreIcon,
  GradeIcon,
  LanguageIcon,
  TextStructureIcon,
  TopicIcon,
} from '../icons/Icons';

export const Tag = ({ textColor, background, children, label, ...props }) => {
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

          minHeight: MIN_TOUCH_SIZE,

          padding: `${s0125} ${s05}`,
          color: textColor ?? WHITE,
          background: background ?? PRIMARY,
          borderRadius: `${s00625} ${s05}`,

          ...onHover({
            color: COMPLIMENT_WHITE,
            background: COMPLIMENT,
          }),
          ...onFocus({
            color: COMPLIMENT_WHITE,
            background: COMPLIMENT,
          }),
        },
      ]}
      {...props}
    >
      {children ?? label}
    </div>
  );
};

export const TopicTag = ({ children, ...props }) => (
  <Tag textColor={PRIMARY} background={PRIMARY40} {...props}>
    <TopicIcon css={{ width: s2, height: s2 }} /> {children}
  </Tag>
);
export const GenreTag = ({ children, ...props }) => (
  <Tag textColor={PRIMARY} background={PRIMARY40} {...props}>
    <GenreIcon css={{ width: s2, height: s2 }} /> {children}
  </Tag>
);
export const GradeLevelTag = ({ children, ...props }) => (
  <Tag textColor={PRIMARY} background={PRIMARY40} {...props}>
    <GradeIcon css={{ width: s2, height: s2 }} /> {children}
  </Tag>
);
export const LanguageTag = ({ children, ...props }) => (
  <Tag textColor={PRIMARY} background={PRIMARY40} {...props}>
    <LanguageIcon css={{ width: s2, height: s2 }} /> {children}
  </Tag>
);
export const TextStructureTag = ({ children, ...props }) => (
  <Tag textColor={PRIMARY} background={PRIMARY40} {...props}>
    <TextStructureIcon css={{ width: s2, height: s2 }} /> {children}
  </Tag>
);
export const TypologyTag = ({ children, ...props }) => (
  <Tag textColor={BLACK} background={COMPLIMENT20} {...props}>
    {children}
  </Tag>
);

export const FilterTag = ({ children, ...props }) => (
  <Tag
    textColor={PRIMARY}
    background={PRIMARY_WHITE}
    css={{
      border: `${s0125} solid ${PRIMARY40}`,
      ...onHover({
        color: COMPLIMENT_WHITE,
        backgroundColor: COMPLIMENT,
        borderColor: COMPLIMENT,
      }),
    }}
    {...props}
  >
    {children}
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
