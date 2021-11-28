/** @jsx jsx */
import * as React from 'react';
import { graphql } from 'gatsby';
import { jsx } from '@emotion/react';
import {
  notoSerif,
  PRIMARY,
  ACCENT,
  a,
  s1,
  onTabletMedia,
  flex,
  notoMono,
  s05,
  grid,
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
    }}
    {...props}
  >
    {props.children}
  </Link>
);

export const CategoryList = (props) => (
  <List css={{ listStyle: 'none' }} {...props}>
    {props.children}
  </List>
);

const BrowsePage = ({ data }) => {
  const topics = data.allGraphCmsTopic.nodes;
  const authors = data.allGraphCmsAuthor.nodes;
  const illustrators = data.allGraphCmsIllustrator.nodes;
  const categoryTypes = data.categoryNames.enumValues;
  const categories = data.allGraphCmsCategory.nodes;
  // const genres = data.allGraphCmsGenre.nodes;
  // const grades = data.allGraphCmsGrade.nodes;
  // const languages = data.allGraphCmsLanguage.nodes;

  return (
    <>
      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Section>
            <Heading level={1}>Browse</Heading>
            <Container>
              <Accordion
                allowMultipleExpanded={true}
                preExpanded={[]}
                css={[
                  onTabletMedia({
                    ...grid({
                      gridTemplateColumns: `repeat(4, 1fr)`,
                      width: '100%',
                    }),
                  }),
                ]}
              >
                {categoryTypes.length > 0 &&
                  categoryTypes.map((type) => {
                    return (
                      <AccordionItem
                        key={type.name}
                        css={{ border: '1px solid red' }}
                        uuid={type.name}
                      >
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <Heading level={2} css={{ color: ACCENT }}>
                              {type.name.replace('_', ' ')}
                            </Heading>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <CategoryList>
                            {categories
                              .filter(
                                (category) =>
                                  category.categoryType === type.name
                              )
                              .map((category) => (
                                <MonoFontLink
                                  to={`/categories/${slugify(
                                    category.categoryType
                                  )}/${category.slug}`}
                                >
                                  {category.title}
                                </MonoFontLink>
                              ))}
                          </CategoryList>
                        </AccordionItemPanel>
                      </AccordionItem>
                    );
                  })}
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <Heading level={2} css={{ color: ACCENT }}>
                        Authors
                      </Heading>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <CategoryList>
                      {authors.map((author) => (
                        <MonoFontLink to={`/authors/${author.slug}`}>
                          {author.name}
                        </MonoFontLink>
                      ))}
                    </CategoryList>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <Heading level={2} css={{ color: ACCENT }}>
                        Illustrators
                      </Heading>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <CategoryList>
                      {illustrators.map((illustrator) => (
                        <MonoFontLink to={`/illustrators/${illustrator.slug}`}>
                          {illustrator.name}
                        </MonoFontLink>
                      ))}
                    </CategoryList>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <Heading level={2} css={{ color: ACCENT }}>
                        Topics
                      </Heading>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <CategoryList>
                      {topics.map((topic) => (
                        <MonoFontLink to={`/topics/${topic.slug}`}>
                          {topic.title}
                        </MonoFontLink>
                      ))}
                    </CategoryList>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
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
    allGraphCmsText_Structure: allGraphCmsCategory(
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
