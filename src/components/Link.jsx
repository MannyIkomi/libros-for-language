/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link as GatsbyLink } from 'gatsby';
import {
  primaryActionStyle,
  secondaryActionStyle,
  tertiaryActionStyle,
  COMPLIMENT80,
  s0125,
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
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  if (href) {
    throw new Error(`🚨 Don't use an {href} prop to pass links, use {to}`);
  }
  const internal = /^\/(?!\/)/.test(to);

  const overridePseudoStyles = {
    // '&:link, &:visited, &:focus, &:hover, &:active': {
    //   color: 'inherit',
    // },
    '&:focus': {
      outlineColor: COMPLIMENT80,
      outlineStyle: 'solid',
      outlineWidth: s0125,
    },
  };

  // Use Gatsby Link for internal links, and <a> for others
  if (!to) {
    // removed the <a/> tag and replaced with generic
    return <span {...other}>{children}</span>;
  }

  if (internal) {
    return (
      <GatsbyLink
        to={to}
        // activeClassName={activeClassName}
        // partiallyActive={partiallyActive}
        css={[overridePseudoStyles, { textDecoration: 'underline' }]}
        {...other}
      >
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={to} css={overridePseudoStyles} {...other}>
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
