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
} from '../styles';
import { TopicTag } from '../components/Tag';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';
import { Link, PrimaryLink } from '../components/Link';
import { GlobalLayout } from '../components/GlobalLayout';

import { FeaturedBook } from '../components/FeaturedBook';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';

console.clear();

function IndexPage({ data }) {
  const featuredBooks = data.allGraphCmsBook.nodes;
  const topics = data.allGraphCmsTopic.nodes;

  const tagTypes = data.categoryNames.enumValues;

  return (
    <>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
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
                  ...grid({
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: '1fr',
                    placeItems: 'end center',
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
                  return <FeaturedBook {...book} />;
                })}
            </div>
            <Container css={{ alignSelf: 'center' }}>
              <PrimaryLink to={'/books'}>Browse All Books </PrimaryLink>
            </Container>
          </Section>

          <Section>
            <Container>
              <TextContainer>
                <Heading level={2}>Browse by Topics</Heading>
                <ul
                  css={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}
                >
                  {topics.map(({ slug, title }) => (
                    <li
                      key={title}
                      css={{
                        marginBottom: s1,
                        marginRight: s1,
                      }}
                    >
                      <Link
                        to={`/tags/topics/${slug}`}
                        css={{ textDecoration: 'none' }}
                      >
                        <TopicTag>{title}</TopicTag>
                      </Link>
                    </li>
                  ))}
                </ul>
              </TextContainer>
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
          name
          type
        }
        illustrators {
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
      }
    }

    allGraphCmsGrade: allGraphCmsTag(filter: { tagType: { eq: Grade } }) {
      nodes {
        title
        slug
        tagType
      }
    }
    allGraphCmsGenre: allGraphCmsTag(filter: { tagType: { eq: Genre } }) {
      nodes {
        title
        slug
        tagType
      }
    }
    allGraphCmsLanguage: allGraphCmsTag(filter: { tagType: { eq: Language } }) {
      nodes {
        title
        slug
        tagType
      }
    }
    allGraphCmsText_Structure: allGraphCmsTag(
      filter: { tagType: { eq: Text_Structure } }
    ) {
      nodes {
        title
        slug
        tagType
      }
    }
    allGraphCmsTopic: allGraphCmsTag(filter: { tagType: { eq: Topic } }) {
      nodes {
        title
        slug
        tagType
      }
    }
  }
`;

export default IndexPage;
