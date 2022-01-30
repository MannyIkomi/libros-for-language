/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link as GatsbyLink } from 'gatsby';
import {
  primaryActionStyle,
  secondaryActionStyle,
  tertiaryActionStyle,
  COMPLIMENT80,
  COMPLIMENT,
  s0125,
  onHover,
  onFocus,
  PRIMARY,
} from '../styles/';

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
export const Link = ({
  children,
  to,
  href,
  activeClassName,
  partiallyActive,

  ...props
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  if (href) {
    throw new Error(`🚨 Don't use an {href} prop to pass links, use {to}`);
  }
  const internal = /^\/(?!\/)/.test(to);

  const overridePseudoStyles = {
    color: PRIMARY,
    ...onHover({
      color: COMPLIMENT,
    }),
    ...onFocus({
      color: COMPLIMENT,
      outlineColor: COMPLIMENT80,
      outlineStyle: 'solid',
      outlineWidth: s0125,
    }),
  };

  // Use Gatsby Link for internal links, and <a> for others
  if (!to) {
    // removed the <a/> tag and replaced with generic
    return <span {...props}>{children}</span>;
  }

  if (internal) {
    return (
      <GatsbyLink
        to={to}
        // activeClassName={activeClassName}
        // partiallyActive={partiallyActive}
        css={{ ...overridePseudoStyles, textDecoration: 'underline' }}
        {...props}
      >
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={to} css={overridePseudoStyles} {...props}>
      {children}
    </a>
  );
};

export const PrimaryLink = ({ children, ...props }) => (
  <Link css={primaryActionStyle} {...props}>
    {children}
  </Link>
);
export const SecondaryLink = ({ children, ...props }) => (
  <Link css={secondaryActionStyle} {...props}>
    {children}
  </Link>
);
export const TertiaryLink = ({ children, ...props }) => (
  <Link css={tertiaryActionStyle} {...props}>
    {children}
  </Link>
);

export default Link;
