/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { DebugData } from '../components/DebugData';
import { UnderConstruction } from '../components/UnderConstruction';
import { Footer } from '../components/Footer';
import { PrimaryLink } from '../components/Link';
import { Container } from '../components/Container';
import {
  base320,
  COMPLIMENT80,
  flex,
  grid,
  base160,
  notoSerif,
  onTabletMedia,
  PRIMARY,
  s1,
  s2,
  boxShadowLg,
} from '../styles';
import { GlobalLayout } from '../components/GlobalLayout';
import { MainMenu } from '../components/MainMenu';
import { Section } from '../components/Section';
import { Heading } from '../components/Heading';
import { BookCover } from '../components/BookCover';
import { BookList } from '../components/BookList';

function TagTemplate(props) {
  const { data, pageContext } = props;
  const { graphCmsCategory } = data;

  return (
    <div>
      <UnderConstruction />

      <GlobalLayout>
        <MainMenu />
        <main css={{ position: 'relative' }}>
          <Container css={{ alignItems: 'flex-start' }}>
            <Heading level={1}>{pageContext.title}</Heading>
          </Container>
          TAG TEMPLATE
        </main>
        <DebugData>{data}</DebugData>
        <Footer />
      </GlobalLayout>
    </div>
  );
}

export const query = graphql`
  query TagTemplateQuery($slug: String) {
    graphCmsTag(slug: { eq: $slug }) {
      books {
        bookCover {
          altDescription
          url
          width
          height
        }
        slug
        id
        bookTitle
      }
      title
      slug
      id
    }
    graphCmsTag(slug: { eq: $slug }) {
      title
      slug
      tagType
      id
      books {
        bookTitle
        slug
        tags {
          title
        }
        bookCover {
          altDescription
          width
          url
          size
          height
        }
      }
    }
  }
`;

export default TagTemplate;
