/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';

import { DebugData } from '../components/DebugData';
import { UnderConstruction } from '../components/UnderConstruction';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { GlobalLayout } from '../components/GlobalLayout';
import { MainMenu } from '../components/MainMenu';
import { Heading } from '../components/Heading';
import { Section } from '../components/Section';
import { BookList } from '../components/BookList';
import { BookCover } from '../components/BookCover';
import {
  s1,
  grid,
  onTabletMedia,
  boxShadowLg,
  COMPLIMENT,
  base160,
  base320,
} from '../styles';
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';

function TagTemplate(props) {
  const { data, pageContext } = props;
  const { graphCmsTag } = data;

  const { title, books, id, definition } = graphCmsTag;
  return (
    <GlobalLayout>
      <UnderConstruction />
      <GraphCMSPreviewIndicator />
      <MainMenu />
      <main css={{ position: 'relative' }}>
        <Section css={{ minHeight: 'initial' }} key={id}>
          <Container css={{ alignItems: 'flex-start' }}>
            <Heading level={1}>
              {title} ({pluralize('Book', books.length, 'true')})
            </Heading>
            {definition && <p>{definition}</p>}

            {books.length > 0 ? (
              <BookList
                css={[
                  // { alignSelf: 'center' },
                  grid({
                    gridTemplateColumns: '1fr 1fr',
                    gap: s1,
                    placeItems: 'end stretch',
                  }),
                  onTabletMedia({
                    width: '100%',
                    gridTemplateColumns: `repeat(auto-fit, minmax(${base320}, 1fr))`,
                    placeItems: 'end center',
                  }),
                ]}
              >
                {books.map((book) => {
                  return (
                    <BookCover
                      link={{ to: `/books/${book.slug}` }}
                      book={book}
                      css={{ ...boxShadowLg }}
                      key={book.id}
                    >
                      <Heading
                        level={3}
                        css={{
                          position: 'absolute',
                          opacity: 0,
                          pointerEvents: 'none',

                          fontSize: s1,
                          fontWeight: 'bold',
                          color: COMPLIMENT,
                        }}
                      >
                        {book.title}
                      </Heading>
                    </BookCover>
                  );
                })}
              </BookList>
            ) : (
              `Sorry, no books available for ${title}`
            )}
          </Container>
        </Section>
      </main>

      <Footer />
    </GlobalLayout>
  );
}

export const query = graphql`
  query TagTemplateQuery($slug: String) {
    graphCmsTag(slug: { eq: $slug }) {
      title
      slug
      tagType
      id
      definition

      books {
        title
        slug
        tags {
          definition
          # details {
          #   html
          # }
          title
        }
        bookCover {
          altDescription
          width
          url
          size
          height
        }
      }
    }
  }
`;

export default TagTemplate;
