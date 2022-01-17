/** @jsx jsx */
import { jsx } from '@emotion/react';
import Link from './Link';
import { Logo } from './Logo';
import { flex, s4, s025, h1, onSupport } from '../styles';
import { isDevEnv, showUnderContruction } from '../utils/environment';
import { Heading } from './Heading';
import { HiddenAccessibleText } from './HiddenAccessibleText';

export function UnderConstruction(props) {
  return (
    showUnderContruction && (
      <div
        css={[
          flex('column', { alignItems: 'center', justifyContent: 'center' }),
          {
            position: 'fixed',
            backgroundColor: 'hsla(0, 0%, 100%, 0.9)',
            top: 0,
            left: 0,
            zIndex: 1,

            width: '100%',
            height: '100%',
          },
          onSupport('backdrop-filter: blur(1px)', {
            backgroundColor: 'hsla(0, 0%, 100%, 0.75)',
            backdropFilter: `blur(${s025})`,
          }),
          // h1,
        ]}
      >
        <Heading level={1}>Coming Soon!</Heading>
        <Link css={{ width: s4 }}>
          <Logo />
          <HiddenAccessibleText>Back to home page</HiddenAccessibleText>
        </Link>
      </div>
    )
  );
}
