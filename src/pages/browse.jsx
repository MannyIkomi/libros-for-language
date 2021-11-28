/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
import {
  notoSerif,
  PRIMARY,
  DEPRECATED_ACCENT,
  a,
  s1,
  onTabletMedia,
  flex,
  notoMono,
  s00625,
  s05,
  grid,
  COMPLIMENT,
  PRIMARY40,
  BLACK,
  grid12Columns,
  s4,
  s0125,
  boxShadow,
  boxShadowLg,
  onDesktopMedia,
  s2,
  PRIMARY20,
  COMPLIMENT20,
} from '../styles';
import { DebugData } from '../components/DebugData';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Container, TextContainer } from '../components/Container';
import { Link } from '../components/Link';

import { GlobalLayout } from '../components/GlobalLayout';

import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { List } from '../components/List';
import { slugify } from '../utils/slugify';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  // https://www.npmjs.com/package/react-accessible-accordion
} from 'react-accessible-accordion';

export const MonoFontLink = (props) => (
  <Link
    css={{
      ...notoMono,
      textDecoration: 'underline',
      color: PRIMARY,
      letterSpacing: '0.05rem',
      display: 'inline-block',
      padding: s05,
      marginBottom: s05,
      whiteSpace: 'nowrap',
    }}
    {...props}
  >
    {props.children}
  </Link>
);

export const TagList = (props) => (
  <List
    css={[
      { listStyle: 'none' },
      { ...flex('row', { flexWrap: 'wrap', gap: s05 }) },
      onTabletMedia({
        ...grid({
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
          // gridAutoRows: `min-content`,
        }),
      }),
    ]}
    {...props}
  >
    {props.children}
  </List>
);

export const TagGroup = (props) => {
  const { background } = props;
  return (
    <section
      css={{
        padding: s1,

        background: background || DEPRECATED_ACCENT,
        borderRadius: `${s0125} ${s1}`,
        ...boxShadowLg,
      }}
      {...props}
    >
      {props.children}
    </section>
  );
};

const BrowsePage = ({ data }) => {
  const topics = data.allGraphCmsTopic.nodes;
  const authors = data.allGraphCmsAuthor.nodes;
  const illustrators = data.allGraphCmsIllustrator.nodes;
  const categoryTypes = data.categoryNames.enumValues;

  const genres = data.allGraphCmsGenre.nodes;
  const grades = data.allGraphCmsGrade.nodes;
  const languages = data.allGraphCmsLanguage.nodes;
  const textStructures = data.allGraphCmsTextStructure.nodes;

  return (
    <>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Container>
              <Heading level={1}>Browse</Heading>
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
};

export const query = graphql`
  query BrowsePageQuery {
    categoryNames: __type(name: "GraphCMS_CategoryType") {
      enumValues {
        name
      }
    }
    allGraphCmsCategory {
      nodes {
        categoryType
        slug
        title
      }
    }
    allGraphCmsTopic {
      nodes {
        title
        slug
      }
    }
    allGraphCmsGrade: allGraphCmsCategory(
      filter: { categoryType: { eq: Grade } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
    allGraphCmsGenre: allGraphCmsCategory(
      filter: { categoryType: { eq: Genre } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
    allGraphCmsLanguage: allGraphCmsCategory(
      filter: { categoryType: { eq: Language } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
    allGraphCmsTextStructure: allGraphCmsCategory(
      filter: { categoryType: { eq: Text_Structure } }
    ) {
      nodes {
        title
        slug
        categoryType
      }
    }
    allGraphCmsAuthor: allGraphCmsContributor(
      filter: { type: { eq: Author } }
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
