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
          // whiteSpace: 'nowrap',

          // minWidth: s3,
          minHeight: MIN_TOUCH_SIZE,
          // width: '100%',
          // maxWidth: 'min-content',
          // maxWidth: base160,

          padding: `${s0125} ${s05}`,
          color: textColor ?? WHITE,
          background: background ?? PRIMARY,
          borderRadius: `${s00625} ${s05}`,
        },
      ]}
      {...props}
    >
      {children ?? label}
    </div>
  );
};

export const TopicTag = (props) => (
  <Tag textColor={PRIMARY} background={PRIMARY40}>
    <TopicIcon css={{ width: s2, height: s2 }} /> {props.children}
  </Tag>
);
export const GenreTag = (props) => (
  <Tag textColor={PRIMARY} background={PRIMARY40}>
    <GenreIcon css={{ width: s2, height: s2 }} /> {props.children}
  </Tag>
);
export const GradeLevelTag = (props) => (
  <Tag textColor={PRIMARY} background={PRIMARY40}>
    <GradeIcon css={{ width: s2, height: s2 }} /> {props.children}
  </Tag>
);
export const LanguageTag = (props) => (
  <Tag textColor={PRIMARY} background={PRIMARY40}>
    <LanguageIcon css={{ width: s2, height: s2 }} /> {props.children}
  </Tag>
);
export const TextStructureTag = (props) => (
  <Tag textColor={PRIMARY} background={PRIMARY40}>
    <TextStructureIcon css={{ width: s2, height: s2 }} /> {props.children}
  </Tag>
);

export const TypologyTag = (props) => (
  <Tag textColor={BLACK} background={COMPLIMENT20}>
    {props.children}
  </Tag>
);

export const FilterTag = (props) => (
  <Tag
    textColor={BLACK}
    background={PRIMARY_WHITE}
    css={{ border: `${s0125} solid ${PRIMARY40}` }}
    {...props}
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
