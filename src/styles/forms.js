import { base4, onTabletMedia, PRIMARY, s0125 } from '.';
import { s05, MIN_TOUCH_SIZE, s025 } from './spacing';
import { notoSans } from './typography';

export const form = {
  width: '100%',
};

export const label = {
  ...notoSans,
  fontWeight: 'bold',
  fontSize: '0.75rem',
  lineHeight: 1,
  marginBottom: s025,
  // display: 'flex',
  // alignItems: 'center',
  textTransform: 'capitalize',
};

export const input = {
  '&[type="text"], &[type="email"], &[type="number"]': {
    width: '100%',
    minHeight: MIN_TOUCH_SIZE,
    padding: `0 ${s05}`,
    border: `${s0125} solid ${PRIMARY}`,
    borderRadius: s0125,
  },
  // '&[type="checkbox"], &[type="radio"]': {},
};

export const textarea = {
  width: '100%',
  minHeight: MIN_TOUCH_SIZE,
  padding: s05,

  resize: 'vertical',
  border: `${s0125} solid ${PRIMARY}`,
  borderRadius: s0125,
};

export const button = {
  '&[type="submit"]': {
    width: '100%',
    minHeight: MIN_TOUCH_SIZE,
  },
};
