/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import * as pluralize from 'pluralize';

import { DebugData } from '../components/DebugData';
import { Heading } from '../components/Heading';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { GlobalLayout } from '../components/GlobalLayout';
import {
  LanguageTag,
  TextStructureTag,
  TopicTag,
  TypologyTag,
} from '../components/Tag';

import Link, { PrimaryLink } from '../components/Link';
import {
  COMPLIMENT,
  onTabletMedia,
  PRIMARY,
  s0125,
  s025,
  primaryActionStyle,
  s05,
  s1,
  s2,
  boxShadowLg,
  COMPLIMENT20,
  notoMono,
  COMPLIMENT40,
  BLACK,
  p,
} from '../styles';
import { TagList } from '../components/TagList';
import { Container, TextContainer } from '../components/Container';
import { boxShadow } from '../styles/shadow';
import { BookImage } from '../components/BookImage';
import { slugify } from '../utils/slugify';
import { List } from '../components/List';

function BookTemplate({ data }) {
  const {
    title,

    publisherSummary,
    bookCover,
    tags,

    actionLabel,
    actionLink,
    translator,
    authors,
    illustrators,

    publisher,
    isbn,
    awards,
    copyrightYear,
    translanguagingTypology,
  } = data.graphCmsBook;

  // const { altDescription, url, width, height } = bookCover;

  const genres = tags.filter((t) => t.tagType === 'Genre');
  const typologies = tags.filter((t) => t.tagType === 'Typology');
  const grades = tags.filter((t) => t.tagType === 'Grade');
  const languages = tags.filter((t) => t.tagType === 'Language');
  const textStructure = tags.filter((t) => t.tagType === 'Text_Structure');
  const topics = tags.filter((t) => t.tagType === 'Topic');

  return (
    <GlobalLayout
      htmlHead={{
        title: title,
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
          {bookCover && (
            <BookImage
              loading="eager"
              className="book-image full-height"
              book={data.graphCmsBook}
              css={{
                ...boxShadow,
                gridArea: 'book-image',
                maxWidth: 'initial',
                maxHeight: 'initial',
                placeSelf: 'start stretch',
              }}
            />
          )}
          <TextContainer
            id="w-node-_99a0eb45-7fae-4bf9-8d9d-f3ee27a955eb-0b286f2c"
            className="book-info"
            css={{
              gridArea: 'book-title',
              h2: {
                marginBottom: s05,
                color: COMPLIMENT,
              },
              maxWidth: 'initial',
            }}
          >
            <h1 className="book-title">{title}</h1>
            {authors.length > 0 && (
              <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                <dt>by </dt>
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
              <strong level={2}>Publisher Summary</strong>
              <p>{publisherSummary}</p>
            </TextContainer>
          )}
          {typologies.length > 0 && (
            <TextContainer
              id="w-node-aa56faaf-4d29-5ad8-4b7d-9de5df1602f2-0b286f2c"
              className="translanguaging"
              css={{ gridArea: 'translanguaging-typology' }}
            >
              <Heading level={2}>Translanguaging Typology</Heading>

              <List css={{ listStyle: 'none', color: BLACK }}>
                {typologies.map((typology) => {
                  return (
                    <Link
                      to={`/tags/${slugify(typology.tagType)}s/${
                        typology.slug
                      }`}
                    >
                      <div
                        css={{
                          padding: s1,

                          background: COMPLIMENT20,
                          borderRadius: `${s0125} ${s1}`,
                          ...boxShadow,
                        }}
                      >
                        <span
                          css={{ ...notoMono, textDecoration: 'underline' }}
                        >
                          {typology.title}
                        </span>
                        {typology.definition && <p>{typology.definition}</p>}
                      </div>
                    </Link>
                  );
                })}
              </List>
            </TextContainer>
          )}

          {actionLink && (
            <PrimaryLink
              to={actionLink}
              className="action-button"
              css={primaryActionStyle}
            >
              {actionLabel || 'Learn More'}
            </PrimaryLink>
          )}
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
              // gridTemplateRows: 'min-content auto',
            },
            onTabletMedia({
              gridRowGap: s2,
              gridAutoColumns: '1fr',

              gridColumnGap: s1,

              // gridTemplateAreas: '"Area"',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto auto',
            }),
          ]}
        >
          {/* <section className="container book-grid"> */}
          {textStructure.length > 0 && (
            <TextContainer
              id="w-node-aa56faaf-4d29-5ad8-4b7d-9de5df1602f2-0b286f2c"
              className="translanguaging"
              // css={{ gridArea: 'translanguaging-typology' }}
            >
              <Heading level={3}>
                {pluralize.plural(textStructure[0].tagType.replace('_', ' '))}
              </Heading>
              <TagList>
                {textStructure.map((structure) => {
                  return (
                    <Link
                      to={`/tags/${slugify(structure.tagType)}s/${
                        structure.slug
                      }`}
                    >
                      <TextStructureTag>{structure.title}</TextStructureTag>
                    </Link>
                  );
                })}
              </TagList>
            </TextContainer>
          )}

          {languages.length > 0 && (
            <TextContainer>
              <Heading level={3}>
                {pluralize.plural(languages[0].tagType.replace('_', ' '))}
              </Heading>
              <TagList>
                {languages.map((language) => {
                  return (
                    <Link
                      to={`/tags/${slugify(language.tagType)}s/${
                        language.slug
                      }`}
                    >
                      <LanguageTag>{language.title}</LanguageTag>
                    </Link>
                  );
                })}
              </TagList>
            </TextContainer>
          )}

          {topics.length > 0 && (
            <TextContainer>
              <Heading level={3}>
                {pluralize.plural(topics[0].tagType.replace('_', ' '))}
              </Heading>
              <TagList>
                {topics.map((topic) => {
                  return (
                    <Link to={`/tags/${slugify(topic.tagType)}s/${topic.slug}`}>
                      <TopicTag>{topic.title}</TopicTag>
                    </Link>
                  );
                })}
              </TagList>
            </TextContainer>
          )}
          {/* EDIT SUGGESTION FORM  */}
          {/* {email, bookTitle, suggestion} */}
          <TextContainer>
            <dl
              css={{
                dd: { fontWeight: 'bold' },
                div: { display: 'flex', gap: s025, marginBottom: s05 },
              }}
            >
              {isbn && (
                <div>
                  <dt>ISBN:</dt>
                  <dd>{isbn}</dd>
                </div>
              )}
              {publisher && (
                <div>
                  <dt>Publisher:</dt>
                  <dd>{publisher}</dd>
                </div>
              )}
              {translator && (
                <div>
                  <dt>Translator:</dt>
                  <dd>{translator}</dd>
                </div>
              )}
              {awards.length > 0 && (
                <div>
                  <dt>Awards:</dt>
                  <dd>{awards.length > 1 ? awards.join(', ') : awards[0]}</dd>
                </div>
              )}
              {copyrightYear && (
                <div>
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
      title
      awards
      bookCover {
        altDescription
        url
        width
        height
      }
      # representations {
      #   title
      #   slug
      # }
      tags {
        title
        definition
        description
        slug
        tagType
      }
      authors {
        name
        slug
        type
      }
      illustrators {
        name
        slug
        type
      }
      slug
      translator

      publisher
      publisherSummary
      isbn
      copyrightYear
      chapterBook
    }
  }
`;

export default BookTemplate;
