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

function TypologyPage({ data }) {
  const typologies = data.allGraphCmsTag.nodes;

  return (
    <>
      <GlobalLayout>
        <GatsbyPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section
            css={[
              {
                ...grid({
                  gridTemplateColumns: '1fr',
                  gridTemplateAreas: `"title" "glossary" "terms"`,
                  placeItems: 'start',
                }),

                minHeight: '80vh',
                marginBottom: '10vh',
              },
              onTabletMedia({
                placeItems: 'start',
                gridTemplateColumns: 'min-content 1fr',
                gridTemplateRows: 'min-content 1fr',
                gridTemplateAreas: `"title terms" "glossary terms"`,
              }),
            ]}
          >
            <Container css={{ gridArea: 'title', alignItems: 'start' }}>
              <Heading level={1}>Translanguaging Typology</Heading>
              <p>
                There are a variety of ways authors and illustrators use
                translanguaging when they write and create their visuals. We
                created a typology that outlines some of these differences. By
                more closely analyzing the specific ways translanguaging can
                happen in books, we hope teachers can create a more detailed
                plan for how to discuss with students the linguistic choices
                authors make and the ways students can shape and craft their own
                multilingual writing.
              </p>
            </Container>
            <Container
              css={{
                gridArea: 'glossary',
                alignSelf: 'start',
                alignItems: 'start',
              }}
            >
              <Heading level={2}>Glossary</Heading>
              <List css={{ listStyle: 'none' }}>
                {typologies.map((term) => {
                  return (
                    <MonoFontLink
                      to={`#${term.slug}`}
                      css={{ whiteSpace: 'normal' }}
                    >
                      {term.title}
                    </MonoFontLink>
                  );
                })}
              </List>
            </Container>
            <Container
              css={{
                gridArea: 'terms',
              }}
            >
              <dl
                css={[
                  grid({
                    gridTemplateColumns: '1fr',
                    gridTemplateColumns: `repeat(auto-fit, 1fr)`,
                    gridGap: `${s2} ${s2}`,
                    placeItems: 'center',
                  }),
                  // onTabletMedia({
                  // }),
                ]}
              >
                {typologies
                  .filter((term) => term.definition)
                  .map((term) => {
                    const { title, details, definition, slug } = term;
                    return (
                      <TextContainer
                        key={title}
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
                              css={{
                                fontSize: 'inherit',
                                scrollMargin: '25vh 0',
                              }}
                            ></Heading>
                            {title}
                          </MonoFontLink>
                          {/* <Heading
                            level={2}
                            css={{ fontSize: `${s1} !important` }}
                          ></Heading> */}
                        </dt>
                        <dd>
                          {definition && <p>{definition}</p>}
                          {details && <RichText html={details.html} />}
                        </dd>
                      </TextContainer>
                    );
                  })}
              </dl>
            </Container>
          </Section>
        </main>
        <Footer />
      </GlobalLayout>
    </>
  );
}

export const query = graphql`
  query TypologyPageQuery {
    allGraphCmsTag(filter: { tagType: { eq: Typology } }) {
      nodes {
        title
        definition
        slug
        id
        details {
          html
        }
      }
    }
  }
`;

export default TypologyPage;
