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

    borderStyle: 'solid',
    borderWidth: s025,
    borderColor: DEPRECATED_ACCENT,

    color: DEPRECATED_ACCENT,
    backgroundColor: WHITE,
    fontWeight: '700',
    textAlign: 'center',

    textDecoration: 'none',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  onTabletMedia({ maxWidth: s20 }),
];
