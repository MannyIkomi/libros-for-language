/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { MonoFontLink } from './MonoFontLink';

export function ContributorLinks({ contributors, ...props }) {
  return (
    <>
      {contributors.map(({ lastName, firstName, slug }, index) => {
        return (
          <>
            <MonoFontLink to={`/authors-illustrators/${slug}`} {...props}>
              {firstName} {lastName}
            </MonoFontLink>
            {contributors.length !== index + 1 && ','}
          </>
        );
      })}
    </>
  );
}
