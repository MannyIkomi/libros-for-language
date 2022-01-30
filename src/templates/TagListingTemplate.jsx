/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';

import { DebugData } from '../components/DebugData';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import {
  grid,
  onTabletMedia,
  s1,
  boxShadowLg,
  COMPLIMENT,
  s2,
  flex,
  PRIMARY,
  PRIMARY80,
  PRIMARY60,
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
import { TagIcon } from '../icons/Icons';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { LineRule } from '../components/LineRule';
import {
  sort1toN,
  sortNewToOld,
  sortNto1,
  sortWithDate,
  sortWithProperty,
} from '../utils/sort';

const MAX_BOOK_DISPLAY_AMOUNT = 4;

function TagListingTemplate(props) {
  const { data, pageContext } = props;
  const { allGraphCmsTag } = data;

  const tags = allGraphCmsTag.nodes.sort((a, b) => a.sequence - b.sequence);

  return (
    <GlobalLayout>
      <GatsbyPreviewIndicator />
      <MainMenu />
      <main css={{ position: 'relative' }}>
        <Section>
          <Container
            css={[
              {
                color: PRIMARY,
                margin: `${s2} 0`,
                ...grid({
                  gridTemplateColumns: 'max-content 1fr',
                  gridTemplateAreas: `"title icon" "rule rule"`,
                  placeItems: 'center start',
                }),
              },
            ]}
          >
            <Heading
              level={1}
              css={[{ margin: 0 }, onTabletMedia({ margin: 0 })]}
            >
              {pluralize.plural(pageContext.title)}
            </Heading>
            <TagIcon name={pageContext.type} css={{ gridArea: 'icon' }} />
            <LineRule css={{ gridArea: 'rule' }} />
          </Container>

          {tags.sort(sortWithProperty({ property: 'sequence' })).map((tag) => {
            const { title, books, id, tagType, slug, definition } = tag;

            return (
              books.length > 0 && (
                <Section
                  css={[{ minHeight: 'initial' }, onTabletMedia({ margin: 0 })]}
                  key={id}
                >
                  <Container
                    css={[
                      { alignItems: 'flex-start', gap: s1 },
                      onTabletMedia({
                        ...grid({
                          gridTemplateColumns: '1fr 1fr',
                          gridTemplateRows: 'min-content 1fr min-content',
                          gridGap: s2,
                          gridTemplateAreas: `"title link" "books books" "rule rule"`,
                        }),
                      }),
                    ]}
                  >
                    <div
                      css={[
                        onTabletMedia({
                          gridArea: 'title',
                        }),
                      ]}
                    >
                      <Heading
                        level={2}
                        css={[{ margin: 0 }, onTabletMedia({ margin: 0 })]}
                      >
                        {title}
                      </Heading>
                      {definition && <p>{definition}</p>}
                    </div>

                    {books.length > 0 ? (
                      <BookList css={{ gridArea: 'books' }}>
                        {books
                          .sort(
                            sortWithDate({
                              order: 'desc',
                              property: 'updatedAt',
                            })
                          )
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
                                    margin: 0,
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
                            gridArea: 'link',
                            placeSelf: 'start end',
                          }),
                        ]}
                      >
                        More {title} books ({books.length})
                      </SecondaryLink>
                    )}
                    <LineRule
                      css={{ gridArea: 'rule', borderColor: PRIMARY60 }}
                    />
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
      sequence
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
        sequence
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
