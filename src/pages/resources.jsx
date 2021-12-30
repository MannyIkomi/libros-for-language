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

function ResourcesPage({ data }) {
  const typologies = data.allGraphCmsTag.nodes;

  return (
    <>
      <GlobalLayout>
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
              <h1>Translanguaging Resources</h1>
            </Container>
          </Section>
        </main>
        <Footer />
      </GlobalLayout>
    </>
  );
}

export const query = graphql`
  query ResourcesPageQuery {
    allGraphCmsTag(filter: { tagType: { eq: Typology } }) {
      nodes {
        title
        definition
        description
      }
    }
  }
`;

export default ResourcesPage;
