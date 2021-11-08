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
  fontSize: '2.488rem',
  lineHeight: '1.2',
  fontWeight: '700',
};

export const h2 = {
  ...notoSerif,
  fontSize: '2.074rem',
  lineHeight: '1.2',
};

export const h3 = {
  ...notoSerif,
  fontSize: '1.728rem',
  lineHeight: '1.2',
  fontWeight: '400',
};

export const h4 = {
  ...notoSerif,
  fontSize: '1.444rem',
  lineHeight: '1.2',
  fontWeight: '400',
};

export const h5 = {
  ...notoSerif,
  fontSize: '1.2rem',
  lineHeight: '1.2',
  fontWeight: '400',
};

export const p = {
  ...notoSans,
  fontSize: '1rem',
  lineHeight: '1.8',
  fontWeight: '100',
};

export const a = {
  ...notoSans,
  fontSize: 'inherit',
  textDecoration: 'none',
};

export const headings = {
  h1,
  h2,
  h3,
  h4,
  h5,
};
