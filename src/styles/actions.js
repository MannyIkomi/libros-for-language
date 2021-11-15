import { ACCENT, flex, s025, s2, s3, s1, WHITE } from '.';
import { boxShadow, boxShadow2xl, SHADOW } from './shadow';

export const primaryActionStyle = {
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
  borderColor: ACCENT,

  color: ACCENT,
  backgroundColor: WHITE,
  fontWeight: '700',
  textAlign: 'center',

  textDecoration: 'none',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};
