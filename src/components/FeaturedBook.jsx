/** @jsx jsx */
import { jsx } from '@emotion/react';
import { notoSerif, PRIMARY, notoSans, onHover, WHITE } from '../styles';
import { BookImage } from './BookImage';
import { Link } from './Link';

export function FeaturedBook(book) {
  const authors = book.authors;
  console.log(authors);

  const maxDimensions = { maxWidth: '20rem', maxHeight: '20rem' };

  return (
    <Link
      to={`/books/${book.slug}`}
      key={book.slug}
      className="book-preview w-dyn-item"
      css={{
        ...onHover({
          '&:hover': {
            '.book-image': {
              transform: 'rotateY(-180deg)',
            },
            '.book-summary': {
              transform: 'rotateY(0deg)',
            },
            '.shadow-illusion': {
              transform: 'rotateY(-180deg)',
            },
          },
        }),
      }}
    >
      <article>
        <div
          className="book-camera w-inline-block"
          css={{
            position: 'relative',
            backfaceVisibility: 'hidden',

            perspective: '1500px',
            transform: 'rotateX(5deg) rotateY(10deg) rotateZ(-5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="book-summary"
            css={{
              position: 'absolute',
              left: 0,
              top: 0,

              display: 'block',
              overflow: 'hidden',
              // width: '100%',
              height: '100%',
              ...maxDimensions,
              // minWidth: '15rem',
              padding: '1rem',
              backgroundColor: WHITE,
              backfaceVisibility: 'hidden',

              transform: 'rotateX(0deg) rotateY(180deg) rotateZ(0deg)',

              transition:
                'transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="book-cover-title"
              css={{
                marginBottom: '0.5rem',
                ...notoSerif,
                color: PRIMARY,
                fontSize: '1.5rem',
                lineHeight: '1.4',
                fontWeight: '400',
              }}
            >
              {book.title}
            </div>
            <div
              className="book-cover-byline"
              css={{
                marginBottom: '0.5rem',
                ...notoSans,
                color: PRIMARY,
                fontSize: '1rem',
              }}
            >
              {authors.length >= 1 &&
                (authors.length === 1 ? (
                  <p>{`by ${authors[0].name}`}</p>
                ) : (
                  <p>{`by ${authors
                    .map((author) => author.name)
                    .join(', ')}`}</p>
                ))}
              <p>{book.publisherSummary}</p>
            </div>
            <div
              className="fade-paragraph"
              css={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '10rem',
                backgroundImage:
                  'linear-gradient(180deg, rgba(244, 247, 251, 0), #f4f7fb 90%)',
              }}
            ></div>
          </div>
          <BookImage
            book={book}
            css={{
              backfaceVisibility: 'hidden',
              transform: 'rotate(0deg)',
              transition:
                'transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out',
              objectFit: 'contain',
            }}
            className={'book-image'}
          />
        </div>
        <div
          className="book-camera shadow"
          css={{
            position: 'relative',
            backfaceVisibility: 'hidden',
            perspective: '1500px',
            transform: 'rotateX(5deg) rotateY(10deg) rotateZ(-5deg)',
            transformStyle: 'preserve-3d',
            zIndex: '-1',
          }}
        >
          <div
            className="shadow-illusion"
            css={{
              position: 'absolute',
              left: '0%',
              top: 'auto',
              right: '0%',
              bottom: '-10%',
              zIndex: '-2',
              width: '100%',
              ...maxDimensions,
              height: '5rem',
              backgroundColor: '#1c2431',
              opacity: '0.5',

              filter: 'blur(2rem)',

              transform: 'rotate(0deg)',

              transition:
                'transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out',
            }}
          ></div>
        </div>
      </article>
    </Link>
  );
}
