/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
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
  COMPLIMENT20,
  notoMono,
  BLACK,
  flex,
  grid,
  onDesktopMedia,
  onHover,
} from '../styles';
import { TagList } from '../components/TagList';
import { Container, TextContainer } from '../components/Container';
import { boxShadow } from '../styles/shadow';
import { BookImage } from '../components/BookImage';
import { slugify } from '../utils/slugify';
import { List } from '../components/List';
import { Footer } from '../components/Footer';
import HooplaIcon from '../icons/Hoopla';
import { HiddenAccessibleText } from '../components/HiddenAccessibleText';
import EpicIcon from '../icons/Epic';
import OverdriveIcon from '../icons/Overdrive';
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';
import { ContributorLinks } from '../components/ContributorLinks';

function BookTemplate({ data }) {
  const {
    title,
    epicLink,
    hooplaLink,
    overdriveLink,

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

  const hasAvailabilityLink = epicLink || hooplaLink || overdriveLink;
  const availabilityLinks = [
    { link: epicLink, text: 'Epic' },
    { link: hooplaLink, text: 'Hoopla' },
    { link: overdriveLink, text: 'Overdrive' },
  ];

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
      <GraphCMSPreviewIndicator />
      <MainMenu />
      <main>
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
              <h1>{title}</h1>
              {authors.length > 0 && (
                <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>by </dt>
                  <dd>
                    <ContributorLinks
                      contributors={authors}
                      css={{ padding: 0, marginLeft: '1ch' }}
                    />
                  </dd>
                </dl>
              )}

              {illustrators.length > 0 && (
                <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>Illustrator:</dt>
                  <dd>
                    <ContributorLinks
                      contributors={illustrators}
                      css={{ padding: 0, marginLeft: '1ch' }}
                    />
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
                <p>
                  <strong css={{ fontWeight: 'bold' }}>
                    Publisher Summary
                  </strong>{' '}
                  <br />
                  {publisherSummary}
                </p>
              </TextContainer>
            )}
            {typologies.length > 0 && (
              <TextContainer
                // id="w-node-aa56faaf-4d29-5ad8-4b7d-9de5df1602f2-0b286f2c"
                // className="translanguaging"
                css={{ gridArea: 'translanguaging-typology' }}
              >
                <Heading level={2}>Translanguaging Typology</Heading>

                <List
                  css={{
                    ...flex('column'),
                    listStyle: 'none',
                    color: BLACK,
                    gap: s1,
                  }}
                >
                  {typologies.map((typology) => {
                    return (
                      <Link
                        to={`/tags/${slugify(pluralize(typology.tagType))}/${
                          typology.slug
                        }`}
                        css={{ textDecoration: 'none' }}
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

            {hasAvailabilityLink && (
              <TextContainer>
                <Heading level={2}>Available On…</Heading>
                <List css={{ listStyle: 'none', ...flex('row'), gap: s2 }}>
                  {availabilityLinks
                    .filter(({ link }) => link)
                    .map(({ link, text }) => {
                      function getIcon(text) {
                        switch (text) {
                          case 'Epic':
                            return <EpicIcon />;
                          case 'Hoopla':
                            return <HooplaIcon />;
                          case 'Overdrive':
                            return <OverdriveIcon />;
                          default:
                            throw new Error(
                              `${text} did not match an availability icon.`
                            );
                        }
                      }
                      return (
                        <Link
                          to={link}
                          key={link}
                          css={{
                            ...onHover({
                              color: COMPLIMENT,
                            }),
                          }}
                        >
                          {getIcon(text)}
                          <HiddenAccessibleText>{text}</HiddenAccessibleText>
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
                  marginBottom: s05,
                  color: PRIMARY,
                },
                ...grid({
                  gridTemplateAreas: `"genre" "textStructure" "grade" "language" "topic" "metadata" `,
                  gridGap: s2,
                }),
              },
              onTabletMedia({
                gridTemplateAreas: `"genre textStructure" "grade topic" "language topic" "metadata ." `,
                gridRowGap: s1,
                gridColumnGap: s2,
              }),
              onDesktopMedia({
                gridTemplateAreas: `"genre grade language" "textStructure topic topic" "metadata form form"`,
                gridRowGap: s2,
                gridColumnGap: s1,
              }),
            ]}
          >
            {/* <section className="container book-grid"> */}
            {genres.length > 0 && (
              <TextContainer
                id="w-node-aa56faaf-4d29-5ad8-4b7d-9de5df1602f2-0b286f2c"
                className="translanguaging"
                css={{ gridArea: 'genre' }}
              >
                <Heading level={3}>
                  {pluralize.plural(genres[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {genres.map((genre) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
                        to={`/tags/${slugify(genre.tagType)}s/${genre.slug}`}
                      >
                        <TextStructureTag>{genre.title}</TextStructureTag>
                      </Link>
                    );
                  })}
                </TagList>
              </TextContainer>
            )}

            {textStructure.length > 0 && (
              <TextContainer
                id="w-node-aa56faaf-4d29-5ad8-4b7d-9de5df1602f2-0b286f2c"
                className="translanguaging"
                css={{ gridArea: 'textStructure' }}
              >
                <Heading level={3}>
                  {pluralize.plural(textStructure[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {textStructure.map((structure) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
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
              <TextContainer css={{ gridArea: 'language' }}>
                <Heading level={3}>
                  {pluralize.plural(languages[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {languages.map((language) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
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

            {grades.length > 0 && (
              <TextContainer css={{ gridArea: 'grade' }}>
                <Heading level={3}>
                  {pluralize.plural(grades[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {grades.map((grade) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
                        to={`/tags/${slugify(grade.tagType)}s/${grade.slug}`}
                      >
                        <LanguageTag>{grade.title}</LanguageTag>
                      </Link>
                    );
                  })}
                </TagList>
              </TextContainer>
            )}

            {topics.length > 0 && (
              <TextContainer css={{ gridArea: 'topic' }}>
                <Heading level={3}>
                  {pluralize.plural(topics[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {topics.map((topic) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
                        to={`/tags/${slugify(topic.tagType)}s/${topic.slug}`}
                      >
                        <TopicTag>{topic.title}</TopicTag>
                      </Link>
                    );
                  })}
                </TagList>
              </TextContainer>
            )}
            {/* EDIT SUGGESTION FORM  */}
            <TextContainer css={{ gridArea: 'metadata' }}>
              <dl
                css={{
                  dd: { fontWeight: 'bold' },
                  ...grid({
                    gridTemplateColumns: 'min-content 1fr',
                    gridGap: s05,
                    dt: {
                      placeSelf: 'start end',
                    },
                  }),
                }}
              >
                {isbn && (
                  <>
                    <dt>ISBN:</dt>
                    <dd>{isbn}</dd>
                  </>
                )}
                {publisher && (
                  <>
                    <dt>Publisher:</dt>
                    <dd>{publisher}</dd>
                  </>
                )}
                {translator && (
                  <>
                    <dt>Translator:</dt>
                    <dd>{translator}</dd>
                  </>
                )}
                {awards.length > 0 && (
                  <>
                    <dt>Awards:</dt>
                    <dd>
                      {awards.length > 1
                        ? awards.map((award) => (
                            <>
                              {award} <br />{' '}
                            </>
                          ))
                        : awards[0]}
                    </dd>
                  </>
                )}
                {copyrightYear && (
                  <>
                    <dt>Copyright:</dt>
                    <dd>{copyrightYear}</dd>
                  </>
                )}
              </dl>
            </TextContainer>
            <TextContainer css={{ gridArea: 'form' }}>
              <Heading level={3}>Have a Suggestion?</Heading>
              <p>
                We do invite you to submit your ideas, lesson plans, vignettes,
                and other work to be included on our book pages.
              </p>
            </TextContainer>
          </Container>
        </Section>
      </main>
      <Footer />
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
      tags {
        title
        definition
        slug
        tagType
      }
      authors {
        lastName
        firstName
        slug
        type
      }
      illustrators {
        lastName
        firstName

        slug
        type
      }
      slug
      translator
      epicLink
      hooplaLink
      overdriveLink
      publisher
      publisherSummary
      isbn
      copyrightYear
      chapterBook
    }
  }
`;

export default BookTemplate;
