/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql, Link } from 'gatsby';
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
              <Heading level={1}>{pageContext.title}s</Heading>
            </Container>
            {tags.map((tag) => {
              const { title, books, id, tagType, slug } = tag;

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
                      <Heading
                        level={2}
                        css={[
                          onTabletMedia({
                            gridColumn: '1 / 2',
                            gridRow: '1 / 2',
                          }),
                        ]}
                      >
                        {title}
                      </Heading>

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
                        `Sorry, no books available for ${title}`
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
    # graphCmsTopic(slug: { eq: $slug }) {
    #   title
    #   slug
    # }
    graphCmsTag(slug: { eq: $slug }) {
      title
      slug
      tagType
      id
    }

    allGraphCmsTag(
      filter: { tagType: { eq: $type } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        id
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
        tagType
        title
        slug
      }
    }
  }
`;

export default TagListingTemplate;
