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

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { FeaturedBook } from '../components/FeaturedBook';
import { GlobalLayout } from '../components/GlobalLayout';
import { slugify } from '../utils/slugify';

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
        <main>
          <section>
            <h1 className={''}>
              Empowering teachers with translanguaging books for their
              multilingual classrooms.
            </h1>
            <div>
              Featured book covers
              <div class="category-collection w-dyn-list">
                <div role="list" class="featured-list w-dyn-items">
                  {featuredBooks.map((book) => {
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
                    <a href={`/topics/${slug}`}>
                      <TopicTag>{title}</TopicTag>
                    </a>
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
        <footer>
          <img src="/logo" alt="logo" />
          <div>
            <h4>Category</h4>
            <ul>
              <li>
                <a href="">Category Link</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Category</h4>
            <ul>
              <li>
                <a href="">Category Link</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Category</h4>
            <ul>
              <li>
                <a href="">Category Link</a>
              </li>
            </ul>
          </div>
        </footer>
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
