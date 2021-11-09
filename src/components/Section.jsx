/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flex, s1 } from '../styles';

export const Section = ({ children, ...props }) => {
  return (
    <section
      css={[{ minHeight: '50vh', ...flex(), justifyContent: 'center' }]}
      {...props}
    >
      {children}
    </section>
  );
};
