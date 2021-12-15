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
import { Icon } from '../components/Icons';

const MAX_BOOK_DISPLAY_AMOUNT = 4;

function TagListingTemplate(props) {
  const { data, pageContext } = props;
  const { allGraphCmsTag } = data;

  const tags = allGraphCmsTag.nodes;

  return (
    <div>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container css={{ alignItems: 'flex-start' }}>
              <Heading level={1}>{pluralize.plural(pageContext.title)}</Heading>{' '}
              <Icon NAME={pageContext.title} />
            </Container>
            {tags.map((tag) => {
              const { title, books, id, tagType, slug, definition } = tag;

              return (
                books.length > 0 && (
                  <Section css={{ minHeight: 'initial' }} key={id}>
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
                        <BookList
                          css={[
                            // { alignSelf: 'center' },
                            grid({
                              gridTemplateColumns: '1fr 1fr',
                              gridGap: s1,
                              placeItems: 'end stretch',
                            }),
                            onTabletMedia({
                              width: '100%',
                              gridTemplateColumns: `repeat(auto-fit, minmax(${base160}, 1fr))`,
                              placeItems: 'end center',
                              gridColumn: '1 / -1',
                            }),
                          ]}
                        >
                          {books
                            .slice(0, MAX_BOOK_DISPLAY_AMOUNT)
                            .map((book) => {
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
                          to={`/tags/${slugify(tagType)}s/${slug}`}
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
        <DebugData>{props}</DebugData>
        <Footer />
      </GlobalLayout>
    </div>
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
