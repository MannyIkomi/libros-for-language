/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flex, s1 } from '../styles';

export const Section = ({ children, ...props }) => {
  return (
    <section
      css={[
        {
          marginTop: s1,
          marginBottom: s1,
          width: '100%',
          minHeight: '50vh',
          ...flex('column', { alignItems: 'center', justifyContent: 'center' }),
        },
      ]}
      {...props}
    >
      {children}
    </section>
  );
};
