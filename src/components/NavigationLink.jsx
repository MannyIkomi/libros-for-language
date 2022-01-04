/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flex, PRIMARY_WHITE, s05, s2 } from '../styles';
import { Link } from './Link';

export function NavigationLink({ children, ...props }) {
  return (
    <Link
      css={{
        ...flex(),
        color: PRIMARY_WHITE,
        justifyContent: 'center',
        minHeight: s2,
        padding: s05,
        whiteSpace: 'nowrap',
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
