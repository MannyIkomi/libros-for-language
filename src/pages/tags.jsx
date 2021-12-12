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

function BrowsePage({ data }) {
  const authors = data.allGraphCmsAuthor.nodes;
  const illustrators = data.allGraphCmsIllustrator.nodes;

  const topics = data.allGraphCmsTopic.nodes;
  const genres = data.allGraphCmsGenre.nodes;
  const grades = data.allGraphCmsGrade.nodes;
  const languages = data.allGraphCmsLanguage.nodes;
  const textStructures = data.allGraphCmsTextStructure.nodes;
  console.log(data);

  return (
    <>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container>
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
                  {languages.map((language) => (
                    <MonoFontLink to={`/languages/${language.slug}`}>
                      {language.title}
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
                  {genres.map((genre) => (
                    <MonoFontLink to={`/genres/${genre.slug}`}>
                      {genre.title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={PRIMARY20}
                css={[onTabletMedia({ gridColumn: '5 / 9' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Text Structures
                </Heading>

                <TagList>
                  {textStructures.map((structure) => (
                    <MonoFontLink to={`/text-structures/${structure.slug}`}>
                      {structure.title}
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
                  {grades.map((grade) => (
                    <MonoFontLink to={`/grades/${grade.slug}`}>
                      {grade.title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={COMPLIMENT20}
                css={[onTabletMedia({ gridColumn: '1 / -1' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Topics
                </Heading>
                <TagList>
                  {topics.map((topic) => (
                    <MonoFontLink to={`/topics/${topic.slug}`}>
                      {topic.title}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>

              <TagGroup
                background={COMPLIMENT20}
                css={[onTabletMedia({ gridColumn: '1 / 7' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Authors
                </Heading>

                <TagList>
                  {authors.map((author) => (
                    <MonoFontLink to={`/authors/${author.slug}`}>
                      {author.name}
                    </MonoFontLink>
                  ))}
                </TagList>
              </TagGroup>
              <TagGroup
                background={COMPLIMENT20}
                css={[onTabletMedia({ gridColumn: '7 / -1' })]}
              >
                <Heading level={2} css={{ color: BLACK }}>
                  Illustrators
                </Heading>

                <TagList>
                  {illustrators.map((illustrator) => (
                    <MonoFontLink to={`/illustrators/${illustrator.slug}`}>
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
  query BrowsePageQuery {
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

    allGraphCmsGrade: allGraphCmsTag(filter: { tagType: { eq: Grade } }) {
      nodes {
        title
        slug
        tagType
      }
    }
    allGraphCmsGenre: allGraphCmsTag(filter: { tagType: { eq: Genre } }) {
      nodes {
        title
        slug
        tagType
      }
    }
    allGraphCmsLanguage: allGraphCmsTag(filter: { tagType: { eq: Language } }) {
      nodes {
        title
        slug
        tagType
      }
    }
    allGraphCmsTextStructure: allGraphCmsTag(
      filter: { tagType: { eq: Text_Structure } }
    ) {
      nodes {
        title
        slug
        tagType
      }
    }

    allGraphCmsTopic: allGraphCmsTag(filter: { tagType: { eq: Topic } }) {
      nodes {
        title
        slug
        tagType
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

export default BrowsePage;
