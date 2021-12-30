import { PRIMARY, BLACK } from './color';
import { s05, s1, MAX_TEXT_LENGTH } from './spacing';

// TYPE
export const SANS_FONT = `Noto Sans, sans-serif`;
export const SERIF_FONT = `Noto Serif, serif`;
export const MONO_FONT = `Noto Sans Mono, monospace`;

export const notoSans = {
  fontFamily: SANS_FONT,
};

export const notoMono = {
  fontFamily: MONO_FONT,
};

export const notoSerif = {
  fontFamily: SERIF_FONT,
};

export const h1 = {
  ...notoSerif,
  maxWidth: MAX_TEXT_LENGTH,
  fontSize: '2.488rem',
  lineHeight: '1.2',
  fontWeight: '300',
  marginTop: 0,
  marginBottom: s1,
  color: PRIMARY,
};

export const h2 = {
  ...notoSerif,
  maxWidth: MAX_TEXT_LENGTH,
  fontSize: '2.074rem',
  fontWeight: '300',
  lineHeight: '1.2',
  marginBottom: s1,
  color: PRIMARY,
};

export const h3 = {
  ...notoSerif,
  maxWidth: MAX_TEXT_LENGTH,
  fontSize: '1.728rem',
  lineHeight: '1.2',
  fontWeight: '300',
  marginBottom: s1,
  color: PRIMARY,
};

export const h4 = {
  ...notoSerif,
  fontSize: '1.444rem',
  lineHeight: '1.2',
  fontWeight: '300',
  marginBottom: s1,
  color: PRIMARY,
};

export const h5 = {
  ...notoSerif,
  fontSize: '1.2rem',
  lineHeight: '1.2',
  fontWeight: '300',
  marginBottom: s1,
  color: PRIMARY,
};

export const p = {
  ...notoSans,
  maxWidth: MAX_TEXT_LENGTH,
  fontSize: '1rem',
  lineHeight: '1.8',
  fontWeight: '300',
  marginBottom: s05,
  color: BLACK,
};

export const a = {
  ...notoSans,
  fontSize: 'inherit',
  textDecoration: 'none',

  '&:link, &:visited, &:focus, &:hover, &:active': {
    color: 'inherit',
  },
};

export const headings = {
  h1,
  h2,
  h3,
  h4,
  h5,
};

export const headingsDesktop = {
  h1: {
    ...h1,
    fontSize: '4.209rem',
  },
  h2: {
    ...h2,
    fontSize: '3.157rem',
  },
  h3: {
    ...h3,
    fontSize: '2.369rem',
  },
  h4: {
    ...h4,
    fontSize: '1.777rem',
  },
  h5: {
    ...h5,
    fontSize: '1.333rem',
  },
};
