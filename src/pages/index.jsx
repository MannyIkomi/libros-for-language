/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import { notoSerif, PRIMARY, s1, COMPLIMENT80 } from '../styles';
import { TopicTag } from '../components/Tag';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';
import { Link, PrimaryLink } from '../components/Link';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { FeaturedBook } from '../components/FeaturedBook';
import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
console.clear();

function IndexPage({ data }) {
  const featuredBooks = data.allGraphCmsBook.nodes;
  const topics = data.allGraphCmsTopic.nodes;
  // const genres = data.allGraphCmsGenre.nodes;
  // const grades = data.allGraphCmsGrade.nodes;
  // const languages = data.allGraphCmsLanguage.nodes;
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
              className="category-collection w-dyn-list"
              css={{
                minHeight: '33vh',
                marginBottom: `10vh`,
              }}
            >
              <Swiper
                // .featured-list
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 48,
                  },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                style={{
                  overflow: 'visible',
                }}
              >
                {featuredBooks
                  .filter((book) => {
                    return (
                      book.bookCover ||
                      console.warn(
                        `Book: ${book.bookTitle} does not have a cover image`
                      )
                    );
                  })
                  .map((book) => {
                    return (
                      <SwiperSlide style={{ alignSelf: 'flex-end' }}>
                        <FeaturedBook {...book} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <Container>
              <PrimaryLink to={'/books'}>Browse All</PrimaryLink>
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
    # allGraphCmsTopic {
    #   nodes {
    #     title
    #     slug
    #   }
    # }
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
