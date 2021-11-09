/** @jsx jsx */
import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { jsx, css } from '@emotion/react';
import { notoSerif, PRIMARY, ACCENT, a, flex } from '../styles';
import { TopicTag } from '../components/topicTag';
import { DebugData } from '../components/DebugData';
import { Heading } from '../components/Heading';
import { Footer } from './Footer';
import { Container } from '../components/Container';
import { Link } from '../components/Link';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { FeaturedBook } from '../components/FeaturedBook';
import { GlobalLayout } from '../components/GlobalLayout';
import { slugify } from '../utils/slugify';
import { MainMenu } from '../components/MainMenu';

const IndexPage = ({ data }) => {
  const featuredBooks = data.allGraphCmsBook.nodes;
  const topics = data.allGraphCmsTopic.nodes;
  // const categories = data.allGraphCmsCategory.nodes;
  const genres = data.allGraphCmsGenre.nodes;
  const grades = data.allGraphCmsGrade.nodes;
  const languages = data.allGraphCmsLanguage.nodes;
  const categoryTypes = data.categoryNames.enumValues;

  return (
    <>
      <GlobalLayout>
        <MainMenu categoryTypes={categoryTypes} />
        <main css={{ position: 'relative' }}>
          <Section
            css={{
              display: 'flex',
              overflow: 'hidden',
              minHeight: '80vh',
              marginBottom: '10vh',

              flexDirection: 'column',

              justifyContent: 'center',
            }}
          >
            <Container>
              <Heading
                level={1}
                css={{
                  marginTop: '0px',
                  marginBottom: '2rem',
                  ...notoSerif,
                  color: PRIMARY,
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                Empowering teachers with{' '}
                <span css={{ color: ACCENT, fontFamily: 'inherit' }}>
                  {' '}
                  translanguaging books
                </span>{' '}
                for their multilingual classrooms.
              </Heading>
            </Container>
            Featured book covers
            <div
              className="category-collection w-dyn-list"
              css={{
                minHeight: '33vh',
                marginBottom: '10vh',
              }}
            >
              <Swiper
                // .featured-list
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                css={{ overflow: 'visible' }}
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
                      <SwiperSlide>
                        <FeaturedBook {...book} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              {/* </Slider> */}
              <div className="w-dyn-empty"></div>
            </div>
            <div>
              <div>{`< Prev`}</div>
              <div>{`Next >`}</div>
            </div>
          </section>
          <section>
            <Container>
              <Heading level={2}>Browse by Topics</Heading>
              <ul
                css={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}
              >
                {topics.map(({ slug, title }) => (
                  <li
                    key={title}
                    css={{
                      marginBottom: '1rem',
                      marginRight: '1rem',
                    }}
                  >
                    <Link to={`/topics/${slug}`}>
                      <TopicTag>{title}</TopicTag>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
          <section>
            <Container>
              <Heading level={2}>What is Libros for Language?</Heading>
              <p>
                Libros for Language is a digital library designed to support
                teachers in finding and using translanguaging books to support
                fluid language practices in their classrooms. All of the books
                use English and one or more other languages, making them
                appropriate for English-medium as well as bilingual classrooms.
              </p>
              <Heading level={3}>
                We believe high-quality books can help teachers create dynamic,
                multilingual classrooms.
              </Heading>
              <p>
                Translanguaging is a concept that highlights how in reality,
                rather than keeping languages separate, multilingual people mix
                and mingle all of their linguistic skills. Multilingual children
                have a unique ability to strategically use their full linguistic
                repertoire to make meaning and comprehend literature.
              </p>{' '}
              <p>
                Teachers can build on these skills by integrating quality,
                culturally relevant children's literature that demonstrates
                different types of translanguaging practices. We use a
                "translanguaging typology" to help teachers understand those
                different ways translanguaging is used in texts.
              </p>
            </Container>
          </section>
        </main>
        <Footer />
      </GlobalLayout>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
    categoryNames: __type(name: "GraphCMS_CategoryType") {
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
    allGraphCmsTopic {
      nodes {
        title
        slug
      }
    }
    allGraphCmsGrade: allGraphCmsCategory(
      filter: { categoryType: { eq: Grade } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
    allGraphCmsGenre: allGraphCmsCategory(
      filter: { categoryType: { eq: Genre } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
    allGraphCmsLanguage: allGraphCmsCategory(
      filter: { categoryType: { eq: Language } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
    allGraphCmsText_Structure: allGraphCmsCategory(
      filter: { categoryType: { eq: Text_Structure } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
  }
`;

export default IndexPage;
