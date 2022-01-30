/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  notoSerif,
  PRIMARY,
  notoSans,
  onHover,
  WHITE,
  BLACK,
  s5,
  boxShadow,
  s2,
  boxShadow2xl,
} from '../styles';
import { concatFullName } from '../utils/concatFullName';
import { BookImage } from './BookImage';
import { ContributorLinks } from './ContributorLinks';
import { Link } from './Link';

export function FeaturedBook({ book, ...props }) {
  const authors = book.authors.map(concatFullName);

  const maxDimensions = { maxWidth: '20rem', maxHeight: '20rem' };

  const book3dCameraStyle = {
    position: 'relative',
    backfaceVisibility: 'hidden',
    perspective: '1500px',
    transform: 'rotateX(5deg) rotateY(10deg) rotateZ(-5deg)',
    transformStyle: 'preserve-3d',
  };

  return (
    <Link
      to={`/books/${book.slug}`}
      key={book.slug}
      className="book-preview"
      css={{
        ...onHover({
          '&:hover': {
            '.cover': {
              transform: 'rotateY(-180deg)',
            },
            '.summary': {
              transform: 'rotateY(0deg)',
            },
            '.shadow': {
              transform: 'rotateY(-180deg)',
            },
          },
        }),
        '&:focus': {
          '.cover': {
            transform: 'rotateY(-180deg)',
          },
          '.summary': {
            transform: 'rotateY(0deg)',
          },
          '.shadow': {
            transform: 'rotateY(-180deg)',
          },
        },
      }}
      {...props}
    >
      <article>
        <div css={[book3dCameraStyle]}>
          <div className="book-camera">
            <BookImage
              className={'cover'}
              book={book}
              css={{
                ...boxShadow2xl,
                backfaceVisibility: 'hidden',
                transform: 'rotate(0deg)',
                transition:
                  'transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out',
                objectFit: 'contain',
              }}
            />
            <div
              className="summary"
              css={[
                boxShadow2xl,
                {
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
                },
              ]}
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
                {/* {authors.length > 0 && (
                <ContributorLinks
                  contributors={authors}
                  css={[notoSans, { padding: 0 }]}
                />
              )} */}
                <p>{book.publisherSummary}</p>
              </div>
              <div
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
          </div>
        </div>
      </article>
    </Link>
  );
}
