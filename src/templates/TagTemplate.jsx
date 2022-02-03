/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';

import { DebugData } from '../components/DebugData';
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
  s2,
  s4,
  onDesktopMedia,
  s3,
} from '../styles';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { LineRule } from '../components/LineRule';

function TagTemplate({ data, location, ...props }) {
  const { graphCmsTag } = data;
  const { title, books, id, definition, tagType } = graphCmsTag;

  return (
    <GlobalLayout
      htmlHead={{
        title: `${title} (${tagType.replace('_', ' ')})`,
        description: definition,
        url: location.href,
      }}
    >
      <GatsbyPreviewIndicator />
      <MainMenu />
      <main css={{ position: 'relative' }}>
        <Section /* css={{ minHeight: 'initial' }} */ key={id}>
          <Container
            css={[
              {
                margin: `${s2} 0`,
                ...grid({
                  gridTemplateColumns: '1fr',
                  gridTemplateAreas: `"title" "definition" "rule"`,
                  placeItems: 'center start',
                }),
              },
            ]}
          >
            <Heading level={1}>
              {title} ({pluralize('Book', books.length, 'true')})
            </Heading>
            {definition && <p css={{ gridArea: 'definition' }}>{definition}</p>}
            <LineRule css={{ gridArea: 'rule' }} />
          </Container>

          <Container>
            {books.length > 0 ? (
              <BookList
                css={[
                  grid({
                    gridGap: s1,
                  }),
                  onTabletMedia({
                    width: '100%',
                    gridGap: s2,
                  }),
                  onDesktopMedia({ gridGap: s3 }),
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
      tagSubType
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
          id
          gatsbyImageData
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
