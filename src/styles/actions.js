import {
  DEPRECATED_ACCENT,
  flex,
  s025,
  s2,
  s3,
  s1,
  WHITE,
  s20,
  onTabletMedia,
  PRIMARY,
  PRIMARY80,
  base320,
} from '.';
import { boxShadow2xl } from './shadow';

export const primaryActionStyle = [
  {
    ...flex('column', {
      justifyContent: 'center',
      alignItems: 'center',
    }),
    ...boxShadow2xl,

    width: '100%',

    minHeight: s3,
    minWidth: s3,
    padding: `${s1} ${s2}`,

    color: WHITE,
    backgroundColor: PRIMARY,
    fontWeight: '700',
    textAlign: 'center',

    textDecoration: 'none',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  onTabletMedia({ maxWidth: s20 }),
];

export const secondaryActionStyle = [
  {
    ...flex('column', {
      justifyContent: 'center',
      alignItems: 'center',
    }),
    ...boxShadow2xl,

    width: '100%',

    minHeight: s3,
    minWidth: s3,
    padding: `${s1} ${s2}`,

    color: WHITE,
    backgroundColor: PRIMARY80,
    fontWeight: '700',
    textAlign: 'center',

    textDecoration: 'none',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  onTabletMedia({ maxWidth: s20 }),
];

export const tertiaryActionStyle = [
  {
    ...flex('row', {
      display: 'inline-flex',
      // justifyContent: 'center',
      alignItems: 'center',
    }),

    minHeight: s3,

    padding: `${s1} 0`,

    color: PRIMARY,

    fontWeight: '700',
    textAlign: 'center',

    textDecoration: 'underline',
    textTransform: 'uppercase',
    // whiteSpace: 'nowrap',
  },
  onTabletMedia({ maxWidth: base320 }),
];
