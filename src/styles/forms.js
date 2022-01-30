import { base4, COMPLIMENT, onTabletMedia, PRIMARY, s0125 } from '.';
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
  textTransform: 'capitalize',

  '&:focus': {
    color: COMPLIMENT,
    borderColor: COMPLIMENT,
    outlineColor: COMPLIMENT,
  },
};

export const input = {
  '&[type="text"], &[type="email"], &[type="number"], &[type="search"]': {
    width: '100%',
    minHeight: MIN_TOUCH_SIZE,
    padding: `0 ${s05}`,
    border: `${s0125} solid ${PRIMARY}`,
    borderRadius: s0125,
  },
  '&:focus': {
    borderColor: COMPLIMENT,
    outlineColor: COMPLIMENT,
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

  '&:focus': {
    borderColor: COMPLIMENT,
    outlineColor: COMPLIMENT,
  },
};

export const button = {
  '&[type="submit"]': {
    width: '100%',
    minHeight: MIN_TOUCH_SIZE,
  },
};
