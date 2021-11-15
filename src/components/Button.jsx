/** @jsx jsx */
import { jsx } from '@emotion/react';
import { primaryActionStyle } from '../styles/actions';

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
