/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import { DebugData } from '../components/DebugData';
import { Footer } from '../components/Footer';
import { GlobalLayout } from '../components/GlobalLayout';
import Link from '../components/Link';
import { s0125, s05 } from '../styles';

function BookTemplate({ data }) {
  const {
    bookTitle,
    slug,
    publisherSummary,
    bookCover,
    featured,
    actionLabel,
    actionLink,
    translator,
    contributors,
    publisher,
    isbn,
    awards,
    copyrightYear,
    translanguagingTypology,
    chapterBook,
  } = data.graphCmsBook;

  // const { altDescription, url, width, height } = bookCover;
  const authors = contributors.filter((c) => c.type === 'Author');
  const illustrators = contributors.filter((a) => a.type === 'Illustrator');

  return (
    <GlobalLayout
      htmlHead={{
        title: bookTitle,
        description: publisherSummary,
      }}
    >
      <div>
        <h1>{data.graphCmsBook.bookTitle}</h1>
        <div className="hero wf-section">
          <div className="book-page-grid container">
            <img
              src={bookCover.url}
              loading="eager"
              alt={bookCover.altDescription}
              className="book-image full-height"
              width={bookCover.width}
              height={bookCover.height}
            />
            <div
              id="w-node-_99a0eb45-7fae-4bf9-8d9d-f3ee27a955eb-0b286f2c"
              className="book-info"
            >
              <h1 className="book-title">{bookTitle}</h1>
              {authors && (
                <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>by</dt>
                  <dd>
                    {authors.length > 1
                      ? authors.map(({ name }) => name).join(', ')
                      : authors[0]?.name}
                  </dd>
                </dl>
              )}
              {illustrators && (
                <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>Illustrator:</dt>
                  <dd>
                    {illustrators.length > 1
                      ? illustrators.map(({ name }) => name).join(', ')
                      : illustrators[0]?.name}
                  </dd>
                </dl>
              )}
              {/* <div className="by-line">
                <div className="by-line label">by</div>
                <div className="by-line"></div>
              </div>
              <div className="by-line">
                <div className="by-line label">Illustrator:</div>
                <div className="by-line"></div>
              </div> */}
            </div>
            <div
              id="w-node-_13bdeb9c-bc2f-92fc-08a1-a5356c9e3859-0b286f2c"
              className="publisher-summary"
            >
              <h2 className="book-h2">Summary</h2>
              <p>{publisherSummary}</p>
            </div>
            <div
              id="w-node-aa56faaf-4d29-5ad8-4b7d-9de5df1602f2-0b286f2c"
              className="translanguaging"
            >
              <h2 className="book-h2">Translanguaging Typology</h2>
              <div>
                <a href="#" className="collection-tag-item w-inline-block">
                  <div className="collection-tag"></div>
                </a>
                <a href="#" className="collection-tag-item w-inline-block">
                  <div className="collection-tag"></div>
                </a>
              </div>
              <div className="w-richtext">{translanguagingTypology}</div>
            </div>
            <Link to={actionLink} className="action-button">
              {actionLabel}
            </Link>
            {/* <a
              href="#"
              id="w-node-e1ca612b-084f-e346-7c61-be9b5fb748d7-0b286f2c"
              className="action-button"
            ></a> */}
          </div>
        </div>
        {/* meta data stuff… */}
        <section className="book-metadata wf-section">
          <section className="container book-grid">
            <div>
              <div>
                <h3 className="book-h3">Languages</h3>
                <div className="w-dyn-list">
                  <div role="list" className="collection-tags-list w-dyn-items">
                    <div
                      role="listitem"
                      className="collection-tag-item w-dyn-item"
                    >
                      <div className="collection-tag category"></div>
                    </div>
                  </div>
                  <div className="w-dyn-empty">
                    <div>No items found.</div>
                  </div>
                </div>
              </div>
              <div>
                <h3>Representation</h3>
                <div className="w-dyn-list">
                  <div role="list" className="collection-tags-list w-dyn-items">
                    <div
                      role="listitem"
                      className="collection-tag-item w-dyn-item"
                    >
                      <div className="collection-tag category"></div>
                    </div>
                  </div>
                  <div className="w-dyn-empty"></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="book-h3">Topics</h3>

              <div className="w-dyn-list">
                <div role="list" className="collection-tags-list w-dyn-items">
                  <div
                    role="listitem"
                    className="collection-tag-item w-dyn-item"
                  >
                    <div className="collection-tag topic"></div>
                  </div>
                </div>
                <div className="w-dyn-empty">
                  <div>No items found.</div>
                </div>
              </div>
            </div>

            <div>
              <dl>
                {isbn && (
                  <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                    <dt>ISBN:</dt>
                    <dd>{isbn}</dd>
                  </div>
                )}
                {publisher && (
                  <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                    <dt>Publisher:</dt>
                    <dd>{publisher}</dd>
                  </div>
                )}
                {translator && (
                  <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                    <dt>Translator:</dt>
                    <dd>{translator}</dd>
                  </div>
                )}
                {awards && (
                  <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                    <dt>Awards:</dt>
                    <dd>{awards.length > 1 ? awards.join(', ') : awards[0]}</dd>
                  </div>
                )}
                {copyrightYear && (
                  <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                    <dt>Copyright:</dt>
                    <dd>{copyrightYear}</dd>
                  </div>
                )}
              </dl>
              {/* <ul role="list" className="w-list-unstyled">
                <li className="book-prop-val-pair">
                  <div className="book-property">ISBN: </div>
                  <div className="book-value"></div>
                </li>
                <li className="book-prop-val-pair">
                  <div className="book-property">Publisher: </div>
                  <div className="book-value"></div>
                </li>
                <li className="book-prop-val-pair">
                  <div className="book-property">Translator: </div>
                  <div className="book-value"></div>
                </li>
                <li className="book-prop-val-pair">
                  <div className="book-property">Awards: </div>
                  <div className="book-value"></div>
                </li>
                <li className="book-prop-val-pair">
                  <div className="book-property">Copyright: </div>
                  <div className="book-value"></div>
                </li>
              </ul> */}
            </div>
          </section>
        </section>
        <DebugData>{data.graphCmsBook}</DebugData>
        <Footer />
      </div>
    </GlobalLayout>
  );
}

export const query = graphql`
  query BookTemplate($slug: String) {
    graphCmsBook(slug: { eq: $slug }) {
      bookTitle
      awards
      bookCover {
        altDescription
        url
        width
        height
      }
      categories {
        title
        slug
      }
      contributors {
        name
        slug
        type
      }
      slug
      topics {
        title
        slug
      }
      translanguagingTypology
      translator
      languaging
      publisher
      publisherSummary
      isbn
      copyrightYear
      chapterBook
    }
  }
`;

export default BookTemplate;
