/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export function BookImage({ book, ...props }) {
  const { bookCover } = book;

  return (
    <GatsbyImage
      className="book-image" // important for hover effect
      image={bookCover.gatsbyImageData}
      alt={`${book.title} Book Cover`}
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
    // <img
    //   src={bookCover?.url}
    //   width={bookCover?.width}
    //   height={bookCover?.height}
    //   loading="eager"
    //   alt={bookCover?.altDescription || `${book.title} Book Cover`}
    //   className="book-image" // important for hover effect
    //   css={{
    //     display: 'block',
    //     width: '100%',
    //     height: 'auto',
    //     aspectRatio: `${bookCover?.width} / ${bookCover?.height}`,

    //     maxWidth: '20rem',
    //     maxHeight: '20rem',
    //   }}
    //   {...props}
    // />
  );
}
