/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
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
        <MainMenu tagTypes={tagTypes} />
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
              <PrimaryLink to={'/browse'}>Browse All</PrimaryLink>
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
                        to={`/browse/topics/${slug}`}
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
          <Section>
            <Container>
              <TextContainer>
                <Heading level={2}>What is Libros for Language?</Heading>
                <p>
                  Libros for Language is a digital library designed to support
                  teachers in finding and using translanguaging books to support
                  fluid language practices in their classrooms. All of the books
                  use English and one or more other languages, making them
                  appropriate for English-medium as well as bilingual
                  classrooms.
                </p>
                <Heading level={3}>
                  We believe high-quality books can help teachers create
                  dynamic, multilingual classrooms.
                </Heading>
                <p>
                  Translanguaging is a concept that highlights how in reality,
                  rather than keeping languages separate, multilingual people
                  mix and mingle all of their linguistic skills. Multilingual
                  children have a unique ability to strategically use their full
                  linguistic repertoire to make meaning and comprehend
                  literature.
                </p>{' '}
                <p>
                  Teachers can build on these skills by integrating quality,
                  culturally relevant children's literature that demonstrates
                  different types of translanguaging practices. We use a
                  "translanguaging typology" to help teachers understand those
                  different ways translanguaging is used in texts.
                </p>
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
