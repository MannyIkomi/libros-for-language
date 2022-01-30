/** @jsx jsx */
import { jsx } from '@emotion/react';
import Link from './Link';
import { base320, boxShadowLg } from '../styles';
import { BookImage } from './BookImage';
import BookCoverPlaceholder from '../images/PlaceholderBookCover.png';

export function BookCover({ link, book, children, ...props }) {
  return (
    <Link
      to={link?.to || `/books/${book.slug}`}
      css={{ textDecoration: 'none', ...boxShadowLg }}
      {...props}
    >
      <article css={{ maxWidth: base320 }}>
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
