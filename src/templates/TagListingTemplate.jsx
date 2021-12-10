/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
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
} from '../styles';
import { GlobalLayout } from '../components/GlobalLayout';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { Heading } from '../components/Heading';
import { BookCover } from '../components/BookCover';
import { BookList } from '../components/BookList';

function TagListingTemplate(props) {
  const { data, pageContext } = props;
  const { allGraphCmsCategory, allGraphCmsTopic } = data;

  const tags = allGraphCmsCategory.nodes || allGraphCmsTopic.nodes;

  return (
    <div>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container css={{ alignItems: 'flex-start' }}>
              <Heading level={1}>{pageContext.title}</Heading>
            </Container>
            {tags.map((tag) => {
              const { title, book: books } = tag;
              return (
                books.length > 0 && (
                  <Section css={{ minHeight: 'initial' }}>
                    {/* 
              map over each {language: 'spanish'}
              display books for each {language: 'spanish}
              */}
                    <Container css={{ alignItems: 'flex-start' }}>
                      <Heading level={2}>
                        {title} ({books.length})
                      </Heading>
                      {/* <DebugData>{books}</DebugData> */}
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
                              gridTemplateColumns: `repeat(auto-fit, minmax(${base160}, 1fr))`,
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
                                  {book.bookTitle}
                                </Heading>
                              </BookCover>
                            );
                          })}
                        </BookList>
                      ) : (
                        'no books available'
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
    }
    allGraphCmsTag(
      filter: { tagType: { eq: $type } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        id
        books {
          bookTitle
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
