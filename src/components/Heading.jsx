/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { headings, headingsDesktop, onTabletMedia } from '../styles';

export const Heading = ({ level = 1, children, ...props }) => {
  const HeadingTag = `h${level || 1}`;

  switch (level) {
    case 1:
      return (
        <HeadingTag
          css={[headings.h1, onTabletMedia(headingsDesktop.h1)]}
          {...props}
        >
          {children}
        </HeadingTag>
      );
    case 2:
      return (
        <HeadingTag
          css={[headings.h2, onTabletMedia(headingsDesktop.h2)]}
          {...props}
        >
          {children}
        </HeadingTag>
      );
    case 3:
      return (
        <HeadingTag
          css={[headings.h3, onTabletMedia(headingsDesktop.h3)]}
          {...props}
        >
          {children}
        </HeadingTag>
      );
    case 4:
      return (
        <HeadingTag
          css={[headings.h4, onTabletMedia(headingsDesktop.h4)]}
          {...props}
        >
          {children}
        </HeadingTag>
      );
    case 5:
      return (
        <HeadingTag
          css={[headings.h5, onTabletMedia(headingsDesktop.h5)]}
          {...props}
        >
          {children}
        </HeadingTag>
      );

    default:
      throw new Error(`Missing heading level 1-5, recieved: "${level}"`);
  }
};
