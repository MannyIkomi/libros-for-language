/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  primaryActionStyle,
  secondaryActionStyle,
  tertiaryActionStyle,
} from '../styles/actions';

export function Button({ children, ...props }) {
  return (
    <button
      css={{
        backgroundColor: 'transparent',
        border: 'none',
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button css={primaryActionStyle} {...props}>
      {children}
    </Button>
  );
};
export const SecondaryButton = ({ children, ...props }) => {
  return (
    <Button css={secondaryActionStyle} {...props}>
      {children}
    </Button>
  );
};
export const TertiaryButton = ({ children, ...props }) => {
  return (
    <Button css={tertiaryActionStyle} {...props}>
      {children}
    </Button>
  );
};
