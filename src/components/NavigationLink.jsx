/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  COMPLIMENT20,
  flex,
  onFocus,
  onHover,
  PRIMARY_WHITE,
  s05,
  s2,
} from '../styles';
import { Link } from './Link';

export function NavigationLink({ children, ...props }) {
  return (
    <Link
      css={{
        ...flex(),
        textDecoration: 'none',
        color: PRIMARY_WHITE,
        justifyContent: 'center',
        minHeight: s2,
        padding: s05,
        whiteSpace: 'nowrap',

        ...onFocus({
          color: COMPLIMENT20,
        }),
        ...onHover({
          color: COMPLIMENT20,
        }),
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
