/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
import {
  notoSerif,
  PRIMARY,
  s1,
  COMPLIMENT80,
  base160,
  base320,
  secondaryActionStyle,
  tertiaryActionStyle,
  COMPLIMENT20,
  s025,
  onTabletMedia,
  flex,
  grid,
  s0125,
  boxShadowLg,
  base16,
  PRIMARY40,
  COMPLIMENT40,
  s2,
  PRIMARY20,
  boxShadow,
  s4,
  s3,
} from '../styles';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';
import { DebugData } from '../components/DebugData';

import { Link, PrimaryLink, TertiaryLink } from '../components/Link';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import RichText from '../components/RichText';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { UnderConstruction } from '../components/UnderConstruction';
import { MonoFontLink } from '../components/MonoFontLink';
import { List } from '../components/List';
import { sortWithProperty } from '../utils/sort';
import { LineRule } from '../components/LineRule';
import TagIcon, { TranslanguagingIcon } from '../icons/Icons';

function TypologyPage({ data, location }) {
  const subTypeNames = data.subTypeNames.enumValues;
  const typologies = data.allGraphCmsTag.nodes.sort(
    sortWithProperty({ property: 'sequence' })
  );

  const typologiesFilterNotSubType = typologies.filter(
    (term) => !term.tagSubType
  );
  /* 


There are a variety of ways authors and illustrators use translanguaging when they write and create their visuals. We created a typology that outlines some of these differences. 
*/
  return (
    <>
      <GlobalLayout
        htmlHead={{
          title: 'Translanguaging Typology',
          description: `We created a typology that outlines how authors and illustrators use translanguaging when they write and create their visuals.`,
          url: location.href,
        }}
      >
        <GatsbyPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section
            css={[
              {
                ...grid({
                  gridTemplateColumns: '1fr',
                  gridTemplateAreas: `"title" "glossary" "terms"`,
                  placeItems: 'start center',
                  gridGap: s2,
                }),

                minHeight: '80vh',
                marginBottom: '10vh',
              },
              onTabletMedia({
                gridGap: `${s1} ${s2}`,
                placeItems: 'start end',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: 'min-content 1fr',
                gridTemplateAreas: `"title terms" "glossary terms"`,
              }),
            ]}
          >
            <TextContainer
              css={[
                { gridArea: 'title', alignItems: 'center' },
                // onTabletMedia({ placeSelf: 'end center' }),
              ]}
            >
              <Container css={{ alignItems: 'start' }}>
                <Heading level={1}>Translanguaging Typology</Heading>
                <p>
                  There are a variety of ways authors and illustrators use
                  translanguaging when they write and create their visuals. We
                  created a typology that outlines some of these differences. By
                  more closely analyzing the specific ways translanguaging can
                  happen in books, we hope teachers can create a more detailed
                  plan for how to discuss with students the linguistic choices
                  authors make and the ways students can shape and craft their
                  own multilingual writing.
                </p>
              </Container>
            </TextContainer>
            <TextContainer
              css={{
                gridArea: 'glossary',
                alignItems: 'center',
              }}
            >
              <Container css={{ alignItems: 'start', gap: s2 }}>
                <Heading
                  level={2}
                  css={[
                    { marginBottom: 0 },
                    onTabletMedia({ marginBottom: 0 }),
                  ]}
                >
                  Glossary
                </Heading>

                {subTypeNames.map(({ name: subType }) => {
                  return (
                    <List css={{ listStyle: 'none' }} key={subType}>
                      <Heading level={3}>{subType} Tags</Heading>
                      {typologies
                        .filter((term) => term.tagSubType === subType)
                        .map(({ title, slug, ...term }) => {
                          return (
                            <MonoFontLink
                              key={slug}
                              to={`#${slug}`}
                              css={{ whiteSpace: 'normal' }}
                            >
                              {title}
                            </MonoFontLink>
                          );
                        })}
                    </List>
                  );
                })}

                <List css={{ listStyle: 'none' }}>
                  {typologiesFilterNotSubType.map((term) => {
                    return (
                      <MonoFontLink
                        key={term.slug}
                        to={`#${term.slug}`}
                        css={{ whiteSpace: 'normal' }}
                      >
                        {term.title}
                      </MonoFontLink>
                    );
                  })}
                </List>
              </Container>
            </TextContainer>

            <TextContainer
              css={[
                {
                  gridArea: 'terms',
                },
                onTabletMedia({ placeSelf: 'start' }),
              ]}
            >
              <Container css={{ gap: s4 }}>
                {subTypeNames.map(({ name: subType }) => {
                  return (
                    <dl
                      key={subType}
                      css={[
                        grid({
                          gridTemplateColumns: '1fr',
                          gridTemplateColumns: `repeat(auto-fit, 1fr)`,
                          gridGap: `${s2} ${s2}`,
                          placeItems: 'start',
                        }),
                      ]}
                    >
                      <Heading
                        level={3}
                        css={[
                          {
                            marginBottom: 0,
                            ...flex('row', { alignItems: 'center' }),
                          },
                          onTabletMedia({ marginBottom: 0 }),
                        ]}
                      >
                        {subType} Texts{' '}
                        <TagIcon
                          name={subType}
                          css={{ width: s3, height: s3 }}
                        />
                      </Heading>
                      {typologies
                        .filter((term) => term.definition)
                        .filter((term) => term.tagSubType === subType)
                        .map((term) => {
                          const { title, details, definition, slug } = term;
                          return (
                            <TextContainer
                              key={slug}
                              css={{
                                padding: s1,
                                background: COMPLIMENT20,
                                borderRadius: `${s0125} ${s1}`,
                                ...boxShadow,
                              }}
                            >
                              <dt>
                                <MonoFontLink
                                  to={`/tags/typologies/${slug}`}
                                  css={{ padding: 0, whiteSpace: 'normal' }}
                                >
                                  <Heading
                                    level={3}
                                    id={term.slug}
                                    css={[
                                      {
                                        fontSize: 'inherit',
                                        fontFamily: 'inherit',
                                        scrollMargin: '25vh 0',
                                        margin: 0,
                                      },
                                      onTabletMedia({
                                        fontSize: 'inherit',
                                        fontFamily: 'inherit',
                                        margin: 0,
                                      }),
                                    ]}
                                  >
                                    {title}
                                  </Heading>
                                </MonoFontLink>
                              </dt>
                              <dd>
                                {definition && <p>{definition}</p>}
                                {details && <RichText html={details.html} />}
                              </dd>
                            </TextContainer>
                          );
                        })}
                    </dl>
                  );
                })}
                {typologiesFilterNotSubType && (
                  <dl
                    css={[
                      grid({
                        gridTemplateColumns: '1fr',
                        gridTemplateColumns: `repeat(auto-fit, 1fr)`,
                        gridGap: `${s2} ${s2}`,
                        placeItems: 'center',
                      }),
                    ]}
                  >
                    {typologiesFilterNotSubType
                      .filter((term) => term.definition)
                      .map((term) => {
                        const { title, details, definition, slug } = term;
                        return (
                          <TextContainer
                            key={slug}
                            css={{
                              padding: s1,
                              background: COMPLIMENT20,
                              borderRadius: `${s0125} ${s1}`,
                              ...boxShadow,
                            }}
                          >
                            <dt>
                              <MonoFontLink
                                to={`/tags/typologies/${slug}`}
                                css={{ padding: 0, whiteSpace: 'normal' }}
                              >
                                <Heading
                                  level={3}
                                  id={term.slug}
                                  css={[
                                    {
                                      fontSize: 'inherit',
                                      fontFamily: 'inherit',
                                      scrollMargin: '25vh 0',
                                      margin: 0,
                                    },
                                    onTabletMedia({
                                      fontSize: 'inherit',
                                      fontFamily: 'inherit',
                                      margin: 0,
                                    }),
                                  ]}
                                >
                                  {title}
                                </Heading>
                              </MonoFontLink>
                            </dt>
                            <dd>
                              {definition && <p>{definition}</p>}
                              {details && <RichText html={details.html} />}
                            </dd>
                          </TextContainer>
                        );
                      })}
                  </dl>
                )}
              </Container>
            </TextContainer>
          </Section>
        </main>

        <Footer />
      </GlobalLayout>
    </>
  );
}

export const query = graphql`
  query TypologyPageQuery {
    allGraphCmsTag(
      filter: { tagType: { eq: Typology } }
      sort: { order: DESC, fields: updatedAt }
    ) {
      nodes {
        title
        definition
        slug
        id
        details {
          html
        }
        tagSubType
        sequence
      }
    }
    subTypeNames: __type(name: "GraphCMS_TagSubType") {
      enumValues {
        name
      }
    }
  }
`;

export default TypologyPage;
