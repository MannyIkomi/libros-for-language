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

export const PrimaryButton = (props) => {
  return <Button css={primaryActionStyle}>{props.children}</Button>;
};
export const SecondaryButton = (props) => {
  return <Button css={secondaryActionStyle}>{props.children}</Button>;
};
export const TertiaryButton = (props) => {
  return <Button css={tertiaryActionStyle}>{props.children}</Button>;
};
