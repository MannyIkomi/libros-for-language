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
  PRIMARY,
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
import { showUnderContruction } from '../utils/environment';
import { UnderConstruction } from '../components/UnderConstruction';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { DebugData } from '../components/DebugData';
import {
  tabListStyle,
  tabPanelSelectedStyle,
  tabPanelStyle,
  tabStyle,
} from '../styles/tabs';
import pluralize from 'pluralize';

function ResourcesPage({ data, location }) {
  const resources = data.allGraphCmsResource.nodes;
  const resourceTypes = data.resourceTypes.enumValues;

  return (
    <GlobalLayout
      htmlHead={{
        title: 'Translanguaging Resources',
        description: `These resources offer an excellent foundation in translanguaging, including real-life classroom vignettes about the many ways to implement a translanguaging pedagogy. In addition to instructional strategies and a variety of other issues that emerge in creating a multilingual classroom environment.`,
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
                gridTemplateAreas: `"title" "resources"`,
                gridTemplateColumns: '1fr',
                gridTemplateRows: 'min-content 1fr',
              }),

              minHeight: '80vh',
              marginBottom: '10vh',

              placeItems: 'start center',
              flexDirection: 'column',
              justifyContent: 'center',
            },
            onTabletMedia({
              ...grid({
                gridTemplateAreas: `"title" "resources"`,
                gridTemplateColumns: '1fr',
                gridTemplateRows: 'min-content 1fr',
              }),
            }),
          ]}
        >
          <Container
            css={{ gridArea: 'title', alignItems: 'start', margin: `${s2} 0` }}
          >
            <Heading level={1}>Translanguaging Resources</Heading>
            <TextContainer>
              <p>
                These resources offer an excellent foundation in
                translanguaging, including real-life classroom vignettes about
                the many ways to implement a translanguaging pedagogy. In
                addition to instructional strategies and a variety of other
                issues that emerge in creating a multilingual classroom
                environment.
              </p>
            </TextContainer>
          </Container>

          <Container css={[{ gridArea: 'resources' }]}>
            <Tabs style={{ width: '100%' }}>
              <TabList>
                {resourceTypes.map(({ name: type }) => {
                  return (
                    <Tab key={type}>
                      <Heading level={2}>{pluralize(type)}</Heading>
                    </Tab>
                  );
                })}
              </TabList>

              {resourceTypes.map(({ name: type }) => {
                return (
                  <TabPanel key={type}>
                    {/* <Heading level={2}>{type} Resources</Heading> */}
                    <div
                      css={[
                        { ...flex('column'), gap: s2 },
                        onTabletMedia({
                          ...grid({
                            gridTemplateColumns: '1fr 1fr',
                            placeItems: 'start stretch',
                          }),
                        }),
                      ]}
                    >
                      {resources
                        .filter(({ resourceType }) => resourceType === type)
                        .map((resource) => {
                          const { description, attribution, url, title } =
                            resource;
                          return (
                            <div
                              key={url}
                              css={{
                                ...flex('column'),
                                gap: s1,
                                backgroundColor: PRIMARY20,
                                padding: s1,
                                borderRadius: s05,
                                ...boxShadow,
                              }}
                            >
                              <Heading
                                level={3}
                                css={[
                                  { marginBottom: 0 },
                                  onTabletMedia({ marginBottom: 0 }),
                                ]}
                              >
                                {title}
                              </Heading>

                              {attribution && <span>by {attribution}</span>}

                              {description?.html && (
                                <RichText html={description.html} />
                              )}

                              <SecondaryLink to={url} css={{ color: PRIMARY }}>
                                {new URL(url).host}
                              </SecondaryLink>
                            </div>
                          );
                        })}
                    </div>
                  </TabPanel>
                );
              })}
            </Tabs>
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
        resourceType
        attribution
        url
        stage
        description {
          html
        }
      }
    }
    # allGraphCmsResource {
    #   group(field: resourceType) {
    #     fieldValue
    #     nodes {
    #       attribution
    #       url
    #       stage
    #       description {
    #         html
    #       }
    #       title
    #       resourceType
    #     }
    #   }
    # }
    resourceTypes: __type(name: "GraphCMS_ResourceType") {
      enumValues {
        name
      }
    }
  }
`;

export default ResourcesPage;
