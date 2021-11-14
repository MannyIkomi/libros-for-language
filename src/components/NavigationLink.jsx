/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flex, s05, s2 } from '../styles';
import { Link } from './Link';

export function NavigationLink({ children, ...props }) {
  return (
    <Link
      {...props}
      css={{
        ...flex(),

        justifyContent: 'center',
        minHeight: s2,
        padding: s05,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Link>
  );
}
