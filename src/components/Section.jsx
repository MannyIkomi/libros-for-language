/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flex, onTabletMedia, s1, s4 } from '../styles';

export const Section = ({ children, ...props }) => {
  return (
    <section
      css={[
        {
          marginTop: s1,
          marginBottom: s1,
          width: '100%',
          minHeight: '90vh',
          ...flex('column', { alignItems: 'center', justifyContent: 'center' }),
        },
        onTabletMedia({
          marginTop: s4,
          marginBottom: s4,
          minHeight: '75vh',
        }),
        onTabletMedia({
          minHeight: '66vh',
        }),
      ]}
      {...props}
    >
      {children}
    </section>
  );
};
