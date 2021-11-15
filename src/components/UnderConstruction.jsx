/** @jsx jsx */
import { Global, jsx } from '@emotion/react';
import { GlobalLayout } from './GlobalLayout';
import Link from './Link';
import { Logo } from './Logo';
import { flex, PRIMARY20, s0125, s4, s025, s05, s1, h1 } from '../styles';
import { isUnderContruction } from '../utils/environment';

export function UnderConstruction(props) {
  return (
    isUnderContruction && (
      <div
        css={[
          flex('column', { alignItems: 'center', justifyContent: 'center' }),
          {
            position: 'fixed',
            backgroundColor: 'hsla(0,0,0,0.5)',
            backdropFilter: `blur(${s025})`,
            top: 0,
            left: 0,

            width: '100%',
            height: '100%',
          },
          h1,
        ]}
      >
        <h1>Coming Soon!</h1>
        <Link css={{ width: s4 }}>
          <Logo />
        </Link>
      </div>
    )
  );
}
