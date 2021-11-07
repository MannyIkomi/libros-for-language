/** @jsx jsx */
import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { Global, jsx, css } from '@emotion/react';
import HtmlHead from '../components/HtmlHead';
import { SANS_FONT, BLACK, WHITE, headings } from '../styles';
import { TopicTag } from '../components/topicTag';

const topics = [
  'Animals',
  'Country',
  'Culture',
  'Family',
  'Folk Tales & Fables',
  'Food',
  'History',
  'Relocation',
  'Suburban',
  'Traditions/Customs',
  'Urban',
];

const GlobalLayout = ({ children }) => {
  return (
    <>
      <HtmlHead />
      <Global
        styles={{
          '*': {
            borderSize: 'border-box',
            color: BLACK,
            fontFamily: SANS_FONT,
            margin: 0,
            padding: 0,
          },
          ...headings,
        }}
      />
      <div
        css={{
          backgroundColor: WHITE,
        }}
      >
        {children}
      </div>
    </>
  );
};

export const DebugData = (props) => {
  return <pre>{JSON.stringify(props.children || props, null, 2)}</pre>;
};

const IndexPage = ({ data }) => {
  const featuredBooks = data.allGraphCmsBook.nodes;

  return (
    <>
      <GlobalLayout>
        <main>
          <section>
            <h1 className={''}>
              Empowering teachers with translanguaging books for their
              multilingual classrooms.
            </h1>
            <div>
              Featured book covers
              <div class="category-collection w-dyn-list">
                <div role="list" class="featured-list w-dyn-items">
                  {featuredBooks.map((book) => {
                    return (
                      <div role="listitem" class="book-preview w-dyn-item">
                        <a
                          href={`/books/${book.slug}`}
                          class="book-camera w-inline-block"
                        >
                          <div class="book-summary">
                            <div class="book-cover-title">{book.bookTitle}</div>
                            <div class="book-cover-byline">
                              <div class="by-line">by</div>
                              <div></div>
                            </div>
                            <p>{book.publisherSummary}</p>
                            <div class="fade-paragraph"></div>
                          </div>
                          <img
                            src={book.bookCover?.url}
                            loading="eager"
                            alt={book.bookCover?.url || book.bookTitle}
                            class="book-image"
                          />
                        </a>
                        <div class="book-camera shadow">
                          <div class="shadow-illusion"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div class="w-dyn-empty"></div>
              </div>
              <DebugData>{data}</DebugData>
              <div>
                <div>{`< Prev`}</div>
                <div>{`Next >`}</div>
              </div>
            </div>
          </section>
          <section>
            <h2>Browse by Topics</h2>
            <ul css={{ display: 'flex', listStyle: 'none' }}>
              {topics.map((topic) => (
                <li
                  key={topic}
                  css={{
                    marginBottom: '1rem',
                    marginRight: '1rem',
                  }}
                >
                  <a href={`/`}>
                    <TopicTag>{topic}</TopicTag>
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>What is Libros for Language?</h2>
            <p>
              Libros for Language is a digital library designed to support
              teachers in finding and using translanguaging books to support
              fluid language practices in their classrooms. All of the books use
              English and one or more other languages, making them appropriate
              for English-medium as well as bilingual classrooms.
            </p>
            <h3>
              We believe high-quality books can help teachers create dynamic,
              multilingual classrooms.
            </h3>
            <p>
              Translanguaging is a concept that highlights how in reality,
              rather than keeping languages separate, multilingual people mix
              and mingle all of their linguistic skills. Multilingual children
              have a unique ability to strategically use their full linguistic
              repertoire to make meaning and comprehend literature.
            </p>{' '}
            <p>
              Teachers can build on these skills by integrating quality,
              culturally relevant children's literature that demonstrates
              different types of translanguaging practices. We use a
              "translanguaging typology" to help teachers understand those
              different ways translanguaging is used in texts.
            </p>
          </section>
        </main>
        <footer>
          <img src="/logo" alt="logo" />
          <div>
            <h4>Category</h4>
            <ul>
              <li>
                <a href="">Category Link</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Category</h4>
            <ul>
              <li>
                <a href="">Category Link</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Category</h4>
            <ul>
              <li>
                <a href="">Category Link</a>
              </li>
            </ul>
          </div>
        </footer>
      </GlobalLayout>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
    allGraphCmsBook(filter: { featured: { eq: true } }) {
      nodes {
        id
        bookTitle
        contributors {
          name
          type
        }
        publisherSummary
        bookCover {
          altDescription
          height
          width
          size
          url
        }
        slug
      }
    }
  }
`;

export default IndexPage;
