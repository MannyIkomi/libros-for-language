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
import { sortWithProperty } from '../utils/sort';

function TagsPage({ data, location }) {
  const topics = data.allGraphCmsTopic.nodes.sort(
    sortWithProperty({ property: 'sequence' })
  );
  const genres = data.allGraphCmsGenre.nodes.sort(
    sortWithProperty({ property: 'sequence' })
  );
  const grades = data.allGraphCmsGrade.nodes.sort(
    sortWithProperty({ property: 'sequence' })
  );

  const languages = data.allGraphCmsLanguage.nodes.sort(
    sortWithProperty({ property: 'sequence' })
  );
  const textStructures = data.allGraphCmsTextStructure.nodes.sort(
    sortWithProperty({ property: 'sequence' })
  );
  const typologies = data.allGraphCmsTypology.nodes.sort(
    sortWithProperty({ property: 'sequence' })
  );

  return (
    <>
      <GlobalLayout htmlHead={{ url: location.href }}>
        <GatsbyPreviewIndicator />
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container
              css={[
                { margin: `${s2} 0`, alignItems: 'start' },
                onTabletMedia({ alignItems: 'start' }),
              ]}
            >
              <Heading level={1}>Tags</Heading>
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
                css={[
                  { color: BLACK },
                  onTabletMedia({ gridColumn: `1 / -1` }),
                ]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Languages
                </Heading>

                <TagList>
                  {languages.map(({ slug, title, ...language }) => (
                    <MonoFontLink to={`/tags/languages/${slug}`} key={slug}>
                      {title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={PRIMARY20}
                css={[
                  { color: BLACK },
                  onTabletMedia({ gridColumn: `1 / -1` }),
                ]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Typology
                </Heading>

                <TagList>
                  {typologies.map(({ slug, ...term }) => (
                    <MonoFontLink
                      to={`/tags/typologies/${slug}`}
                      css={{ whiteSpace: 'normal' }}
                      key={slug}
                    >
                      {term.title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={PRIMARY20}
                css={[onTabletMedia({ gridColumn: '1 / 5' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Genres
                </Heading>

                <TagList>
                  {genres.map(({ slug, title, ...genre }) => (
                    <MonoFontLink to={`/tags/genres/${slug}`} key={slug}>
                      {title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={PRIMARY20}
                css={[onTabletMedia({ gridColumn: '5 / 9' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Text Structure
                </Heading>

                <TagList>
                  {textStructures.map(({ title, slug, ...structure }) => (
                    <MonoFontLink
                      to={`/tags/text-structures/${slug}`}
                      key={slug}
                    >
                      {title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={PRIMARY20}
                css={[onTabletMedia({ gridColumn: '9 / -1' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Grade Levels
                </Heading>

                <TagList>
                  {grades.map(({ slug, title, ...grade }) => (
                    <MonoFontLink to={`/tags/grades/${slug}`} key={slug}>
                      {title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={PRIMARY20}
                css={[onTabletMedia({ gridColumn: '1 / -1' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Topics
                </Heading>
                <TagList>
                  {topics.map(({ slug, title, ...topic }) => (
                    <MonoFontLink to={`/tags/topics/${slug}`}>
                      {title}
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
  query TagPageQuery {
    categoryNames: __type(name: "GraphCMS_TagType") {
      enumValues {
        name
      }
    }

    allGraphCmsTag {
      nodes {
        tagType
        sequence
        slug
        title
      }
    }

    allGraphCmsGrade: allGraphCmsTag(
      filter: { tagType: { eq: Grade } }
      sort: { fields: sequence, order: ASC }
    ) {
      nodes {
        title
        sequence
        slug
        tagType
      }
    }
    allGraphCmsGenre: allGraphCmsTag(
      filter: { tagType: { eq: Genre } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        sequence
        title
        slug
        tagType
      }
    }
    allGraphCmsLanguage: allGraphCmsTag(
      filter: { tagType: { eq: Language } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        title
        slug
        sequence
        tagType
      }
    }
    allGraphCmsTextStructure: allGraphCmsTag(
      filter: { tagType: { eq: Text_Structure } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        title
        slug
        sequence
        tagType
      }
    }
    allGraphCmsTypology: allGraphCmsTag(
      filter: { tagType: { eq: Typology } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        title
        sequence
        slug
        tagType
      }
    }

    allGraphCmsTopic: allGraphCmsTag(
      filter: { tagType: { eq: Topic } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        title
        sequence
        slug
        tagType
      }
    }
  }
`;

export default TagsPage;
