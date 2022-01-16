/** @jsx jsx */
import { jsx } from '@emotion/react';
import Link from './Link';
import { base320 } from '../styles';
import { BookImage } from './BookImage';
import BookCoverPlaceholder from '../images/PlaceholderBookCover.png';

export function BookCover(props) {
  const { link, css, book, children, ...moreProps } = props;

  return (
    <Link
      to={link?.to || `/books/${book.slug}`}
      css={{ textDecoration: 'none' }}
    >
      <article {...moreProps} css={{ maxWidth: base320 }}>
        {book?.bookCover?.url ? (
          <BookImage book={book} />
        ) : (
          <img
            src={BookCoverPlaceholder}
            alt={`Placeholder book cover for ${book.title}`}
          />
        )}
        {children}
      </article>
    </Link>
  );
}
