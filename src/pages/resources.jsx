/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';

import {
  onTabletMedia,
  grid,
  WHITE,
  s2,
  flex,
  PRIMARY20,
  s1,
  s05,
  boxShadow,
  s5,
} from '../styles';
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
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { isUnderContruction } from '../utils/environment';
import { UnderConstruction } from '../components/UnderConstruction';

function ResourcesPage({ data }) {
  const resources = data.allGraphCmsResource.nodes;

  return (
    <GlobalLayout>
      <GatsbyPreviewIndicator />
      <MainMenu />
      <main css={{ position: 'relative' }}>
        <Section
          css={[
            {
              ...grid({
                gridTemplateColumns: '1fr',
                gridTemplateAreas: `"title" "resources"`,
              }),

              minHeight: '80vh',
              marginBottom: '10vh',

              placeItems: 'start center',
              flexDirection: 'column',
              justifyContent: 'center',
            },
            onTabletMedia({
              ...grid({
                gridTemplateColumns: '1fr',
                gridTemplateAreas: `"title" "resources"`,
              }),
            }),
          ]}
        >
          <Container
            css={{ gridArea: 'title', alignItems: 'start', margin: `${s2} 0` }}
          >
            <Heading level={1}>Translanguaging Resources</Heading>
          </Container>
          <Container css={{ gridArea: 'resources' }}>
            <List
              css={[
                {
                  listStyle: 'none',
                  ...grid({
                    gridGap: s2,
                    gridTemplateColumns: '1fr',
                  }),
                },
                onTabletMedia({
                  gridTemplateColumns: '1fr 1fr',
                }),
              ]}
            >
              {resources.map((resource) => {
                const { description, attribution, url } = resource;
                return (
                  <div
                    css={{
                      ...flex('column'),
                      gap: s1,
                      backgroundColor: PRIMARY20,
                      padding: s1,
                      borderRadius: s05,
                      ...boxShadow,
                    }}
                  >
                    <Link to={resource?.url}>
                      <Heading
                        level={2}
                        css={[
                          { marginBottom: 0 },
                          onTabletMedia({ marginBottom: 0 }),
                        ]}
                      >
                        {resource.title}
                      </Heading>
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
        title
        attribution
        url
        stage
        description {
          html
        }
      }
    }
  }
`;

export default ResourcesPage;
