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
import { isUnderContruction } from '../utils/environment';
import { UnderConstruction } from '../components/UnderConstruction';
import { GatsbyPreviewIndicator } from '../components/GatsbyPreviewIndicator';
import { DebugData } from '../components/DebugData';

function AuthorIllustratorPage({ data }) {
  const authors = data.allGraphCmsAuthor.nodes;
  const illustrators = data.allGraphCmsIllustrator.nodes;

  return (
    <>
      <GlobalLayout>
        <GatsbyPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container css={{ margin: `${s2} 0` }}>
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
