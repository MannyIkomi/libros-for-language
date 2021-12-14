/** @jsx jsx */
import { jsx } from '@emotion/react';

export function BookImage({ book, ...props }) {
  const { bookCover } = book;

  return (
    <img
      src={bookCover?.url}
      width={bookCover?.width}
      height={bookCover?.height}
      loading="eager"
      alt={bookCover?.altDescription || `${book.title} Book Cover`}
      className="book-image"
      css={{
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: `${bookCover?.width} / ${bookCover?.height}`,

        maxWidth: '20rem',
        maxHeight: '20rem',
      }}
      {...props}
    />
  );
}
