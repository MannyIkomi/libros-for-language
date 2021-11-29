/** @jsx jsx */
import { jsx } from '@emotion/react';
import Link from './Link';
import { base320 } from '../styles';
import { BookImage } from './BookImage';

export function BookCover(props) {
  const { link, css, book, children, ...moreProps } = props;

  return (
    <Link to={link.to}>
      <article {...moreProps} css={{ maxWidth: base320 }}>
        <BookImage book={book} />
        {children}
      </article>
    </Link>
  );
}
