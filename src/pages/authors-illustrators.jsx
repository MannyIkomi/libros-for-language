/** @jsx jsx */
import * as React from 'react';
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
import { isUnderContruction } from '../utils/environment';
import { UnderConstruction } from '../components/UnderConstruction';
import { GraphCMSPreviewIndicator } from '../components/GraphCMSPreviewIndicator';

function AuthorIllustratorPage({ data }) {
  const authors = data.allGraphCmsAuthor.nodes;
  const illustrators = data.allGraphCmsIllustrator.nodes;

  return (
    <>
      <GlobalLayout>
        <UnderConstruction />
        <GraphCMSPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container>
              <Heading level={1}>Author & Illustrator Directory</Heading>
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
                    <MonoFontLink to={`tags/authors/${author.slug}`}>
                      {author.name}
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
                    <MonoFontLink to={`tags/illustrators/${illustrator.slug}`}>
                      {illustrator.name}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>
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
    categoryNames: __type(name: "GraphCMS_TagType") {
      enumValues {
        name
      }
    }
    allGraphCmsTag {
      nodes {
        tagType
        slug
        title
      }
    }

    allGraphCmsAuthor: allGraphCmsContributor(
      filter: { type: { eq: Author } }
      sort: { order: ASC, fields: lastName }
    ) {
      nodes {
        slug
        name
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
        name
        lastName
        type
      }
    }
  }
`;

export default AuthorIllustratorPage;
