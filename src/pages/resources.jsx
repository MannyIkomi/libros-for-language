/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';

import { onTabletMedia, grid, WHITE } from '../styles';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';

import {
  Link,
  PrimaryLink,
  SecondaryLink,
  TertiaryLink,
  d,
} from '../components/Link';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { List } from '../components/List';
import RichText from '../components/RichText';
import { Heading } from '../components/Heading';
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';
import { isUnderContruction } from '../utils/environment';
import { UnderConstruction } from '../components/UnderConstruction';

function ResourcesPage({ data }) {
  const resources = data.allGraphCmsResource.nodes;

  return (
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
          z
        >
          <Container css={{ gridArea: 'title', alignItems: 'start' }}>
            <h1>Translanguaging Resources</h1>
          </Container>
          <Container>
            <List css={{ listStyle: 'none' }}>
              {resources.map((resource) => {
                const { description, attribution, url } = resource;
                return (
                  <div css={{}}>
                    <Link to={resource?.url}>
                      <Heading level={2}>{resource.title}</Heading>
                    </Link>
                    {attribution && <span>by {attribution}</span>}
                    {/* {description && <RichText html={description.html} />} */}
                    {description?.html && <RichText html={description.html} />}

                    <SecondaryLink to={url} css={{ color: WHITE }}>
                      {new URL(url).host}
                    </SecondaryLink>
                  </div>
                );
              })}
            </List>
          </Container>
        </Section>
      </main>
      <Footer />
    </GlobalLayout>
  );
}

export const query = graphql`
  query ResourcesPageQuery {
    allGraphCmsResource(sort: { fields: updatedAt, order: DESC }) {
      nodes {
        attribution
        title
        description {
          html
        }
        url
      }
    }
  }
`;

export default ResourcesPage;
