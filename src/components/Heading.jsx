/** @jsx jsx */
import { jsx } from '@emotion/react';
import { headings, headingsDesktop, onTabletMedia } from '../styles';

export const Heading = ({ level = 1, children, ...props }) => {
  const Level = `h${level || 1}`;

  switch (level) {
    case 1:
      return (
        <Level
          css={[headings.h1, onTabletMedia(headingsDesktop.h1)]}
          {...props}
        >
          {children}
        </Level>
      );
    case 2:
      return (
        <Level
          css={[headings.h2, onTabletMedia(headingsDesktop.h2)]}
          {...props}
        >
          {children}
        </Level>
      );
    case 3:
      return (
        <Level
          css={[headings.h3, onTabletMedia(headingsDesktop.h3)]}
          {...props}
        >
          {children}
        </Level>
      );
    case 4:
      return (
        <Level
          css={[headings.h4, onTabletMedia(headingsDesktop.h4)]}
          {...props}
        >
          {children}
        </Level>
      );
    case 5:
      return (
        <Level
          css={[headings.h5, onTabletMedia(headingsDesktop.h5)]}
          {...props}
        >
          {children}
        </Level>
      );

    default:
      throw new Error(`Missing heading level 1-5, recieved: "${level}"`);
  }
};
