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
  GenreTag,
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
  s3,
} from '../styles';
import { TagList } from '../components/TagList';
import { Container, TextContainer } from '../components/Container';
import { boxShadow } from '../styles/shadow';
import { BookImage } from '../components/BookImage';
import { slugify } from '../utils/slugify';
import { List } from '../components/List';
import { Footer } from '../components/Footer';
import HooplaIconSVG from '../icons/Hoopla';
import { HiddenAccessibleText } from '../components/HiddenAccessibleText';
import EpicIconSVG from '../icons/Epic';
import OverdriveIconSVG from '../icons/Overdrive';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { ContributorLinks } from '../components/ContributorLinks';
import SuggestionForm from '../components/SuggestionForm';
import { isDevEnv } from '../utils/environment';
import { concatFullName } from '../utils/concatFullName';
import { sortWithProperty } from '../utils/sort';
import TagIcon from '../icons/Icons';

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

  const genres = tags
    .filter((t) => t.tagType === 'Genre')
    .sort(sortWithProperty({ property: 'sequence' }));
  const typologies = tags
    .filter((t) => t.tagType === 'Typology')
    .sort(sortWithProperty({ property: 'sequence' }));
  const grades = tags
    .filter((t) => t.tagType === 'Grade')
    .sort(sortWithProperty({ property: 'sequence' }));
  const languages = tags
    .filter((t) => t.tagType === 'Language')
    .sort(sortWithProperty({ property: 'sequence' }));
  const textStructure = tags
    .filter((t) => t.tagType === 'Text_Structure')
    .sort(sortWithProperty({ property: 'sequence' }));
  const topics = tags
    .filter((t) => t.tagType === 'Topic')
    .sort(sortWithProperty({ property: 'sequence' }));

  return (
    <GlobalLayout
      htmlHead={{
        title: title,
        description: publisherSummary,
        image: bookCover.url,
        imageDescription: bookCover.altDescription,
      }}
    >
      <GatsbyPreviewIndicator />
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
              "cover"
              "title"
              "summary"
              "actionLink"              
              "typology"
              "availability"
              `,
                gridTemplateColumns: '1fr',
                gridTemplateRows:
                  'min-content min-content min-content min-content auto',
              },
              onTabletMedia({
                display: 'grid',
                alignSelf: 'center',

                // gridAutoColumns: '1fr',
                gridColumnGap: '1rem',
                gridRowGap: '2rem',

                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows:
                  'min-content min-content min-content min-content auto',

                gridTemplateAreas: `
              "title title"
              "cover summary"
              "cover typology"
              "cover actionLink"
              "cover availability"
              `,
              }),
            ]}
          >
            {bookCover && (
              <div
                css={{
                  // position: 'relative',
                  gridArea: 'cover',
                  placeSelf: 'stretch',
                }}
              >
                <BookImage
                  loading="eager"
                  className="cover full-height"
                  book={data.graphCmsBook}
                  css={{
                    ...boxShadow,
                    position: 'sticky',
                    top: s1,
                    maxWidth: 'initial',
                    maxHeight: 'initial',
                  }}
                />
              </div>
            )}
            <TextContainer
              css={{
                gridArea: 'title',
                h2: {
                  marginBottom: s05,
                  color: COMPLIMENT,
                },
                maxWidth: 'initial',
              }}
            >
              <Heading level={1}>{title}</Heading>
              {authors.length > 0 && (
                <dl css={{ display: 'flex', gap: s0125, marginBottom: s05 }}>
                  <dt>by </dt>
                  <dd>
                    <ContributorLinks
                      contributors={authors.map(concatFullName)}
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
                      contributors={illustrators.map(concatFullName)}
                      css={{ padding: 0, marginLeft: '1ch' }}
                    />
                  </dd>
                </dl>
              )}
            </TextContainer>
            {publisherSummary && (
              <TextContainer
                css={{
                  gridArea: 'summary',
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

            {actionLink && (
              <PrimaryLink
                to={actionLink}
                css={[primaryActionStyle, { gridArea: 'actionLink' }]}
              >
                {actionLabel || 'Learn More'}
              </PrimaryLink>
            )}

            {typologies.length > 0 && (
              <TextContainer css={{ gridArea: 'typology' }}>
                <Heading level={2}>Translanguaging Typology</Heading>

                <List
                  css={{
                    ...flex('column'),
                    listStyle: 'none',
                    color: BLACK,
                    gap: s1,
                  }}
                >
                  {typologies.map(
                    ({ slug, tagType, tagSubType, ...typology }) => {
                      return (
                        <Link
                          to={`/tags/${slugify(pluralize(tagType))}/${slug}`}
                          css={{ textDecoration: 'none' }}
                          key={slug}
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
                              css={{
                                ...notoMono,
                                textDecoration: 'underline',
                                ...flex('row', { alignItems: 'center' }),
                              }}
                            >
                              {typology.title}{' '}
                              {tagSubType && (
                                <TagIcon
                                  name={tagSubType}
                                  css={{ width: s3, height: s3 }}
                                />
                              )}
                            </span>
                            {typology.definition && (
                              <p>{typology.definition}</p>
                            )}
                          </div>
                        </Link>
                      );
                    }
                  )}
                </List>
              </TextContainer>
            )}

            {hasAvailabilityLink && (
              <TextContainer css={{ gridArea: 'availability' }}>
                <Heading level={2}>Available On…</Heading>
                <List css={{ listStyle: 'none', ...flex('row'), gap: s2 }}>
                  {availabilityLinks
                    .filter(({ link }) => link)
                    .map(({ link, text }) => {
                      function getIcon(text) {
                        switch (text) {
                          case 'Epic':
                            return <EpicIconSVG />;
                          case 'Hoopla':
                            return <HooplaIconSVG />;
                          case 'Overdrive':
                            return <OverdriveIconSVG />;
                          default:
                            throw new Error(
                              `${text} did not match an availability icon.`
                            );
                        }
                      }
                      console.log('ICON TEXT', text);
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
          </Container>
        </Section>

        {/* meta data stuff… */}
        <Section css={{ alignItems: 'center' }}>
          <Container
            css={[
              {
                h3: {
                  marginBottom: s05,
                  color: PRIMARY,
                },
                ...grid({
                  gridTemplateAreas: `"genre" "language" "grade" "textStructure" "topic" "metadata" "suggestion" `,
                  gridGap: s2,
                  placeItems: 'start',
                }),
              },
              onTabletMedia({
                gridTemplateAreas: `"genre textStructure" "grade topic" "language topic" "metadata suggestion" `,
                gridRowGap: s1,
                gridColumnGap: s2,
              }),
              onDesktopMedia({
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateAreas: `"genre grade language" "textStructure topic topic" "metadata suggestion suggestion"`,
                gridRowGap: s2,
                gridColumnGap: s1,
              }),
            ]}
          >
            {/* <section className="container book-grid"> */}
            {genres.length > 0 && (
              <TextContainer css={{ gridArea: 'genre' }}>
                <Heading level={3}>
                  {pluralize.plural(genres[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {genres.map(({ tagType, slug, title, ...genre }) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
                        to={`/tags/${slugify(tagType)}s/${slug}`}
                        key={slug}
                      >
                        <GenreTag>{title}</GenreTag>
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
                  {languages.map(({ tagType, slug, title, ...language }) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
                        to={`/tags/${slugify(tagType)}s/${slug}`}
                      >
                        <LanguageTag>{title}</LanguageTag>
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
                  {grades.map(({ tagType, slug, title, ...grade }) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
                        to={`/tags/${slugify(tagType)}s/${slug}`}
                      >
                        <LanguageTag>{title}</LanguageTag>
                      </Link>
                    );
                  })}
                </TagList>
              </TextContainer>
            )}
            {textStructure.length > 0 && (
              <TextContainer css={{ gridArea: 'textStructure' }}>
                <Heading level={3}>
                  {pluralize.plural(textStructure[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {textStructure.map(
                    ({ tagType, slug, title, ...structure }) => {
                      return (
                        <Link
                          css={{ textDecoration: 'none' }}
                          to={`/tags/${slugify(tagType)}s/${slug}`}
                        >
                          <TextStructureTag>{title}</TextStructureTag>
                        </Link>
                      );
                    }
                  )}
                </TagList>
              </TextContainer>
            )}

            {topics.length > 0 && (
              <TextContainer css={{ gridArea: 'topic' }}>
                <Heading level={3}>
                  {pluralize.plural(topics[0].tagType.replace('_', ' '))}
                </Heading>
                <TagList>
                  {topics.map(({ tagType, slug, title, ...topic }) => {
                    return (
                      <Link
                        css={{ textDecoration: 'none' }}
                        to={`/tags/${slugify(tagType)}s/${slug}`}
                      >
                        <TopicTag>{title}</TopicTag>
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
                      {awards.length > 1 ? (
                        awards.map((award, index) => (
                          <span key={award}>
                            {award}
                            {awards.length !== index + 1 && ', '}
                            <br />
                          </span>
                        ))
                      ) : (
                        <span>{awards[0]}</span>
                      )}
                      {/* 
                        <MonoFontLink
              key={slug}
              to={`/authors-illustrators/${slug}`}
              {...props}
            >
              {name}
            </MonoFontLink>
            {contributors.length !== index + 1 && ', '}
                        
                        */}
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

            <Container css={{ gridArea: 'suggestion', padding: 0 }}>
              <TextContainer css={{ alignSelf: 'start' }}>
                <Heading level={3}>Have a Suggestion?</Heading>
                <p>
                  We do invite you to submit your ideas, lesson plans,
                  vignettes, and other work to be included on our book pages.
                </p>
              </TextContainer>
              <SuggestionForm bookTitle={title} />
            </Container>
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
      actionLink
      actionLabel
      bookCover {
        altDescription
        url
        width
        height
      }
      tags {
        title
        definition
        sequence
        slug
        tagType
        tagSubType
      }
      authors {
        lastName
        middleName
        firstName
        slug
        type
      }
      illustrators {
        lastName
        middleName
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
