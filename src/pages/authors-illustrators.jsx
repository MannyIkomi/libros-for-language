/** @jsx jsx */
import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';

import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { MonoFontLink } from '../components/MonoFontLink';
import { TagList } from '../components/TagList';
import { TagGroup } from '../components/TagGroup';

import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { DebugData } from '../components/DebugData';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { concatFullName } from '../utils/concatFullName';
import { groupByFirstLetter } from '../utils/groupByFirstLetter';
import { LineRule } from '../components/LineRule';
import { PRIMARY60 } from '../styles';

function AuthorIllustratorPage({ data }) {
  const authors = data.allGraphCmsAuthor.nodes.map(concatFullName);
  const illustrators = data.allGraphCmsIllustrator.nodes.map(concatFullName);

  const alphaAuthors = Object.entries(authors.reduce(groupByFirstLetter, {}));
  const alphaIllustrators = Object.entries(
    illustrators.reduce(groupByFirstLetter, {})
  );

  return (
    <>
      <GlobalLayout>
        <GatsbyPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container
              css={{
                alignItems: 'start',
              }}
            >
              <Heading level={1}>Directory</Heading>
            </Container>
            <Container>
              <Tabs css={{ width: '100%' }}>
                <TabList>
                  <Tab>
                    <Heading level={2}>Authors</Heading>
                  </Tab>
                  <Tab>
                    <Heading level={2}>Illustrators</Heading>
                  </Tab>
                </TabList>

                <TabPanel>
                  {alphaAuthors.map((list) => {
                    const [letter, authors] = list;
                    return (
                      <Container css={{ alignItems: 'start' }} key={letter}>
                        <Heading level={3}>{letter}</Heading>
                        <TagList>
                          {authors.map((author) => (
                            <MonoFontLink
                              to={`/authors-illustrators/${author.slug}`}
                              key={author.slug}
                            >
                              {author.name}
                            </MonoFontLink>
                          ))}
                        </TagList>
                      </Container>
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  {alphaIllustrators.map((list) => {
                    const [letter, illustrators] = list;
                    return (
                      <Container css={{ alignItems: 'start' }} key={letter}>
                        <Heading level={3}>{letter}</Heading>
                        <TagList>
                          {illustrators.map((illustrator) => (
                            <MonoFontLink
                              to={`/authors-illustrators/${illustrator.slug}`}
                              key={illustrator.slug}
                            >
                              {illustrator.name}
                            </MonoFontLink>
                          ))}
                        </TagList>
                        {/* <LineRule css={{ borderColor: PRIMARY60 }} /> */}
                      </Container>
                    );
                  })}
                </TabPanel>
              </Tabs>
            </Container>
          </Section>
        </main>
        <Footer />
      </GlobalLayout>
    </>
  );
}

export const query = graphql`
  query AuthorIllustratorPageQuery {
    allGraphCmsAuthor: allGraphCmsContributor(
      filter: { type: { eq: Author } }
      sort: { order: ASC, fields: lastName }
    ) {
      nodes {
        slug
        firstName
        middleName
        lastName
        type
      }
    }

    allGraphCmsIllustrator: allGraphCmsContributor(
      filter: { type: { eq: Illustrator } }
      sort: { order: ASC, fields: lastName }
    ) {
      nodes {
        slug
        firstName
        middleName
        lastName
        type
      }
    }
  }
`;

export default AuthorIllustratorPage;
