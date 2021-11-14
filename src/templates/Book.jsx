/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import { DebugData } from '../components/DebugData';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { GlobalLayout } from '../components/GlobalLayout';
import { CategoryTag, TopicTag, TextStructureTag } from '../components/Tag';

import Link from '../components/Link';
import {
  ACCENT,
  onTabletMedia,
  PRIMARY,
  s0125,
  s025,
  s05,
  s1,
  s2,
} from '../styles';
import { List, TagList } from '../components/List';
import { Container, TextContainer } from '../components/Container';

function BookTemplate({ data }) {
  const {
    bookTitle,
    slug,
    publisherSummary,
    bookCover,
    categories,
    topics,
    featured,
    actionLabel,
    actionLink,
    translator,
    contributors,
    representations,
    publisher,
    isbn,
    awards,
    copyrightYear,
    translanguagingTypology,
    chapterBook,
  } = data.graphCmsBook;

  // const { altDescription, url, width, height } = bookCover;
  const authors = contributors.filter((c) => c.type === 'Author');
  const illustrators = contributors.filter((a) => a.type === 'Illustrator');
  const genres = categories.filter((c) => c.categoryType === 'Genre');
  const grades = categories.filter((c) => c.categoryType === 'Grade');
  const languages = categories.filter((c) => c.categoryType === 'Language');
  const textStructure = categories.filter(
    (c) => c.categoryType === 'Text_Structure'
  );

  return (
    <GlobalLayout
      htmlHead={{
        title: bookTitle,
        description: publisherSummary,
      }}
    >
      <MainMenu />
      <Section>
        <Container
          css={[
            {
              display: 'grid',
              alignSelf: 'center',
              gridAutoColumns: '1fr',
              gridColumnGap: '1rem',
              gridRowGap: '2rem',

              gridAutoFlow: 'column',
              gridTemplateAreas: `
              "book-image"
              "book-title"
              "book-summary"
              "translanguaging-typology"
              `,
              gridTemplateColumns: '1fr',
              gridTemplateRows:
                'min-content min-content min-content min-content auto',
            },
            onTabletMedia({
              display: '-ms-grid',
              display: 'grid',

              alignSelf: 'center',
              gridAutoColumns: '1fr',
              gridColumnGap: '1rem',
              gridRowGap: '2rem',
              gridTemplateAreas: `
              "book-title book-title"
              "book-image book-summary"
              "book-image translanguaging-typology"
              "book-image ."
              "book-image ."`,

              gridTemplateColumns: '1fr 1fr',

              gridTemplateRows:
                'min-content min-content min-content min-content auto',
            }),
          ]}
        >
          <img
            src={bookCover.url}
            loading="eager"
            alt={bookCover.altDescription}
            className="book-image full-height"
            css={{
              gridArea: 'book-image',
              width: '100%',
              height: 'auto',
              aspectRatio: `${bookCover.width} / ${bookCover.height}`,
            }}
            width={bookCover.width}
            height={bookCover.height}
          />
          <TextContainer
            id="w-node-_99a0eb45-7fae-4bf9-8d9d-f3ee27a955eb-0b286f2c"
            className="book-info"
            css={{
              gridArea: 'book-title',
              h2: {
                marginBottom: s05,
                color: ACCENT,
              },
              maxWidth: 'initial',
            }}
          >
            <h1 className="book-title">{bookTitle}</h1>
            {authors.length > 0 && (
              <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                <dt>by</dt>
                <dd>
                  {authors.length > 1
                    ? authors.map(({ name }) => name).join(', ')
                    : authors[0]?.name}
                </dd>
              </dl>
            )}

            {illustrators > 0 && (
              <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                <dt>Illustrator:</dt>
                <dd>
                  {illustrators.length > 1
                    ? illustrators.map(({ name }) => name).join(', ')
                    : illustrators[0]?.name}
                </dd>
              </dl>
            )}
          </TextContainer>
          {publisherSummary && (
            <TextContainer
              id="w-node-_13bdeb9c-bc2f-92fc-08a1-a5356c9e3859-0b286f2c"
              className="publisher-summary"
              css={{
                gridArea: 'book-summary',
              }}
            >
              <Heading level={2}>Summary</Heading>
              <p>{publisherSummary}</p>
            </TextContainer>
          )}

          {textStructure.length > 0 && (
            <TextContainer
              id="w-node-aa56faaf-4d29-5ad8-4b7d-9de5df1602f2-0b286f2c"
              className="translanguaging"
              css={{ gridArea: 'translanguaging-typology' }}
            >
              <Heading level={2}>Translanguaging Typology</Heading>
              <TagList>
                {textStructure.map((structure) => {
                  return (
                    <Link to={`/categories/${structure.slug}`}>
                      <TextStructureTag>{structure.title}</TextStructureTag>
                    </Link>
                  );
                })}
              </TagList>
              <p>{translanguagingTypology}</p>
            </TextContainer>
          )}

          {actionLink && (
            <Link to={actionLink} className="action-button">
              {actionLabel || 'Learn More'}
            </Link>
          )}
          {/* <a
              href="#"
              id="w-node-e1ca612b-084f-e346-7c61-be9b5fb748d7-0b286f2c"
              className="action-button"
            ></a> */}
        </Container>
      </Section>

      {/* meta data stuff… */}
      <Section css={{ alignItems: 'center' }}>
        {/* <section className="book-metadata wf-section"> */}
        <Container
          css={[
            {
              h3: {
                marginTop: s1,
                marginBottom: s025,
                color: PRIMARY,
              },
              display: 'grid',

              justifyContent: 'stretch',
              justifyItems: 'start',
              alignItems: 'start',
              alignContent: 'start',

              gridAutoFlow: 'row',
              gridAutoColumns: '1fr',
              gridAutoRows: 'min-content',
              gridColumnGap: s1,
              gridRowGap: s1,
              gridTemplateColumns: '1fr',
              gridTemplateRows: 'min-content auto',
            },
            onTabletMedia({
              gridRowGap: s2,
              gridAutoColumns: '1fr',

              gridColumnGap: '16px',
              gridRowGap: '16px',

              gridTemplateAreas: '"Area"',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto auto',
            }),
          ]}
        >
          {/* <section className="container book-grid"> */}

          {languages.length > 0 && (
            <TextContainer>
              <Heading level={3}>Languages</Heading>
              <TagList>
                {languages.map((language) => {
                  return (
                    <Link to={`/categories/${language.slug}`}>
                      <CategoryTag>{language.title}</CategoryTag>
                    </Link>
                  );
                })}
              </TagList>
            </TextContainer>
          )}

          {/* <div>
                <h3>Representation</h3>
                <div className="w-dyn-list">
                  <div role="list" className="collection-tags-list w-dyn-items">
                    <div
                      role="listitem"
                      className="collection-tag-item w-dyn-item"
                    >
                      <div className="collection-tag category"></div>
                    </div>
                  </div>
                  <div className="w-dyn-empty"></div>
                </div>
              </div> */}

          {topics.length > 0 && (
            <TextContainer>
              <Heading level={3}>Topics</Heading>
              <TagList>
                {topics.map((topic) => {
                  return (
                    <Link to={`/topics/${topic.slug}`}>
                      <TopicTag>{topic.title}</TopicTag>
                    </Link>
                  );
                })}
              </TagList>
            </TextContainer>
          )}

          <TextContainer>
            <dl>
              {isbn && (
                <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>ISBN:</dt>
                  <dd>{isbn}</dd>
                </div>
              )}
              {publisher && (
                <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>Publisher:</dt>
                  <dd>{publisher}</dd>
                </div>
              )}
              {translator && (
                <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>Translator:</dt>
                  <dd>{translator}</dd>
                </div>
              )}
              {awards && (
                <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>Awards:</dt>
                  <dd>{awards.length > 1 ? awards.join(', ') : awards[0]}</dd>
                </div>
              )}
              {copyrightYear && (
                <div css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>Copyright:</dt>
                  <dd>{copyrightYear}</dd>
                </div>
              )}
            </dl>
          </TextContainer>
        </Container>
      </Section>
      <DebugData>{data.graphCmsBook}</DebugData>
      {/* <Footer /> */}
    </GlobalLayout>
  );
}

export const query = graphql`
  query BookTemplate($slug: String) {
    graphCmsBook(slug: { eq: $slug }) {
      bookTitle
      awards
      bookCover {
        altDescription
        url
        width
        height
      }
      representations {
        title
        slug
      }
      categories {
        title
        slug
        categoryType
      }
      contributors {
        name
        slug
        type
      }
      slug
      topics {
        title
        slug
      }
      translanguagingTypology
      translator
      languaging
      publisher
      publisherSummary
      isbn
      copyrightYear
      chapterBook
    }
  }
`;

export default BookTemplate;
