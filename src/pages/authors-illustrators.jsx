/** @jsx jsx */
import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
import {
  s1,
  onTabletMedia,
  flex,
  BLACK,
  grid12Columns,
  onDesktopMedia,
  s2,
  PRIMARY20,
  COMPLIMENT20,
  PRIMARY,
} from '../styles';
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
import 'react-tabs/style/react-tabs.css';

function AuthorIllustratorPage({ data }) {
  const authors = data.allGraphCmsAuthor.nodes;
  const illustrators = data.allGraphCmsIllustrator.nodes;

  const groupByFirstLetter = (previousVal, currentVal) => {
    // get first letter of name of current element
    let group = currentVal.lastName[0].toUpperCase();

    if (!previousVal[group]) {
      // if there is no property in accumulator with this letter create it
      // previousVal[group] = { group, children: [currentVal] };
      previousVal[group] = [currentVal];
    }

    // if there is push current element to children array for that letter
    else {
      previousVal[group].push(currentVal);
    }
    // return accumulator
    return previousVal;
  };
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
            <Container css={{ margin: `${s2} 0` }}>
              <Heading level={1}>Directory</Heading>
            </Container>
            <Container>
              <Tabs>
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
                      <>
                        <Heading level={3}>{letter}</Heading>
                        <TagList>
                          {authors.map((author) => (
                            <MonoFontLink
                              to={`/authors-illustrators/${author.slug}`}
                            >
                              {`${author.firstName} ${author.lastName}`}
                            </MonoFontLink>
                          ))}
                        </TagList>
                      </>
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  {alphaIllustrators.map((list) => {
                    const [letter, illustrators] = list;
                    return (
                      <>
                        <Heading level={3}>{letter}</Heading>
                        <TagList>
                          {illustrators.map((illustrator) => (
                            <MonoFontLink
                              to={`/authors-illustrators/${illustrator.slug}`}
                            >
                              {`${illustrator.firstName} ${illustrator.lastName}`}
                            </MonoFontLink>
                          ))}
                        </TagList>
                      </>
                    );
                  })}
                </TabPanel>
              </Tabs>
            </Container>

            <Container
              css={[
                {
                  ...flex('column', {
                    alignItems: 'stretch',
                  }),
                  gap: s1,
                },
                onTabletMedia({
                  ...grid12Columns({ gridTemplateRows: `auto` }),
                  gridAutoFlow: `row dense`,
                }),
                onDesktopMedia({
                  gap: s2,
                }),
              ]}
            >
              <TagGroup
                background={PRIMARY20}
                css={[onTabletMedia({ gridColumn: '1 / 7' })]}
              >
                <Heading level={2} css={{ color: PRIMARY }}>
                  Authors
                </Heading>

                <TagList>
                  {authors.map((author) => (
                    <MonoFontLink to={`/authors-illustrators/${author.slug}`}>
                      {`${author.firstName} ${author.lastName}`}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>
              <TagGroup
                background={PRIMARY20}
                css={[onTabletMedia({ gridColumn: '7 / -1' })]}
              >
                <Heading level={2} css={{ color: PRIMARY }}>
                  Illustrators
                </Heading>

                <TagList>
                  {illustrators.map((illustrator) => (
                    <MonoFontLink
                      to={`/authors-illustrators/${illustrator.slug}`}
                    >
                      {`${illustrator.firstName} ${illustrator.lastName}`}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>
            </Container>
          </Section>
        </main>
        <DebugData>{data.pageContext}</DebugData>
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
        lastName
        firstName
        type
      }
    }

    allGraphCmsIllustrator: allGraphCmsContributor(
      filter: { type: { eq: Illustrator } }
      sort: { order: ASC, fields: lastName }
    ) {
      nodes {
        slug
        lastName
        firstName
        type
      }
    }
  }
`;

export default AuthorIllustratorPage;
