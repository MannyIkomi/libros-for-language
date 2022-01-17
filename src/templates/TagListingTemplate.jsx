/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';

import { DebugData } from '../components/DebugData';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import {
  grid,
  base160,
  onTabletMedia,
  s1,
  boxShadowLg,
  COMPLIMENT,
  s2,
  flex,
  colors,
  PRIMARY,
} from '../styles';
import { GlobalLayout } from '../components/GlobalLayout';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { Heading } from '../components/Heading';
import { BookCover } from '../components/BookCover';
import { BookList } from '../components/BookList';
import { SecondaryButton } from '../components/Button';
import { SecondaryLink } from '../components/Link';
import { slugify } from '../utils/slugify';
import { Icon } from '../icons/Icons';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';

const MAX_BOOK_DISPLAY_AMOUNT = 4;

function TagListingTemplate(props) {
  const { data, pageContext } = props;
  const { allGraphCmsTag } = data;

  const tags = allGraphCmsTag.nodes;

  return (
    <GlobalLayout>
      <GatsbyPreviewIndicator />
      <MainMenu />
      <main css={{ position: 'relative' }}>
        <Section>
          <Container
            css={{
              ...flex('row', { alignItems: 'center' }),
              color: PRIMARY,
              margin: `${s2} 0`,
            }}
          >
            <Heading level={1}>{pluralize.plural(pageContext.title)}</Heading>{' '}
            <Icon name={pageContext.type} />
          </Container>
          {tags.map((tag) => {
            const { title, books, id, tagType, slug, definition } = tag;

            return (
              books.length > 0 && (
                <Section
                  key={id}
                  css={[
                    { minHeight: 'initial' },
                    onTabletMedia({ minHeight: 'initial' }),
                  ]}
                >
                  <Container
                    css={[
                      { alignItems: 'flex-start', gap: s1 },
                      onTabletMedia({
                        ...grid({
                          gridTemplateColumns: '1fr 1fr',
                          gridTemplateRows: 'min-content 1fr',
                        }),
                      }),
                    ]}
                  >
                    <div
                      css={[
                        onTabletMedia({
                          gridColumn: '1 / 2',
                          gridRow: '1 / 2',
                        }),
                      ]}
                    >
                      <Heading level={2}>{title}</Heading>
                      {definition && <p>{definition}</p>}
                    </div>

                    {/* <DebugData>{books}</DebugData> */}
                    {books.length > 0 ? (
                      <BookList>
                        {books.slice(0, MAX_BOOK_DISPLAY_AMOUNT).map((book) => {
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
                      <p>
                        Sorry, no books available for <em>{title}</em>
                      </p>
                    )}
                    {books.length > MAX_BOOK_DISPLAY_AMOUNT && (
                      <SecondaryLink
                        to={`/tags/${slugify(pluralize(tagType))}/${slug}`}
                        css={[
                          onTabletMedia({
                            gridColumn: '2 / -1',
                            gridRow: '1 / 2',
                            placeSelf: 'start end',
                          }),
                        ]}
                      >
                        More {title} books ({books.length})
                      </SecondaryLink>
                    )}
                  </Container>
                </Section>
              )
            );
          })}
        </Section>
      </main>

      <Footer />
    </GlobalLayout>
  );
}

export const query = graphql`
  query TagListingTemplateQuery($slug: String, $type: GraphCMS_TagType) {
    graphCmsTag(slug: { eq: $slug }) {
      title
      slug
      definition
      tagType
      id
    }

    allGraphCmsTag(
      filter: { tagType: { eq: $type } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        id
        tagType
        title
        slug
        definition
        books {
          updatedAt
          title
          slug
          tags {
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
  }
`;

export default TagListingTemplate;
