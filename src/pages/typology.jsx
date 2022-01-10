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
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';
import { UnderConstruction } from '../components/UnderConstruction';

function TypologyPage({ data }) {
  const typologies = data.allGraphCmsTag.nodes;

  return (
    <>
      <GlobalLayout>
        <UnderConstruction />
        <GraphCMSPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section
            css={[
              {
                ...grid({
                  gridTemplateColumns: '1fr',
                  gridTemplateAreas: `"title" "term"`,
                }),

                minHeight: '80vh',
                marginBottom: '10vh',

                alignItems: 'initial',
                flexDirection: 'column',
                justifyContent: 'center',
              },
              onTabletMedia({
                ...grid({
                  gridTemplateColumns: '1fr',
                  gridTemplateAreas: `"title" "terms"`,
                }),
              }),
            ]}
          >
            <Container css={{ gridArea: 'title', alignItems: 'start' }}>
              <h1>Translanguaging Typology</h1>
              <p>
                As we built the site and analyzed high-quality picture books, we
                noticed that there was variety in the ways authors and
                illustrators used translanguaging while they wrote and created
                their visuals. We created a typology that outlines some of these
                differences. By more closely analyzing the specific ways
                translanguaging can happen in books, we hope teachers can create
                a more detailed plan for how to discuss with students the
                linguistic choices authors make and the ways students can shape
                and craft their own multilingual writing.
              </p>
            </Container>
            <Container
              css={[
                onTabletMedia({
                  gridArea: 'terms',
                  ...grid({ gridTemplateColumns: '1fr 1fr' }),
                  gridGap: `${s2} ${s2}`,
                  placeItems: 'start',
                }),
              ]}
            >
              {typologies
                .filter((term) => term.definition)
                .map((term) => {
                  const { title, details, definition } = term;
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
                      <h2>{title}</h2>
                      {definition && <p>{definition}</p>}
                      {details && <RichText html={details.html} />}

                      {/* snippet example */}
                      {/* book where snippet is from */}
                    </TextContainer>
                  );
                })}
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
        details {
          html
        }
      }
    }
  }
`;

export default TypologyPage;
