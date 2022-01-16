/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import {
  notoSerif,
  PRIMARY,
  s1,
  COMPLIMENT80,
  grid,
  onTabletMedia,
  onDesktopMedia,
  WHITE,
  PRIMARY_WHITE,
  s2,
  s4,
  flex,
  base320,
} from '../styles';
import {
  GenreTag,
  TopicTag,
  GradeLevelTag,
  LanguageTag,
} from '../components/Tag';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';
import {
  Link,
  PrimaryLink,
  SecondaryLink,
  TertiaryLink,
} from '../components/Link';
import { GlobalLayout } from '../components/GlobalLayout';

import { FeaturedBook } from '../components/FeaturedBook';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { slugify } from '../utils/slugify';
import pluralize from 'pluralize';
import { List } from '../components/List';
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';

console.clear();

function IndexPage({ data }) {
  const featuredBooks = data.allGraphCmsBook.nodes;
  const topics = data.allGraphCmsTopic.nodes.filter(
    (topic) => topic.books.length > 0
  );
  const genres = data.allGraphCmsGenre.nodes.filter(
    (genre) => genre.books.length > 0
  );
  const grades = data.allGraphCmsGrade.nodes.filter(
    (grade) => grade.books.length > 0
  );
  const languages = data.allGraphCmsLanguage.nodes.filter(
    (language) => language.books.length > 0
  );

  const tagTypes = data.categoryNames.enumValues;

  return (
    <>
      <GlobalLayout>
        <GraphCMSPreviewIndicator />
        <MainMenu />
        <main
          css={{
            position: 'relative',
            section: {
              minHeight: '75vh',
            },
          }}
        >
          <Section
            css={{
              overflow: 'hidden',
              minHeight: '80vh',
              marginBottom: '10vh',

              alignItems: 'initial',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Container css={{ alignSelf: 'center' }}>
              <Heading
                level={1}
                css={{
                  marginTop: '0px',
                  marginBottom: '2rem',
                  width: '100%',
                  ...notoSerif,
                  color: PRIMARY,

                  textAlign: 'center',
                }}
              >
                Empowering teachers with{' '}
                <span
                  css={{
                    color: COMPLIMENT80,
                    fontFamily: 'inherit',
                  }}
                >
                  {' '}
                  translanguaging books
                </span>{' '}
                for their multilingual classrooms.
              </Heading>
            </Container>

            <div
              css={[
                {
                  minHeight: '33vh',
                  marginBottom: `10vh`,
                  // ...flex('row', {
                  //   gap: s1,
                  //   alignItems: 'end',
                  //   justifyContent: 'center',
                  // }),

                  ...grid({
                    gridTemplateColumns: 'repeat(2, 1fr)',

                    placeItems: 'end center',
                    gridGap: s1,
                  }),
                },
                onTabletMedia({
                  gridTemplateColumns: 'repeat(3, 1fr)',
                }),
                onDesktopMedia({
                  gridTemplateColumns: 'repeat(4, 1fr)',
                }),
              ]}
            >
              {featuredBooks
                .filter((book) => {
                  return (
                    book.bookCover ||
                    console.warn(
                      `Book: ${book.title} does not have a cover image`
                    )
                  );
                })
                .map((book) => {
                  return <FeaturedBook {...book} key={book.id} />;
                })}
            </div>
            <Container css={{ alignSelf: 'center', color: PRIMARY_WHITE }}>
              <PrimaryLink to={'/books'}>Browse All Books </PrimaryLink>
            </Container>
          </Section>

          <Section>
            <Container css={{ gap: s4 }}>
              <TextContainer>
                <Heading level={2}>Browse by Language</Heading>
                <List
                  css={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    gap: s1,
                  }}
                >
                  {languages.map(({ slug, title, tagType }) => (
                    <Link
                      key={title}
                      to={`/tags/${slugify(pluralize(tagType))}/${slug}`}
                      css={{ textDecoration: 'none' }}
                    >
                      <LanguageTag>{title}</LanguageTag>
                    </Link>
                  ))}
                </List>
              </TextContainer>
              <TextContainer>
                <Heading level={2}>Browse by Genre</Heading>
                <List
                  css={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    gap: s1,
                  }}
                >
                  {genres.map(({ slug, title, tagType }) => (
                    <Link
                      key={title}
                      to={`/tags/${slugify(pluralize(tagType))}/${slug}`}
                      css={{ textDecoration: 'none' }}
                    >
                      <GenreTag>{title}</GenreTag>
                    </Link>
                  ))}
                </List>
              </TextContainer>
              <TextContainer>
                <Heading level={2}>Browse by Grade Level</Heading>
                <List
                  css={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    gap: s1,
                  }}
                >
                  {grades.map(({ slug, title, tagType }) => (
                    <Link
                      key={title}
                      to={`/tags/${slugify(pluralize(tagType))}/${slug}`}
                      css={{
                        textDecoration: 'none',
                      }}
                    >
                      <GradeLevelTag>{title}</GradeLevelTag>
                    </Link>
                  ))}
                </List>
              </TextContainer>
            </Container>
          </Section>
          <Section>
            <Container css={{ gap: s2 }}>
              <TextContainer>
                <Heading level={3}>
                  Libros for Language is a digital library designed to support
                  teachers in finding and using translanguaging books.
                </Heading>
                <p>
                  The books on this site are examples of authors and
                  illustratorswho incorporate LOTE (Languages Other Than
                  English) in their work, just as all multilingual people do in
                  their daily lives.
                </p>
              </TextContainer>
              <SecondaryLink to={'/about'}>About Us</SecondaryLink>
              <TertiaryLink to={'/typology'}>
                Learn About Our Typology
              </TertiaryLink>
            </Container>
          </Section>
        </main>
        <Footer />
      </GlobalLayout>
    </>
  );
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
    categoryNames: __type(name: "GraphCMS_TagType") {
      enumValues {
        name
      }
    }
    allGraphCmsBook(
      limit: 4
      filter: { featured: { eq: true } }
      sort: { order: DESC, fields: updatedBy___updatedAt }
    ) {
      nodes {
        id
        slug
        title
        updatedAt
        authors {
          lastName
          firstName
          type
        }
        illustrators {
          lastName
          firstName
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
      }
    }

    allGraphCmsGrade: allGraphCmsTag(filter: { tagType: { eq: Grade } }) {
      nodes {
        title
        slug
        tagType
        books {
          title
        }
      }
    }
    allGraphCmsGenre: allGraphCmsTag(filter: { tagType: { eq: Genre } }) {
      nodes {
        title
        slug
        tagType
        books {
          title
        }
      }
    }

    allGraphCmsLanguage: allGraphCmsTag(filter: { tagType: { eq: Language } }) {
      nodes {
        title
        slug
        tagType
        books {
          title
        }
      }
    }

    allGraphCmsText_Structure: allGraphCmsTag(
      filter: { tagType: { eq: Text_Structure } }
    ) {
      nodes {
        title
        slug
        tagType
        books {
          title
        }
      }
    }
    allGraphCmsTopic: allGraphCmsTag(filter: { tagType: { eq: Topic } }) {
      nodes {
        title
        slug
        tagType
        books {
          title
        }
      }
    }
  }
`;

export default IndexPage;
