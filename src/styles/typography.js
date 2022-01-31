import { PRIMARY, BLACK } from './color';
import { s05, s1, MAX_TEXT_LENGTH } from './spacing';

// TYPE
export const SANS_FONT = `Noto Sans, sans-serif`;
export const SERIF_FONT = `Noto Serif, serif`;
export const MONO_FONT = `Noto Sans Mono, monospace`;

export const hiddenAccessible = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
};

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
  margin: `0 0 ${s1} 0`,
  color: PRIMARY,
};

export const h2 = {
  ...notoSerif,
  maxWidth: MAX_TEXT_LENGTH,
  fontSize: '2.074rem',
  fontWeight: '300',
  lineHeight: '1.2',
  margin: `0 0 ${s1} 0`,
  color: PRIMARY,
};

export const h3 = {
  ...notoSerif,
  maxWidth: MAX_TEXT_LENGTH,
  fontSize: '1.728rem',
  lineHeight: '1.2',
  fontWeight: '300',
  margin: `0 0 ${s1} 0`,
  color: PRIMARY,
};

export const h4 = {
  ...notoSerif,
  fontSize: '1.444rem',
  lineHeight: '1.2',
  fontWeight: '300',
  margin: `0 0 ${s1} 0`,
  color: PRIMARY,
};

export const h5 = {
  ...notoSerif,
  fontSize: '1.2rem',
  lineHeight: '1.2',
  fontWeight: '300',
  margin: `0 0 ${s1} 0`,
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
  color: PRIMARY,
  // textDecoration: 'none',
};

export const headings = {
  h1,
  h2,
  h3,
  h4,
  h5,
};

export const headingsDesktop = {
  // https://type-scale.com/?size=16&scale=1.250&text=A%20Visual%20Type%20Scale&font=Noto%20Serif&fontweight=400&bodyfont=Noto%2BSans&bodyfontweight=400&lineheight=1.75&backgroundcolor=%23ffffff&fontcolor=%23000000&preview=false
  h1: {
    ...h1,
    fontSize: '3.052rem',
  },
  h2: {
    ...h2,
    fontSize: '2.441rem',
  },
  h3: {
    ...h3,
    fontSize: '1.953rem',
  },
  h4: {
    ...h4,
    fontSize: '1.563rem',
  },
  h5: {
    ...h5,
    fontSize: '1.25rem',
  },
};

export const strongBold = {
  'strong, b': {
    fontWeight: 'bold',
  },
};
